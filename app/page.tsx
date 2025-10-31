// NOTE: This is a client component because it uses useState/useMemo
"use client";

import React, { useMemo, useState } from "react";

export default function Page() {
  return <ValetLanding />;
}

// --- Landing page component (same structure as shared, adapted for Next.js app router)
function ValetLanding() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("18:00");
  const [hours, setHours] = useState(4);
  const [staff, setStaff] = useState(4);
  const [isWeekend, setIsWeekend] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [vehicles, setVehicles] = useState(120);

  const price = useMemo(() => {
    const BASE_4H = 200_000;
    const ADD_HOUR = 60_000;
    const STAFF_4H = 70_000;
    const STAFF_ADD_HOUR = 15_000;
    const NIGHT_SUR = 0.2;
    const WEEKEND_SUR = 0.15;

    const extraHours = Math.max(0, hours - 4);
    let subtotal = BASE_4H + ADD_HOUR * extraHours + STAFF_4H * staff + STAFF_ADD_HOUR * staff * extraHours;
    if (isNight) subtotal *= 1 + NIGHT_SUR;
    if (isWeekend) subtotal *= 1 + WEEKEND_SUR;

    const vph = vehicles / Math.max(1, hours);
    const surgeUnits = Math.max(0, Math.ceil((vph - 40) / 20));
    const SURGE_UNIT = 90_000;
    subtotal += surgeUnits * SURGE_UNIT;

    return Math.round(subtotal / 1000) * 1000;
  }, [hours, staff, isNight, isWeekend, vehicles]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <Hero />
      <TrustBar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <KPIs />
        <Section title="서비스 소개" subtitle="행사·웨딩·기업·병원까지, 필요한 시간에 필요한 만큼 깔끔하게 운영합니다.">
          <ServiceCards />
        </Section>

        <Section title="빠른 견적" subtitle="3가지 정보만 입력하면 즉시 예상가를 확인할 수 있어요. (부가세·교통·주차료 별도)">
          <Estimator
            date={date}
            setDate={setDate}
            startTime={startTime}
            setStartTime={setStartTime}
            hours={hours}
            setHours={setHours}
            staff={staff}
            setStaff={setStaff}
            isWeekend={isWeekend}
            setIsWeekend={setIsWeekend}
            isNight={isNight}
            setIsNight={setIsNight}
            vehicles={vehicles}
            setVehicles={setVehicles}
            price={price}
          />
        </Section>

        <Section title="운영 프로세스" subtitle="현장 진단부터 리포트까지 End‑to‑End로 책임 집니다.">
          <Process />
        </Section>

        <Section title="신뢰 & 안전" subtitle="보험·키관리·운행기록·교육 체계로 리스크를 선제적으로 관리합니다.">
          <Safety />
        </Section>

        <Section title="자주 묻는 질문" subtitle="핵심만 모아 깔끔하게 답변했어요.">
          <FAQ />
        </Section>

        <Section title="문의하기" subtitle="아래 양식을 제출하면 15분 내(영업시간) 상담 전화를 드립니다.">
          <ContactForm />
        </Section>
      </div>
      <CTA />
      <Footer />
      <SchemaScript />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-neutral-900" />
          <span className="font-semibold">VALENCE Valet</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#services" className="text-sm text-neutral-700 hover:text-black">서비스</a>
          <a href="#process" className="text-sm text-neutral-700 hover:text-black">프로세스</a>
          <a href="#safety" className="text-sm text-neutral-700 hover:text-black">안전</a>
          <a href="#contact" className="text-sm text-neutral-700 hover:text-black">문의</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:010-0000-0000" className="hidden rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black md:inline-block">바로 전화</a>
          <a href="#contact" className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100">견적 요청</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 md:py-24 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
            행사·웨딩·기업의 첫인상, <span className="underline decoration-neutral-900 decoration-8 underline-offset-4">발렛</span>이 완성합니다
          </h1>
          <p className="mt-5 text-lg text-neutral-700 sm:text-xl">
            검증된 팀, 표준화된 운영 매뉴얼, 실시간 커뮤니케이션으로
            현장을 유연하게 컨트롤합니다. 필요한 시간에 필요한 만큼, 깔끔하게.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="rounded-2xl bg-neutral-900 px-6 py-3 text-center text-base font-semibold text-white hover:bg-black">바로 견적 요청</a>
            <a href="#faq" className="rounded-2xl border border-neutral-300 px-6 py-3 text-center text-base font-semibold hover:bg-neutral-100">운영 방식 보기</a>
          </div>
          <ul className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-sm text-neutral-600 sm:grid-cols-3">
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">전담 팀장 상주</li>
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">영업배상·차량보관 보험</li>
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">키·차량 이력 관리</li>
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">현장 무전·CCTV·비상대응</li>
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">리허설 & 동선설계</li>
            <li className="rounded-xl border border-neutral-200 bg-white px-3 py-2">운영 리포트 제공</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <div className="border-y border-neutral-200 bg-white/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-4 sm:justify-between sm:px-6 lg:px-8">
        {["웨딩홀","대기업 행사","프라이빗 파티","병원/의료","전시장/행사장","레스토랑/호텔"].map((txt, i) => (
          <div key={i} className="text-xs text-neutral-600">{txt} 레퍼런스 다수</div>
        ))}
      </div>
    </div>
  );
}

