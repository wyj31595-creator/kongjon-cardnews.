import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Phone, MapPin } from 'lucide-react';
import { CardContent } from './types';

const CARD_NEWS_CONFIG = {
  images: {
    page1: "https://i.postimg.cc/258FFbTj/photo1.jpg",
    page2: "https://i.postimg.cc/ncGDRVXK/photo2.jpg",
    page3: "https://i.postimg.cc/LXPqzmdk/photo3.png",
    page4: "https://i.postimg.cc/WbTDkR5c/photo4.jpg",
    page5: "https://i.postimg.cc/QdnVwFhT/photo5.jpg",
  },
  links: {
    donation: "https://www.ihappynanum.com/Nanum/B/KV58E5SU28",
    homepage: "http://www.kongjon.or.kr/",
    taxBenefit: "http://www.kongjon.or.kr/4_1.php",
  },
  centerInfo: {
    name: "사회적협동조합 공존",
    address: "사회적협동조합 공존 부일로 232, 3층 22호",
    phone: "032-710-3650"
  }
};

const CARDS: CardContent[] = [
  {
    id: 1,
    title: "우리의 평범한 일상이\n특별한 기적이 됩니다",
    subtitle: "새로운 한 해, 공존과 함께해주셔서 감사합니다.",
    body: "지난 한 해의 격동을 뒤로하고,\n여러분의 건강과 행복을 진심으로 기원합니다.",
    keyword: "#평범한일상 #특별한기적",
    image: CARD_NEWS_CONFIG.images.page1,
  },
  {
    id: 2,
    title: "설립 5년, 그동안 쌓아온\n소중한 일상의 경험들",
    body: "발달장애인들이 비장애인의 삶 속에서 함께 공존하는 삶을 준비할 수 있도록, 다양한 프로그램을 통해 일상을 축적해왔습니다.",
    keyword: "#공존의준비 #일상의축적",
    image: CARD_NEWS_CONFIG.images.page2,
  },
  {
    id: 3,
    title: "형제 자매의 힘겨운 돌봄,\n이제 우리가 나설 때입니다",
    body: "보호자의 고령화와 부재로 인해 남겨진 가족들의 어깨가 무거워지고 있습니다. 독립적인 삶을 위한 공동주택(그룹홈) 운영이 시급합니다.",
    keyword: "#함께돌봄 #그룹홈필요",
    image: CARD_NEWS_CONFIG.images.page3,
  },
  {
    id: 4,
    title: "공존의 울타리가\n되어주시겠어요?",
    body: "공존이 멈추지 않고 운영되기 위해서는 여러분의 정기적인 따듯한 손길이 필요합니다. 작은 나눔이 모여 커다란 울타리가 됩니다.",
    keyword: "#작은나눔 #커다란울타리",
    buttonText: "월 1~2만원의 기적",
    image: CARD_NEWS_CONFIG.images.page4,
  },
  {
    id: 5,
    title: "지금, 당신의 사랑을\n전달해주세요",
    body: "매달 커피 몇 잔의 금액으로 발달장애인의 내일을 바꿀 수 있습니다. 연말정산 시 세제 혜택도 함께 누리세요.",
    keyword: "#사랑의실천 #내일의희망",
    isLastPage: true,
    image: CARD_NEWS_CONFIG.images.page5,
  },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => {
    if (currentIndex < CARDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentCard = CARDS[currentIndex];
  const isLastPage = currentIndex === CARDS.length - 1;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden font-sans">
      <div 
        className="relative w-full max-w-md h-screen sm:h-[92vh] sm:rounded-[32px] bg-white shadow-2xl overflow-hidden flex flex-col select-none border border-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-[45%] overflow-hidden bg-gray-200">
          <img key={currentCard.image} src={currentCard.image} alt="카드 이미지" className="w-full h-full object-cover transition-opacity duration-700" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent backdrop-blur-[2px]"></div>
          <div className="absolute top-0 left-0 w-full h-1 z-30 flex gap-1 px-4 pt-4">
             {CARDS.map((_, idx) => (
               <div key={idx} className="flex-1 h-full bg-black/10 overflow-hidden rounded-full">
                 <div className={`h-full bg-emerald-500 transition-all duration-300 ${idx <= currentIndex ? 'w-full' : 'w-0'}`} />
               </div>
             ))}
          </div>
          <div className="absolute top-8 right-6 z-10">
            <div className="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-black text-[10px] font-bold">
              {currentIndex + 1} / {CARDS.length}
            </div>
          </div>
        </div>

        <div className="relative flex-1 flex flex-col px-8 pb-4 pt-2 bg-white">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold tracking-tight border border-emerald-100">
              {currentCard.keyword}
            </span>
          </div>
          <h1 className="text-[26px] sm:text-[28px] font-black text-gray-900 leading-[1.3] mb-5 whitespace-pre-wrap tracking-tight">
            {currentCard.title}
          </h1>
          <div className="space-y-4">
            {currentCard.subtitle && (
              <p className="text-emerald-700 font-bold text-[15px] leading-relaxed border-l-4 border-emerald-500 pl-3">
                {currentCard.subtitle}
              </p>
            )}
            {currentCard.body && (
              <p className="text-gray-600 text-[14px] sm:text-[15px] leading-[1.6] font-medium whitespace-pre-wrap">
                {currentCard.body}
              </p>
            )}
          </div>
          {currentCard.buttonText && (
            <div className="mt-auto py-4 flex justify-center">
              <span className="bg-yellow-400 text-yellow-900 px-8 py-3 rounded-full font-bold text-sm shadow-md animate-bounce">
                {currentCard.buttonText}
              </span>
            </div>
          )}
          {currentCard.isLastPage && (
            <div className="mt-auto py-4">
              <button 
                onClick={() => window.open(CARD_NEWS_CONFIG.links.donation, '_blank')}
                className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold text-[18px] flex items-center justify-center gap-3 shadow-lg"
              >
                <Heart className="w-6 h-6 fill-current" />
                우리의 울타리 되어주기
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-50/80 backdrop-blur-md p-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-2 ${currentIndex === 0 ? 'text-gray-200' : 'text-gray-400'}`}><ChevronLeft /></button>
            <div className="flex gap-1.5">
               {CARDS.map((_, idx) => <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-6 bg-emerald-500' : 'w-1.5 bg-gray-200'}`} />)}
            </div>
            <button onClick={nextSlide} disabled={currentIndex === CARDS.length - 1} className={`p-2 ${currentIndex === CARDS.length - 1 ? 'text-gray-200' : 'text-gray-400'}`}><ChevronRight /></button>
          </div>

          {isLastPage && (
            <div className="grid grid-cols-2 gap-3 mb-6">
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.homepage, '_blank')} className="bg-white py-3 rounded-xl border border-gray-100 text-[11px] font-bold text-gray-700 shadow-sm flex items-center justify-center gap-2"><ExternalLink size={14} /> 홈페이지</button>
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.taxBenefit, '_blank')} className="bg-white py-3 rounded-xl border border-gray-100 text-[11px] font-bold text-gray-700 shadow-sm flex items-center justify-center gap-2"><ExternalLink size={14} /> 세제 혜택</button>
            </div>
          )}

          <div className="flex flex-col items-center gap-2 pt-1">
             <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-700 font-bold tracking-tighter">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" /> 
                {CARD_NEWS_CONFIG.centerInfo.address}
             </div>
             <a href={`tel:${CARD_NEWS_CONFIG.centerInfo.phone}`} className="flex items-center justify-center gap-2 px-6 py-2 bg-emerald-50 rounded-full text-[13px] text-emerald-700 font-black border border-emerald-100 shadow-sm active:scale-95">
               <Phone className="w-4 h-4 fill-emerald-700" /> 
               전화 문의: {CARD_NEWS_CONFIG.centerInfo.phone}
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;