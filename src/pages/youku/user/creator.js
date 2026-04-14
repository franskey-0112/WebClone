import { useState } from 'react';
import UserLayout, { EmptyState } from '../../../components/youku/UserLayout';
import { FaUpload, FaVideo, FaEye, FaHeart, FaComment, FaChartLine } from 'react-icons/fa';

export default function CreatorPage() {
  const [hasChannel, setHasChannel] = useState(false);

  const stats = [
    { label: '总播放量', value: '0', icon: FaEye },
    { label: '总点赞', value: '0', icon: FaHeart },
    { label: '总评论', value: '0', icon: FaComment },
    { label: '粉丝数', value: '0', icon: FaChartLine },
  ];

  return (
    <UserLayout title="创作中心" activeMenu="creator">
      <h1 className="text-xl font-bold text-white mb-6">创作中心</h1>

      {!hasChannel ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-pink-400 to-pink-600 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <FaVideo className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white text-lg font-medium mb-2">开启你的创作之旅</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            成为优酷创作者，分享你的创意和故事，获得更多曝光和收益
          </p>
          <button 
            onClick={() => setHasChannel(true)}
            className="px-8 py-3 bg-gradient-to-r from-youku-pink to-pink-600 text-white rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-colors"
          >
            立即开通创作者账号
          </button>
        </div>
      ) : (
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-youku-dark rounded-lg p-4 text-center">
                  <Icon className="w-6 h-6 text-youku-pink mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Upload Section */}
          <div className="bg-youku-dark rounded-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              <FaUpload className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-white font-medium mb-2">上传视频</h3>
            <p className="text-gray-500 text-sm mb-4">支持 MP4、MOV、AVI 等格式，最大 4GB</p>
            <button className="px-6 py-2 bg-youku-pink text-white rounded-full text-sm hover:bg-pink-600 transition-colors">
              选择文件上传
            </button>
          </div>

          {/* My Videos Section */}
          <div className="mt-8">
            <h3 className="text-white font-medium mb-4">我的作品</h3>
            <EmptyState message="暂无上传作品" />
          </div>
        </div>
      )}
    </UserLayout>
  );
}
