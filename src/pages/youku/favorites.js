import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import YoukuHeader from '../../components/youku/YoukuHeader';
import YoukuSidebar from '../../components/youku/YoukuSidebar';
import VideoCard from '../../components/youku/VideoCard';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { getVideoById } from '../../data/youkuData';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('youku-favorites');
    if (savedFavorites) {
      const favoritesData = JSON.parse(savedFavorites);
      setFavorites(favoritesData);
      
      const videos = favoritesData
        .map(f => getVideoById(f.id))
        .filter(Boolean);
      setFavoriteVideos(videos);
    }
  };

  const handleRemoveFavorite = (video) => {
    const newFavorites = favorites.filter(f => f.id !== video.id);
    localStorage.setItem('youku-favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    setFavoriteVideos(favoriteVideos.filter(v => v.id !== video.id));
  };

  const clearAllFavorites = () => {
    if (confirm('确定要清空所有收藏吗？')) {
      localStorage.removeItem('youku-favorites');
      setFavorites([]);
      setFavoriteVideos([]);
    }
  };

  return (
    <>
      <Head>
        <title>我的收藏 - 优酷</title>
        <meta name="description" content="我的收藏列表" />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar />

        <main className="ml-36 pt-14">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaHeart className="text-youku-pink text-xl" />
                <h1 className="text-2xl font-bold text-white">我的收藏</h1>
                <span className="text-gray-500">({favoriteVideos.length})</span>
              </div>
              {favoriteVideos.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                  data-testid="clear-favorites"
                >
                  <FaTrash />
                  <span>清空收藏</span>
                </button>
              )}
            </div>

            {/* Favorites grid */}
            {favoriteVideos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {favoriteVideos.map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleRemoveFavorite}
                    isFavorite={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">💕</div>
                <h3 className="text-xl text-white mb-2">暂无收藏内容</h3>
                <p className="text-gray-400 mb-6">快去收藏你喜欢的视频吧</p>
                <Link
                  href="/youku"
                  className="btn-primary px-6 py-2 rounded-full inline-block"
                >
                  去首页看看
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default FavoritesPage;