function KPIs() {
  const items = [
    { k: "행사 운영", v: "1,200+ 건" },
    { k: "시간 준수율", v: "99.2%" },
    { k: "CS 재계약", v: "87%" },
    { k: "평균 대기", v: "< 4분" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 py-10 sm:grid-cols-4">
      {items.map((it) => (
        <div key={it.k} className="rounded-2xl border border-neutral-200 bg-white p-4 text-center shadow-sm">
          <div className="text-2xl font-extrabold">{it.v}</div>
          <div className="mt-1 text-xs text-neutral-600">{it.k}</div>
        </div>
      ))}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  const id = title === "서비스 소개" ? "services" : title === "운영 프로세스" ? "process" : title === "신뢰 & 안전" ? "safety" : title === "자주 묻는 질문" ? "faq" : title === "문의하기" ? "contact" : undefined;
  return (
    <section className="py-12" id={id}>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 max-w-3xl text-neutral-700">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function ServiceCards() {
  const services = [
    {
      title: "발렛파킹 운영",
      desc: "레스토랑·호텔·병원·웨딩홀·전시장 등 상시/단기 운영. 키 관리, 차량 인수인계, 출차 동선 표준화.",
      bullets: ["상시/단기 계약", "팀장+스태프 구성", "정산·현금영수증"]
    },
    {
      title: "이벤트 주차 대행",
      desc: "컨벤션·VIP 파티·프로모션·대규모 오픈행사의 피크 타임 분산과 동선설계, 셔틀 연계까지.",
      bullets: ["사전 리허설", "혼잡 시나리오 대비", "셔틀·택시 연계"]
    },
    {
      title: "주차 통제 인력 파견",
      desc: "차량 유도, 교차로 통제, 보행자 안전 요원 등 현장 통합 오퍼레이션 지원.",
      bullets: ["교통유도 자격 우대", "무전/조끼/표지판 일체", "현장 안전 브리핑"]
    },
    {
      title: "주차 컨설팅",
      desc: "수용력 분석, 동선 최적화, 장비(콘·사인·바리케이드) 배치, 데이터 기반 운영 리포트 제공.",
      bullets: ["수용력 시뮬레이션", "VPH 추정", "After‑Action Report"]
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <div key={s.title} className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">{s.title}</div>
          <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
          <ul className="mt-4 space-y-1 text-sm text-neutral-700">
            {s.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-neutral-900" />{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Estimator(props: any) {
  const {
    date, setDate, startTime, setStartTime, hours, setHours, staff, setStaff,
    isWeekend, setIsWeekend, isNight, setIsNight, vehicles, setVehicles, price
  } = props;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-3">
        <Labeled label="행사 날짜">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
        </Labeled>
        <Labeled label="시작 시간">
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input" />
        </Labeled>
        <Labeled label="운영 시간(시간)">
          <input type="number" min={2} max={12} value={hours} onChange={(e) => setHours(parseInt(e.target.value || "0"))} className="input" />
        </Labeled>
        <Labeled label="필요 인원(명)">
          <input type="number" min={2} max={50} value={staff} onChange={(e) => setStaff(parseInt(e.target.value || "0"))} className="input" />
        </Labeled>
        <Labeled label="예상 차량 대수(대)">
          <input type="number" min={30} max={1000} value={vehicles} onChange={(e) => setVehicles(parseInt(e.target.value || "0"))} className="input" />
        </Labeled>
        <div className="grid grid-cols-2 gap-3">
          <Check label="주말/공휴일" checked={isWeekend} onChange={setIsWeekend} />
          <Check label="야간(22시 이후)" checked={isNight} onChange={setIsNight} />
        </div>
      </div>
      <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="text-sm text-neutral-600">예상 견적 (부가세·교통·주차료 별도)</div>
          <div className="text-3xl font-extrabold tracking-tight">{price.toLocaleString()}원</div>
          <div className="mt-1 text-xs text-neutral-500">※ 정확한 견적은 현장 진단 후 확정됩니다.</div>
        </div>
        <a href="#contact" className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">상담 요청하기</a>
      </div>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-neutral-800">{label}</span>
      {children}
    </label>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-black" />
      <span>{label}</span>
    </label>
  );
}

function Process() {
  const steps = [
    { t: "상담 & 요구 파악", d: "행사 성격, 예상 차량, 피크타임, 장소 제약, 보험·결제 조건 확인" },
    { t: "현장 진단", d: "입·출차 동선, 램프/게이트, 회차 공간, 수용력(VPH)·스태핑 산정" },
    { t: "운영 설계", d: "배치도·사인·무전 채널·키 보관·비상동선·우천 대책 설계" },
    { t: "팀 편성 & 교육", d: "팀장 지정, 역할 브리핑, 안전·CS·차량 취급 교육" },
    { t: "운영 & 모니터링", d: "도착/대기 현황 공유, 현장 이슈 즉시 대응, VIP 핸들링" },
    { t: "정산 & 리포트", d: "정산, 유실물·클레임 처리, After‑Action Report 제공" },
  ];
  return (
    <ol className="grid gap-4 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.t} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-neutral-600"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white">{i + 1}</span>프로세스</div>
          <div className="mt-2 text-base font-semibold">{s.t}</div>
          <p className="mt-1 text-sm text-neutral-700">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

function Safety() {
  const list = [
    { t: "보험 체계", d: "영업배상책임·차량보관(주차장배상) 등 필수 담보 가입" },
    { t: "키 & 차량 이력", d: "키 태깅/보관함, 인수·인계 타임스탬프, 발렛티켓 고유번호" },
    { t: "운행기록", d: "주행거리·이동 경로 기록, 블랙박스 상시 ON 권장" },
    { t: "현장 안전", d: "콘·바리케이드·야광조끼·LED봉, 우천/한파 대책" },
    { t: "교육 & 윤리", d: "차량 취급·CS·개인정보·유실물·사고 보고 절차 표준화" },
    { t: "클레임 처리", d: "T+0 보고, T+1 1차 보상안, 증빙·보험 프로세스 투명화" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => (
        <div key={s.t} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="text-base font-semibold">{s.t}</div>
          <p className="mt-1 text-sm text-neutral-700">{s.d}</p>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const faqs = [
    { q: "비용은 어떻게 책정되나요?", a: "기본 4시간 운영 단가 + 인력/시간 + 피크타임(처리량) 보정 + 야간/주말 가산으로 산출합니다. 현장 진단 후 확정 견적서를 제공합니다." },
    { q: "보험은 가입되어 있나요?", a: "영업배상책임보험과 차량보관 책임 담보를 유지하며, 필요 시 행사별 특약을 추가합니다." },
    { q: "차량 손상/분실 시 어떻게 처리하나요?", a: "즉시 보고 → 현장 사진·CCTV·블랙박스 확인 → 임시 조치 → 보험 접수/자체 보상 가이드에 따라 처리합니다." },
    { q: "인수증/티켓 시스템은?", a: "고유번호 티켓·키 태그를 사용하며, 입출고 타임스탬프와 담당자 로그를 남깁니다." },
    { q: "최소 인원과 리드타임은?", a: "최소 4인(팀장 포함)·리드타임 3영업일을 권장합니다. 대형 행사는 가급적 2주 전 상담을 부탁드립니다." },
    { q: "결제 방식은?", a: "선계약금 + 행사 후 정산(세금계산서/현금영수증). 현장 유료 발렛의 경우 바우처·현금·QR결제를 지원합니다." },
  ];
  return (
    <div className="grid gap-3">
      {faqs.map((f, i) => (
        <details key={i} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm open:shadow-md">
          <summary className="cursor-pointer list-none text-base font-semibold">{f.q}</summary>
          <p className="mt-2 text-sm text-neutral-700">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

function ContactForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <Labeled label="담당자명"><input className="input" placeholder="홍길동" /></Labeled>
        <Labeled label="연락처"><input className="input" placeholder="010-1234-5678" /></Labeled>
        <Labeled label="이메일"><input className="input" type="email" placeholder="name@company.com" /></Labeled>
        <Labeled label="행사명/업체명"><input className="input" placeholder="ABC 브랜드 VIP Night" /></Labeled>
        <Labeled label="예상 일시"><input className="input" placeholder="2025-11-20 18:00~22:00" /></Labeled>
        <Labeled label="장소"><input className="input" placeholder="서울 ○○호텔 / ○○컨벤션" /></Labeled>
        <Labeled label="예상 차량·인원"><input className="input" placeholder="차량 180대 / 예상 600명" /></Labeled>
        <Labeled label="기타 요청"><input className="input" placeholder="셔틀 연계, VIP 별도 동선 등" /></Labeled>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-neutral-500">제출 시 개인정보 수집·이용에 동의한 것으로 간주됩니다. 상담 목적 외 사용하지 않습니다.</p>
        <button className="rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-black">상담 요청 보내기</button>
      </div>
    </form>
  );
}

function CTA() {
  return (
    <section className="relative mt-16 bg-neutral-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-bold text-white">지금 행사 일정 공유해 주세요</h3>
            <p className="mt-1 text-neutral-300">15분 내(영업시간) 담당자가 연락드립니다.</p>
          </div>
          <div className="flex gap-3">
            <a href="#contact" className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-100">견적 요청</a>
            <a href="https://talk.naver.com/" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">네이버 톡 상담</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-neutral-900" />
              <span className="font-semibold">VALENCE Valet</span>
            </div>
            <p className="mt-2 text-sm text-neutral-700">프리미엄 발렛·이벤트 주차 운영 & 인력 파견</p>
          </div>
          <div>
            <div className="text-sm font-semibold">고객지원</div>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              <li>상담 010-0000-0000</li>
              <li>영업시간 09:00–18:00 (주말 행사 운영)</li>
              <li>이메일 hello@valencevalet.co.kr</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">사업자정보</div>
            <ul className="mt-2 space-y-1 text-sm text-neutral-700">
              <li>상호 ㈜발란스발렛 (예시)</li>
              <li>사업자등록번호 000-00-00000</li>
              <li>통신판매업 제0000-서울강남-0000</li>
              <li>주소 서울시 ○○구 ○○로 00</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-xs text-neutral-500">© {new Date().getFullYear()} VALENCE Valet. All rights reserved.</div>
      </div>
    </footer>
  );
}

function SchemaScript() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "VALENCE Valet",
    url: "https://valencevalet.co.kr",
    telephone: "+82-10-0000-0000",
    areaServed: ["Seoul", "Gyeonggi", "Incheon"],
    priceRange: "₩₩₩",
    sameAs: ["https://talk.naver.com/"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressLocality: "Seoul",
    },
    openingHours: "Mo-Fr 09:00-18:00",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Valet Parking Operations" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Event Parking Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Parking Marshals / Staffing" } },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Valet & Event Parking Services",
      itemListElement: [
        { "@type": "Offer", name: "Valet (4h base)", priceCurrency: "KRW" },
        { "@type": "Offer", name: "Extra Hour", priceCurrency: "KRW" },
      ],
    },
    potentialAction: {
      "@type": "CommunicateAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://valencevalet.co.kr/#contact",
        actionApplication: "WebSite",
      },
      result: { "@type": "ContactPoint", telephone: "+82-10-0000-0000" },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
