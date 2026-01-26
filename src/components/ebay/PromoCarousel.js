import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
    {
        id: 1,
        title: "Your next collectible awaits",
        subtitle: "Find what you've been hunting for.",
        cta: "Shop now",
        bgColor: "bg-[#00a3ff]",
        textColor: "text-[#191919]",
        isDark: false,
        images: [
            { src: "/images/ebay/ads/ad_card.png", label: "Trading cards" },
            { src: "/images/ebay/ads/ad_toy.png", label: "Toys" },
            { src: "/images/ebay/ads/ad_comic.png", label: "Comics" }
        ]
    },
    {
        id: 2,
        title: "Every grail has a story",
        subtitle: "Take home collectibles to start the next chapter.",
        cta: "Shop now",
        bgColor: "bg-[#ffc800]",
        textColor: "text-[#191919]",
        isDark: false,
        images: [
            { src: "/images/ebay/ads/ad_coin.png", label: "Coins" },
            { src: "/images/ebay/ads/ad_jersey.png", label: "Sports memorabilia" },
            { src: "/images/ebay/ads/ad_antique.png", label: "Antiques" }
        ]
    },
    {
        id: 3,
        title: "Luxury looks at up to 50% off",
        subtitle: "Score your favorite designer fashion labels for less.",
        cta: "Shop now",
        bgColor: "bg-[#0c4d5d]",
        textColor: "text-white",
        isDark: true, // Use cards for images
        images: [
            { src: "/images/ebay/ads/ad_shirt.png", label: "" },
            { src: "/images/ebay/ads/ad_dress.png", label: "" },
            { src: "/images/ebay/products/clothing-shoes-accessories/905.png", label: "" }
        ]
    },
    {
        id: 4,
        title: "Up to 60% off at The Brand Outlet",
        subtitle: "Find epic deals on your favorite brands.",
        cta: "Save now",
        bgColor: "bg-[#00a3ff]",
        textColor: "text-[#191919]",
        isDark: false,
        images: [
            { src: "/images/ebay/ads/ad_shoe.png", label: "adidas" },
            { src: "/images/ebay/ads/ad_mixer.png", label: "KitchenAid" },
            { src: "/images/ebay/ads/ad_phone.png", label: "Verizon" }
        ]
    }
];

const PromoCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className={`w-full rounded-2xl overflow-hidden relative transition-colors duration-500 ${currentSlide.bgColor} mt-8`}>
            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center h-[360px] md:h-[400px] relative">

                {/* Left Text View */}
                <div className={`flex-1 p-8 md:p-16 flex flex-col justify-center items-start z-10 ${currentSlide.textColor}`}>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight max-w-lg">
                        {currentSlide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-8 font-medium max-w-md opacity-90">
                        {currentSlide.subtitle}
                    </p>
                    <button className={`${currentSlide.isDark ? 'bg-white text-[#191919]' : 'bg-[#191919] text-white'} px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity`}>
                        {currentSlide.cta}
                    </button>
                </div>

                {/* Right Images View */}
                <div className="flex-1 w-full h-full flex items-center justify-center relative">
                    <div className="flex justify-center items-end gap-4 md:gap-8 transform translate-y-4 md:translate-y-0">
                        {currentSlide.images.map((img, idx) => (
                            <div key={idx} className="group cursor-pointer flex flex-col items-center">
                                {/* Image Container */}
                                <div className={`
                                    relative transition-transform duration-300 transform group-hover:-translate-y-2
                                    ${currentSlide.isDark ? 'bg-white rounded-2xl p-4 shadow-lg w-[180px] h-[240px]' : 'w-[160px] h-[160px] md:w-[200px] md:h-[200px]'}
                                    flex items-center justify-center
                                `}>
                                    <img
                                        src={img.src}
                                        alt={img.label}
                                        className={`
                                            max-w-full max-h-full object-contain
                                        `}
                                    />
                                </div>
                                {/* Label */}
                                {img.label && (
                                    <div className={`mt-3 font-bold text-sm flex items-center gap-1 ${currentSlide.textColor}`}>
                                        {img.label}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls - Bottom Right */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                    <button onClick={prevSlide} className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black shadow-sm transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={nextSlide} className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black shadow-sm transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button onClick={() => setIsPaused(!isPaused)} className={`w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-black shadow-sm transition-colors`}>
                        {isPaused ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromoCarousel;
