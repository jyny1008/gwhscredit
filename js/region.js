/* 권역 페이지 렌더링 */
(function () {
  "use strict";
  var data = getSiteData();

  var params = new URLSearchParams(location.search);
  var regionId = params.get("region") || "sokcho";
  var region = null;
  for (var i = 0; i < data.regions.length; i++) {
    if (data.regions[i].id === regionId) { region = data.regions[i]; break; }
  }
  if (!region) { region = data.regions[0]; regionId = region.id; }
  var color = REGION_COLORS[regionId] || "#50AFE1";

  renderHeader(true);
  renderFooter(data);
  renderPreviewBar(data);

  document.title = region.fullName + " | 2026 중학생을 위한 고교학점제 박람회";
  document.getElementById("region-hero").style.setProperty("--rc", color);

  var boothCnt = countBooth(data, regionId);
  var bookCnt = data.schools.filter(function (s) { return s.p && s.p[regionId] === "book"; }).length;

  /* 히어로 */
  document.getElementById("region-hero-inner").innerHTML =
    '<p class="crumb"><a href="index.html">🏠 처음으로</a> &nbsp;›&nbsp; 권역 안내 &nbsp;›&nbsp; ' + esc(region.fullName) + "</p>" +
    '<h1><span class="dot">●</span> ' + esc(region.fullName) + " 박람회</h1>" +
    '<p class="sub">2026 중학생을 위한 고교학점제 박람회 — ' + esc(region.name) + " 권역 안내</p>" +
    '<div class="facts">' +
    '  <div class="fact"><p class="k">🗓 일시</p><p class="v">' + esc(region.date) + "</p></div>" +
    '  <div class="fact"><p class="k">📍 장소</p><p class="v">' + esc(region.place) + "</p></div>" +
    '  <div class="fact"><p class="k">🏫 참가 학교</p><p class="v">' + boothCnt + "교" + (bookCnt ? ' <small style="font-weight:600;opacity:.8">+ 자료집 ' + bookCnt + "교</small>" : "") + "</p></div>" +
    "</div>" +
    '<nav class="region-tabs">' + data.regions.map(function (r) {
      return '<a href="region.html?region=' + r.id + '"' + (r.id === regionId ? ' class="on"' : "") + ">" + esc(r.name) + "</a>";
    }).join("") + "</nav>";

  /* 특강 시간표 */
  document.getElementById("lecture-table").innerHTML =
    "<table><thead><tr><th>회차</th><th>시간</th><th>참여 방법</th></tr></thead><tbody>" +
    region.lectureRounds.map(function (r) {
      var onsite = r.how.indexOf("현장") >= 0;
      return "<tr><td><b>" + esc(r.round) + "</b></td><td>" + esc(r.time) + "</td>" +
        '<td><span class="how ' + (onsite ? "onsite" : "pre") + '">' + esc(r.how) + "</span></td></tr>";
    }).join("") + "</tbody></table>";
  document.getElementById("lecture-note").innerHTML =
    (region.lectureNote ? "<b>※</b> " + esc(region.lectureNote) + "<br>" : "") +
    "※ 일정 및 장소는 사정에 따라 변경될 수 있습니다.";

  /* 신청 카드 (권역별 링크 우선) */
  function applyCard(kind, ico, title, desc) {
    var url = getApplyLink(data, kind, regionId);
    var note = (data.apply[kind] && data.apply[kind].note) || "";
    var btn = url
      ? '<a class="btn navy" href="' + esc(url) + '" target="_blank" rel="noopener">' + title + " 바로가기 →</a>"
      : '<button class="btn navy disabled" type="button" disabled>신청 오픈 예정</button>';
    return '<div class="apply-card"><div class="ico">' + ico + "</div><h3>" + title + "</h3><p>" + esc(desc) + "</p>" + btn +
      (url ? "" : (note ? '<span class="note">📌 ' + esc(note) + "</span>" : "")) + "</div>";
  }
  document.getElementById("apply-title").textContent = region.name + " 권역 참가 신청";
  document.getElementById("apply-grid").innerHTML =
    applyCard("lecture", "🎤", "특강 참가 신청", region.name + " 권역 특강 사전 신청 (마지막 회차는 현장 접수)") +
    applyCard("counsel", "💬", "1:1 상담 신청", "진로·학업 설계 상담 및 개별화 학습 코칭 — 온라인 사전 신청만 운영");

  /* 참가교 목록 */
  var schools = data.schools.filter(function (s) {
    return s.p && (s.p[regionId] === "O" || s.p[regionId] === "book");
  });
  document.getElementById("schools-title").textContent =
    region.name + " 권역 참가 학교 (" + boothCnt + "교" + (bookCnt ? " + 자료집 " + bookCnt + "교" : "") + ")";

  var listEl = document.getElementById("school-list");
  var searchEl = document.getElementById("school-search");
  var chipsEl = document.getElementById("type-chips");
  var curType = "전체";

  var types = TYPE_ORDER.filter(function (t) {
    return schools.some(function (s) { return s.type === t; });
  });
  chipsEl.innerHTML = ["전체"].concat(types).map(function (t) {
    return '<button type="button" data-type="' + esc(t) + '"' + (t === curType ? ' class="on"' : "") + ">" + esc(t) + "</button>";
  }).join("");
  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    curType = b.dataset.type;
    chipsEl.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
    renderList();
  });
  searchEl.addEventListener("input", renderList);

  function renderList() {
    var q = searchEl.value.trim();
    var filtered = schools.filter(function (s) {
      if (curType !== "전체" && s.type !== curType) return false;
      if (q && s.name.indexOf(q) < 0 && s.locale.indexOf(q) < 0) return false;
      return true;
    });
    if (!filtered.length) {
      listEl.innerHTML = '<p class="empty-msg">조건에 맞는 학교가 없습니다.</p>';
      return;
    }
    listEl.innerHTML = TYPE_ORDER.map(function (t) {
      var group = filtered.filter(function (s) { return s.type === t; });
      if (!group.length) return "";
      return (
        '<div class="school-group" style="--rc:' + color + '">' +
        "<h3>" + esc(t) + ' <span class="n">' + group.length + "교</span></h3>" +
        '<div class="school-grid">' + group.map(function (s) {
          var book = s.p[regionId] === "book";
          return (
            '<button type="button" class="school-card" data-id="' + s.id + '">' +
            "<span><span class=\"nm\">" + esc(s.name) + "</span>" +
            (book ? '<span class="bk">자료집 참여</span>' : "") +
            '<br><span class="lo">📍 ' + esc(s.locale) + "</span></span>" +
            '<span class="arrow">›</span>' +
            "</button>"
          );
        }).join("") + "</div></div>"
      );
    }).join("");
  }
  renderList();

  listEl.addEventListener("click", function (e) {
    var card = e.target.closest(".school-card");
    if (!card) return;
    var id = Number(card.dataset.id);
    var school = data.schools.filter(function (s) { return s.id === id; })[0];
    if (school) openSchoolModal(school);
  });
})();
