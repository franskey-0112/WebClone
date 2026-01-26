import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import YoukuHeader from '../../components/youku/YoukuHeader';
import YoukuSidebar from '../../components/youku/YoukuSidebar';
import VideoCard from '../../components/youku/VideoCard';
import HeroBanner from '../../components/youku/HeroBanner';
import { FaChevronRight, FaFire, FaPlay } from 'react-icons/fa';
import { 
  videos, 
  banners, 
  homeBlocks, 
  getBlockVideos, 
  getVideoById,
  currentUser 
} from '../../data/youkuData';

const YoukuHomePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [blockData, setBlockData] = useState({});

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('youku-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // Load block videos
    const data = {};
    homeBlocks.forEach(block => {
      data[block.id] = getBlockVideos(block.id);
    });
    setBlockData(data);
  }, []);

  const handleAddToFavorites = (video) => {
    setFavorites(prev => {
      const isFavorite = prev.some(item => item.id === video.id);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prev.filter(item => item.id !== video.id);
      } else {
        newFavorites = [...prev, { id: video.id, title: video.title, addedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem('youku-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (videoId) => {
    return favorites.some(item => item.id === videoId);
  };

  const featuredVideo = getVideoById('video_001');

  return (
    <>
      <Head>
        <title>优酷 - 为好内容全力以赴</title>
        <meta name="description" content="优酷视频网站克隆 - 用于 Web Agent 测试" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar activeCategory="home" />

        {/* Main Content */}
        <main className="ml-36 pt-14">
          <div className="p-6">
            {/* Hero Banner */}
            <HeroBanner banner={banners[0]} video={featuredVideo} />

            {/* Hot Now Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaFire className="text-orange-500" />
                  <h2 className="text-xl font-bold text-white">正在热播</h2>
                </div>
                <Link 
                  href="/youku/category/tv" 
                  className="text-gray-400 hover:text-youku-pink flex items-center gap-1 text-sm"
                >
                  更多
                  <FaChevronRight className="text-xs" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {(blockData['hot_now'] || []).slice(0, 10).map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isFavorite(video.id)}
                  />
                ))}
              </div>
            </section>

            {/* Guess You Like Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-youku-pink">💕</span>
                  <h2 className="text-xl font-bold text-white">猜你在追</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">根据你的观看历史推荐</span>
                  <Link 
                    href="/youku/search" 
                    className="text-gray-400 hover:text-youku-pink flex items-center gap-1 text-sm"
                  >
                    更多
                    <FaChevronRight className="text-xs" />
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {(blockData['guess_like'] || []).slice(0, 12).map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isFavorite(video.id)}
                  />
                ))}
              </div>
            </section>

            {/* Exclusive Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <h2 className="text-xl font-bold text-white">优酷独播</h2>
                  <span className="tag-exclusive px-2 py-0.5 text-xs rounded ml-2">独家</span>
                </div>
                <Link 
                  href="/youku/search?exclusive=true" 
                  className="text-gray-400 hover:text-youku-pink flex items-center gap-1 text-sm"
                >
                  更多
                  <FaChevronRight className="text-xs" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {(blockData['exclusive'] || []).slice(0, 10).map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isFavorite(video.id)}
                  />
                ))}
              </div>
            </section>

            {/* Movie Recommendation */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span>🎬</span>
                  <h2 className="text-xl font-bold text-white">电影推荐</h2>
                </div>
                <Link 
                  href="/youku/category/movie" 
                  className="text-gray-400 hover:text-youku-pink flex items-center gap-1 text-sm"
                >
                  更多
                  <FaChevronRight className="text-xs" />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {(blockData['movie_recommend'] || []).map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isFavorite(video.id)}
                  />
                ))}
              </div>
            </section>

            {/* VIP Banner */}
            <section className="mb-10">
              <div className="bg-gradient-to-r from-yellow-900/50 via-orange-900/50 to-red-900/50 rounded-xl p-8 border border-yellow-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                      开通优酷VIP会员
                    </h3>
                    <p className="text-gray-300 mb-4">
                      免广告 · 高清画质 · 海量VIP内容 · 专属特权
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-yellow-500 text-3xl font-bold">¥25</span>
                      <span className="text-gray-400 line-through">¥30</span>
                      <span className="text-yellow-500 text-sm">首月特惠</span>
                    </div>
                  </div>
                  <Link
                    href="/youku/vip"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-3 rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all"
                    data-testid="vip-banner-button"
                  >
                    立即开通
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="ml-36 bg-youku-gray border-t border-gray-800 py-8">
          <div className="px-6">
            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-medium mb-4">关于优酷</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">关于我们</a></li>
                  <li><a href="#" className="hover:text-white">联系方式</a></li>
                  <li><a href="#" className="hover:text-white">招聘信息</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">帮助中心</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">常见问题</a></li>
                  <li><a href="#" className="hover:text-white">意见反馈</a></li>
                  <li><a href="#" className="hover:text-white">举报入口</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">合作伙伴</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">广告合作</a></li>
                  <li><a href="#" className="hover:text-white">内容合作</a></li>
                  <li><a href="#" className="hover:text-white">技术合作</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-4">关注我们</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white">官方微博</a></li>
                  <li><a href="#" className="hover:text-white">官方微信</a></li>
                  <li><a href="#" className="hover:text-white">官方抖音</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-6">
              <p>© 2024 优酷网站克隆 - 仅用于评测演示目的</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default YoukuHomePage;
