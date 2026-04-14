import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserLayout, { EmptyState, TabNav } from '../../../components/youku/UserLayout';
import { FaUserPlus, FaCheck } from 'react-icons/fa';

export default function FollowingPage() {
  const [activeTab, setActiveTab] = useState('celebs');
  const [following, setFollowing] = useState([
    { id: 1, name: '赵丽颖', avatar: '🎭', followers: '1280万', type: 'celeb', isFollowing: true },
    { id: 2, name: '成毅', avatar: '🎬', followers: '856万', type: 'celeb', isFollowing: true },
    { id: 3, name: '罗云熙', avatar: '⭐', followers: '723万', type: 'celeb', isFollowing: true },
    { id: 4, name: '优酷剧集', avatar: '📺', followers: '2100万', type: 'channel', isFollowing: true },
    { id: 5, name: '优酷综艺', avatar: '🎤', followers: '1800万', type: 'channel', isFollowing: true },
  ]);

  const tabs = [
    { id: 'celebs', name: '明星' },
    { id: 'channels', name: '频道' },
    { id: 'users', name: '用户' },
  ];

  const filteredItems = activeTab === 'celebs' 
    ? following.filter(f => f.type === 'celeb')
    : activeTab === 'channels'
    ? following.filter(f => f.type === 'channel')
    : following.filter(f => f.type === 'user');

  const toggleFollow = (id) => {
    setFollowing(prev => prev.map(item => 
      item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
    ));
  };

  return (
    <UserLayout title="我的关注" activeMenu="following">
      <h1 className="text-xl font-bold text-white mb-6">我的关注</h1>

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredItems.length === 0 ? (
        <EmptyState message="暂无关注内容" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="bg-youku-dark rounded-lg p-4 text-center hover:bg-white/5 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.avatar}
              </div>
              <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
              <p className="text-gray-500 text-xs mb-3">{item.followers}粉丝</p>
              <button
                onClick={() => toggleFollow(item.id)}
                className={`w-full py-1.5 rounded-full text-xs font-medium transition-colors ${
                  item.isFollowing
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-youku-pink text-white hover:bg-pink-600'
                }`}
              >
                {item.isFollowing ? (
                  <span className="flex items-center justify-center">
                    <FaCheck className="mr-1 w-3 h-3" />
                    已关注
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FaUserPlus className="mr-1 w-3 h-3" />
                    关注
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
}
