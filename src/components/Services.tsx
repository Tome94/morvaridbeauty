"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useTranslations } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Parse image filename to readable label
const parseImageLabel = (imagePath: string): { title: string; technique: string } => {
  // Extract filename without extension
  const filename = imagePath.split('/').pop()?.replace(/\.(jpg|jpeg|png|webp)$/i, '') || '';
  
  // Remove number suffixes like -1, -2
  const cleanName = filename.replace(/-?\d+$/, '');
  
  // Parse common patterns
  let title = cleanName
    .replace(/&/g, ' & ')
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Capitalize each word
  title = title
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Determine technique based on keywords
  let technique = '';
  const lowerName = cleanName.toLowerCase();
  
  if (lowerName.includes('balayage')) technique = 'Balayage';
  else if (lowerName.includes('highlight')) technique = 'Highlights';
  else if (lowerName.includes('ombre')) technique = 'Ombré';
  else if (lowerName.includes('keratin')) technique = 'Keratin Treatment';
  else if (lowerName.includes('microblading')) technique = 'Microblading';
  else if (lowerName.includes('updo')) technique = 'Updo';
  else if (lowerName.includes('extension')) technique = 'Extensions';
  else if (lowerName.includes('makeup')) technique = 'Makeup';
  else if (lowerName.includes('bridal') || lowerName.includes('wedding')) technique = 'Bridal';
  else if (lowerName.includes('bob')) technique = 'Bob Cut';
  else if (lowerName.includes('haircut')) technique = 'Haircut';
  else if (lowerName.includes('style')) technique = 'Styling';
  else if (lowerName.includes('color') || lowerName.includes('colour')) technique = 'Colour';
  else if (lowerName.includes('root')) technique = 'Root Touch Up';
  else if (lowerName.includes('before-after')) technique = 'Before & After';
  
  // Clean up title (remove "main" suffix)
  title = title.replace(/\s*Main$/i, '').replace(/\s*Before After$/i, ' (Before & After)');
  
  return { title, technique };
};

// Responsive pagination config
const getPageInfo = (activeIndex: number, screenWidth: number) => {
  if (screenWidth >= 1024) {
    return { page: activeIndex < 2 ? 1 : 2, totalPages: 2 };
  } else if (screenWidth >= 768) {
    const page = activeIndex < 2 ? 1 : activeIndex < 4 ? 2 : 3;
    return { page, totalPages: 3 };
  } else {
    return { page: activeIndex + 1, totalPages: 5 };
  }
};

// Gallery images for each service category
const serviceGalleries: Record<string, string[]> = {
  colour: [
    "/images/hair/Color-cut-style-main.jpg",
    "/images/hair/balayage&cut&style-1.jpg",
    "/images/hair/balayage&cut&style-2.jpg",
    "/images/hair/balayage&cut&style-3.jpg",
    "/images/hair/balayage&cut&style-4.jpg",
    "/images/hair/Balayage&cut&style-5.jpg",
    "/images/hair/balayage&highlights-1.jpg",
    "/images/hair/Balayage&Highlights-2.jpg",
    "/images/hair/color-cut-blowdry-1.jpg",
    "/images/hair/color-cut-style-2.jpg",
    "/images/hair/color-cut-style-3.jpg",
    "/images/hair/color&cut-4.jpg",
    "/images/hair/color&highlights-1.jpg",
    "/images/hair/highlights1.jpg",
    "/images/hair/Highlights-2.jpg",
    "/images/hair/Highlights-3.jpg",
    "/images/hair/FullHighlight-4.jpg",
    "/images/hair/Fullhighlight-5.jpg",
    "/images/hair/highlights-6.jpg",
    "/images/hair/Fullhighlight-7.jpg",
    "/images/hair/ombre-1.jpg",
    "/images/hair/RootTouchUp-1.jpg",
  ],
  treatments: [
    "/images/hair/keratin-main.jpg",
    "/images/hair/keratin-1.jpg",
    "/images/hair/keratin-2.jpg",
    "/images/hair/keratin-3.jpg",
    "/images/hair/keratin-4.jpg",
    "/images/hair/keratin-before-after-1.jpg",
    "/images/hair/Keratin-before-after-2.jpg",
    "/images/hair/keratin-before-after-3.jpg",
  ],
  "cut-style": [
    "/images/hair/cut&style-main.jpg",
    "/images/hair/haircut-1.jpg",
    "/images/hair/haircut&style-1.jpg",
    "/images/hair/haircut&style-2.jpg",
    "/images/hair/bobhaircut-1.jpg",
    "/images/hair/style-1.jpg",
    "/images/hair/style-2.jpg",
    "/images/hair/style-3.jpg",
  ],
  "bridal-events": [
    "/images/hair/Makeup-style-event-main.jpg",
    "/images/hair/makeup-1.jpg",
    "/images/hair/makeup-2.jpg",
    "/images/hair/makeup-cut-event-2.jpg",
    "/images/hair/makeup-style-event.jpg",
    "/images/hair/updo-wedding.jpg",
    "/images/hair/updo-extensions-2.jpg",
    "/images/hair/Half-Up-do-extensions-1.jpg",
    "/images/hair/HairExtensions-1.jpg",
    "/images/hair/cut-event.jpg",
  ],
  "brow-face": [
    "/images/hair/eyebrow-microblading-main.jpg",
    "/images/hair/microblading-eyebrow-1.jpg",
    "/images/hair/microblading-eyebrow-2.jpg",
    "/images/hair/mircoblading-eyebrow-3.jpg",
    "/images/hair/microblading-eyebrow-4.jpg",
  ],
};

