import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserLayout, { EmptyState, TabNav } from '../../../components/youku/UserLayout';
import { videos } from '../../../data/youkuData';
import { FaPlay, FaTrash } from 'react-icons/fa';

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [historyItems, setHistoryItems] = useState([
    { ...videos[0], watchedAt: '今天 14:30', progress: 75 },
    { ...videos[1], watchedAt: '今天 10:15', progress: 30 },
    { ...videos[3], watchedAt: '昨天 22:00', progress: 100 },
    { ...videos[5], watchedAt: '昨天 18:30', progress: 45 },
    { ...videos[7], watchedAt: '3天前', progress: 60 },
  ]);

  const tabs = [
    { id: 'all', name: '全部' },
    { id: 'tv', name: '电视剧' },
    { id: 'movie', name: '电影' },
    { id: 'variety', name: '综艺' },
    { id: 'anime', name: '动漫' },
  ];

  const filteredItems = activeTab === 'all' 
    ? historyItems 
    : historyItems.filter(item => item.category === activeTab);

  const removeItem = (id) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const clearAll = () => {
    setHistoryItems([]);
  };

  return (
    <UserLayout title="历史播放" activeMenu="history">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-white">历史播放</h1>
        {historyItems.length > 0 && (
          <button 
            onClick={clearAll}
            className="text-gray-400 hover:text-white text-sm flex items-center"
          >
            <FaTrash className="mr-1 w-3 h-3" />
            清空全部
          </button>
        )}
      </div>

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredItems.length === 0 ? (
        <EmptyState message="暂无播放记录" />
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="flex bg-youku-dark rounded-lg overflow-hidden hover:bg-white/5 transition-colors group"
            >
              <Link href={`/youku/video/${item.id}`} className="relative w-48 h-28 flex-shrink-0">
                <div className="w-full h-full bg-gray-800 relative">
                  {item.poster ? (
                    <Image
                      src={item.poster}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <FaPlay className="w-8 h-8" />
                    </div>
                  )}
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div 
                      className="h-full bg-youku-pink"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaPlay className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Link>

              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <Link href={`/youku/video/${item.id}`}>
                    <h3 className="text-white font-medium hover:text-youku-pink transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.progress === 100 ? '已看完' : `已观看 ${item.progress}%`}
                    {item.currentEpisode && ` · 第${item.currentEpisode}集`}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs">{item.watchedAt}</span>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FaTrash className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
}
