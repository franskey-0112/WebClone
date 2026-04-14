import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import YoukuHeader from '../../../components/youku/YoukuHeader';
import YoukuSidebar from '../../../components/youku/YoukuSidebar';
import VideoCard from '../../../components/youku/VideoCard';
import { FaPlay, FaStar, FaChevronRight } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { videos, categories } from '../../../data/youkuData';

// 频道页 Hero 轮播数据
const getChannelBanners = (categoryId) => {
  const channelVideos = videos.filter(v => v.category === categoryId).slice(0, 5);
  const gradients = [
    'from-rose-900 via-pink-800 to-purple-900',
    'from-slate-900 via-gray-800 to-zinc-900',
    'from-purple-900 via-violet-800 to-indigo-900',
    'from-amber-900 via-orange-800 to-red-900',
    'from-emerald-900 via-teal-800 to-cyan-900',
  ];
  const accentColors = ['pink', 'blue', 'purple', 'orange', 'green'];
  
  const tags = ['有更新', '限免中', '新上线', 'VIP', '独播', '热播'];
  const tagColors = ['bg-youku-pink', 'bg-red-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500', 'bg-orange-500'];
  
  return channelVideos.map((video, index) => ({
    id: video.id,
    title: video.title,
    rating: video.rating,
    description: `${video.actors?.slice(0, 3).join(' ') || ''} | ${video.description?.slice(0, 50)}...`,
    rank: `TOP${index + 1}`,
    rankType: `${categories.find(c => c.id === categoryId)?.name || ''}热搜榜`,
    link: `/youku/video/${video.id}`,
    bgGradient: gradients[index % gradients.length],
    accentColor: accentColors[index % accentColors.length],
    poster: video.poster || `/images/youku/posters/${video.id}.jpg`,
    tag: video.isVip ? 'VIP' : video.isNew ? '新上线' : tags[index % tags.length],
    tagColor: video.isVip ? 'bg-amber-500' : video.isNew ? 'bg-green-500' : tagColors[index % tagColors.length],
    updateInfo: video.updateInfo || '',
  }));
};

// 频道内容板块配置
const getChannelBlocks = (categoryId) => {
  const categoryVideos = videos.filter(v => v.category === categoryId);
  const categoryName = categories.find(c => c.id === categoryId)?.name || '';
  
  return [
    {
      id: 'hot',
      title: `热播${categoryName}`,
      videos: categoryVideos.slice(0, 8),
    },
    {
      id: 'new',
      title: `最新${categoryName}`,
      videos: [...categoryVideos].sort((a, b) => parseInt(b.year) - parseInt(a.year)).slice(0, 8),
    },
    {
      id: 'vip',
      title: 'VIP专享',
      videos: categoryVideos.filter(v => v.isVip).slice(0, 8),
    },
    {
      id: 'exclusive',
      title: '优酷独播',
      videos: categoryVideos.filter(v => v.isExclusive).slice(0, 8),
    },
  ].filter(block => block.videos.length > 0);
};

