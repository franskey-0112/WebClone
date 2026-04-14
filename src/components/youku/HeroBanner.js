import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { FaPlay, FaStar } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

// 轮播数据 - 使用实际视频海报
const carouselData = [
  {
    id: 1,
    title: '秋雪漫过的冬天',
    titleStyle: 'artistic',
    rating: 9.2,
    description: '赵又廷 张子枫 江一燕 | 本剧讲述了两个身处困境的人在生活的泥泞中相互慰藉、相互取暖的治愈故事。',
    rank: 'TOP1',
    rankType: '电视剧热搜榜',
    link: '/youku/video/video_001',
    bgGradient: 'from-rose-900 via-pink-800 to-purple-900',
    accentColor: 'pink',
    poster: '/images/youku/posters/video_001.jpg',
    tag: '有更新',
    tagColor: 'bg-youku-pink',
    updateInfo: '更新至12集',
  },
  {
    id: 2,
    title: '晴恋者的攻略',
    titleStyle: 'bold',
    rating: 8.6,
    description: '郑业成 刘花英 | 职场精英与女强人的爱情攻防战。',
    rank: 'TOP2',
    rankType: '都市剧热搜榜',
    link: '/youku/video/video_002',
    bgGradient: 'from-slate-900 via-gray-800 to-zinc-900',
    accentColor: 'blue',
    poster: '/images/youku/posters/video_002.jpg',
    tag: '限免中',
    tagColor: 'bg-red-500',
    updateInfo: '更新中5集',
  },
  {
    id: 3,
    title: '奥秘之墙',
    titleStyle: 'elegant',
    rating: 8.9,
    description: '悬疑热播 | 神秘古墙背后的未解之谜。',
    rank: 'TOP3',
    rankType: '悬疑剧热搜榜',
    link: '/youku/video/video_003',
    bgGradient: 'from-blue-900 via-indigo-800 to-purple-900',
    accentColor: 'blue',
    poster: '/images/youku/posters/video_003.jpg',
    tag: '新上线',
    tagColor: 'bg-green-500',
    updateInfo: '更新至08集',
  },
  {
    id: 4,
    title: '长安二十四计',
    titleStyle: 'traditional',
    rating: 8.9,
    description: '成毅 刘奕君 王劲松 | 虎贲卫设计者之子谢淮安，背负灭门深仇，隐忍十余年谋划复仇。',
    rank: 'TOP1',
    rankType: '古装剧热搜榜',
    link: '/youku/video/video_004',
    bgGradient: 'from-amber-900 via-orange-800 to-red-900',
    accentColor: 'orange',
    poster: '/images/youku/posters/video_004.jpg',
    tag: '独播',
    tagColor: 'bg-purple-500',
    updateInfo: '更新至24集',
  },
  {
    id: 5,
    title: '剥茧',
    titleStyle: 'bold',
    rating: 8.8,
    description: '罗云熙 刘雅瑟 | 因一场车祸齐思哲失去了女友信菲，但他发觉意外背后另有隐情。',
    rank: 'TOP2',
    rankType: '悬疑剧热搜榜',
    link: '/youku/video/video_005',
    bgGradient: 'from-slate-900 via-gray-800 to-zinc-900',
    accentColor: 'blue',
    poster: '/images/youku/posters/video_005.jpg',
    tag: 'VIP',
    tagColor: 'bg-amber-500',
    updateInfo: '21集全',
  },
  {
    id: 6,
    title: '知否知否应是绿肥红瘦',
    titleStyle: 'classic',
    rating: 9.4,
    description: '赵丽颖 冯绍峰 朱一龙 | 盛家六姑娘盛明兰从小聪颖貌美，在逆境中成长的传奇故事。',
    rank: 'TOP1',
    rankType: '经典剧热搜榜',
    link: '/youku/video/video_006',
    bgGradient: 'from-emerald-900 via-teal-800 to-cyan-900',
    accentColor: 'green',
    poster: '/images/youku/posters/video_006.jpg',
    tag: '限免中',
    tagColor: 'bg-red-500',
    updateInfo: '73集全',
  },
  {
    id: 7,
    title: '逍遥',
    titleStyle: 'elegant',
    rating: 9.2,
    description: '虞书欣 王鹤棣 | 仙侠世界中，一对璧人携手闯荡江湖，共赴天涯的浪漫传奇。',
    rank: 'TOP1',
    rankType: '仙侠剧热搜榜',
    link: '/youku/video/video_007',
    bgGradient: 'from-purple-900 via-violet-800 to-indigo-900',
    accentColor: 'purple',
    poster: '/images/youku/posters/video_007.jpg',
    tag: '热播',
    tagColor: 'bg-orange-500',
    updateInfo: '更新至29集',
  },
  {
    id: 8,
    title: '神探狐妹',
    titleStyle: 'bold',
    rating: 8.7,
    description: '悬疑探案 | 女侦探的离奇探案之旅。',
    rank: 'TOP4',
    rankType: '悬疑剧热搜榜',
    link: '/youku/video/video_008',
    bgGradient: 'from-red-900 via-orange-800 to-yellow-900',
    accentColor: 'orange',
    poster: '/images/youku/posters/video_008.jpg',
    tag: '热度榜',
    tagColor: 'bg-red-500',
    updateInfo: '更新至16集',
  },
  {
    id: 9,
    title: '天空之城',
    titleStyle: 'elegant',
    rating: 9.5,
    description: '动漫经典 | 宫崎骏大师的奇幻世界。',
    rank: 'TOP1',
    rankType: '动漫热搜榜',
    link: '/youku/video/video_009',
    bgGradient: 'from-sky-900 via-blue-800 to-indigo-900',
    accentColor: 'blue',
    poster: '/images/youku/posters/video_009.jpg',
    tag: '独播',
    tagColor: 'bg-purple-500',
    updateInfo: '经典重温',
  },
];

