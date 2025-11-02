 "use client";
 import { useEffect, useState, useRef } from "react";

 
 /* ---------- Motion hooks ---------- */
 function useRevealOnScroll(){
   useEffect(()=>{
     const els=[...document.querySelectorAll("[data-reveal]")];
     if(!els.length) return;
     const obs=new IntersectionObserver((entries)=>{
       entries.forEach(e=>{
         if(e.isIntersecting){
           e.target.classList.add("is-visible");
           obs.unobserve(e.target);
         }
       });
     },{threshold:0.12, rootMargin:"0px 0px -8% 0px"});
     els.forEach(el=>obs.observe(el));
     return ()=>obs.disconnect();
   },[]);
 }
 
 function useHeaderScroll(){
   const [scrolled,setScrolled]=useState(false);
   useEffect(()=>{
     const onScroll=()=>setScrolled(window.scrollY>8);
     onScroll();
     window.addEventListener("scroll",onScroll,{passive:true});
     return ()=>window.removeEventListener("scroll",onScroll);
   },[]);
   return scrolled;
 }
 
 function useActiveSection(ids){
   const [active,setActive]=useState(ids[0]||"");
   useEffect(()=>{
     const sections=ids.map(id=>document.querySelector(id)).filter(Boolean);
     if(!sections.length) return;
     const obs=new IntersectionObserver((entries)=>{
       entries.forEach(e=>{
         if(e.isIntersecting) setActive("#"+e.target.id);
       });
     },{rootMargin:"-40% 0px -50% 0px"});
     sections.forEach(s=>obs.observe(s));
     return ()=>obs.disconnect();
   },[ids]);
   return active;
 }
 
 /* ---------- Count-up hooks ---------- */
 function useCountUp(target=0, duration=1200, start=0){
   const [value,setValue]=useState(start);
   const ref = useRef(null);
   useEffect(()=>{
     const el = ref.current;
     if(!el) return;
     let raf, startTime;
     const step = (t)=>{
       if(startTime===undefined) startTime=t;
       const p = Math.min(1,(t-startTime)/duration);
       const eased = 1 - Math.pow(1-p,3); // easeOutCubic
       setValue(Math.round(start + (target-start)*eased));
       if(p<1) raf=requestAnimationFrame(step);
     };
     const obs=new IntersectionObserver((entries)=>{
       entries.forEach(e=>{
         if(e.isIntersecting){
           raf=requestAnimationFrame(step);
           obs.unobserve(el);
         }
       });
     },{threshold:0.6});
     obs.observe(el);
     return ()=>{ if(raf) cancelAnimationFrame(raf); obs.disconnect(); };
   },[target,duration,start]);
   return [value, ref];
 }
 
 function useCountUpFloat(target=0, duration=1200, decimals=1, start=0){
   const [value,setValue]=useState(start);
   const ref = useRef(null);
   useEffect(()=>{
     const el = ref.current;
     if(!el) return;
     let raf, startTime;
     const step = (t)=>{
       if(startTime===undefined) startTime=t;
       const p = Math.min(1,(t-startTime)/duration);
       const eased = 1 - Math.pow(1-p,3);
       const v = start + (target-start)*eased;
       setValue(Number(v.toFixed(decimals)));
       if(p<1) raf=requestAnimationFrame(step);
     };
     const obs=new IntersectionObserver((entries)=>{
       entries.forEach(e=>{
         if(e.isIntersecting){
           raf=requestAnimationFrame(step);
           obs.unobserve(el);
         }
       });
     },{threshold:0.6});
     obs.observe(el);
     return ()=>{ if(raf) cancelAnimationFrame(raf); obs.disconnect(); };
   },[target,duration,decimals,start]);
   return [value, ref];
 }
 
 /* ---------- Utils ---------- */
 function handleNav(e, id) {
   e?.preventDefault();
   const el = document.querySelector(id);
   if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
 }
 
 // Locale number formatter (consistent thousands separators)
 const nf = new Intl.NumberFormat("ko-KR");
 const fmt = (n)=> nf.format(Math.round(n));
 
 /* ---------- Icons ---------- */
 function IconCar({className=""}) {
   return (
     <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 relative top-[0.5px] flex-shrink-0 ${className}`} fill="currentColor">
       <path d="M5 11l1.2-3.6A3 3 0 0 1 9.07 5h5.86a3 3 0 0 1 2.87 2.4L19 11v5a1 1 0 0 1-1 1h-1a2 2 0 1 1 0-4h1v-1H6v1h1a2 2 0 1 1 0 4H6a1 1 0 0 1-1-1v-5Zm2.38-3.2A1 1 0 0 1 8.33 7h7.34a1 1 0 0 1 .95.8L17 9H7l.38-1.2Z"/>
     </svg>
   );
 }
 function IconShield({className=""}) {
   return (
     <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 relative top-[0.5px] flex-shrink-0 ${className}`} fill="currentColor">
       <path d="M12 3l7 3v5c0 4.97-3.06 8.94-7 10-3.94-1.06-7-5.03-7-10V6l7-3Zm0 3.2L7 7.9V11c0 3.67 2.2 6.91 5 7.86 2.8-.95 5-4.19 5-7.86V7.9l-5-1.7Z"/>
       <path d="M9.7 12.7l-1.4 1.4 3.2 3.2 5.3-5.3-1.4-1.4-3.9 3.9-1.8-1.8z"/>
     </svg>
   );
 }
 function IconBadge({className=""}) {
   return (
     <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 relative top-[0.5px] flex-shrink-0 ${className}`} fill="currentColor">
       <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/>
     </svg>
   );
 }
 function IconClock({className=""}) {
   return (
     <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 relative top-[0.5px] flex-shrink-0 ${className}`} fill="currentColor">
       <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm1 5h-2v6l5 3 1-1.732-4-2.268V7Z"/>
     </svg>
   );
 }
 function IconMail({className=""}) {
   return (
     <svg viewBox="0 0 24 24" aria-hidden="true" className={`h-5 w-5 relative top-[0.5px] flex-shrink-0 ${className}`} fill="currentColor">
       <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V8H4Zm16 8V9.8l-7.4 4.6a2 2 0 0 1-2.2 0L4 9.8V16h16Z"/>
     </svg>
   );
 }
 
 /* ---------- Small components ---------- */
 function ClientLogo({ src, alt, className="" }) {
   return (
     <div className={`aspect-[3/1] rounded-xl border border-zinc-200 bg-white grid place-items-center overflow-hidden ${className}`}>
       <img src={src} alt={alt} className="max-h-8 md:max-h-9 opacity-90 filter grayscale hover:grayscale-0 transition-all duration-300" height="36" loading="lazy" />
     </div>
   );
 }
 
 function ServiceCard({ title, desc, iconSrc, iconAlt }) {
   return (
     <div className="rounded-2xl border border-zinc-200 p-6 bg-white transition-all hover:shadow-md hover:-translate-y-[2px] hover:border-blue-200">
       <div className="flex items-center gap-3">
         {iconSrc ? <img src={iconSrc} alt={iconAlt || ""} className="h-5 w-5" height="20" /> : <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />}
         <h3 className="text-[16px] font-medium tracking-tight">{title}</h3>
       </div>
       <p className="mt-2 text-zinc-600 leading-[1.65] text-[14px]">{desc}</p>
     </div>
   );
 }
 
 /* ---------- Page ---------- */
 export default function ParklyHome() {
   useRevealOnScroll();
   const scrolled = useHeaderScroll();
   const active = useActiveSection(["#hero","#services","#clients","#contact"]);
 
   // Count-ups
   const [valMonthly, refMonthly] = useCountUp(6000, 1200, 0);
   const [valSafety,  refSafety ] = useCountUpFloat(99.8, 1200, 1, 0);
   const [valEvents,  refEvents ] = useCountUp(60, 900, 0);
 
   // Reserve width to prevent layout shift while numbers animate
   const monthlyFinal = 6000;
   const safetyFinal  = 99.8; // % sign separated from the number
   const eventsFinal  = 60;   // + sign separated from the number
   const monthlyCh = fmt(monthlyFinal).length;
   const safetyCh  = safetyFinal.toFixed(1).length;
   const eventsCh  = String(eventsFinal).length;
 
   const clientLogos = [
     {src:"/logos/nhaven.svg", alt:"NHAVEN"},
     {src:"/logos/porsche.svg", alt:"Porsche"},
     {src:"/logos/genesis.svg", alt:"Genesis"},
     {src:"/logos/glenfiddich.svg", alt:"Glenfiddich"},
     {src:"/logos/hannam-dining.svg", alt:"Hannam Dining"},
     {src:"/logos/medical-center.svg", alt:"Medical Center"},
   ];
 
   return (
     <main className="min-h-screen bg-white text-zinc-900">
       {/* Header */}
       <header className={`sticky top-0 z-40 backdrop-blur transition-all ${scrolled ? "bg-white/90 border-b border-zinc-200 shadow-sm" : "bg-white/60 border-b border-transparent"}`}>
         <div className="container max-w-6xl mx-auto h-14 flex items-center justify-between px-4">
           <a href="#hero" onClick={(e)=>handleNav(e,"#hero")} className="flex items-center gap-2 hover:opacity-90">
             <img src="/logo-parkly.svg" alt="Parkly" className="h-11 sm:h-12 w-auto" height="48" />
           </a>
           <nav className="hidden sm:flex items-center gap-6 text-[14px]">
             <a href="#services" onClick={(e)=>handleNav(e,"#services")} className={`link-underline ${active==="#services" ? "text-brand" : "hover:text-brand"}`}>서비스</a>
             <a href="#clients"  onClick={(e)=>handleNav(e,"#clients")}  className={`link-underline ${active==="#clients"  ? "text-brand" : "hover:text-brand"}`}>클라이언트</a>
             <a href="#contact"  onClick={(e)=>handleNav(e,"#contact")}  className={`link-underline ${active==="#contact"  ? "text-brand" : "hover:text-brand"}`}>문의</a>
           </nav>
           <a href="#contact" onClick={(e)=>handleNav(e,"#contact")} className={`inline-flex items-center rounded-full px-4 py-1.5 text-[13px] font-medium shadow active:translate-y-px transition ${scrolled ? "bg-brand text-white hover:shadow-[0_0_0_6px_rgba(58,118,240,.15)] hover:bg-brand/90" : "border border-zinc-300 bg-white text-zinc-900 hover:border-blue-300"}`}>
             바로 상담
           </a>
         </div>
       </header>
 
       {/* Hero */}
       <section id="hero" data-reveal className="relative scroll-mt-20 sm:scroll-mt-24 overflow-hidden hero-lane">
         <div aria-hidden className="mx-auto mt-8 sm:mt-10 mb-14 w-[48%] sm:w-[40%] max-w-[640px] select-none pointer-events-none hero-car-img" />
         <div className="container max-w-6xl mx-auto px-4 pt-2 pb-0 sm:pt-3 sm:pb-0">
           
           <div className="space-y-0 text-center">
             <h1 className="text-[44px] sm:text-[68px] tracking-[-0.02em] leading-[1.04] font-semibold tracking-[-0.02em]">
               프리미엄 <span className="relative inline-block">
                 <span className="relative z-10 text-brand">발렛·주차 운영</span>
                 <span aria-hidden className="absolute inset-x-0 -bottom-1 h-3 bg-brand/15 rounded-sm"></span>
               </span>, Parkly
             </h1>
             <p className="mx-auto max-w-2xl text-[17px] sm:text-[19px] text-zinc-600 leading-[1.65]">
               발렛파킹·주차 관리·이벤트 운영까지, <span className="font-medium text-zinc-800">한 번에 완성하는 전문 파트너</span>.
             </p>
            {/* Car silhouette — minimal, crisp, responsive */}
           <div className="mt-6 sm:mt-8 mb-16" aria-hidden="true">
              <img
                src="/images/upscaled_car_silhouette.png"
                alt=""
                className="mx-auto mt-8 sm:mt-10 mb-14 w-[48%] sm:w-[40%] max-w-[640px] select-none pointer-events-none hero-car-img"
                height="120"
                loading="lazy"
              />
            </div>
           </div>
         </div>
       </section>
 
       {/* Metrics */}
       <section aria-label="운영 지표" className="pt-12 pb-14">
         <div className="container max-w-6xl mx-auto px-4">
           <p className="text-center text-[13px] text-zinc-500">최근 12개월 기준</p>
           <div className="mt-4 flex flex-wrap items-center justify-center text-[16px] leading-[1.65] text-zinc-600">
             <span className="inline-flex items-center gap-2">
               <IconCar className="text-zinc-400" />
               월간
               <span
                 ref={refMonthly}
                 className="inline-block tabular-nums font-semibold text-zinc-900 text-right"
                 style={{minWidth: `${monthlyCh}ch`}}
               >
                 {fmt(valMonthly)}
               </span>
               <span className="ml-0.5">+</span><span className="ml-0.5">건</span> 발렛 운영
             </span>
             <span aria-hidden className="mx-4 text-zinc-300">•</span>
             <span className="inline-flex items-center gap-2">
               <IconShield className="text-zinc-400" />
               무사고율
               <span
                 ref={refSafety}
                 className="inline-block tabular-nums font-semibold text-zinc-900 text-right"
                 style={{minWidth: `${safetyCh}ch`}}
               >
                 {valSafety.toFixed(1)}
               </span>
               <span className="ml-0.5">%</span>
             </span>
             <span aria-hidden className="mx-4 text-zinc-300">•</span>
             <span className="inline-flex items-center gap-2">
               <IconBadge className="text-zinc-400" />
               브랜드·이벤트
               <span
                 ref={refEvents}
                 className="inline-block tabular-nums font-semibold text-zinc-900 text-right"
                 style={{minWidth: `${eventsCh}ch`}}
               >
                 {valEvents}
               </span>
               <span className="ml-0.5">+</span>
             </span>
             <span aria-hidden className="mx-4 text-zinc-300">•</span>
             <span className="inline-flex items-center gap-2">
               <IconMail className="text-zinc-400" />
               응답 <span className="font-semibold text-zinc-900">24h 이내</span>
             </span>
           </div>
         </div>
       </section>
 
       {/* Services */}
       <section id="services" data-reveal className="py-24 border-t border-zinc-200 bg-zinc-50/50">
         <div className="container max-w-6xl mx-auto px-4">
           <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">우리가 잘하는 일</h2>
           <p className="mt-2 text-zinc-600 text-[14px]">현장의 복잡도를 낮추고, 브랜드의 품격을 지키는 운영을 제공합니다.</p>
           <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <ServiceCard title="상시 발렛 운영" desc="레스토랑·병원·상업시설 등 고정 운영 주차 관리" iconSrc="/icons/valet.svg"  iconAlt="Valet" />
             <ServiceCard title="브랜드 이벤트 파킹 솔루션" desc="런칭쇼·전시·시승행사 등 맞춤형 주차 시스템 설계" iconSrc="/icons/event.svg"  iconAlt="Event" />
             <ServiceCard title="운영 인력 파견" desc="매니저, 주차요원, 현장 코디네이터 전문 인력 지원" iconSrc="/icons/staff.svg"  iconAlt="Staffing" />
             <ServiceCard title="현장 컨설팅" desc="주차 동선, 구조, 운영 효율화를 위한 맞춤형 진단"   iconSrc="/icons/consult.svg" iconAlt="Consulting" />
           </div>
         </div>
       </section>
 
     {/* Process */}
     <section id="process" data-reveal className="py-24 border-t border-zinc-200 bg-white">
       <div className="container max-w-6xl mx-auto px-4">
         <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">진행 프로세스</h2>
         <p className="mt-2 text-zinc-600 text-[14px]">상담부터 운영·리포트까지, 간결하고 예측 가능한 흐름.</p>
         <ol className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <li className="rounded-2xl border border-zinc-200 bg-white p-6">
             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand text-[13px] font-medium">1</span>
             <h3 className="mt-3 text-[16px] font-medium tracking-tight">프로젝트 상담</h3>
           </li>
           <li className="rounded-2xl border border-zinc-200 bg-white p-6">
             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand text-[13px] font-medium">2</span>
             <h3 className="mt-3 text-[16px] font-medium tracking-tight">현장 진단</h3>
           </li>
           <li className="rounded-2xl border border-zinc-200 bg-white p-6">
             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand text-[13px] font-medium">3</span>
             <h3 className="mt-3 text-[16px] font-medium tracking-tight">운영 설계</h3>
           </li>
           <li className="rounded-2xl border border-zinc-200 bg-white p-6">
             <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand/10 text-brand text-[13px] font-medium">4</span>
             <h3 className="mt-3 text-[16px] font-medium tracking-tight">운영 &amp; 리포트</h3>
           </li>
         </ol>
       </div>
     </section>
     
     {/* Why Parkly */}
     <section id="why" data-reveal className="py-24 border-t border-zinc-200 bg-zinc-50/50">
       <div className="container max-w-6xl mx-auto px-4">
         <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">왜 Parkly인가</h2>
         <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           <div className="rounded-2xl border border-zinc-200 bg-white p-6">
             <div className="flex items-center gap-3">
               <span className="inline-flex h-5 w-5 items-center justify-center text-brand"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 3l7 3v5c0 4.97-3.06 8.94-7 10-3.94-1.06-7-5.03-7-10V6l7-3Zm0 3.2L7 7.9V11c0 3.67 2.2 6.91 5 7.86 2.8-.95 5-4.19 5-7.86V7.9l-5-1.7Z"/></svg></span>
               <h3 className="text-[16px] font-medium tracking-tight">안전·보험 체계</h3>
             </div>
             <p className="mt-2 text-[14px] text-zinc-600">표준 보험·SOP 기반, 즉시 보고·완전 처리.</p>
           </div>
           <div className="rounded-2xl border border-zinc-200 bg-white p-6">
             <div className="flex items-center gap-3">
               <span className="inline-flex h-5 w-5 items-center justify-center text-brand"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M5 11l1.2-3.6A3 3 0 0 1 9.07 5h5.86a3 3 0 0 1 2.87 2.4L19 11v5a1 1 0 0 1-1 1h-1a2 2 0 1 1 0-4h1v-1H6v1h1a2 2 0 1 1 0 4H6a1 1 0 0 1-1-1v-5Z"/></svg></span>
               <h3 className="text-[16px] font-medium tracking-tight">현장 최적화</h3>
             </div>
             <p className="mt-2 text-[14px] text-zinc-600">베테랑 매니저의 동선 설계와 분산 운영.</p>
           </div>
           <div className="rounded-2xl border border-zinc-200 bg-white p-6">
             <div className="flex items-center gap-3">
               <span className="inline-flex h-5 w-5 items-center justify-center text-brand"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
               <h3 className="text-[16px] font-medium tracking-tight">브랜드 일관성</h3>
             </div>
             <p className="mt-2 text-[14px] text-zinc-600">현장 응대·사인·유니폼까지 브랜드 일치.</p>
           </div>
           <div className="rounded-2xl border border-zinc-200 bg-white p-6">
             <div className="flex items-center gap-3">
               <span className="inline-flex h-5 w-5 items-center justify-center text-brand"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Zm0 2v.2l8 5 8-5V8H4Zm16 8V9.8l-7.4 4.6a2 2 0 0 1-2.2 0L4 9.8V16h16Z"/></svg></span>
               <h3 className="text-[16px] font-medium tracking-tight">빠른 커뮤니케이션</h3>
             </div>
             <p className="mt-2 text-[14px] text-zinc-600">실시간 공유와 24h 내 대응으로 투명한 운영.</p>
           </div>
         </div>
       </div>
     </section>
 
    {/* Clients — minimal editorial list */}
    <section id="clients" data-reveal className="py-24 border-t border-zinc-200 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">함께한 곳들</h2>
          <p className="mt-2 text-zinc-600 text-[14px]">최근 협업·운영 사례 일부</p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10">
            <ul className="space-y-100 text-[15px] leading-7 text-zinc-800">
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>앤더슨씨 청담 디자인 갤러리</span></li>
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>앤헤이븐 삼성</span></li>
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>앤더슨씨 성수</span></li>
            </ul>

            <ul className="space-y-100 text-[15px] leading-7 text-zinc-800 mt-6 sm:mt-0">
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>플리페 청담</span></li>
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>소꿉 한남</span></li>
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>로얄동물 메디컬센터</span></li>
            </ul>

            <ul className="space-y-100 text-[15px] leading-7 text-zinc-800 mt-6 lg:mt-0">
              <li className="flex items-center gap-3"><span className="h-[3px] w-[3px] rounded-full bg-zinc-300"></span><span>브랜드 론칭/시승 행사</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
 
 
       {/* FAQ */}
       <section id="faq" data-reveal className="py-24 border-t border-zinc-200 bg-white">
         <div className="container max-w-6xl mx-auto px-4">
           <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">FAQ</h2>
           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
             <details className="rounded-xl border border-zinc-200 bg-white p-4">
               <summary className="cursor-pointer font-medium">요금은 어떻게 산정하나요?</summary>
               <p className="mt-2 text-[14px] text-zinc-600">운영 시간, 인력 수, 위치/동선 난이도, 장비(콘/사인/무전기) 여부에 따라 맞춤 견적을 드립니다.</p>
             </details>
             <details className="rounded-xl border border-zinc-200 bg-white p-4">
               <summary className="cursor-pointer font-medium">책임/보험은 어떻게 되나요?</summary>
               <p className="mt-2 text-[14px] text-zinc-600">표준 보험에 가입되어 있으며, 사고 발생 시 사건 보고 템플릿과 SOP에 따라 신속히 처리합니다.</p>
             </details>
             <details className="rounded-xl border border-zinc-200 bg-white p-4">
               <summary className="cursor-pointer font-medium">당일·급행 의뢰도 가능한가요?</summary>
               <p className="mt-2 text-[14px] text-zinc-600">인력/장비 상황에 따라 가능 여부가 달라집니다. 바로 연락 주시면 최선을 다해 맞춰 드립니다.</p>
             </details>
             <details className="rounded-xl border border-zinc-200 bg-white p-4">
               <summary className="cursor-pointer font-medium">브랜드 톤&amp;매너를 맞출 수 있나요?</summary>
               <p className="mt-2 text-[14px] text-zinc-600">복장, 응대 멘트, 동선 사인물까지 합의된 가이드에 맞춰 운영합니다.</p>
             </details>
           </div>
         </div>
       </section>
 
       {/* Contact */}
       <section id="contact" data-reveal className="py-24 border-t border-zinc-200 bg-white">
         <div className="container max-w-3xl mx-auto px-4">
           <h2 className="text-[24px] sm:text-[28px] font-semibold tracking-tight">문의하기</h2>
           <p className="mt-2 text-zinc-600 text-[14px]">필요한 운영 형태를 알려주시면 24시간 내 회신드려요.</p>
           <form className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6" action="mailto:hello@parkly.co" method="post">
             <input className="rounded-xl border border-zinc-300 px-3 py-2 text-[14px]" placeholder="이름" required />
             <input className="rounded-xl border border-zinc-300 px-3 py-2 text-[14px]" placeholder="연락처" required />
             <input className="sm:col-span-2 rounded-xl border border-zinc-300 px-3 py-2 text-[14px]" placeholder="업장/행사명" />
             <textarea className="sm:col-span-2 rounded-xl border border-zinc-300 px-3 py-2 text-[14px] min-h-[120px]" placeholder="요청 내용 (일시, 장소, 규모 등)" />
             <div className="sm:col-span-2 flex justify-end">
               <button className="inline-flex items-center rounded-full bg-brand px-5 py-3 text-white text-[15px] font-medium shadow hover:shadow-[0_0_0_8px_rgba(58,118,240,.18)] hover:bg-brand/90 active:translate-y-px transition">
                 메일로 보내기
               </button>
             </div>
           </form>
         </div>
       </section>
 
       {/* Footer */}
       <footer className="border-t border-zinc-200">
         <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between text-[13px] text-zinc-500">
           <span>© 2025 Parkly.</span>
           <a href="mailto:hello@parkly.co" className="hover:text-brand">hello@parkly.co</a>
         </div>
       </footer>
 
      {/* Mobile CTA */}
      <a href="#contact" onClick={(e)=>handleNav(e,"#contact")} className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-white text-sm shadow-lg hover:shadow-[0_0_0_8px_rgba(58,118,240,.18)] hover:bg-brand/90 active:translate-y-px transition-all sm:hidden ${active==="#contact" ? "hidden" : ""}`} aria-label="문의하기">
        문의하기
      </a>
     </main>
   );
 }
