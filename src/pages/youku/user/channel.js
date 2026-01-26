import { useState } from 'react';
import UserLayout, { EmptyState } from '../../../components/youku/UserLayout';
import { FaPlayCircle, FaEdit, FaCamera, FaCog } from 'react-icons/fa';

export default function ChannelPage() {
  const [hasChannel, setHasChannel] = useState(false);

  return (
    <UserLayout title="我的自频道" activeMenu="channel">
      <h1 className="text-xl font-bold text-white mb-6">我的自频道</h1>

      {!hasChannel ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <FaPlayCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white text-lg font-medium mb-2">创建你的专属频道</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            拥有自己的频道，展示你的视频内容，吸引更多粉丝关注
          </p>
          <button 
            onClick={() => setHasChannel(true)}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-colors"
          >
            创建我的频道
          </button>
        </div>
      ) : (
        <div>
          {/* Channel Header */}
          <div className="bg-youku-dark rounded-lg overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
              <button className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/50 text-white text-xs rounded flex items-center hover:bg-black/70 transition-colors">
                <FaCamera className="mr-1 w-3 h-3" />
                更换封面
              </button>
            </div>
            
            {/* Channel Info */}
            <div className="p-6 flex items-end -mt-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-youku-dark flex items-center justify-center text-3xl">
                😊
              </div>
              <div className="ml-4 flex-1 pb-2">
                <div className="flex items-center">
                  <h2 className="text-white text-xl font-bold">源源de可否限的频道</h2>
                  <button className="ml-3 text-gray-400 hover:text-white">
                    <FaEdit className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-1">0 个视频 · 0 位订阅者</p>
              </div>
              <button className="px-4 py-2 bg-gray-700 text-white text-sm rounded-full hover:bg-gray-600 transition-colors flex items-center">
                <FaCog className="mr-2 w-4 h-4" />
                频道设置
              </button>
            </div>
          </div>

          {/* Channel Content */}
          <div className="bg-youku-dark rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">频道视频</h3>
              <button className="text-youku-pink text-sm hover:text-pink-400">
                上传视频
              </button>
            </div>
            <EmptyState message="暂无视频内容" />
          </div>
        </div>
      )}
    </UserLayout>
  );
}
