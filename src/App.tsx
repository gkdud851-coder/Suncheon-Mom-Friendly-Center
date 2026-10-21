import { useState, useId, useRef, useEffect, type FormEvent } from 'react';
import { 
  Phone, 
  MapPin, 
  Heart, 
  Clock, 
  ShieldCheck, 
  Utensils, 
  Car, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Smile, 
  Award,
  ChevronDown,
  X,
  Play,
  Volume2,
  VolumeX,
  Calendar,
  UserCheck,
  Navigation,
  Music
} from 'lucide-react';

export default function App() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [perfImgError, setPerfImgError] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    src: string;
    poster?: string;
    description?: string;
  } | null>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const rehabVideoRef = useRef<HTMLVideoElement>(null);
  const [isRehabMuted, setIsRehabMuted] = useState(true);

  // Ensure hero video autoplays safely on mount
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {
        // Handled: autoplay requires user interaction if unmuted
      });
    }
  }, []);

  // Ensure rehabilitation video autoplays, loops continuously, and plays when scrolled into view
  useEffect(() => {
    const video = rehabVideoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleHeroSound = () => {
    if (heroVideoRef.current) {
      const nextMuted = !isVideoMuted;
      heroVideoRef.current.muted = nextMuted;
      if (!nextMuted) {
        heroVideoRef.current.play().catch(() => {});
      }
      setIsVideoMuted(nextMuted);
    } else {
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleRehabSound = () => {
    if (rehabVideoRef.current) {
      const nextMuted = !isRehabMuted;
      rehabVideoRef.current.muted = nextMuted;
      if (!nextMuted) {
        rehabVideoRef.current.play().catch(() => {});
      }
      setIsRehabMuted(nextMuted);
    } else {
      setIsRehabMuted(!isRehabMuted);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: '장기요양등급 보유 (1~5등급)',
    message: ''
  });

  const nameId = useId();
  const phoneId = useId();
  const gradeId = useId();
  const msgId = useId();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setConsultSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      grade: '장기요양등급 보유 (1~5등급)',
      message: ''
    });
    setConsultSubmitted(false);
    setIsConsultModalOpen(false);
  };

  const faqList = [
    {
      q: '장기요양등급이 아직 없는데 어떻게 해야 하나요?',
      a: '국민건강보험공단 등급 신청 서류 준비부터 공단 방문 조사 대비, 신청 전 과정을 순천맘편한주간보호센터에서 전액 무료로 친절하게 대행·도와드립니다. 편하게 문의주세요.'
    },
    {
      q: '하루 이용 비용(본인부담금)은 얼마나 드나요?',
      a: '장기요양보험 국가지원으로 전체 비용의 85%~100%를 국가가 지원합니다. 일반 수급자는 15%, 감경 대상자는 6%~9%, 기초생활수급자는 본인부담금 0%로 하루 약 1만 원대 안팎(식대 별도)으로 부담 없이 안심하고 이용하실 수 있습니다.'
    },
    {
      q: '차량 송영은 집 앞 문앞까지 해주시나요?',
      a: '네, 순천 전 지역(연향동, 조례동, 금당, 오천, 신대, 구도심 등) 어르신 댁 아파트 동 앞, 주택 대문 앞까지 안전 요원이 직접 모시러 가고 안전하게 귀가시켜 드립니다.'
    },
    {
      q: '거동이 불편하시거나 휠체어를 타셔도 이용할 수 있나요?',
      a: '물론입니다. 휠체어 전용 리프트와 안전벨트, 내부 문턱 없는 배리어프리 설계로 거동이 불편하신 어르신도 안전하고 편안하게 센터 생활과 재활을 즐기실 수 있습니다.'
    },
    {
      q: '식사는 어떻게 나오며 개인별 맞춤이 가능한가요?',
      a: '매주 1회 어르신들께 직접 드시고 싶은 선호 메뉴를 여쭤보고 반영합니다. 치아가 약하신 분을 위한 진밥, 다진 반찬, 저염식 등 맞춤 영양식을 전문 조리사가 매일 정성껏 갓 조리합니다.'
    }
  ];

  return (
    <div className="wrap">
      {/* ---------------------------------------------------- */}
      {/* 헤더 */}
      {/* ---------------------------------------------------- */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 px-5 py-3.5 flex items-center justify-between border-b border-[var(--line)]">
        <a href="#" className="flex items-center gap-2.5 text-[var(--green)]">
          <b className="w-9 h-9 rounded-xl bg-[var(--green)] text-white flex items-center justify-center font-black text-lg shadow-sm">
            맘
          </b>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] leading-tight text-[var(--ink)]">순천맘편한</span>
            <span className="text-[11px] text-[var(--label)] font-semibold -mt-0.5">주간보호센터</span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <a 
            href="tel:061-742-5888" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--mint)] text-[var(--green)] font-bold text-xs hover:bg-[var(--line)] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>061-742-5888</span>
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* 1. 첫 화면 (Hero with Cover Video) */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[620px] flex items-end overflow-hidden bg-[#1E2A24]">
        {/* Background Cover Video */}
        <video 
          ref={heroVideoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          poster="/promo-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/main-promo.mp4" type="video/mp4" />
          <source src="/메인홍보동영상.mp4" type="video/mp4" />
        </video>

        {/* Video Sound Toggle Button */}
        <button
          type="button"
          onClick={toggleHeroSound}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 text-white px-3 py-1.5 rounded-full backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
          aria-label={isVideoMuted ? "소리 켜기" : "소리 끄기"}
        >
          {isVideoMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/90" />
              <span>소리 켜기</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent)] animate-pulse" />
              <span className="text-[var(--accent)] font-bold">소리 켜짐</span>
            </>
          )}
        </button>

        {/* High contrast gradient overlay for perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(16,36,27,0.92)] via-[rgba(16,36,27,0.55)] to-[rgba(16,36,27,0.3)] z-10" />

        {/* Hero Content */}
        <div className="relative z-20 w-full px-6 pt-16 pb-12 flex flex-col gap-4 text-white">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--brown)] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>순천의 1등 손자가 함께하는 안식처</span>
          </div>

          <h1 className="serif text-[28px] leading-[1.38] font-bold text-white tracking-tight">
            가족보호자분들의 일터가 지켜지고,<br />
            어르신들의 나이듦이 존중받는 곳
          </h1>

          <p className="text-xl font-bold text-[#E6EEE9] tracking-tight">
            순천맘편한주간보호센터
          </p>

          <div className="flex flex-wrap gap-2 text-xs mt-1">
            <span className="bg-white/95 text-[var(--green-dark)] font-bold px-3 py-1 rounded-full shadow-sm">집 앞 안심 송영</span>
            <span className="bg-white/95 text-[var(--green-dark)] font-bold px-3 py-1 rounded-full shadow-sm">매주 식사 선호도 조사</span>
            <span className="bg-white/95 text-[var(--green-dark)] font-bold px-3 py-1 rounded-full shadow-sm">맞춤 재활 케어</span>
            <span className="bg-white/95 text-[var(--green-dark)] font-bold px-3 py-1 rounded-full shadow-sm">병원 동행 지원</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. 대표 인사말 (Greet) */}
      {/* ---------------------------------------------------- */}
      <section id="greeting" className="sec">
        <div className="greet-photo ph h-[320px] rounded-2xl bg-[#E6ECE7] overflow-hidden shadow-sm">
          <img 
            src="/정성현케어1.jpg" 
            alt="순천맘편한주간보호센터 대표 정성현의 진심 케어 모습" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <span className="eyebrow">대표 인사말</span>
          <h2 className="serif text-[26px] leading-[1.4] font-bold text-[var(--green)]">
            안녕하세요,<br />
            순천맘편한주간보호센터 대표 정성현입니다.
          </h2>
        </div>

        <div className="text-[15px] text-[var(--text)] leading-relaxed flex flex-col gap-3 font-normal">
          <p>
            저는 조부모님의 사랑을 듬뿍 받으며 순천에서 자랐습니다. 
            그때 받은 따뜻함을 이제 순천의 어르신들께 온전히 돌려드리고 싶습니다.
          </p>
          <p className="font-bold text-[17px] text-[var(--green-dark)]">
            순천의 1등 손자가 되겠습니다.
          </p>
        </div>

        <div className="bridge mt-2 pt-4 border-t border-[var(--line)] text-sm text-[var(--muted)] flex items-center gap-2">
          <Heart className="w-4 h-4 text-[var(--green)] shrink-0" />
          <span>매일 어르신들과 함께하며 마음에 새겨진 소중한 순간들이 있습니다.</span>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. 기억에 남는 순간 (Memory 2 Cards) */}
      {/* ---------------------------------------------------- */}
      <section className="sec bg-[var(--beige)]">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">기억에 남는 순간</span>
          <h2 className="h2 serif">잊을 수 없는 두 가지 기억</h2>
          <p className="text-sm text-[var(--muted)]">어르신과 직원들의 진심 어린 믿음이 우리를 뛰게 합니다.</p>
        </div>

        {/* Card 1: 20만 원 든 새 돈 봉투 */}
        <div className="card bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col">
          <div className="ph h-[220px] bg-stone-100">
            <img 
              src="/용돈.png" 
              alt="어르신께서 감사와 감동을 담아 건네주신 빳빳한 새 돈 20만 원 봉투" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <span className="tag self-start bg-[var(--green)] text-white text-xs font-bold px-3 py-1 rounded-full">
              첫 번째 기억
            </span>
            <h3 className="serif text-xl font-bold text-[var(--ink)] leading-snug">
              어르신이 건네주신 빳빳한 새 돈 봉투 20만 원
            </h3>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              어느 날 어르신 한 분이 주간보호를 하루 빠지셨습니다. 
              무슨 일이 있으신가 걱정했는데, 다음 날 센터에 오셔서 은행에서 갓 뽑은 빳빳한 새 돈 20만 원을 흰 봉투에 담아 건네주셨습니다.
            </p>
            <blockquote className="p-3 bg-[var(--mint)] rounded-xl text-xs font-medium text-[var(--green-dark)] leading-relaxed italic">
              "여기 와서 너무 고맙고 하루하루가 너무 행복해서, 손자 같은 대표님한테 꼭 주고 싶었어."
            </blockquote>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              어르신 앞에서는 마음 상하지 않으시게 감사히 품에 안고, 이후 가족 보호자분께 조용히 돌려드렸지만... 
              어르신께서 우리 센터를 진심으로 의지하고 만족하고 계신다는 마음에 가슴이 뭉클했던 가장 행복한 순간이었습니다.
            </p>
          </div>
        </div>

        {/* Card 2: 직원들의 부모님 입소 문의 */}
        <div className="card bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col">
          <div className="ph h-[220px] bg-[var(--sand)]">
            <img 
              src="/행복2.jpg" 
              alt="정성 가득 돌봄 현장" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 flex flex-col gap-3">
            <span className="tag self-start bg-[var(--green)] text-white text-xs font-bold px-3 py-1 rounded-full">
              두 번째 기억
            </span>
            <h3 className="serif text-xl font-bold text-[var(--ink)] leading-snug">
              직원분들이 다가와 조심스레 건넨 한마디
            </h3>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              어느 날 함께 일하는 직원분들이 조심스레 다가와 쑥스러워하며 물어보셨습니다. 
              <strong>"대표님, 저희 친부모님도 이곳에 모실 수 있을까요?"</strong>
            </p>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              당연히 국가 장기요양보험 지원제도이고 너무나 감사한 일이었습니다. 
              무엇보다 센터의 식단, 위생, 어르신 케어 모든 과정을 매일 가장 가까이서 지켜보는 직원들이 <strong>소중한 친부모님을 믿고 맡기려 하신다는 사실</strong>에, 
              우리의 진심 어린 돌봄과 솔선수범이 인정받은 것 같아 더없이 벅찼습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. 우리가 지키는 것 (3대 장점) */}
      {/* ---------------------------------------------------- */}
      <section id="advantages" className="sec">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">우리가 지키는 것</span>
          <h2 className="h2 serif">순천맘편한만의 3가지 약속</h2>
          <p className="text-sm text-[var(--muted)]">형식적인 케어가 아닌, 어르신의 실제 삶을 변화시키는 진심입니다.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 장점 1: 재활을 열심히 해드립니다 */}
          <div className="p-5 rounded-2xl border border-[var(--line)] bg-white flex flex-col gap-3 shadow-xs">
            <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center shadow-xs">
              <video 
                ref={rehabVideoRef}
                autoPlay
                loop
                muted
                controls 
                playsInline
                preload="auto"
                poster="/rehab-poster.jpg"
                className="w-full h-auto max-h-[460px] object-contain rounded-xl"
                onVolumeChange={() => {
                  if (rehabVideoRef.current) {
                    setIsRehabMuted(rehabVideoRef.current.muted);
                  }
                }}
              >
                <source src="/rehab-video.mp4" type="video/mp4" />
                <source src="/재활변화%20영상.mp4" type="video/mp4" />
                <source src="/재활변화 영상.mp4" type="video/mp4" />
                어르신의 보행 재활 변화 영상입니다.
              </video>
              <div className="absolute top-2.5 left-2.5 pointer-events-none bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>보행 재활 변화 (반복 재생)</span>
              </div>
              <button 
                type="button"
                onClick={toggleRehabSound}
                className="absolute top-2.5 right-2.5 z-10 bg-black/70 hover:bg-black/90 text-white px-2.5 py-1 rounded-full backdrop-blur-sm transition-all focus:outline-none shadow-md flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                title={isRehabMuted ? "소리 켜기" : "소리 끄기"}
                aria-label={isRehabMuted ? "소리 켜기" : "소리 끄기"}
              >
                {isRehabMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-300" />
                    <span className="text-[11px]">소리 켜기</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[11px] text-emerald-300">소리 켜짐</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--green)] text-white text-xs font-bold flex items-center justify-center">1</span>
              <h3 className="text-lg font-bold text-[var(--ink)]">재활을 가장 열심히 해드립니다</h3>
            </div>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              굳어진 관절과 근력을 천천히 회복시키는 밴드 스트레칭, 보행 재활 운동, 인지 훈련을 매일 진행합니다. 
              스스로 걷고 움직이는 기쁨을 어르신께 되찾아 드립니다.
            </p>
          </div>

          {/* 장점 2: 일주일에 1번 식사 선호도 조사 */}
          <div className="p-5 rounded-2xl border border-[var(--line)] bg-white flex flex-col gap-3 shadow-xs">
            <div className="ph h-[190px] rounded-xl overflow-hidden bg-white border border-[var(--line)] p-1">
              <img src="/식사선호도.png" alt="순천맘편한주간보호센터 매주 식사 선호도 조사표" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--green)] text-white text-xs font-bold flex items-center justify-center">2</span>
              <h3 className="text-lg font-bold text-[var(--ink)]">일주일에 1번 식사 선호도 조사</h3>
            </div>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              "어르신, 이번 주에는 어떤 음식이 가장 드시고 싶으세요?"<br />
              매주 한 분 한 분의 입맛을 여쭤보고 식단표에 그대로 반영합니다. 갓 지은 밥과 신선한 나물, 따뜻한 국으로 집밥 이상의 정성을 올립니다.
            </p>
          </div>

          {/* 장점 3: 병원 동행 및 센터 밖의 생활까지 */}
          <div className="p-5 rounded-2xl border border-[var(--line)] bg-white flex flex-col gap-3 shadow-xs">
            <div className="ph h-[200px] rounded-xl overflow-hidden">
              <img src="/병문안.jpg" alt="입원 어르신 병문안 및 센터 밖 생활 케어" className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[var(--green)] text-white text-xs font-bold flex items-center justify-center">3</span>
              <h3 className="text-lg font-bold text-[var(--ink)]">병원 동행 및 센터 밖의 생활까지 케어</h3>
            </div>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              바쁜 보호자분을 대신해 정기 병원 진료 동행, 복지용구(지팡이, 휠체어 등) 신청 및 집 앞 배달까지 챙깁니다. 
              혹여 입원하셨을 때도 직접 병문안을 찾아가 손을 잡아드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. 프로그램 */}
      {/* ---------------------------------------------------- */}
      <section id="programs" className="sec">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">프로그램</span>
          <h2 className="h2 serif">즐거운 시간이 쌓이면,<br />마음이 열립니다</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1">
          {/* 1. 야외 나들이 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/활동3.jpg" alt="야외 나들이" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-sm text-[var(--ink)]">야외 나들이</h4>
            </div>
          </div>

          {/* 2. 생신잔치 (감동 영상 재생) */}
          <div 
            onClick={() => setActiveVideo({
              title: '생신잔치 감동 영상',
              src: '/birthday-video.mp4',
              poster: '/birthday-poster.jpg',
              description: '손자 같은 대표님과 직원들의 정성 어린 축하에 감동의 눈물을 흘리시는 어르신의 진심 어린 순간입니다.'
            })}
            className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col cursor-pointer hover:border-[var(--green)] hover:shadow-md transition-all"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveVideo({
                  title: '생신잔치 감동 영상',
                  src: '/birthday-video.mp4',
                  poster: '/birthday-poster.jpg',
                  description: '손자 같은 대표님과 직원들의 정성 어린 축하에 감동의 눈물을 흘리시는 어르신의 진심 어린 순간입니다.'
                });
              }
            }}
          >
            <div className="relative h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/birthday-poster.jpg" alt="생신잔치 감동 영상" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/95 text-[var(--green)] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <span>영상 보기</span>
              </div>
            </div>
            <div className="p-3 text-center flex items-center justify-center gap-1">
              <h4 className="font-bold text-sm text-[var(--ink)]">생신잔치</h4>
              <span className="text-[11px] text-[var(--green)] font-bold">▶</span>
            </div>
          </div>

          {/* 3. 편백 족욕 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/행복4.jpg" alt="편백 족욕" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-sm text-[var(--ink)]">편백 족욕</h4>
            </div>
          </div>

          {/* 4. 요리 활동 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/요리활동.jpg" alt="요리 활동" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-sm text-[var(--ink)]">요리 활동</h4>
            </div>
          </div>

          {/* 5. 어버이날 행사 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/어버이날%20행사.jpg" alt="어버이날 행사" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-sm text-[var(--ink)]">어버이날 행사</h4>
            </div>
          </div>

          {/* 6. 물리치료 · 건강케어 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="h-32 sm:h-36 overflow-hidden bg-[var(--sand)]">
              <img src="/행복2.jpg" alt="물리치료 & 건강케어" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-bold text-sm text-[var(--ink)]">물리치료 · 건강케어</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. 마을과 함께하는 제2의 노인정 (동네 나들이) */}
      {/* ---------------------------------------------------- */}
      <section id="community" className="sec bg-[var(--mint)]">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">동네와 함께하는 정겨운 나들이</span>
          <h2 className="h2 serif">
            우리 센터는 기피대상이 아닌,<br />
            마을에서 함께 도와주는 제2의 노인정입니다
          </h2>
          <p className="text-sm text-[var(--text)] leading-relaxed mt-1">
            센터 안에만 머물지 않습니다.<br />
            단골 중국집 '만리향'에서 함께 먹는 따뜻한 짜장면 나들이, 동네 미용실에서 곱게 머리 하고 시원한 주스 마시며 창밖 구경하기... 순천 지역사회가 다 함께 어르신을 따뜻하게 모십니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {/* 1. 단골 중국집 만리향 짜장면 외식 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="w-full h-52 bg-[var(--sand)] overflow-hidden">
              <img 
                src="/짜장면.jpg" 
                alt="단골 중국집 만리향 짜장면 외식 나들이" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--label)] font-bold bg-[var(--mint)] px-2.5 py-0.5 rounded-md">
                  외식 나들이 · 단골 중국집 '만리향'
                </span>
              </div>
              <h4 className="font-bold text-base text-[var(--ink)]">
                단골 중국집 ‘만리향’ 짜장면 외식 나들이
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                어르신들이 손꼽아 기다리시는 인기 만점 나들이! 순천의 오랜 단골 중국집 <strong>'만리향'</strong>에서 김이 모락모락 나는 따뜻한 짜장면을 다 함께 둘러앉아 맛있게 드십니다.
              </p>
            </div>
          </div>

          {/* 2. 동네 미용실 봉미리메르시 헤어 케어 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="w-full h-52 bg-[var(--sand)] overflow-hidden">
              <img 
                src="/미용실.jpg" 
                alt="동네 미용실 봉미리메르시 헤어 케어 나들이" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--label)] font-bold bg-[var(--mint)] px-2.5 py-0.5 rounded-md">
                  기분 전환 · 헤어살롱 '봉미리메르시'
                </span>
              </div>
              <h4 className="font-bold text-base text-[var(--ink)]">
                동네 미용실 ‘봉미리메르시’ 헤어 케어 나들이
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                순천의 유명 헤어살롱 <strong>'봉미리메르시'</strong>에서 고운 파마와 단정한 커트로 머리도 단장하고, 시원한 주스를 마시며 창밖 구경도 즐기십니다. "10년은 더 젊어졌다"며 소녀처럼 활짝 웃으십니다.
              </p>
            </div>
          </div>

          {/* 3. 공연단도 많이 옵니다 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-[var(--line)] flex flex-col">
            <div className="relative w-full h-64 sm:h-72 bg-gradient-to-br from-[#EAEFEA] to-[#DDE7DF] flex items-center justify-center overflow-hidden">
              {!perfImgError ? (
                <img 
                  src="/공연.png" 
                  alt="어르신들을 위한 신명나는 순천 예술 공연단 방문" 
                  className="w-full h-full object-cover object-top"
                  onError={() => setPerfImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 p-5 text-center bg-gradient-to-br from-[#EEF4F0] to-[#E2EBE5]">
                  <div className="w-12 h-12 rounded-full bg-[var(--green)]/10 text-[var(--green)] flex items-center justify-center shadow-xs">
                    <Music className="w-6 h-6 text-[var(--green)]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[var(--ink)]">신명나는 국악 · 민요 · 판소리 공연단</span>
                    <span className="text-[11px] text-[var(--muted)]">어르신들을 위한 따뜻한 재능기부 무대</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--label)] font-bold bg-[var(--mint)] px-2.5 py-0.5 rounded-md">
                  문화 공연 · 순천 예술 공연단
                </span>
                <span className="text-[11px] text-[var(--muted)]">정기 방문 무대</span>
              </div>
              <h4 className="font-bold text-base text-[var(--ink)]">
                공연단도 많이 옵니다
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                민요, 판소리, 색소폰 연주, 풍물놀이 등 순천 지역의 정겨운 예술 공연단이 정기적으로 찾아옵니다. 다 함께 손뼉 치고 어깨춤을 추며 센터 전체가 즐거운 잔칫날로 변합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. 믿을 수 있는 이유 (Trust & 보호자 후기) */}
      {/* ---------------------------------------------------- */}
      <section id="trust" className="sec bg-[var(--beige)]">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">믿을 수 있는 이유</span>
          <h2 className="h2 serif">직원들이 부모님을<br />모시는 곳입니다</h2>
          <p className="text-sm text-[var(--muted)]">
            센터를 가장 잘 아는 사람이 부모님을 맡깁니다.<br />
            그보다 확실한 이유는 없다고 생각합니다.
          </p>
        </div>

        {/* 보호자 이용 후기 카드 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 flex flex-col gap-4">
          <div className="flex items-center gap-1 text-[var(--accent)] text-sm">
            {'★'.repeat(5)}
            <span className="text-xs text-[var(--muted)] ml-2 font-bold">실제 보호자 이용 후기</span>
          </div>

          <blockquote className="serif text-[16px] text-[var(--ink)] leading-relaxed italic border-l-3 border-[var(--green)] pl-4 py-1">
            "엄마가 센터가 너무 고맙다며 봉투를 들고 가셨대요. 
            대표님은 엄마 마음 상하지 않게 받아주시고, 나중에 저에게 조용히 돌려주셨어요. 
            엄마가 정말 잘 적응하셨구나 싶었습니다."
          </blockquote>

          <div className="flex items-center justify-between text-xs text-[var(--muted)] pt-3 border-t border-[var(--line)]">
            <span className="font-semibold">이용 어르신 보호자</span>
            <span>순천맘편한주간보호센터 이용 가족</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. 시설 둘러보기 */}
      {/* ---------------------------------------------------- */}
      <section className="sec">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">시설 둘러보기</span>
          <h2 className="h2 serif">어르신의 편안한 안식처</h2>
          <p className="text-sm text-[var(--muted)]">넓고 채광이 좋은 안락한 거실과 전문 재활 공간</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="ph h-36 rounded-xl overflow-hidden shadow-xs">
              <img src="/시설1.jpg" alt="넓고 쾌적한 메인 홀" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-center text-[var(--muted)]">햇살 가득 메인 홀</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="ph h-36 rounded-xl overflow-hidden shadow-xs">
              <img src="/시설2.jpg" alt="물리치료 및 안식 공간" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-center text-[var(--muted)]">물리치료 & 온열존</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="ph h-36 rounded-xl overflow-hidden shadow-xs">
              <img src="/시설3.jpg" alt="편백 족욕 시설" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-center text-[var(--muted)]">편백 족욕 힐링실</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="ph h-36 rounded-xl overflow-hidden shadow-xs">
              <img src="/시설4.jpg" alt="위생적인 조리실과 식당" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-center text-[var(--muted)]">청결한 조리 및 식당</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. 이용 안내 & 자주 묻는 질문 (FAQ 아코디언) */}
      {/* ---------------------------------------------------- */}
      <section id="guide" className="sec bg-[var(--beige)]">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">이용 안내</span>
          <h2 className="h2 serif">처음이라 막막하시죠?<br />하나씩 안내해 드립니다</h2>
        </div>

        {/* 요약 안내 박스 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)] flex flex-col gap-3.5 text-sm">
          <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 font-bold text-[var(--label)]">이용 대상</span>
            <span className="text-[var(--text)]">장기요양등급(1~5등급 및 인지지원등급)을 받으신 어르신</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 font-bold text-[var(--label)]">운영 시간</span>
            <span className="text-[var(--text)]">평일 08:30 ~ 18:00 (토요일 및 시간 조정 상담 가능)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 font-bold text-[var(--label)]">송영 지역</span>
            <span className="text-[var(--text)]">순천시 전 지역 (연향동, 조례동, 금당, 오천, 신대지구 등 전액 무료 송영)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 font-bold text-[var(--label)]">비용 안내</span>
            <span className="text-[var(--text)]">장기요양보험 85%~100% 국가지원, 본인부담금은 상담 시 친절 안내</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-20 shrink-0 font-bold text-[var(--label)]">이용 절차</span>
            <span className="text-[var(--text)]">전화 상담 → 방문 · 견학 → 계약 체결 → 안심 이용 시작</span>
          </div>
        </div>

        {/* 어르신의 하루 (하루 일과표) */}
        <div id="schedule" className="flex flex-col gap-2.5 mt-2">
          <div className="flex flex-col gap-0.5 px-1">
            <span className="eyebrow">어르신의 하루</span>
            <h3 className="font-bold text-base text-[var(--ink)]">규칙적이고 활기찬 일과</h3>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--line)] flex flex-col divide-y divide-[var(--line)]">
            <div className="py-3.5 flex items-start gap-4">
              <div className="w-16 shrink-0 font-bold text-sm text-[var(--green)] bg-[var(--mint)] px-2 py-1 rounded text-center">
                08:30~
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-[var(--ink)]">송영 · 등원</span>
                <span className="text-xs text-[var(--muted)]">순천 전 지역 집 앞 문앞까지 안심 모심</span>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-4">
              <div className="w-16 shrink-0 font-bold text-sm text-[var(--green)] bg-[var(--mint)] px-2 py-1 rounded text-center">
                09:30~
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-[var(--ink)]">건강 체크 · 오전 프로그램</span>
                <span className="text-xs text-[var(--muted)]">혈압·체온 바이탈 체크, 뇌 건강 인지 활동 & 재활 체조</span>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-4">
              <div className="w-16 shrink-0 font-bold text-sm text-[var(--green)] bg-[var(--mint)] px-2 py-1 rounded text-center">
                12:00~
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-[var(--ink)]">점심 식사</span>
                <span className="text-xs text-[var(--muted)]">매주 선호도 조사 반영, 균형 잡힌 따뜻한 맞춤 영양식</span>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-4">
              <div className="w-16 shrink-0 font-bold text-sm text-[var(--green)] bg-[var(--mint)] px-2 py-1 rounded text-center">
                13:30~
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-[var(--ink)]">휴식 · 오후 프로그램</span>
                <span className="text-xs text-[var(--muted)]">편안한 온열 안식 휴식, 노래교실, 족욕, 만들기, 미술치료</span>
              </div>
            </div>

            <div className="py-3.5 flex items-start gap-4">
              <div className="w-16 shrink-0 font-bold text-sm text-[var(--green)] bg-[var(--mint)] px-2 py-1 rounded text-center">
                16:30~
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-bold text-sm text-[var(--ink)]">간식 · 송영 · 귀가</span>
                <span className="text-xs text-[var(--muted)]">든든하고 맛있는 건강 간식 후 안전하게 집 앞까지 배웅</span>
              </div>
            </div>
          </div>
        </div>

        {/* 자주 묻는 질문 (FAQ Accordion with + / -) */}
        <div className="flex flex-col gap-2.5 mt-2">
          <h3 className="font-bold text-base text-[var(--ink)] px-1">자주 묻는 질문</h3>
          {faqList.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-xl overflow-hidden border border-[var(--line)] shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-sm text-[var(--ink)] gap-3 hover:bg-[var(--mint)]/40 transition-colors cursor-pointer"
                >
                  <span>Q. {item.q}</span>
                  <span className="text-lg font-bold text-[var(--green)] w-5 text-center shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-[var(--text)] leading-relaxed border-t border-[var(--line)]/50 pt-3 bg-[#FAFBF9]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. 오시는 길 · 상담 (Contact) */}
      {/* ---------------------------------------------------- */}
      <section id="contact" className="sec">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">오시는 길 · 상담</span>
          <h2 className="h2 serif">언제든 편하게 물어보세요.<br />손자에게 묻듯이요.</h2>
          <p className="text-sm text-[var(--muted)]">어르신과 가족분들의 마음에 따뜻한 평안을 선물하겠습니다.</p>
        </div>

        {/* 주소 및 전화 상담 안내 (배경박스 없이 깔끔하게) */}
        <div className="flex flex-col gap-4 py-1">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[var(--green)] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-[var(--muted)] font-semibold">주소</span>
              <span className="text-sm font-bold text-[var(--ink)]">전라남도 순천시 충효로 127, 2층 (연향동)</span>
              <span className="text-xs text-[var(--label)] mt-0.5 font-medium">※ 순천 전 지역 댁 앞까지 안전 송영 지원</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-[var(--green)] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs text-[var(--muted)] font-semibold">전화 상담</span>
              <a href="tel:061-742-5888" className="text-xl font-black text-[var(--green)] tracking-tight hover:underline">
                061-742-5888
              </a>
              <span className="text-xs text-[var(--muted)]">터치 시 즉시 손자 대표와 통화가 연결됩니다.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 푸터 */}
      {/* ---------------------------------------------------- */}
      <footer className="px-6 pt-6 pb-28 text-center text-xs text-[var(--muted)] flex flex-col gap-2 border-t border-[var(--line)] bg-[#FAFBF9]">
        <p className="font-bold text-sm text-[var(--ink)]">순천맘편한주간보호센터</p>
        <p>대표: 정성현 | 전화: 061-742-5888</p>
        <p>주소: 전라남도 순천시 충효로 127, 2층 (연향동)</p>
        <p className="text-[11px] text-[var(--muted)]/80 mt-1">
          © {new Date().getFullYear()} 순천맘편한주간보호센터. All rights reserved.
        </p>
      </footer>

      {/* ---------------------------------------------------- */}
      {/* 하단 고정 플로팅 액션 바 (Bottom Fixed Bar) */}
      {/* ---------------------------------------------------- */}
      <div 
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-50 p-3 bg-white/95 backdrop-blur-md border-t border-[var(--line)] shadow-lg grid grid-cols-2 gap-2.5"
      >
        <a
          href="https://map.naver.com/p/entry/place/1698145203?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.5153684&lat=34.9501771"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[var(--green)] hover:bg-[var(--green-2)] !text-white py-3 px-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          style={{ color: '#ffffff' }}
        >
          <Navigation className="w-4 h-4 text-[var(--accent)]" />
          <span className="!text-white font-bold" style={{ color: '#ffffff' }}>길찾기</span>
        </a>

        <a
          href="tel:061-742-5888"
          className="w-full bg-[var(--accent)] hover:bg-[#e0a238] py-3 px-3 rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          style={{ color: '#8A5A12' }}
        >
          <Phone className="w-4 h-4 text-[var(--brown)]" />
          <span className="font-bold" style={{ color: '#8A5A12' }}>전화 걸기</span>
        </a>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 상담 신청 모달 (Modal) */}
      {/* ---------------------------------------------------- */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-[var(--line)]">
            <div className="p-4 bg-[var(--green)] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="font-bold text-base">순천맘편한 상담 신청</h3>
              </div>
              <button 
                onClick={() => setIsConsultModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="닫기"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {consultSubmitted ? (
              <div className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--mint)] text-[var(--green)] flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-lg text-[var(--ink)]">상담 신청이 접수되었습니다!</h4>
                <p className="text-xs text-[var(--text)] leading-relaxed">
                  대표 정성현이 확인 후 남겨주신 번호로 가장 따뜻하고 친절하게 연락드리겠습니다.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-3 w-full bg-[var(--green)] text-white py-2.5 rounded-xl font-bold text-xs"
                >
                  확인
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-5 flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label htmlFor={nameId} className="text-xs font-bold text-[var(--ink)]">
                    보호자 성함 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 홍길동"
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--line)] focus:outline-none focus:border-[var(--green)] bg-[#FAFBF9]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={phoneId} className="text-xs font-bold text-[var(--ink)]">
                    연락처 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="예: 010-1234-5678"
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--line)] focus:outline-none focus:border-[var(--green)] bg-[#FAFBF9]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={gradeId} className="text-xs font-bold text-[var(--ink)]">
                    어르신 장기요양등급 상태
                  </label>
                  <select
                    id={gradeId}
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--line)] focus:outline-none focus:border-[var(--green)] bg-[#FAFBF9]"
                  >
                    <option value="장기요양등급 보유 (1~5등급)">장기요양등급 보유 (1~5등급)</option>
                    <option value="인지지원등급 보유">인지지원등급 보유</option>
                    <option value="등급 신청 필요 (도움 요청)">등급 신청 필요 (도움 요청)</option>
                    <option value="아직 등급 없음 / 잘 모름">아직 등급 없음 / 잘 모름</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor={msgId} className="text-xs font-bold text-[var(--ink)]">
                    궁금하신 점 (선택)
                  </label>
                  <textarea
                    id={msgId}
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="송영 지역, 이용 비용, 등급 신청 등 편하게 남겨주세요."
                    className="w-full text-xs p-2.5 rounded-lg border border-[var(--line)] focus:outline-none focus:border-[var(--green)] bg-[#FAFBF9] resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsConsultModalOpen(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-[var(--line)] text-xs font-bold text-[var(--muted)] hover:bg-gray-100"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 rounded-xl bg-[var(--green)] text-white text-xs font-bold hover:bg-[var(--green-2)] shadow-sm"
                  >
                    상담 신청 완료
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* ---------------------------------------------------- */}
      {/* 비디오 모달 (Video Modal) */}
      {/* ---------------------------------------------------- */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-stone-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 bg-black/60 text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[var(--accent)] fill-current" />
                <h3 className="font-bold text-sm text-white">{activeVideo.title}</h3>
              </div>
              <button 
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer text-white"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[70vh]">
              <video 
                src={activeVideo.src} 
                controls 
                autoPlay 
                playsInline
                poster={activeVideo.poster}
                className="w-full max-h-[65vh] object-contain"
              >
                <source src={activeVideo.src} type="video/mp4" />
                영상을 재생할 수 없습니다.
              </video>
            </div>

            {activeVideo.description && (
              <div className="p-4 bg-stone-900 text-stone-200 text-xs leading-relaxed border-t border-white/10">
                {activeVideo.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
