import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import YoukuHeader from '../../components/youku/YoukuHeader';
import YoukuSidebar from '../../components/youku/YoukuSidebar';
import VideoCard from '../../components/youku/VideoCard';
import { FaTrash, FaHistory } from 'react-icons/fa';
import { getVideoById } from '../../data/youkuData';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [historyVideos, setHistoryVideos] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('youku-history');
    if (savedHistory) {
      const historyData = JSON.parse(savedHistory);
      setHistory(historyData);
      
      const videos = historyData
        .map(h => getVideoById(h.id))
        .filter(Boolean);
      setHistoryVideos(videos);
    }
  }, []);

  const clearHistory = () => {
    if (confirm('确定要清空观看历史吗？')) {
      localStorage.removeItem('youku-history');
      setHistory([]);
      setHistoryVideos([]);
    }
  };

  const removeFromHistory = (videoId) => {
    const newHistory = history.filter(h => h.id !== videoId);
    localStorage.setItem('youku-history', JSON.stringify(newHistory));
    setHistory(newHistory);
    setHistoryVideos(historyVideos.filter(v => v.id !== videoId));
  };

  return (
    <>
      <Head>
        <title>观看历史 - 优酷</title>
        <meta name="description" content="我的观看历史" />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar />

        <main className="ml-36 pt-14">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaHistory className="text-youku-pink text-xl" />
                <h1 className="text-2xl font-bold text-white">观看历史</h1>
                <span className="text-gray-500">({historyVideos.length})</span>
              </div>
              {historyVideos.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors"
                  data-testid="clear-history"
                >
                  <FaTrash />
                  <span>清空历史</span>
                </button>
              )}
            </div>

            {/* History list */}
            {historyVideos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {historyVideos.map(video => (
                  <div key={video.id} className="relative group">
                    <VideoCard video={video} layout="grid" />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromHistory(video.id);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-xl text-white mb-2">暂无观看历史</h3>
                <p className="text-gray-400 mb-6">开始探索精彩内容吧</p>
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

export default HistoryPage;