export default function Services() {
  const t = useTranslations("services");
  
  // Morvarid's main service categories - inside component to use translations
  const serviceCards = [
    { 
      id: "colour", 
      title: t("colour.title"), 
      subtitle: t("colour.subtitle"),
      image: "/images/hair/Color-cut-style-main.jpg",
      alt: "Dimensional hair colour - highlights and balayage",
      href: "https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
    },
    { 
      id: "treatments", 
      title: t("treatments.title"), 
      subtitle: t("treatments.subtitle"),
      image: "/images/hair/keratin-main.jpg",
      alt: "Smoothing and repair treatments",
      href: "https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
    },
    { 
      id: "cut-style", 
      title: t("cutStyle.title"), 
      subtitle: t("cutStyle.subtitle"),
      image: "/images/hair/cut&style-main.jpg",
      alt: "Precision haircuts with styling",
      href: "https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
    },
    { 
      id: "bridal-events", 
      title: t("bridalEvents.title"), 
      subtitle: t("bridalEvents.subtitle"),
      image: "/images/hair/Makeup-style-event-main.jpg",
      alt: "Wedding and special event styling",
      href: "https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
    },
    { 
      id: "brow-face", 
      title: t("browFace.title"), 
      subtitle: t("browFace.subtitle"),
      image: "/images/hair/eyebrow-microblading-main.jpg",
      alt: "Facial waxing and threading services",
      href: "https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
    },
  ];
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationMobileRef = useRef<HTMLDivElement>(null);
  const paginationDesktopRef = useRef<HTMLDivElement>(null);
  const [isPage2, setIsPage2] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [galleryColumns, setGalleryColumns] = useState(5);
  const GALLERY_ROWS = 2;

  // Update columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1280) setGalleryColumns(5);      // xl
      else if (width >= 1024) setGalleryColumns(4); // lg
      else if (width >= 768) setGalleryColumns(3);  // md
      else setGalleryColumns(2);                     // mobile
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const imagesPerPage = galleryColumns * GALLERY_ROWS;

  // Get the active service card info
  const activeServiceCard = serviceCards.find(card => card.id === activeGallery);
  const galleryImages = activeGallery ? serviceGalleries[activeGallery] || [] : [];
  const totalGalleryPages = Math.ceil(galleryImages.length / imagesPerPage) || 1;
  const paginatedImages = galleryImages.slice(
    (galleryPage - 1) * imagesPerPage,
    galleryPage * imagesPerPage
  );

  // Reset page if it exceeds total pages after resize
  useEffect(() => {
    if (galleryPage > totalGalleryPages && totalGalleryPages > 0) {
      setGalleryPage(totalGalleryPages);
    }
  }, [galleryPage, totalGalleryPages]);

  const openGallery = (serviceId: string) => {
    setActiveGallery(serviceId);
    setGalleryPage(1);
    setDropdownOpen(false);
  };

  const closeGallery = () => {
    setActiveGallery(null);
    setSelectedImage(null);
    setGalleryPage(1);
  };

  const nextGalleryPage = () => {
    if (galleryPage < totalGalleryPages) {
      setGalleryPage(prev => prev + 1);
    }
  };

  const prevGalleryPage = () => {
    if (galleryPage > 1) {
      setGalleryPage(prev => prev - 1);
    }
  };

  useEffect(() => {
    // Update pagination when screen size changes
    const updatePaginationOnResize = () => {
      if (swiperRef.current) {
        const { page, totalPages } = getPageInfo(swiperRef.current.activeIndex, window.innerWidth);
        const text = `${page} / ${totalPages}`;
        if (paginationMobileRef.current) paginationMobileRef.current.innerHTML = text;
        if (paginationDesktopRef.current) paginationDesktopRef.current.innerHTML = text;
      }
    };
    updatePaginationOnResize();
    window.addEventListener('resize', updatePaginationOnResize);
    return () => window.removeEventListener('resize', updatePaginationOnResize);
  }, []);

  const updatePagination = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const { page, totalPages } = getPageInfo(swiper.activeIndex, width);
    const text = `${page} / ${totalPages}`;
    if (paginationMobileRef.current) paginationMobileRef.current.innerHTML = text;
    if (paginationDesktopRef.current) paginationDesktopRef.current.innerHTML = text;
  };

  const handleTransitionEnd = (swiper: SwiperType) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    if (width >= 1024) {
      setIsPage2(swiper.activeIndex >= 2);
    } else {
      setIsPage2(false);
    }
  };

  const handleServiceClick = (index: number) => {
    // Navigate slider to that service
    swiperRef.current?.slideTo(index);
  };

  return (
    <section id="services" className="services-section bg-white">
      <div className="services-section__inner py-16 md:py-24">
        {/* Mobile Header (< 768px) */}
        <div className="md:hidden px-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Left: Title + Dropdown/Back */}
            <div className="flex items-center gap-3">
              {activeGallery ? (
                <>
                  <button onClick={closeGallery} className="text-warm-gray/50 hover:text-warm-gray transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-warm-gray font-light italic">{activeServiceCard?.title}</h2>
                </>
              ) : (
                <>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl text-warm-gray font-light">{t("title")}</h2>
                  {/* Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="group flex items-center gap-2 text-warm-gray"
                    >
                      <span className="font-[family-name:var(--font-cormorant)] text-lg text-gold italic">{serviceCards[swiperRef.current?.activeIndex ?? 0]?.title || 'Select'}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className={`text-gold transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z" fill="currentColor"/>
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                        <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-cream z-20 min-w-[160px] py-2 animate-fadeIn">
                          {serviceCards.map((card, index) => (
                            <button
                              key={card.id}
                              onClick={() => {
                                handleServiceClick(index);
                                setDropdownOpen(false);
                              }}
                              className={`block w-full text-left py-2 px-4 font-[family-name:var(--font-montserrat)] text-sm tracking-wide transition-all duration-200 ${
                                index === (swiperRef.current?.activeIndex ?? 0)
                                  ? 'text-gold bg-cream/40 border-l-2 border-gold' 
                                  : 'text-warm-gray hover:text-gold hover:bg-cream/20 border-l-2 border-transparent'
                              }`}
                            >
                              {card.title}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            {/* Right: Pagination - Slider or Gallery */}
            <div className="flex items-center gap-2">
              {activeGallery ? (
                <>
                  <button onClick={prevGalleryPage} disabled={galleryPage === 1} className={`w-7 h-7 flex items-center justify-center transition-opacity ${galleryPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Previous page">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div className="font-[family-name:var(--font-montserrat)] text-xs text-warm-gray tabular-nums min-w-[32px] text-center">{galleryPage} / {totalGalleryPages}</div>
                  <button onClick={nextGalleryPage} disabled={galleryPage === totalGalleryPages} className={`w-7 h-7 flex items-center justify-center transition-opacity ${galleryPage === totalGalleryPages ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Next page">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => swiperRef.current?.slidePrev()} disabled={isBeginning} className={`w-7 h-7 flex items-center justify-center transition-opacity ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Previous">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div ref={paginationMobileRef} className="font-[family-name:var(--font-montserrat)] text-xs text-warm-gray tabular-nums min-w-[32px] text-center">1 / 5</div>
                  <button onClick={() => swiperRef.current?.slideNext()} disabled={isEnd} className={`w-7 h-7 flex items-center justify-center transition-opacity ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Next">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Medium Header (768px - 1023px) */}
        <div className="hidden md:block lg:hidden px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Left: Title + Back button if gallery */}
            <div className="flex items-center gap-3">
              {activeGallery && (
                <button onClick={closeGallery} className="text-warm-gray/50 hover:text-warm-gray transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl text-warm-gray font-light">
                {activeGallery ? <span className="italic">{activeServiceCard?.title}</span> : t("title")}
              </h2>
            </div>
            {/* Right: Pagination - Slider or Gallery */}
            <div className="flex items-center gap-3">
              {activeGallery ? (
                <>
                  <button onClick={prevGalleryPage} disabled={galleryPage === 1} className={`w-8 h-8 flex items-center justify-center transition-opacity ${galleryPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Previous page">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray tabular-nums min-w-[40px] text-center">
                    {galleryPage} / {totalGalleryPages}
                  </div>
                  <button onClick={nextGalleryPage} disabled={galleryPage === totalGalleryPages} className={`w-8 h-8 flex items-center justify-center transition-opacity ${galleryPage === totalGalleryPages ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Next page">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => swiperRef.current?.slidePrev()} disabled={isBeginning} className={`w-8 h-8 flex items-center justify-center transition-opacity ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray tabular-nums min-w-[40px] text-center">
                    {(() => {
                      const { page, totalPages } = getPageInfo(swiperRef.current?.activeIndex ?? 0, 768);
                      return `${page} / ${totalPages}`;
                    })()}
                  </div>
                  <button onClick={() => swiperRef.current?.slideNext()} disabled={isEnd} className={`w-8 h-8 flex items-center justify-center transition-opacity ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`} aria-label="Next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>
          {/* Horizontal category links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {serviceCards.map((card) => (
              <button
                key={card.id}
                onClick={() => openGallery(card.id)}
                className={`font-[family-name:var(--font-montserrat)] text-sm tracking-[0.05em] transition-all duration-300 hover:text-gold ${
                  activeGallery === card.id ? 'text-gold' : 'text-warm-gray-light'
                }`}
              >
                {card.title}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: Nav on left, Slider on right */}
        <div className="relative flex flex-col lg:flex-row lg:items-stretch">
          {/* Title Section - hidden on mobile */}
          <div 
            className="services-section__heading hidden lg:flex px-6 lg:px-16 mb-8 lg:mb-0 flex-col justify-between transition-all duration-700 ease-out overflow-hidden flex-shrink-0"
            style={{ 
              width: activeGallery ? '280px' : (isPage2 ? '300px' : '450px'),
            }}
          >
            {/* Top: Title & Nav */}
            <div className="flex flex-col gap-4 ml-auto">
              {/* Back button when gallery is active */}
              {activeGallery && (
                <button
                  onClick={closeGallery}
                  className="group flex items-center gap-2 text-warm-gray/50 hover:text-warm-gray transition-all duration-300 mb-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.1em] uppercase">{t("back")}</span>
                </button>
              )}
              
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl lg:text-5xl text-warm-gray font-light">
                {activeGallery ? (
                  <span className="italic">{activeServiceCard?.title}</span>
                ) : (
                  t("title")
                )}
              </h2>
              
              {/* Category Navigation */}
              <nav className="flex flex-col gap-2">
                {serviceCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => openGallery(card.id)}
                    className={`text-left font-[family-name:var(--font-montserrat)] text-sm tracking-[0.05em] transition-all duration-300 hover:text-gold ${
                      activeGallery === card.id ? 'text-gold' : 'text-warm-gray-light'
                    }`}
                  >
                    {card.title}
                  </button>
              ))}
            </nav>
            </div>

            {/* Bottom: Pagination for slider or gallery */}
            <div className="flex items-center gap-4 ml-auto">
              {activeGallery ? (
                <>
                  <button
                    onClick={prevGalleryPage}
                    disabled={galleryPage === 1}
                    className={`w-8 h-8 flex items-center justify-center transition-opacity ${galleryPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`}
                    aria-label="Previous page"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray tabular-nums">
                    {galleryPage} / {totalGalleryPages}
                  </div>
                  <button
                    onClick={nextGalleryPage}
                    disabled={galleryPage === totalGalleryPages}
                    className={`w-8 h-8 flex items-center justify-center transition-opacity ${galleryPage === totalGalleryPages ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`}
                    aria-label="Next page"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    disabled={isBeginning}
                    className={`w-8 h-8 flex items-center justify-center transition-opacity ${isBeginning ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`}
                    aria-label="Previous"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M15.129 18.131C14.8556 18.4044 14.4124 18.4044 14.139 18.131L8.50301 12.495C8.22964 12.2216 8.22964 11.7784 8.50301 11.505L14.139 5.86899C14.4124 5.59562 14.8556 5.59562 15.129 5.86899C15.4024 6.14235 15.4024 6.58557 15.129 6.85894L9.98793 12L15.129 17.1411C15.4024 17.4144 15.4024 17.8576 15.129 18.131Z" fill="currentColor"/></svg>
                  </button>
                  <div 
                    ref={paginationDesktopRef}
                    className="font-[family-name:var(--font-montserrat)] text-sm text-warm-gray tabular-nums"
                  >
                    1 / 2
                  </div>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    disabled={isEnd}
                    className={`w-8 h-8 flex items-center justify-center transition-opacity ${isEnd ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70'}`}
                    aria-label="Next"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-warm-gray"><path fillRule="evenodd" clipRule="evenodd" d="M8.86893 5.86899C9.1423 5.59562 9.58551 5.59562 9.85888 5.86899L15.4949 11.505C15.7683 11.7784 15.7683 12.2216 15.4949 12.495L9.85888 18.131C9.58551 18.4044 9.1423 18.4044 8.86893 18.131C8.59556 17.8576 8.59556 17.4144 8.86893 17.1411L14.01 12L8.86893 6.85894C8.59556 6.58557 8.59556 6.14235 8.86893 5.86899Z" fill="currentColor"/></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Content Section - Slider OR Gallery */}
          <div className="services-section__main flex-1 relative overflow-hidden">
            {/* Slider View */}
            <div className={`transition-all duration-700 ease-out ${activeGallery ? 'opacity-0 pointer-events-none absolute inset-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
              <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  updatePagination(swiper);
                }}
                onSlideChange={(swiper) => updatePagination(swiper)}
                onSlideChangeTransitionEnd={(swiper) => handleTransitionEnd(swiper)}
                spaceBetween={20}
                slidesPerView="auto"
                slidesPerGroup={1}
                speed={500}
                threshold={10}
                watchSlidesProgress={false}
                observer={false}
                observeParents={false}
                className="services-slider px-6 lg:px-0"
                breakpoints={{
                  0: { slidesPerGroup: 1, spaceBetween: 12 },
                  768: { slidesPerGroup: 2, spaceBetween: 16 },
                  1024: { slidesPerGroup: 2, spaceBetween: 20 },
                }}
              >
                {serviceCards.map((card) => (
                  <SwiperSlide 
                    key={card.id}
                    className="!w-[85vw] sm:!w-[70vw] md:!w-[45vw] lg:!w-[450px]"
                  >
                    <button
                      onClick={() => openGallery(card.id)}
                      className="r-content-tile block group w-full text-left cursor-pointer"
                      aria-label={`View ${card.title} gallery`}
                    >
                      <div className="relative aspect-[5/7] overflow-hidden bg-cream">
                        <Image
                          src={card.image}
                          alt={card.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 40vw, 80vw"
                          loading="lazy"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-6 text-center">
                          <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-white mb-1">
                            {card.title}
                          </p>
                          <p className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.1em] text-white/80 mb-4">
                            {card.subtitle}
                          </p>
                          <span className="font-[family-name:var(--font-montserrat)] text-xs tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors duration-300 border-b border-white/70 hover:border-white pb-0.5">
                            {t("discover")}
                          </span>
                        </div>
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Gallery View - In-place replacement with pagination */}
            {activeGallery && (
              <div className="animate-fadeInScale px-6 lg:px-0">
                {/* Gallery Grid - key triggers re-animation on page change */}
                <div 
                  key={`${activeGallery}-${galleryPage}`}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
                >
                  {paginatedImages.map((image, index) => {
                    const globalIndex = (galleryPage - 1) * imagesPerPage + index;
                    
                    return (
                      <button
                        key={globalIndex}
                        onClick={() => setSelectedImage(image)}
                        className="gallery-item relative overflow-hidden group cursor-pointer"
                      >
                        {(() => {
                          const { title, technique } = parseImageLabel(image);
                          return (
                            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                              <Image
                                src={image}
                                alt={`${activeServiceCard?.title} - ${title}`}
                                fill
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
                                sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                                loading="eager"
                              />
                              {/* Hover overlay with gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              
                              {/* Info overlay */}
                              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <p className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl text-white leading-tight mb-1">
                                  {title}
                                </p>
                                {technique && (
                                  <p className="font-[family-name:var(--font-montserrat)] text-[10px] tracking-[0.15em] uppercase text-gold/90">
                                    {technique}
                                  </p>
                                )}
                              </div>
                              
                              {/* Zoom icon */}
                              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 ease-out">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </button>
                    );
                  })}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox for viewing full-size images */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-8 right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white group-hover:rotate-90 transition-transform duration-300">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = galleryImages.indexOf(selectedImage);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
              setSelectedImage(galleryImages[prevIndex]);
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = galleryImages.indexOf(selectedImage);
              const nextIndex = currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(galleryImages[nextIndex]);
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-[family-name:var(--font-montserrat)] text-xs tracking-[0.2em] text-white/60">
            {galleryImages.indexOf(selectedImage) + 1} / {galleryImages.length}
          </div>

          {/* Main image */}
          <div 
            className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Full size view"
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
