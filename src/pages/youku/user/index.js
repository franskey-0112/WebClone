import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import UserLayout, { EmptyState, TabNav } from '../../../components/youku/UserLayout';
import { videos } from '../../../data/youkuData';
import { FaPlay } from 'react-icons/fa';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('following');

  const tabs = [
    { id: 'following', name: '在追' },
    { id: 'reserved', name: '预约' },
    { id: 'collected', name: '收藏' },
  ];

  const collectedItems = [videos[0], videos[3], videos[5]];

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'collected':
        return collectedItems;
      default:
        return [];
    }
  };

  const currentItems = getCurrentItems();

  return (
    <UserLayout title="在追收藏" activeMenu="favorites">
      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {currentItems.length === 0 ? (
        <EmptyState 
          message={
            activeTab === 'following' ? '没有追更任何记录' :
            activeTab === 'reserved' ? '没有预约任何内容' :
            '没有收藏任何内容'
          } 
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentItems.map((item) => (
            <Link 
              key={item.id}
              href={`/youku/video/${item.id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-2">
                {item.poster ? (
                  <Image
                    src={item.poster}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <FaPlay className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaPlay className="w-8 h-8 text-white" />
                </div>
                {item.updateInfo && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <span className="text-white text-xs">{item.updateInfo}</span>
                  </div>
                )}
              </div>
              <h3 className="text-white text-sm font-medium truncate group-hover:text-youku-pink transition-colors">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </UserLayout>
  );
}
