import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Award, 
  Heart, 
  Home, 
  Users, 
  Stethoscope,
  Plus,
  Minus,
  HelpCircle,
  Activity,
  Utensils,
  Menu,
  X
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// --- Components ---

const Slider = ({ images, interval = 5000 }: { images: string[], interval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <button 
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-lime-600' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

const CaseCard = ({ title, description, result, icon: Icon, tag }: { title: string, description: string, result: string, icon: any, tag: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group h-full flex flex-col"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-lime-50 rounded-bl-[3rem] -z-10 transition-transform group-hover:scale-110"></div>
    <div className="flex items-start justify-between mb-6">
      <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-lime-400 shadow-lg group-hover:bg-lime-500 group-hover:text-white transition-colors">
        <Icon className="w-7 h-7" />
      </div>
      <span className="px-3 py-1 bg-lime-50 text-lime-700 text-xs font-bold rounded-full border border-lime-100">
        {tag}
      </span>
    </div>
    <h3 className="text-2xl font-bold mb-4 text-slate-900 font-serif">{title}</h3>
    <p className="text-slate-600 mb-6 text-base leading-relaxed flex-grow">{description}</p>
    <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-lime-500 mt-auto">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-4 h-4 text-lime-600" />
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Recovery Progress</p>
      </div>
      <p className="text-slate-900 font-bold text-lg leading-snug">{result}</p>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-lime-600' : 'text-gray-900 group-hover:text-lime-500'}`}>
          {question}
        </span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-lime-600 flex-shrink-0" />
        ) : (
          <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-lime-500" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImagePlaceholder = ({ label, height = "h-64", src }: { label: string, height?: string, src?: string }) => (
  <div className={`w-full ${height} bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 group hover:bg-gray-50 hover:border-lime-300 transition-all cursor-pointer overflow-hidden relative`}>
    {src ? (
      <img src={src} alt={label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    ) : (
      <>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="z-10 flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 text-gray-300 group-hover:text-lime-500" />
          </div>
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs mt-1 opacity-60">이미지를 여기에 넣어주세요</p>
        </div>
      </>
    )}
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const interiorImages = [
    "/시설1.jpg",
    "/시설2.jpg",
    "/시설3.jpg",
    "/시설4.jpg",
    "/시설5.jpg",
    "/시설6.jpg",
    "/시설7.jpg",
    "/시설8.jpg"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-lime-200">맘</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">순천맘편한</h1>
              <p className="text-[10px] text-lime-600 font-bold uppercase tracking-widest mt-1">Daycare Center</p>
            </div>
          </div>
          <nav className="hidden lg:flex gap-10 text-sm font-bold text-gray-500">
            <a href="#intro" className="hover:text-lime-600 transition-colors relative group">
              대표인사
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#communication" className="hover:text-lime-600 transition-colors relative group">
              보호자소통
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#nutrition" className="hover:text-lime-600 transition-colors relative group">
              영양식단
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all group-hover:w-full"></span>
            </a>
            <a href="#faq" className="hover:text-lime-600 transition-colors relative group">
              자주묻는질문
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-500 transition-all group-hover:w-full"></span>
            </a>
          </nav>
          <div className="hidden md:block">
            <button 
              onClick={() => window.open('tel:061-742-5888')}
              className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg"
            >
              상담 예약하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-lime-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                <a 
                  href="#intro" 
                  className="text-lg font-bold text-gray-900 hover:text-lime-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  대표인사
                </a>
                <a 
                  href="#communication" 
                  className="text-lg font-bold text-gray-900 hover:text-lime-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  보호자소통
                </a>
                <a 
                  href="#nutrition" 
                  className="text-lg font-bold text-gray-900 hover:text-lime-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  영양식단
                </a>
                <a 
                  href="#faq" 
                  className="text-lg font-bold text-gray-900 hover:text-lime-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  자주묻는질문
                </a>
                <button 
                  onClick={() => {
                    window.open('tel:061-742-5888');
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-4 bg-lime-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-lime-200"
                >
                  지금 바로 상담하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-lime-50/50 via-white to-lime-50/30 py-12 md:py-28 px-4 overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_center,#84cc16_0.1rem,transparent_0)] [background-size:2rem_2rem] opacity-5 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 md:py-2 bg-white border border-lime-100 text-lime-700 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 shadow-sm">
                <Award className="w-4 h-4" />
                <span>순천시 공식 지정 전문 재활 센터</span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6 md:mb-8 break-keep">
                나이 듦이 <br />
                <span className="text-lime-600 italic">존중받는</span> <br />
                <span className="relative inline-block">
                  따뜻한 안식처
                  <div className="absolute -bottom-2 left-0 w-full h-3 bg-lime-200/50 -z-10"></div>
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                "부모님의 웃음을 되찾아 드립니다." <br />
                전문 재활과 정성 어린 케어로 <br />
                어르신과 가족 모두의 행복을 지킵니다.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                <button 
                  onClick={() => window.open('tel:061-742-5888')}
                  className="px-10 py-5 bg-lime-600 text-white rounded-2xl font-bold shadow-xl shadow-lime-200/50 hover:bg-lime-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <Phone className="w-6 h-6" /> 전화 상담하기
                </button>
                <button 
                  onClick={() => window.open('https://map.naver.com/p/entry/place/1698145203')}
                  className="px-10 py-5 bg-white text-gray-700 border border-gray-200 rounded-2xl font-bold hover:bg-gray-50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg shadow-sm"
                >
                  <MapPin className="w-6 h-6 text-lime-600" /> 위치 확인하기
                </button>
              </div>
            </motion.div>

            {/* Video Section with Premium Frame */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-lime-100/50 rounded-[2.5rem] blur-2xl -z-10"></div>
              <div className="relative aspect-[4/3] md:aspect-video bg-gray-900 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden group">
                <video 
                  className="w-full h-full object-cover opacity-90" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  poster="/어르신행복4.jpg"
                >
                  <source src="/생신잔치 우시는 영상.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 mb-4">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white" />
                  </div>
                  <p className="text-white font-bold text-lg md:text-xl tracking-tight">센터 둘러보기</p>
                </div>
              </div>
              
              {/* Floating Trust Badge */}
              <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-6 rounded-3xl shadow-xl border border-gray-50 max-w-[200px] hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center text-lime-600">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-gray-900">정성 케어</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  매일 아침 건강 체크와 <br />
                  맞춤형 식단 제공
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CEO Greeting Section (Magazine Style) */}
        <section id="intro" className="py-16 md:py-48 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-slate-50/50 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="grid lg:grid-cols-12 gap-24 items-start">
              {/* Left Column: Image & Signature */}
              <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -inset-6 bg-lime-100/30 rounded-[4rem] blur-3xl -z-10"></div>
                  <div className="relative aspect-[3/4] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl group">
                    <img src="/정성현케어1.jpg" alt="정성현 대표" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </motion.div>
                <div className="text-center lg:text-left space-y-2">
                  <p className="font-serif text-5xl font-bold text-slate-900 tracking-tight">정성현</p>
                  <p className="text-lime-600 font-black tracking-[0.3em] uppercase text-xs">Director & Founder</p>
                  <div className="w-20 h-1 bg-lime-500 mx-auto lg:mx-0 mt-6 rounded-full"></div>
                </div>
              </div>

              {/* Right Column: Storytelling Content */}
              <div className="lg:col-span-7 space-y-20">
                <div className="space-y-8">
                  <div className="inline-block px-4 py-1 bg-slate-900 text-lime-400 text-[10px] font-black tracking-widest uppercase rounded-full mb-4">Our Mission</div>
                  <h2 className="text-5xl md:text-8xl font-bold text-slate-900 leading-[1.1] font-serif break-keep">
                    사랑하는 부모님, <br />
                    <span className="italic text-lime-600 relative">
                      어떻게 모실지
                      <svg className="absolute -bottom-4 left-0 w-full h-4 text-lime-200/60 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" /></svg>
                    </span> <br />고민이신가요?
                  </h2>
                </div>

                <div className="prose prose-2xl text-slate-600 space-y-16 leading-relaxed max-w-none">
                  <p className="text-3xl font-medium text-slate-800 leading-snug font-serif">
                    "안녕하세요. 재활을 사랑하는 순천 청년, <br className="hidden md:block" /> 정성현입니다."
                  </p>
                  
                  <div className="relative pl-12 border-l-8 border-lime-100 py-4">
                    <p className="text-xl md:text-2xl italic font-serif text-slate-500 leading-relaxed">
                      순천 토박이인 저는 조부모님의 사랑을 듬뿍 받으며 자랐습니다. 
                      지금도 어르신들의 손을 잡으면, 하늘에 계신 할아버지 생각이 나 가슴이 뭉클해집니다. 
                      제가 어르신들을 뵐 때마다 가족처럼 편안하고 애틋한 이유입니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-8 py-8">
                    <motion.div whileHover={{ y: -10 }} className="rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] shadow-xl group">
                      <img src="/정성현케어2.jpg" alt="정성현 대표의 케어" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </motion.div>
                    <motion.div whileHover={{ y: -10 }} className="rounded-[2rem] md:rounded-[3rem] overflow-hidden aspect-[4/5] shadow-xl group mt-6 md:mt-12">
                      <img src="/어르신행복4.jpg" alt="행복한 어르신" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </motion.div>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-4xl font-bold text-slate-900 font-serif leading-tight">
                      "재활이 만드는 일상의 기적을 믿습니다."
                    </h3>
                    <p className="text-xl leading-relaxed">
                      저는 대학 시절부터 다양한 임상 경험을 쌓며 재활 치료에 푹 빠져 지냈습니다. 
                      단순한 운동을 넘어, 어르신들의 몸이 회복되고 삶의 활력을 되찾는 모습은 제게 가장 큰 기쁨입니다.
                    </p>
                  </div>

                  <blockquote className="bg-slate-900 p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-none relative shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 w-20 h-20 md:w-24 md:h-24 bg-lime-50 rounded-full flex items-center justify-center text-white shadow-2xl rotate-12 group-hover:rotate-0 transition-transform">
                      <Heart className="w-10 h-10 md:w-12 md:h-12 fill-white" />
                    </div>
                    <p className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8 font-serif leading-tight relative z-10">
                      "이 나이에 이렇게 웃고, 몸 움직이는 재미를 느낄 줄 몰랐어."
                    </p>
                    <cite className="text-lime-400 font-black not-italic text-lg tracking-widest uppercase relative z-10">
                      - 센터 이용 어르신의 말씀 중
                    </cite>
                  </blockquote>

                  <p className="text-xl leading-relaxed">
                    부모님을 '어디에 모실까'보다, 
                    <strong className="text-lime-700 font-bold"> '어떻게 하면 조금이라도 더 오래, 건강하게 함께할 수 있을까'</strong>를 고민해 주세요. 
                    저희 주간보호센터가 그 따뜻한 해답이 되어 드리겠습니다.
                  </p>
                </div>

                <div className="pt-12 md:pt-20 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-4 md:gap-10">
                    <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden h-48 md:h-72 shadow-xl group">
                      <img src="/정성현케어3.jpg" alt="정성 어린 케어" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-6 md:p-10">
                        <p className="text-white font-bold text-lg md:text-xl">진심을 다하는 케어</p>
                      </div>
                    </div>
                    <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden h-48 md:h-72 shadow-xl group">
                      <img src="/어르신행복5.jpg" alt="어르신의 웃음" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-6 md:p-10">
                        <p className="text-white font-bold text-lg md:text-xl">어르신의 행복한 미소</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heartwarming Moments Section - Emotional Impact */}
        <section className="py-16 md:py-40 px-4 bg-lime-50/30 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="relative aspect-video bg-gray-900 rounded-[2rem] md:rounded-[4rem] shadow-2xl overflow-hidden group">
                  <video 
                    className="w-full h-full object-cover" 
                    controls
                    playsInline
                    poster="/시설1.jpg"
                  >
                    <source src="/메인홍보동영상.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-white/95 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold text-lime-700 shadow-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    감동의 생신 잔치
                  </div>
                </div>
              </motion.div>
              <div className="order-1 lg:order-2 space-y-10">
                <div className="space-y-4">
                  <span className="text-lime-600 font-bold tracking-widest uppercase text-sm block">Heartwarming Moments</span>
                  <h2 className="text-4xl md:text-7xl font-bold text-gray-900 font-serif leading-tight break-keep">
                    가족보다 더 가족 같은, <br />
                    <span className="text-lime-600 italic">진심의 순간들</span>
                  </h2>
                </div>
                <p className="text-2xl text-gray-600 leading-relaxed font-medium">
                  어르신들의 눈물과 웃음, 그 모든 소중한 순간을 저희가 함께합니다. <br />
                  단순한 보호를 넘어, 마음과 마음이 닿는 진정한 케어를 실천합니다.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                  {[
                    "/어르신행복1.jpg", 
                    "/어르신행복2.jpg", 
                    "/어르신행복3.jpg", 
                    "/어르신행복4.jpg", 
                    "/어르신행복5.jpg", 
                    "/어르신행복6.jpg",
                    "/미용실친구들.jpg",
                    "/중국집.jpg",
                    "/할아버지와의사진.png"
                  ].map((img, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-white/50"
                    >
                      <img src={img} alt="행복한 순간" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family Communication Section - KakaoTalk Gallery */}
        <section id="communication" className="py-16 md:py-40 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
              <div className="max-w-3xl">
                <span className="text-lime-600 font-bold tracking-widest uppercase text-sm mb-6 block">Family Communication</span>
                <h2 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 font-serif leading-tight">
                  보호자님과 함께하는 <br />
                  <span className="text-lime-600 italic">투명한 소통의 기록</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  어르신의 하루 일과와 소중한 순간들을 매일 보호자님께 공유해 드립니다. <br />
                  멀리 계셔도 곁에 계신 것처럼 안심하실 수 있도록 진심을 다해 소통합니다.
                </p>
              </div>
            </div>

            <div className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-2xl">
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="h-[600px] md:h-[900px]"
              >
                {[
                  { src: "/카톡2.jpg", title: "매일 전해드리는 안부", desc: "어르신의 식사, 활동, 건강 상태를 상세히 공유합니다." },
                  { src: "/카톡3.jpg", title: "즐거운 활동 사진", desc: "센터에서 보내는 활기찬 모습들을 사진으로 담아 보냅니다." },
                  { src: "/카톡4.jpg", title: "보호자님의 따뜻한 답장", desc: "보호자님들의 격려와 신뢰는 저희에게 큰 힘이 됩니다." },
                  { src: "/카톡5.jpg", title: "실시간 소통 서비스", desc: "궁금하신 점은 언제든 카톡으로 편하게 문의하실 수 있습니다." },
                  { src: "/카톡6.jpg", title: "정성 어린 기록", desc: "작은 변화 하나 놓치지 않고 꼼꼼하게 기록하고 전달합니다." },
                  { src: "/카톡7.jpg", title: "가족 같은 마음으로", desc: "보호자님의 마음으로 어르신을 모시고 소통하겠습니다." },
                ].map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full bg-gray-50 flex items-center justify-center">
                      <img src={slide.src} alt={slide.title} className="max-h-full w-auto object-contain" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 md:p-20">
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 font-serif">{slide.title}</h3>
                          <p className="text-white/80 text-lg md:text-2xl max-w-2xl leading-relaxed">{slide.desc}</p>
                        </motion.div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        {/* Core Promises Section - Added for better value communication */}
        <section className="py-24 md:py-40 px-4 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500 rounded-full blur-[120px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24">
              <span className="text-lime-400 font-bold tracking-widest uppercase text-sm mb-6 block">Our Commitment</span>
              <h2 className="text-4xl md:text-6xl font-bold font-serif leading-tight">
                맘편한 센터의 <br />
                <span className="text-lime-400 italic">3대 안심 약속</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: "100% 신선 식재료", desc: "매일 아침 엄선된 식재료로 영양사가 직접 설계한 건강한 식단을 제공합니다.", icon: Utensils },
                { title: "매일 맞춤형 재활", desc: "어르신 개개인의 신체 상태에 맞춘 전문 재활 프로그램으로 활기찬 일상을 돕습니다.", icon: Activity },
                { title: "실시간 안심 알림", desc: "어르신의 하루 일과와 건강 상태를 보호자님께 투명하고 상세하게 공유해 드립니다.", icon: Heart },
              ].map((promise, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-lime-500 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 md:mb-8 shadow-lg shadow-lime-500/20 group-hover:scale-110 transition-transform">
                    <promise.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif text-lime-400">{promise.title}</h3>
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed">{promise.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Program Section - Interactive Vertical Timeline */}
        <section id="program" className="py-16 md:py-40 px-4 bg-gray-50/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,#84cc16_0.05rem,transparent_0)] [background-size:3rem_3rem] opacity-5 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-24">
              <span className="text-lime-600 font-bold tracking-widest uppercase text-sm mb-6 block">Daily Schedule</span>
              <h2 className="text-4xl md:text-7xl font-bold text-gray-900 font-serif leading-tight">
                맘편한 센터의 <br />
                <span className="text-lime-600 italic underline underline-offset-8 decoration-lime-200">활기찬 하루 일과</span>
              </h2>
            </div>

            <div className="relative">
              {/* Vertical Line for PC */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-200 via-lime-400 to-lime-200 -translate-x-1/2"></div>

              <div className="space-y-16 lg:space-y-0">
                {[
                  { time: "08:00 - 09:30", title: "어르신 모심 (송영)", desc: "안전한 차량 송영 서비스와 함께 혈압, 체온 등 기초 건강 상태를 확인합니다.", icon: MapPin, side: "left" },
                  { time: "09:30 - 10:30", title: "건강 체크 및 활력 징후", desc: "매일 아침 간호사가 어르신의 건강 상태를 꼼꼼히 체크합니다.", icon: Stethoscope, side: "right" },
                  { time: "10:30 - 12:00", title: "맞춤형 재활 프로그램", desc: "전문 재활 장비를 활용한 운동과 인지 자극 활동으로 몸과 마음의 활기를 찾습니다.", icon: Activity, side: "left" },
                  { time: "12:00 - 13:30", title: "건강한 점심 식사", desc: "영양사가 설계한 균형 잡힌 식단으로 즐거운 식사 시간을 가집니다.", icon: Heart, side: "right" },
                  { time: "13:30 - 15:30", title: "오후 특별 프로그램", desc: "웃음치료, 미술, 음악, 실버 레크리에이션 등 매일 색다른 즐거움을 드립니다.", icon: Users, side: "left" },
                  { time: "15:30 - 16:30", title: "영양 간식 및 휴식", desc: "맛있는 간식과 함께 어르신들끼리 담소를 나누며 휴식합니다.", icon: Utensils, side: "right" },
                  { time: "16:30 - 18:00", title: "안전한 귀가 (송영)", desc: "오늘 하루의 즐거움을 안고 안전하게 댁까지 모셔다 드립니다.", icon: Home, side: "left" },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex flex-col lg:flex-row items-center ${item.side === "right" ? "lg:flex-row-reverse" : ""} lg:mb-24 last:mb-0`}
                  >
                    {/* Timeline Node */}
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-lime-500 rounded-full z-10 items-center justify-center shadow-2xl">
                      <item.icon className="w-7 h-7 text-lime-600" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full lg:w-[45%] ${item.side === "left" ? "lg:text-right lg:pr-20" : "lg:text-left lg:pl-20"}`}>
                      <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 group relative overflow-hidden">
                        <div className={`flex items-center gap-4 mb-4 md:mb-6 ${item.side === "left" ? "lg:flex-row-reverse" : ""}`}>
                          <div className="lg:hidden w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center text-lime-600">
                            <item.icon className="w-6 h-6" />
                          </div>
                          <span className="text-lime-600 font-bold text-xl md:text-2xl font-serif">{item.time}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 font-serif group-hover:text-lime-600 transition-colors">{item.title}</h3>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">{item.desc}</p>
                        <div className={`absolute top-0 ${item.side === "left" ? "right-0" : "left-0"} w-2 h-full bg-lime-500 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nutrition & Meals Section - Premium Gallery */}
        <section id="nutrition" className="py-16 md:py-48 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#84cc16_0.03rem,transparent_0)] [background-size:4rem_4rem] opacity-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <span className="text-lime-600 font-black tracking-[0.3em] uppercase text-xs mb-6 block">Premium Nutrition</span>
              <h2 className="text-5xl md:text-8xl font-bold text-gray-900 mb-10 font-serif leading-tight">
                정성이 담긴 <br />
                <span className="text-lime-600 italic">건강한 식탁</span>
              </h2>
              <p className="text-2xl text-gray-600 leading-relaxed font-medium break-keep">
                매일 아침 신선한 제철 식재료로 조리하는 영양 만점 식사와 간식입니다. <br />
                어르신의 치아 상태와 건강 조건에 맞춘 맞춤형 조리를 원칙으로 합니다.
              </p>
            </div>

            <div className="space-y-16">
              <div className="flex items-center justify-between border-b-8 border-lime-100 pb-8">
                <h3 className="text-4xl font-bold text-gray-900 font-serif flex items-center gap-6">
                  <div className="w-4 h-14 bg-lime-500 rounded-full shadow-lg shadow-lime-200"></div>
                  오늘의 영양 식단 & 간식
                </h3>
                <div className="hidden md:flex items-center gap-4">
                  <span className="px-4 py-2 bg-gray-900 text-white text-xs font-black tracking-widest uppercase rounded-lg">Healthy</span>
                  <span className="px-4 py-2 bg-lime-500 text-white text-xs font-black tracking-widest uppercase rounded-lg">Fresh</span>
                </div>
              </div>

              {/* Unified Grid - Consistent square aspect ratio for all images */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { src: "/식사사진-1.jpg", label: "영양 식사" },
                  { src: "/식사사진-2.jpg", label: "영양 식사" },
                  { src: "/식사사진1.jpg", label: "영양 식사" },
                  { src: "/식사사진2.jpg", label: "영양 식사" },
                  { src: "/식사사진3.jpg", label: "영양 식사" },
                  { src: "/식사사진4.jpg", label: "영양 식사" },
                  { src: "/간식1.jpg", label: "건강 간식" },
                  { src: "/간식2.jpg", label: "건강 간식" },
                  { src: "/간식3.jpg", label: "건강 간식" },
                  { src: "/간식10.jpg", label: "건강 간식" },
                  { src: "/간식11.jpg", label: "건강 간식" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-lg group relative bg-gray-100"
                  >
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-8">
                      <p className="text-white font-bold text-base md:text-xl tracking-tight">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-lime-100 rounded-full text-lime-600 mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
              <p className="text-gray-600">센터 이용에 대해 궁금해하시는 점들을 모았습니다.</p>
            </div>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 px-6 md:px-8">
              <FAQItem 
                question="이용 대상은 어떻게 되나요?"
                answer="노인장기요양보험 등급(1~5등급, 인지지원등급)을 받으신 어르신이라면 누구나 이용 가능합니다. 등급이 없으신 경우 등급 신청 절차부터 친절히 안내해 드립니다."
              />
              <FAQItem 
                question="이용 시간은 어떻게 되나요?"
                answer="보통 월요일부터 토요일까지 운영하며, 오전 8시부터 오후 6시까지 이용하실 수 있습니다. 구체적인 시간은 상담을 통해 조정 가능합니다."
              />
              <FAQItem 
                question="차량 운행도 하시나요?"
                answer="네, 어르신들의 안전한 등·하원을 위해 순천 전 지역 차량 송영 서비스를 무료로 제공하고 있습니다. 집 앞까지 안전하게 모셔다 드립니다."
              />
              <FAQItem 
                question="식사는 어떻게 제공되나요?"
                answer="전문 영양사가 설계한 균형 잡힌 식단으로 매일 신선한 재료를 사용하여 직접 조리합니다. 어르신의 치아 상태나 건강 조건에 맞춰 죽이나 저염식 등 맞춤 식단도 가능합니다."
              />
              <FAQItem 
                question="비용은 어느 정도인가요?"
                answer="장기요양등급이 있으신 경우 국가에서 85~100%를 지원하며, 본인부담금은 0~15% 수준입니다. 식비 및 간식비는 별도로 발생하며, 상세한 견적은 상담을 통해 안내해 드립니다."
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-lime-500 rounded-xl flex items-center justify-center text-white font-bold">맘</div>
              <h2 className="text-2xl font-bold font-serif">순천맘편한주간보호센터</h2>
            </div>
            <div className="space-y-6 text-gray-400">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <MapPin className="w-5 h-5 text-lime-500" />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">위치 안내</p>
                  <p className="text-sm">전남 순천시 충효로 127 2층 (조례동)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 border border-gray-800">
                  <Phone className="w-5 h-5 text-lime-500" />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">전화 상담</p>
                  <p className="text-sm">061-742-5888</p>
                </div>
              </div>
              <p className="text-xs mt-12 opacity-50">
                &copy; 2026 순천맘편한주간보호센터. All rights reserved. <br />
                본 사이트는 어르신들의 인권과 개인정보를 소중히 여깁니다.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-6 text-lime-400 font-serif">상담 및 문의</h3>
              <p className="text-gray-300 mb-10 leading-relaxed text-lg">
                어르신 모심에 대해 고민이 있으시다면 주저하지 말고 연락주세요. <br />
                순천의 아들 정성현 대표가 직접 친절하게 상담해 드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:061-742-5888" className="flex-1 bg-lime-600 hover:bg-lime-700 text-white py-5 rounded-2xl font-bold text-center transition-all shadow-xl shadow-lime-900/20 flex items-center justify-center gap-3 text-lg">
                  <Phone className="w-6 h-6" /> 지금 바로 전화하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons (Mobile Friendly) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-50 w-[90%] max-w-md">
        <button 
          onClick={() => window.open('https://map.naver.com/p/entry/place/1698145203')}
          className="flex-1 bg-white text-gray-900 border border-gray-200 py-4 rounded-2xl font-bold shadow-2xl flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
        >
          <MapPin className="w-5 h-5 text-lime-600" /> 길찾기
        </button>
        <a href="tel:061-742-5888" className="flex-1 bg-lime-600 text-white py-4 rounded-2xl font-bold shadow-2xl shadow-lime-200 flex items-center justify-center gap-2 hover:bg-lime-700 active:scale-95 transition-all">
          <Phone className="w-5 h-5" /> 전화상담
        </a>
      </div>
    </div>
  );
}
