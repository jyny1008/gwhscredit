/* 관리자 페이지 — 데이터 편집 / 미리보기 저장 / 배포용 내보내기 */
(function () {
  "use strict";

  var SESSION_KEY = "hscreditExpoAdmin";
  var data = JSON.parse(JSON.stringify(getSiteData()));  // 편집용 복사본
  delete data.__preview;

  var loginView = document.getElementById("login-view");
  var adminView = document.getElementById("admin-view");
  var msgEl = document.getElementById("admin-msg");

  function toast(msg) {
    msgEl.textContent = msg;
    msgEl.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { msgEl.classList.remove("show"); }, 2600);
  }

  /* ---------- 로그인 ---------- */
  function showAdmin() {
    loginView.style.display = "none";
    adminView.style.display = "block";
    renderForm();
  }
  if (sessionStorage.getItem(SESSION_KEY) === "1") showAdmin();

  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var pw = document.getElementById("login-pw").value;
    if (pw && pw === (data.adminPassword || "gwedu2026")) {
      sessionStorage.setItem(SESSION_KEY, "1");
      showAdmin();
    } else {
      document.getElementById("login-err").style.display = "block";
    }
  });
  document.getElementById("btn-logout").addEventListener("click", function () {
    sessionStorage.removeItem(SESSION_KEY);
    location.reload();
  });

  /* ---------- 폼 렌더링 ---------- */
  var P_OPTS = [["O", "O"], ["X", "X"], ["book", "자료집"]];

  function renderForm() {
    document.getElementById("f-lecture-url").value = data.apply.lecture.url || "";
    document.getElementById("f-lecture-note").value = data.apply.lecture.note || "";
    document.getElementById("f-counsel-url").value = data.apply.counsel.url || "";
    document.getElementById("f-counsel-note").value = data.apply.counsel.note || "";
    document.getElementById("f-notice").value = data.event.notice || "";
    document.getElementById("f-tel-center").value = data.contacts[0] ? data.contacts[0].tel : "";
    document.getElementById("f-tel-office").value = data.contacts[1] ? data.contacts[1].tel : "";

    document.getElementById("region-links-body").innerHTML = data.regions.map(function (r) {
      var rl = (data.apply.regionLinks && data.apply.regionLinks[r.id]) || { lecture: "", counsel: "" };
      return "<tr><td><b>" + esc(r.name) + "</b></td>" +
        '<td><input type="url" data-rl="' + r.id + ':lecture" value="' + esc(rl.lecture) + '" placeholder="공통 링크 사용 시 비워 두세요"></td>' +
        '<td><input type="url" data-rl="' + r.id + ':counsel" value="' + esc(rl.counsel) + '" placeholder="공통 링크 사용 시 비워 두세요"></td></tr>';
    }).join("");

    document.getElementById("region-info-body").innerHTML = data.regions.map(function (r) {
      return "<tr><td><b>" + esc(r.name) + "</b></td>" +
        '<td><input type="text" data-ri="' + r.id + ':date" value="' + esc(r.date) + '"></td>' +
        '<td><input type="text" data-ri="' + r.id + ':place" value="' + esc(r.place) + '"></td></tr>';
    }).join("");

    renderSchools();
  }

  function renderSchools() {
    document.getElementById("school-count").textContent = "총 " + data.schools.length + "교";
    document.getElementById("school-body").innerHTML = data.schools.map(function (s, idx) {
      function sel(rid) {
        return '<select data-sc="' + idx + ':p:' + rid + '">' + P_OPTS.map(function (o) {
          return '<option value="' + o[0] + '"' + ((s.p[rid] || "X") === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
        }).join("") + "</select>";
      }
      var docsStr = (s.docs || []).map(function (d) { return d.url || d.file; }).join(", ");
      return "<tr>" +
        '<td style="min-width:150px"><input type="text" data-sc="' + idx + ':name" value="' + esc(s.name) + '"></td>' +
        '<td style="min-width:90px"><input type="text" data-sc="' + idx + ':type" value="' + esc(s.type) + '"></td>' +
        '<td style="min-width:70px"><input type="text" data-sc="' + idx + ':locale" value="' + esc(s.locale) + '"></td>' +
        "<td>" + sel("sokcho") + "</td><td>" + sel("chuncheon") + "</td><td>" + sel("gangneung") + "</td><td>" + sel("wonju") + "</td>" +
        '<td style="min-width:220px"><input type="text" data-sc="' + idx + ':docs" value="' + esc(docsStr) + '" placeholder="파일명.hwpx 또는 https://…"></td>' +
        '<td><button type="button" class="del" data-del="' + idx + '" title="삭제">✕</button></td>' +
        "</tr>";
    }).join("");
  }

  /* ---------- 입력 → 데이터 반영 ---------- */
  function collect() {
    data.apply.lecture.url = document.getElementById("f-lecture-url").value.trim();
    data.apply.lecture.note = document.getElementById("f-lecture-note").value.trim();
    data.apply.counsel.url = document.getElementById("f-counsel-url").value.trim();
    data.apply.counsel.note = document.getElementById("f-counsel-note").value.trim();
    data.event.notice = document.getElementById("f-notice").value.trim();
    if (data.contacts[0]) data.contacts[0].tel = document.getElementById("f-tel-center").value.trim();
    if (data.contacts[1]) data.contacts[1].tel = document.getElementById("f-tel-office").value.trim();

    if (!data.apply.regionLinks) data.apply.regionLinks = {};
    adminView.querySelectorAll("[data-rl]").forEach(function (inp) {
      var parts = inp.dataset.rl.split(":");
      if (!data.apply.regionLinks[parts[0]]) data.apply.regionLinks[parts[0]] = { lecture: "", counsel: "" };
      data.apply.regionLinks[parts[0]][parts[1]] = inp.value.trim();
    });
    adminView.querySelectorAll("[data-ri]").forEach(function (inp) {
      var parts = inp.dataset.ri.split(":");
      data.regions.forEach(function (r) { if (r.id === parts[0]) r[parts[1]] = inp.value.trim(); });
    });
    adminView.querySelectorAll("[data-sc]").forEach(function (inp) {
      var parts = inp.dataset.sc.split(":");
      var s = data.schools[Number(parts[0])];
      if (!s) return;
      if (parts[1] === "p") {
        s.p[parts[2]] = inp.value;
      } else if (parts[1] === "docs") {
        var v = inp.value.trim();
        s.docs = !v ? [] : v.split(",").map(function (piece, i) {
          piece = piece.trim();
          if (!piece) return null;
          var label = "학교소개자료" + (v.split(",").length > 1 ? " " + (i + 1) : "");
          return /^https?:\/\//i.test(piece) ? { label: label, url: piece } : { label: label, file: piece };
        }).filter(Boolean);
      } else {
        s[parts[1]] = inp.value.trim();
      }
    });
    var newPw = document.getElementById("f-admin-pw").value.trim();
    if (newPw) data.adminPassword = newPw;
  }

  /* ---------- 학교 추가/삭제 ---------- */
  document.getElementById("btn-add-school").addEventListener("click", function () {
    collect();
    var maxId = data.schools.reduce(function (m, s) { return Math.max(m, s.id || 0); }, 0);
    data.schools.push({
      id: maxId + 1, name: "", type: "일반고", locale: "",
      p: { sokcho: "X", chuncheon: "X", gangneung: "X", wonju: "X" }, docs: []
    });
    renderSchools();
    toast("학교 행이 추가되었습니다. 정보를 입력하세요.");
  });
  document.getElementById("school-body").addEventListener("click", function (e) {
    var b = e.target.closest("[data-del]");
    if (!b) return;
    var idx = Number(b.dataset.del);
    var name = data.schools[idx] ? data.schools[idx].name : "";
    if (!confirm('"' + (name || "이 학교") + '" 항목을 삭제할까요?')) return;
    collect();
    data.schools.splice(idx, 1);
    renderSchools();
    toast("삭제되었습니다. 저장/내보내기를 잊지 마세요.");
  });

  /* ---------- 저장/내보내기/가져오기/초기화 ---------- */
  document.getElementById("btn-preview").addEventListener("click", function () {
    collect();
    localStorage.setItem(EXPO_STORE_KEY, JSON.stringify(data));
    toast("✅ 미리보기 저장 완료 — 사이트를 열어 확인하세요 (이 브라우저에만 적용)");
  });

  document.getElementById("btn-export").addEventListener("click", function () {
    collect();
    var banner =
      "/* =========================================================\n" +
      "   2026 중학생을 위한 고교학점제 박람회 — 사이트 데이터\n" +
      "   (관리자 페이지에서 " + new Date().toLocaleString("ko-KR") + " 내보냄)\n" +
      "   이 파일로 GitHub 저장소의 data/site-data.js 를 교체하면\n" +
      "   모든 방문자에게 반영됩니다.\n" +
      "   ========================================================= */\n";
    var out = banner + "window.SITE_DATA = " + JSON.stringify(data, null, 2) + ";\n";
    var blob = new Blob([out], { type: "text/javascript;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "site-data.js";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("📤 site-data.js 내려받음 — GitHub의 data/site-data.js 를 이 파일로 교체하세요");
  });

  document.getElementById("btn-import").addEventListener("change", function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var text = String(reader.result);
        var jsonText = text.indexOf("window.SITE_DATA") >= 0
          ? text.slice(text.indexOf("=") + 1).trim().replace(/;\s*$/, "")
          : text;
        var obj = JSON.parse(jsonText);
        if (!obj.schools || !obj.regions) throw new Error("형식 오류");
        data = obj;
        renderForm();
        toast("📥 파일을 불러왔습니다. [미리보기 저장] 또는 [내보내기]로 확정하세요.");
      } catch (err) {
        alert("파일을 읽을 수 없습니다. 관리자 페이지에서 내보낸 site-data.js 파일인지 확인하세요.");
      }
      e.target.value = "";
    };
    reader.readAsText(file, "utf-8");
  });

  document.getElementById("btn-reset").addEventListener("click", function () {
    if (!confirm("이 브라우저의 미리보기 데이터를 지우고 배포된 기본 데이터로 되돌릴까요?\n(배포된 사이트에는 영향이 없습니다)")) return;
    localStorage.removeItem(EXPO_STORE_KEY);
    location.reload();
  });
})();
