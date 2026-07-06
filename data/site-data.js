/* =========================================================
   2026 중학생을 위한 고교학점제 박람회 — 사이트 데이터
   -----------------------------------------------------------
   ▸ 이 파일이 웹사이트의 모든 내용(일정, 장소, 학교, 링크 등)을 담습니다.
   ▸ 관리자 페이지(admin.html)에서 수정 후 [배포용 파일 내보내기]로
     내려받은 파일로 이 파일을 교체(GitHub 커밋)하면 전체 방문자에게 반영됩니다.
   ========================================================= */
window.SITE_DATA = {
  version: 1,
  event: {
    name: "2026 중학생을 위한 고교학점제 박람회",
    slogan: "고교학점제 첫 걸음, 꿈을 향한 큰 걸음",
    host: "강원특별자치도교육청",
    period: "2026. 8. 29.(토) ~ 9. 19.(토) · 매주 토요일, 4개 권역 순회",
    target: "중학생 및 학부모",
    participants: "각 권역 고등학교 및 참가 희망교 (총 68교)",
    notice: ""  /* 메인 상단 공지(비우면 표시 안 함) */
  },

  /* 신청 링크 — 비워두면 "오픈 예정" 안내가 표시됩니다.
     regionLinks에 권역별 링크를 넣으면 해당 권역 페이지에서 우선 적용됩니다. */
  apply: {
    lecture: { url: "", note: "특강 참가 신청은 권역별 박람회 약 10일 전에 오픈됩니다. (속초권 8. 18. / 춘천권 8. 24. 예정)" },
    counsel: { url: "", note: "1:1 상담 신청은 권역별 박람회 약 10일 전에 오픈됩니다. (속초권 8. 18. / 춘천권 8. 24. 예정)" },
    regionLinks: {
      sokcho:    { lecture: "", counsel: "" },
      chuncheon: { lecture: "", counsel: "" },
      gangneung: { lecture: "", counsel: "" },
      wonju:     { lecture: "", counsel: "" }
    }
  },

  contacts: [
    { name: "강원특별자치도교육청 고교학점제지원센터", tel: "033-258-5604, 5608" },
    { name: "고교학점제 박람회 운영 사무소", tel: "" }  /* 추후 관리자 페이지에서 입력 */
  ],

  footer: {
    address: "[24223] 강원특별자치도 춘천시 영서로 2854 (사농동) (전화문의 : 033-258-5604)",
    copyright: "COPYRIGHT ⓒ GANGWON STATE OFFICE OF EDUCATION. ALL RIGHTS RESERVED.",
    centerText: "강원특별자치도교육청 고교학점제지원센터(hscredit.gwe.go.kr)",
    centerUrl: "https://hscredit.gwe.go.kr"
  },

  regions: [
    {
      id: "sokcho", name: "속초", fullName: "속초 권역",
      date: "2026. 8. 29. (토)", place: "속초청소년수련관",
      lectureRounds: [
        { round: "1차", time: "13:10 ~ 14:30", how: "온라인 사전 신청" },
        { round: "2차", time: "15:10 ~ 16:30", how: "현장 접수" }
      ],
      lectureNote: "속초 권역은 특강을 2차례 운영합니다. (1차 사전 신청 100%, 2차 현장 접수 100%)"
    },
    {
      id: "chuncheon", name: "춘천", fullName: "춘천 권역",
      date: "2026. 9. 5. (토)", place: "베어스 호텔(춘천)",
      lectureRounds: [
        { round: "1차", time: "11:30 ~ 12:50", how: "온라인 사전 신청" },
        { round: "2차", time: "13:10 ~ 14:30", how: "온라인 사전 신청" },
        { round: "3차", time: "15:10 ~ 16:30", how: "현장 접수" }
      ],
      lectureNote: ""
    },
    {
      id: "gangneung", name: "강릉", fullName: "강릉 권역",
      date: "2026. 9. 12. (토)", place: "가톨릭관동대학교",
      lectureRounds: [
        { round: "1차", time: "11:30 ~ 12:50", how: "온라인 사전 신청" },
        { round: "2차", time: "13:10 ~ 14:30", how: "온라인 사전 신청" },
        { round: "3차", time: "15:10 ~ 16:30", how: "현장 접수" }
      ],
      lectureNote: ""
    },
    {
      id: "wonju", name: "원주", fullName: "원주 권역",
      date: "2026. 9. 19. (토)", place: "인터불고 호텔(원주)",
      lectureRounds: [
        { round: "1차", time: "11:30 ~ 12:50", how: "온라인 사전 신청" },
        { round: "2차", time: "13:10 ~ 14:30", how: "온라인 사전 신청" },
        { round: "3차", time: "15:10 ~ 16:30", how: "현장 접수" }
      ],
      lectureNote: ""
    }
  ],

  /* 프로그램 안내(한걸음·두걸음·세걸음) */
  programs: [
    {
      step: "한 걸음", title: "고교학점제 이해하고", color: "blue",
      desc: "통합 강연장에서 진행되는 특강으로 고교학점제와 고등학교 진학을 한번에 이해할 수 있습니다.",
      items: [
        "특강 주제 1 — 고교학점제 및 고등학교 학교생활기록(평가) 안내",
        "특강 주제 2 — 고등학교 입학 전형 및 직업계고 교육과정 안내"
      ],
      info: "회차별 150~300명 내외(지역별 상이) · 1~2차 온라인 사전 신청, 마지막 회차 현장 접수"
    },
    {
      step: "두 걸음", title: "진로·학업 상담받고", color: "violet",
      desc: "전문 상담 교사와 1:1로 만나 나에게 딱 맞는 진로·학업 설계와 학습 방법을 상담받을 수 있습니다.",
      items: [
        "1:1 진로·학업 설계 상담 — 10개 부스 · 온라인 사전 신청 100명(예비 20명)",
        "개별화 학습 코칭 — 5개 부스 · 온라인 사전 신청 50명(예비 10명)"
      ],
      info: "운영 시간 13:10 ~ 16:50 (20분 단위) · 온라인 사전 신청만 가능, 현장 접수 없음"
    },
    {
      step: "세 걸음", title: "고등학교 찾아가고", color: "orange",
      desc: "관심 있는 고등학교 부스를 자유롭게 방문하여 학교 선생님께 직접 학교와 교육과정 이야기를 들어보세요.",
      items: [
        "학교별 부스 — 학교 소개 및 학교별 교육과정 안내 (권역별 28~32교)",
        "특수교육 안내 부스 — 특수학교 교육과정 안내"
      ],
      info: "권역별 운영 시간 내 자율 방문 · 고등학교 선생님과 직접 소통"
    }
  ],

  /* 학교생활기록부 기재 안내 */
  record: {
    title: "박람회 참가 학생 학교생활기록부 기재 안내",
    lead: "박람회 참가 학생의 체험 인증 내용은 학교생활기록부 진로활동 특기사항란에 기재할 수 있습니다.",
    box: "강원특별자치도교육청 중등교육과장 확인 이수증 제출자에 한함",
    basis: "「2026 중학교 학교생활기록부 기재 요령」 10. 창의적 체험활동(76쪽) — 다. 3) 교육관련기관에서 주최하고 주관한 체험활동 중 학교장이 승인한 체험활동",
    conditions: ["학교장 승인", "교육관련기관에서 주최와 주관", "국내활동"],
    caution: "박람회 참여 희망 학생이 있는 학교에서는 사전에 참여 학생 명단 내부결재가 필요합니다. (재학 중인 중학교에 미리 문의하세요)"
  },

  /* 참가교 목록 — participation: O(부스 운영) / X(미참가) / book(부스 미운영·학교소개자료 참여)
     docs: 학교소개자료 파일(assets/schools/ 기준) 또는 외부 URL(url 필드) */
  schools: [
    { id: 1,  name: "강원고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강원고등학교_소개자료.hwpx" }] },
    { id: 2,  name: "강원대학교사범대학부설고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강원대학교사범대학부설고등학교_소개자료.hwpx" }] },
    { id: 3,  name: "봉의고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "봉의고등학교_소개자료.hwpx" }] },
    { id: 4,  name: "성수고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "성수고등학교_소개자료.hwpx" }] },
    { id: 5,  name: "성수여자고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "성수여자고등학교_소개자료.hwpx" }] },
    { id: 6,  name: "유봉여자고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "유봉여자고등학교_소개자료.hwpx" }] },
    { id: 7,  name: "춘천여자고등학교", type: "일반고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "춘천여자고등학교_소개자료.hwpx" }] },
    { id: 8,  name: "춘천고등학교", type: "자율형공립고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "춘천고등학교_소개자료.hwpx" }] },
    { id: 9,  name: "강원체육고등학교", type: "특목고", locale: "춘천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원체육고등학교_소개자료.hwpx" }] },
    { id: 10, name: "강원생명과학고등학교", type: "특성화고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강원생명과학고등학교_소개자료.hwpx" }] },
    { id: 11, name: "강원애니고등학교", type: "특성화고", locale: "춘천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원애니고등학교_소개자료.hwpx" }] },
    { id: 12, name: "춘천기계공업고등학교", type: "특성화고", locale: "춘천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "춘천기계공업고등학교_소개자료.hwpx" }] },
    { id: 13, name: "춘천한샘고등학교", type: "특성화고", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "춘천한샘고등학교_소개자료.hwpx" }] },
    { id: 14, name: "전인고등학교", type: "대안고", locale: "춘천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "전인고등학교_소개자료.pdf" }] },
    { id: 15, name: "강원명진학교", type: "특수학교", locale: "춘천", p: { sokcho:"X", chuncheon:"O", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강원명진학교_소개자료.hwpx" }] },
    { id: 16, name: "대성고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "대성고등학교_소개자료.hwpx" }] },
    { id: 17, name: "문막고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "문막고등학교_소개자료.hwpx" }] },
    { id: 18, name: "북원여자고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "북원여자고등학교_소개자료.hwpx" }] },
    { id: 19, name: "상지여자고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "상지여자고등학교_소개자료.hwpx" }] },
    { id: 20, name: "섬강고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "섬강고등학교_소개자료.hwpx" }] },
    { id: 21, name: "원주삼육고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"book" }, docs: [{ label: "학교소개자료", file: "원주삼육고등학교_소개자료.hwpx" }] },
    { id: 22, name: "원주여자고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "원주여자고등학교_소개자료.hwpx" }] },
    { id: 23, name: "육민관고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "육민관고등학교_소개자료.hwpx" }] },
    { id: 24, name: "진광고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "진광고등학교_소개자료.hwpx" }] },
    { id: 25, name: "치악고등학교", type: "일반고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "치악고등학교_소개자료.hwpx" }] },
    { id: 26, name: "원주고등학교", type: "자율형공립고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "원주고등학교_소개자료.hwpx" }] },
    { id: 27, name: "강원과학고등학교", type: "특목고", locale: "원주", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원과학고등학교_소개자료.hwpx" }] },
    { id: 28, name: "미래고등학교", type: "특성화고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "미래고등학교_소개자료.hwpx" }] },
    { id: 29, name: "영서고등학교", type: "특성화고", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "영서고등학교_소개자료.hwpx" }] },
    { id: 30, name: "원주금융회계고등학교", type: "특성화고", locale: "원주", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "원주금융회계고등학교_소개자료.hwpx" }] },
    { id: 31, name: "강원온라인학교", type: "각종학교", locale: "원주", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원온라인학교_소개자료.hwpx" }] },
    { id: 32, name: "봉대가온학교", type: "특수학교", locale: "원주", p: { sokcho:"X", chuncheon:"X", gangneung:"X", wonju:"book" }, docs: [{ label: "학교소개자료", file: "봉대가온학교_소개자료.hwpx" }] },
    { id: 33, name: "한국의료마이스터고등학교", type: "마이스터고", locale: "원주", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "한국의료마이스터고등학교_소개자료.hwpx" }] },
    { id: 34, name: "강릉고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉고등학교_소개자료.hwpx" }] },
    { id: 35, name: "강릉명륜고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉명륜고등학교_소개자료.hwpx" }] },
    { id: 36, name: "강릉문성고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉문성고등학교_소개자료.pdf" }] },
    { id: 37, name: "강릉여자고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉여자고등학교_소개자료.hwpx" }] },
    { id: 38, name: "강릉제일고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉제일고등학교_소개자료.hwpx" }] },
    { id: 39, name: "강일여자고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강일여자고등학교_소개자료.hwpx" }] },
    { id: 40, name: "경포고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "경포고등학교_소개자료.hwpx" }] },
    { id: 41, name: "주문진고등학교", type: "일반고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "주문진고등학교_소개자료.hwpx" }] },
    { id: 42, name: "강원예술고등학교", type: "특목고", locale: "강릉", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원예술고등학교_소개자료.hwpx" }] },
    { id: 43, name: "강릉정보공업고등학교", type: "특성화고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉정보공업고등학교_소개자료.hwpx" }] },
    { id: 44, name: "강릉중앙고등학교", type: "특성화고", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉중앙고등학교_소개자료.hwpx" }] },
    { id: 45, name: "강릉오성학교", type: "특수학교", locale: "강릉", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강릉오성학교_소개자료.hwpx" }] },
    { id: 46, name: "속초고등학교", type: "일반고", locale: "속초", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "속초고등학교_소개자료.pdf" }] },
    { id: 47, name: "속초여자고등학교", type: "일반고", locale: "속초", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "속초여자고등학교_소개자료.hwpx" }] },
    { id: 48, name: "설악고등학교", type: "종합고", locale: "속초", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료(인문계열)", file: "설악고등학교(인문계열)_소개자료.hwpx" }, { label: "학교소개자료(직업계열)", file: "설악고등학교(직업계열)_소개자료.hwpx" }] },
    { id: 49, name: "양양고등학교", type: "종합고", locale: "양양", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "양양고등학교_소개자료.hwpx" }] },
    { id: 50, name: "속초청해학교", type: "특수학교", locale: "속초", p: { sokcho:"book", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "속초청해학교_소개자료.hwpx" }] },
    { id: 51, name: "한국항공고등학교", type: "특성화고", locale: "태백", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "한국항공고등학교_소개자료.hwpx" }] },
    { id: 52, name: "황지정보산업고등학교", type: "특성화고", locale: "태백", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "황지정보산업고등학교_소개자료.hwpx" }] },
    { id: 53, name: "태백라온학교", type: "특수학교", locale: "태백", p: { sokcho:"X", chuncheon:"X", gangneung:"book", wonju:"X" }, docs: [{ label: "학교소개자료", file: "태백라온학교_소개자료.hwpx" }] },
    { id: 54, name: "한국에너지마이스터고등학교", type: "마이스터고", locale: "삼척", p: { sokcho:"O", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "한국에너지마이스터고등학교_소개자료.hwpx" }] },
    { id: 55, name: "강원생활과학고등학교", type: "특성화고", locale: "홍천", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "강원생활과학고등학교_소개자료.hwpx" }] },
    { id: 56, name: "홍천농업고등학교", type: "특성화고", locale: "홍천", p: { sokcho:"O", chuncheon:"O", gangneung:"X", wonju:"O" }, docs: [{ label: "학교소개자료", file: "홍천농업고등학교_소개자료.hwpx" }] },
    { id: 57, name: "팔렬고등학교", type: "대안고", locale: "홍천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "팔렬고등학교_소개자료.hwpx" }] },
    { id: 58, name: "현천고등학교", type: "대안고", locale: "횡성", p: { sokcho:"X", chuncheon:"O", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "현천고등학교_소개자료.hwpx" }] },
    { id: 59, name: "민족사관고등학교", type: "자율형사립고", locale: "횡성", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "민족사관고등학교_소개자료.hwpx" }] },
    { id: 60, name: "한국소방마이스터고등학교", type: "마이스터고", locale: "영월", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "한국소방마이스터고등학교_소개자료.hwpx" }] },
    { id: 61, name: "정선정보공업고등학교", type: "특성화고", locale: "정선", p: { sokcho:"X", chuncheon:"X", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "정선정보공업고등학교_소개자료.hwpx" }] },
    { id: 62, name: "한국국방과학고등학교", type: "특성화고", locale: "철원", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "한국국방과학고등학교_소개자료.hwpx" }] },
    { id: 63, name: "화천정보산업고등학교", type: "특성화고", locale: "화천", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "화천정보산업고등학교_소개자료.hwpx" }] },
    { id: 64, name: "강원외국어고등학교", type: "농어촌자율학교", locale: "양구", p: { sokcho:"O", chuncheon:"O", gangneung:"O", wonju:"O" }, docs: [{ label: "학교소개자료", file: "강원외국어고등학교_소개자료.hwpx" }] },
    { id: 65, name: "고성고등학교", type: "일반고", locale: "고성", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "고성고등학교_소개자료.hwpx" }] },
    { id: 66, name: "대진고등학교", type: "일반고", locale: "고성", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "대진고등학교_소개자료.hwpx" }] },
    { id: 67, name: "거진고등학교", type: "특성화고", locale: "고성", p: { sokcho:"O", chuncheon:"X", gangneung:"X", wonju:"X" }, docs: [{ label: "학교소개자료", file: "거진고등학교_소개자료.hwpx" }] },
    { id: 68, name: "동광산업과학고등학교", type: "특성화고", locale: "고성", p: { sokcho:"O", chuncheon:"X", gangneung:"O", wonju:"X" }, docs: [{ label: "학교소개자료", file: "동광산업과학고등학교_소개자료.hwpx" }] }
  ],

  /* 관리자 비밀번호(간이 잠금 — 정적 사이트 특성상 완전한 보안 수단은 아닙니다) */
  adminPassword: "gwedu2026"
};