const HeroBanner = ({ banner, video }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentSlide = carouselData[currentIndex];

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % carouselData.length);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + carouselData.length) % carouselData.length);
  }, [currentIndex, goToSlide]);

  // 自动轮播
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNext]);

  // 根据标题风格渲染不同样式
  const renderTitle = (slide) => {
    const titleClasses = {
      artistic: 'font-serif italic text-6xl bg-gradient-to-r from-white via-pink-200 to-white bg-clip-text text-transparent drop-shadow-lg',
      bold: 'font-black text-6xl text-white tracking-wide',
      elegant: 'font-light text-6xl text-white tracking-widest',
      traditional: 'font-bold text-5xl text-amber-100 drop-shadow-md',
      classic: 'font-medium text-5xl text-white',
    };
    return (
      <h1 className={`mb-4 max-w-2xl leading-tight ${titleClasses[slide.titleStyle] || titleClasses.bold}`}>
        {slide.title}
      </h1>
    );
  };

  // 评分颜色
  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-yellow-400';
    if (rating >= 8) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <div className="mb-8">
    {/* 主轮播区域 */}
    <div 
      className="relative h-[360px] rounded-t-xl overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 背景层 - 视频海报 */}
      <div className="absolute inset-0">
        <img 
          src={currentSlide.poster} 
          alt={currentSlide.title}
          className="w-full h-full object-cover transition-all duration-700"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* 渐变蒙版 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgGradient} opacity-60`} />
      </div>
      
      {/* 装饰性光效 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主光晕 */}
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-1000"
          style={{ 
            background: `radial-gradient(circle, ${currentSlide.accentColor === 'pink' ? '#ec4899' : currentSlide.accentColor === 'purple' ? '#a855f7' : currentSlide.accentColor === 'orange' ? '#f97316' : currentSlide.accentColor === 'green' ? '#10b981' : '#3b82f6'} 0%, transparent 70%)`
          }}
        />
        {/* 副光晕 */}
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${currentSlide.accentColor === 'pink' ? '#f472b6' : currentSlide.accentColor === 'purple' ? '#c084fc' : currentSlide.accentColor === 'orange' ? '#fb923c' : currentSlide.accentColor === 'green' ? '#34d399' : '#60a5fa'} 0%, transparent 70%)`
          }}
        />
        {/* 动态粒子效果 */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* 左侧渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
      
      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />

      {/* 右侧视觉区域 - 实际海报 */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-5 hidden lg:block">
        {/* 海报区域 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-52 h-72 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
          <img 
            src={currentSlide.poster} 
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-all duration-500"
            onError={(e) => {
              e.target.parentElement.style.display = 'none';
            }}
          />
          {/* 海报覆盖层 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* 发光边框 */}
          <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
        </div>
        {/* 装饰性浮动元素 */}
        <div className="absolute right-4 top-12 w-20 h-20 bg-gradient-to-br from-youku-pink/20 to-transparent rounded-full blur-xl" />
        <div className="absolute right-56 bottom-16 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-lg" />
      </div>

      {/* 主内容区 */}
      <div className="relative z-20 h-full flex flex-col justify-center px-12">
        {/* 评分徽章 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm">
            <FaStar className={`${getRatingColor(currentSlide.rating)} text-sm`} />
            <span className={`${getRatingColor(currentSlide.rating)} font-bold`}>
              {currentSlide.rating}
            </span>
          </div>
        </div>

        {/* 标题 - 艺术字效果 */}
        {renderTitle(currentSlide)}

        {/* 描述 */}
        <p className="text-gray-300 text-base mb-6 max-w-xl line-clamp-2 leading-relaxed">
          {currentSlide.description}
        </p>

        {/* 热度排行 */}
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-0.5 bg-youku-pink text-white text-xs font-bold rounded">
            {currentSlide.rank}
          </span>
          <span className="text-gray-400 text-sm">{currentSlide.rankType}</span>
        </div>

        {/* 播放按钮 */}
        <div className="flex gap-4">
          <Link
            href={currentSlide.link}
            className="flex items-center gap-2 px-8 py-3 bg-youku-pink hover:bg-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/30"
            data-testid="banner-play-button"
          >
            <FaPlay className="text-sm" />
            <span>立即播放</span>
          </Link>
        </div>
      </div>

      {/* 左右切换按钮 */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="上一个"
      >
        <IoChevronBack className="text-xl" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 lg:right-64"
        aria-label="下一个"
      >
        <IoChevronForward className="text-xl" />
      </button>

      {/* 轮播指示器 */}
      <div className="absolute bottom-6 left-12 z-30 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-8 bg-youku-pink' 
                : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`跳转到第${index + 1}张`}
          />
        ))}
      </div>

      {/* 轮播进度条 */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-30">
          <div 
            className="h-full bg-youku-pink transition-all"
            style={{
              animation: 'progress 5s linear infinite',
              width: '100%',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>

    {/* 底部缩略图导航行 - 与视频卡片相同尺寸 */}
    <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
      {carouselData.map((item, index) => (
        <Link
          key={item.id}
          href={item.link}
          className={`video-card group relative flex-shrink-0 w-[140px] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
            index === currentIndex 
              ? 'ring-2 ring-youku-pink' 
              : 'opacity-80 hover:opacity-100'
          }`}
          onMouseEnter={() => !isTransitioning && goToSlide(index)}
        >
          {/* 缩略图 - 3:4 比例 */}
          <div className="relative aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={item.poster} 
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* 标签 */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
              {item.tag && (
                <span className={`px-1.5 py-0.5 ${item.tagColor} text-white text-xs font-bold rounded`}>
                  {item.tag}
                </span>
              )}
            </div>

            {/* 评分角标 */}
            {item.rating > 0 && (
              <div className="absolute top-2 right-2 z-20 flex items-center text-xs">
                <span className="text-yellow-400 font-bold">{item.rating}</span>
              </div>
            )}

            {/* 播放按钮悬浮层 */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-youku-pink/90 flex items-center justify-center">
                <FaPlay className="text-white text-sm ml-0.5" />
              </div>
            </div>

            {/* 更新信息 */}
            {item.updateInfo && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <span className="text-xs text-gray-200">{item.updateInfo}</span>
              </div>
            )}

            {/* 选中状态指示器 */}
            {index === currentIndex && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-youku-pink z-20" />
            )}
          </div>

          {/* 标题 */}
          <h3 className="text-white text-sm font-medium line-clamp-1 mt-2 group-hover:text-youku-pink transition-colors">
            {item.title}
          </h3>
        </Link>
      ))}
    </div>
    </div>
  );
};

export default HeroBanner;
