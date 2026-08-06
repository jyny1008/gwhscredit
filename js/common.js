/* 공통 유틸 — 데이터 로드, 헤더/푸터, 학교 모달 */
(function () {
  "use strict";

  var STORE_KEY = "hscreditExpoData_v1";

  /* 관리자 미리보기(localStorage) > 기본 데이터(data/site-data.js) */
  window.getSiteData = function () {
    var base = window.SITE_DATA;
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        if (saved && saved.schools && saved.regions) { saved.__preview = true; return saved; }
      }
    } catch (e) { /* 파싱 실패 시 기본 데이터 사용 */ }
    return base;
  };
  window.EXPO_STORE_KEY = STORE_KEY;

  window.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  window.REGION_COLORS = { sokcho: "#50AFE1", chuncheon: "#616EAE", gangneung: "#DE659F", wonju: "#E47E3A" };

  window.TYPE_ORDER = ["일반고", "자율형공립고", "종합고", "농어촌자율학교", "특목고", "자율형사립고", "특성화고", "마이스터고", "대안고", "각종학교", "특수학교"];

  /* 권역별 부스 운영교 수 (O만 집계) */
  window.countBooth = function (data, regionId) {
    return data.schools.filter(function (s) { return s.p && s.p[regionId] === "O"; }).length;
  };

  /* 신청 링크: 권역별 override > 공통 */
  window.getApplyLink = function (data, kind, regionId) {
    var a = data.apply || {};
    if (regionId && a.regionLinks && a.regionLinks[regionId] && a.regionLinks[regionId][kind]) {
      return a.regionLinks[regionId][kind];
    }
    return (a[kind] && a[kind].url) || "";
  };

  window.docUrl = function (doc) {
    if (doc.url) return doc.url;
    return "assets/schools/" + encodeURIComponent(doc.file);
  };

  /* ---------- 헤더 ---------- */
  window.renderHeader = function (isSub) {
    var home = "index.html";
    var h = document.getElementById("site-header");
    if (!h) return;
    h.innerHTML =
      '<div class="container inner">' +
      '  <a class="brand" href="' + home + '">' +
      '    <img src="assets/emblem.png" alt="강원특별자치도교육청 상징">' +
      '    <span class="t"><b>2026 고교학점제 박람회</b><span>강원특별자치도교육청</span></span>' +
      '  </a>' +
      '  <button class="menu-btn" id="menu-btn" aria-label="메뉴 열기">☰</button>' +
      '  <nav class="gnb" id="gnb">' +
      '    <a href="' + home + '#overview">행사 개요</a>' +
      '    <a href="' + home + '#program">프로그램</a>' +
      '    <a href="' + home + '#regions">권역 안내</a>' +
      '    <a href="' + home + '#record">참가자 안내</a>' +
      '    <a href="' + home + '#contact">문의</a>' +
      '    <a href="' + home + '#apply" class="cta">참가 신청</a>' +
      '  </nav>' +
      '</div>';
    var btn = document.getElementById("menu-btn"), gnb = document.getElementById("gnb");
    btn.addEventListener("click", function () { gnb.classList.toggle("open"); });
    gnb.addEventListener("click", function (e) { if (e.target.tagName === "A") gnb.classList.remove("open"); });
  };

  /* ---------- 푸터 ---------- */
  window.renderFooter = function (data) {
    var f = document.getElementById("site-footer");
    if (!f) return;
    var ft = data.footer;
    f.innerHTML =
      '<div class="container">' +
      '  <div class="top">' +
      '    <div class="f-brand">' +
      '      <img src="assets/emblem.png" alt="">' +
      '      <div><b>강원특별자치도교육청</b><span>GANGWON STATE OFFICE OF EDUCATION</span></div>' +
      '    </div>' +
      '    <div class="f-center"><a href="' + esc(ft.centerUrl) + '" target="_blank" rel="noopener">🔗 ' + esc(ft.centerText) + '</a></div>' +
      '  </div>' +
      '  <p class="addr">' + esc(ft.address) + '</p>' +
      '  <p class="copy">' + esc(ft.copyright) + '</p>' +
      '  <a class="admin-link" href="admin.html">관리자</a>' +
      '</div>';
  };

  /* ---------- 관리자 미리보기 배너 ---------- */
  window.renderPreviewBar = function (data) {
    if (!data.__preview) return;
    var bar = document.createElement("div");
    bar.className = "preview-bar";
    bar.innerHTML = '⚠ 이 브라우저에는 <b>관리자 미리보기 데이터</b>가 적용되어 있습니다. (다른 방문자에게는 배포된 데이터가 보입니다)' +
      '<button type="button" id="preview-clear">미리보기 해제</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    document.getElementById("preview-clear").addEventListener("click", function () {
      localStorage.removeItem(STORE_KEY);
      location.reload();
    });
  };

  /* ---------- 학교 소개자료 모달 ---------- */
  window.openSchoolModal = function (school) {
    var back = document.getElementById("school-modal");
    if (!back) {
      back = document.createElement("div");
      back.id = "school-modal";
      back.className = "modal-back";
      document.body.appendChild(back);
      back.addEventListener("click", function (e) { if (e.target === back) back.classList.remove("show"); });
    }
    var docsHtml = "";
    var hasHwp = false;
    if (school.docs && school.docs.length) {
      docsHtml = '<div class="doc-btns">' + school.docs.map(function (d) {
        var url = docUrl(d);
        var isPdf = /\.pdf($|\?)/i.test(url);
        if (!isPdf && /\.hwpx?($|\?)/i.test(url)) hasHwp = true;
        return '<a class="btn navy" href="' + esc(url) + '"' +
          (isPdf ? ' target="_blank" rel="noopener"' : " download") + ">📄 " +
          esc(d.label || "학교소개자료") + (isPdf ? " 보기" : " 내려받기") + "</a>";
      }).join("") + "</div>";
      if (hasHwp) {
        docsHtml += '<p class="hwp-note">💡 소개자료는 한글(HWPX) 파일로 제공됩니다. 스마트폰에서는 <b>한컴오피스 뷰어</b> 앱, PC에서는 한글 프로그램(또는 한컴오피스 뷰어)으로 열 수 있습니다.</p>';
      }
    } else {
      docsHtml = '<div class="no-doc">학교소개자료 준비 중입니다.<br>자료가 등록되면 이곳에서 확인할 수 있습니다.</div>';
    }
    back.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + esc(school.name) + ' 소개">' +
      '  <button class="x" type="button" aria-label="닫기">✕</button>' +
      '  <span class="type-b">' + esc(school.type) + "</span>" +
      "  <h3>" + esc(school.name) + "</h3>" +
      '  <p class="lo">📍 소재지 · ' + esc(school.locale) + "</p>" + docsHtml +
      "</div>";
    back.querySelector(".x").addEventListener("click", function () { back.classList.remove("show"); });
    back.classList.add("show");
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var m = document.getElementById("school-modal");
      if (m) m.classList.remove("show");
    }
  });
})();
