/* 메인 페이지 렌더링 */
(function () {
  "use strict";
  var data = getSiteData();

  renderHeader();
  renderFooter(data);
  renderPreviewBar(data);

  /* 공지 */
  if (data.event.notice) {
    document.getElementById("notice-slot").innerHTML =
      '<div class="notice-bar container-fluid">📢 ' + esc(data.event.notice) + "</div>";
  }

  /* 행사 개요 4항목 */
  document.getElementById("overview-grid").innerHTML = [
    { ico: "🗓️", k: "운영 시기", v: "2026. 8. 29. ~ 9. 19.<br>매주 토요일 (총 4회)" },
    { ico: "📍", k: "개최 권역", v: "속초 · 춘천 · 강릉 · 원주" },
    { ico: "🙋", k: "참가 대상", v: esc(data.event.target) },
    { ico: "🏫", k: "참여 학교", v: esc(data.event.participants) }
  ].map(function (o) {
    return '<div class="ov-item"><div class="ico">' + o.ico + '</div><h3>' + o.k + "</h3><p>" + o.v + "</p></div>";
  }).join("");

  /* 권역 카드 */
  document.getElementById("region-grid").innerHTML = data.regions.map(function (r) {
    var color = REGION_COLORS[r.id] || "#50AFE1";
    var cnt = countBooth(data, r.id);
    return (
      '<a class="region-card" href="region.html?region=' + r.id + '" style="--rc:' + color + '">' +
      '  <span class="badge">' + esc(r.name) + " 권역</span>" +
      "  <h3>" + esc(r.name) + "</h3>" +
      '  <p class="meta"><b>🗓 ' + esc(r.date) + "</b><br>📍 " + esc(r.place) + "</p>" +
      '  <p class="cnt">참가 학교 <b>' + cnt + "</b>교</p>" +
      '  <span class="go">→</span>' +
      "</a>"
    );
  }).join("");

  /* 프로그램 3단계 */
  document.getElementById("step-grid").innerHTML = data.programs.map(function (p, i) {
    return (
      '<div class="step-card c-' + esc(p.color) + '">' +
      '  <span class="num">' + (i + 1) + "</span>" +
      '  <span class="step-tag">' + esc(p.step) + "</span>" +
      "  <h3>" + esc(p.title) + "</h3>" +
      '  <p class="desc">' + esc(p.desc) + "</p>" +
      "  <ul>" + p.items.map(function (it) { return "<li>" + esc(it) + "</li>"; }).join("") + "</ul>" +
      '  <p class="info">ℹ️ ' + esc(p.info) + "</p>" +
      "</div>"
    );
  }).join("");

  /* 참가 신청 카드 */
  function applyCard(kind, ico, title, desc) {
    var url = getApplyLink(data, kind);
    var note = (data.apply[kind] && data.apply[kind].note) || "";
    var btn = url
      ? '<a class="btn navy" href="' + esc(url) + '" target="_blank" rel="noopener">' + title + " 바로가기 →</a>"
      : '<button class="btn navy disabled" type="button" disabled>신청 오픈 예정</button>';
    return (
      '<div class="apply-card">' +
      '  <div class="ico">' + ico + "</div>" +
      "  <h3>" + title + "</h3>" +
      "  <p>" + esc(desc) + "</p>" + btn +
      (note ? '<span class="note">📌 ' + esc(note) + "</span>" : "") +
      "</div>"
    );
  }
  document.getElementById("apply-grid").innerHTML =
    applyCard("lecture", "🎤", "특강 참가 신청", "고교학점제·학교생활기록 안내와 고입 전형·직업계고 교육과정 안내 특강 (1·2차 사전 신청)") +
    applyCard("counsel", "💬", "1:1 상담 신청", "진로·학업 설계 상담(100명)과 개별화 학습 코칭(50명) — 온라인 사전 신청만 운영");

  /* 생기부 안내 */
  var rec = data.record;
  document.getElementById("record-wrap").innerHTML =
    "<h3 style='font-size:19px;color:var(--navy);margin-bottom:12px'>🏅 " + esc(rec.title) + "</h3>" +
    '<p class="lead">' + esc(rec.lead) + "</p>" +
    '<div class="record-hl">✔ ' + esc(rec.box) + "</div>" +
    '<p class="basis">근거 · ' + esc(rec.basis) + "</p>" +
    '<div class="cond-list">' + rec.conditions.map(function (c, i) {
      return "<span>" + "①②③④⑤".charAt(i) + " " + esc(c) + "</span>";
    }).join("") + "</div>" +
    '<div class="record-warn">⚠ ' + esc(rec.caution) + "</div>";

  /* 갤러리 */
  var photos = [
    ["assets/photos/expo-02.jpg", "박람회 행사장"],
    ["assets/photos/expo-04.jpg", "학교별 부스 운영"],
    ["assets/photos/counsel-01.jpg", "1:1 진로·학업 설계 상담"],
    ["assets/photos/coaching-01.jpg", "개별화 학습 코칭"],
    ["assets/photos/expo-05.jpg", "박람회 행사장"],
    ["assets/photos/expo-06.jpg", "학교별 부스 운영"],
    ["assets/photos/counsel-02.jpg", "1:1 진로·학업 설계 상담"],
    ["assets/photos/expo-07.jpg", "박람회 행사장"]
  ];
  document.getElementById("gallery-grid").innerHTML = photos.map(function (p) {
    return '<figure><img src="' + p[0] + '" alt="' + esc(p[1]) + '" loading="lazy"><figcaption>' + esc(p[1]) + "</figcaption></figure>";
  }).join("");

  /* 문의 */
  document.getElementById("contact-grid").innerHTML = data.contacts.map(function (c) {
    var tel = c.tel
      ? '<p class="tel"><a href="tel:' + esc(c.tel.replace(/[^0-9-]/g, "").split("-").slice(0, 3).join("-")) + '">' + esc(c.tel) + "</a></p>"
      : '<p class="tel tba">전화번호 추후 안내 예정</p>';
    return (
      '<div class="contact-card">' +
      '  <div class="ico">📞</div>' +
      "  <div><h3>" + esc(c.name) + "</h3>" + tel + "</div>" +
      "</div>"
    );
  }).join("");
})();