// 频道 Hero Banner 组件
const ChannelHeroBanner = ({ banners, categoryName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentSlide = banners[currentIndex] || banners[0];

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, goToNext, banners.length]);

  if (!currentSlide) {
    return (
      <div className="relative h-[380px] rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-gray-400 text-lg">{categoryName}频道</div>
      </div>
    );
  }

  const getRatingColor = (rating) => {
    if (rating >= 9) return 'text-yellow-400';
    if (rating >= 8) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <div className="mb-8">
    <div 
      className="relative h-[340px] rounded-t-xl overflow-hidden group"
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
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${currentSlide.accentColor === 'pink' ? '#ec4899' : currentSlide.accentColor === 'purple' ? '#a855f7' : currentSlide.accentColor === 'orange' ? '#f97316' : currentSlide.accentColor === 'green' ? '#10b981' : '#3b82f6'} 0%, transparent 70%)`
          }}
        />
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: `radial-gradient(circle, ${currentSlide.accentColor === 'pink' ? '#f472b6' : currentSlide.accentColor === 'purple' ? '#c084fc' : currentSlide.accentColor === 'orange' ? '#fb923c' : currentSlide.accentColor === 'green' ? '#34d399' : '#60a5fa'} 0%, transparent 70%)`
          }}
        />
      </div>

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />

      {/* 右侧视觉区域 - 实际海报 */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 z-5 hidden lg:block">
        {/* 海报区域 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-48 h-64 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
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
        <div className="absolute right-4 top-12 w-16 h-16 bg-gradient-to-br from-youku-pink/20 to-transparent rounded-full blur-xl" />
        <div className="absolute right-52 bottom-16 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-lg" />
      </div>

      {/* 主内容区 */}
      <div className="relative z-20 h-full flex flex-col justify-center px-10">
        {/* 评分徽章 */}
        {currentSlide.rating && (
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 px-3 py-1 bg-black/40 rounded-full backdrop-blur-sm">
              <FaStar className={`${getRatingColor(currentSlide.rating)} text-sm`} />
              <span className={`${getRatingColor(currentSlide.rating)} font-bold`}>
                {currentSlide.rating}
              </span>
            </div>
          </div>
        )}

        {/* 标题 */}
        <h1 className="text-5xl font-bold text-white mb-3 max-w-xl leading-tight">
          {currentSlide.title}
        </h1>

        {/* 描述 */}
        <p className="text-gray-300 text-sm mb-5 max-w-lg line-clamp-2 leading-relaxed">
          {currentSlide.description}
        </p>

        {/* 热度排行 */}
        <div className="flex items-center gap-2 mb-5">
          <span className="px-2 py-0.5 bg-youku-pink text-white text-xs font-bold rounded">
            {currentSlide.rank}
          </span>
          <span className="text-gray-400 text-sm">{currentSlide.rankType}</span>
        </div>

        {/* 播放按钮 */}
        <div className="flex gap-4">
          <Link
            href={currentSlide.link}
            className="flex items-center gap-2 px-6 py-2.5 bg-youku-pink hover:bg-pink-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/30"
          >
            <FaPlay className="text-sm" />
            <span>立即播放</span>
          </Link>
        </div>
      </div>

      {/* 左右切换按钮 */}
      {banners.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
          >
            <IoChevronBack className="text-lg" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all lg:right-72"
          >
            <IoChevronForward className="text-lg" />
          </button>
        </>
      )}

      {/* 轮播指示器 */}
      {banners.length > 1 && (
        <div className="absolute bottom-5 left-10 z-30 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-youku-pink' 
                  : 'w-3 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>

    {/* 底部缩略图导航行 - 与视频卡片相同尺寸 */}
    {banners.length > 1 && (
      <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {banners.map((item, index) => (
          <Link
            key={item.id}
            href={item.link}
            className={`video-card group relative flex-shrink-0 w-[140px] rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
              index === currentIndex 
                ? 'ring-2 ring-youku-pink' 
                : 'opacity-80 hover:opacity-100'
            }`}
            onMouseEnter={() => goToSlide(index)}
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
    )}
    </div>
  );
};

// 内容板块组件
const ContentBlock = ({ block, onAddToFavorites, isFavorite }) => {
  if (!block.videos || block.videos.length === 0) return null;

  return (
    <section className="mb-8">
      {/* 板块标题 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-youku-pink rounded-full"></span>
          {block.title}
        </h2>
        <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
          查看更多 <FaChevronRight className="text-xs" />
        </button>
      </div>

      {/* 视频列表 - 横向滚动 */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {block.videos.map(video => (
          <div key={video.id} className="flex-shrink-0 w-40">
            <VideoCard 
              video={video} 
              layout="grid"
              onAddToFavorites={onAddToFavorites}
              isFavorite={isFavorite(video.id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

// 主页面组件
const ChannelPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [favorites, setFavorites] = useState([]);
  
  // 根据 slug 找到对应的分类
  const category = categories.find(c => c.slug === slug);
  const categoryId = category?.id;
  const categoryName = category?.name || '';

  // 获取频道数据
  const banners = categoryId ? getChannelBanners(categoryId) : [];
  const blocks = categoryId ? getChannelBlocks(categoryId) : [];

  useEffect(() => {
    const savedFavorites = localStorage.getItem('youku-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const handleAddToFavorites = (video) => {
    setFavorites(prev => {
      const isFav = prev.some(item => item.id === video.id);
      let newFavorites;
      
      if (isFav) {
        newFavorites = prev.filter(item => item.id !== video.id);
      } else {
        newFavorites = [...prev, { id: video.id, title: video.title, addedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem('youku-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (videoId) => favorites.some(item => item.id === videoId);

  if (!category) {
    return (
      <div className="min-h-screen bg-youku-dark flex items-center justify-center">
        <div className="text-white text-lg">频道加载中...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{categoryName} - 优酷视频</title>
        <meta name="description" content={`优酷${categoryName}频道 - 热门${categoryName}在线观看`} />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar activeCategory={categoryId} />

        <main className="ml-36 pt-14">
          <div className="p-5">
            {/* Hero Banner */}
            <ChannelHeroBanner banners={banners} categoryName={categoryName} />

            {/* 内容板块 */}
            {blocks.map(block => (
              <ContentBlock 
                key={block.id} 
                block={block}
                onAddToFavorites={handleAddToFavorites}
                isFavorite={isFavorite}
              />
            ))}

            {/* 如果没有内容 */}
            {blocks.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-xl text-white mb-2">{categoryName}频道</h3>
                <p className="text-gray-400">精彩内容即将上线</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ChannelPage;
