/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface CardItem {
  id: string;
  title: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
  linkParam: string;
}

interface MulticolorCardsProps {
  onCardClick: (type: string, param?: string) => void;
}

const MulticolorCards: React.FC<MulticolorCardsProps> = ({ onCardClick }) => {
  const cards: CardItem[] = [
    {
      id: 'cat',
      title: 'For Cats',
      imageUrl: 'https://naturemagic.com.hk/cdn/shop/files/Grain-free-cat.png?v=1763100946&width=990',
      bgColor: '#5d5d64',
      textColor: '#ffffff',
      linkParam: 'Cat Magic'
    },
    {
      id: 'dog',
      title: 'For Dogs',
      imageUrl: 'https://naturemagic.com.hk/cdn/shop/files/Grain-free-dog_69665950-e47d-4cf2-83f4-9489de8709ec.png?v=1763100882&width=990',
      bgColor: '#5d5d64',
      textColor: '#ffffff',
      linkParam: 'Dog Magic'
    }
  ];

  return (
    <section className="multicolor-cards-section py-12 px-6 bg-[#F5F2EB]">
      <div className="max-w-[600px] mx-auto flex justify-center"> 
        <ul className="multicolors-cards__list flex flex-wrap justify-center gap-4 md:gap-8">
          {cards.map((card, index) => (
            <li 
              key={card.id}
              className="multicolors-cards__item group relative flex items-center justify-center"
              style={{ 
                width: '230px', 
                height: '190px',
                animationDelay: `${(index + 1) * 0.1}s` 
              }}
              onClick={() => onCardClick('collection', card.linkParam)}
            >
              {/* 1. 底層方框 (200x100) - 懸停時縮小 */}
              <div 
                className="multicolors-cards__box absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center pb-6 rounded-[1.5rem] transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-90 shadow-sm"
                style={{ 
                  width: '200px',
                  height: '100px',
                  backgroundColor: card.bgColor
                }}
              >
                <h2 
                  className="text-lg font-serif font-bold tracking-tight pointer-events-none"
                  style={{ color: card.textColor }}
                >
                  {card.title}
                </h2>
              </div>

              {/* 2. 頂層圖片 (160x80) - 懸停時放大並部分重疊在方框上 */}
              <div 
                className="multicolors-cards__image absolute left-1/2 -translate-x-1/2 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-110 pointer-events-none"
                style={{ 
                    width: '160px', 
                    height: '80px',
                    bottom: '60px', // 讓圖片底部壓在方框(100px高)的 40px 處
                }}
              >
                <img 
                  src={card.imageUrl} 
                  alt={card.title}
                  className="w-full h-full object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .multicolors-cards__item {
          opacity: 0;
          animation: zoomOutFadeIn 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
          cursor: pointer;
        }

        @keyframes zoomOutFadeIn {
          from { 
            opacity: 0; 
            transform: scale(1.05) translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        /* 確保在超小屏幕上也能正確排列 */
        @media (max-width: 480px) {
          .multicolors-cards__list {
            gap: 1rem;
          }
          .multicolors-cards__item {
            transform: scale(0.85); /* 小螢幕整體縮放一點以適應 */
          }
        }
      `}</style>
    </section>
  );
};

export default MulticolorCards;
