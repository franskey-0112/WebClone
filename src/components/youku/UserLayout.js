import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHistory, 
  FaHeart, 
  FaUserFriends, 
  FaTicketAlt, 
  FaPen, 
  FaPlayCircle, 
  FaCog,
  FaCrown
} from 'react-icons/fa';

export default function UserLayout({ children, title = '个人中心', activeMenu = 'favorites' }) {
  const router = useRouter();

  const menuItems = [
    { id: 'history', name: '历史播放', icon: FaHistory, href: '/youku/user/history' },
    { id: 'favorites', name: '在追收藏', icon: FaHeart, href: '/youku/user' },
    { id: 'following', name: '我的关注', icon: FaUserFriends, href: '/youku/user/following' },
    { id: 'coupons', name: '卡券包', icon: FaTicketAlt, href: '/youku/user/coupons' },
    { id: 'creator', name: '创作中心', icon: FaPen, href: '/youku/user/creator' },
    { id: 'channel', name: '我的自频道', icon: FaPlayCircle, href: '/youku/user/channel' },
    { id: 'settings', name: '设置', icon: FaCog, href: '/youku/user/settings' },
  ];

  return (
    <>
      <Head>
        <title>{title} - 优酷</title>
      </Head>

      <div className="min-h-screen bg-youku-darker">
        {/* Header - 与首页保持一致 */}
        <header className="fixed top-0 left-0 right-0 h-14 bg-youku-dark border-b border-gray-800 z-50">
          <div className="h-full flex items-center px-6">
            <Link href="/youku" className="flex items-center gap-2 mr-8">
              <img 
                src="/images/youku/icon/image.png" 
                alt="优酷" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">优酷</span>
            </Link>

            <nav className="flex items-center space-x-6 text-sm">
              <Link href="/youku" className="text-gray-400 hover:text-white">首页</Link>
              <Link href="/youku/channel/webtv" className="text-gray-400 hover:text-white">电视剧</Link>
              <Link href="/youku/channel/webmovie" className="text-gray-400 hover:text-white">电影</Link>
              <Link href="/youku/channel/webvariety" className="text-gray-400 hover:text-white">综艺</Link>
              <span className="text-gray-400 hover:text-white cursor-pointer">分类 ▾</span>
            </nav>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索"
                  className="w-48 bg-gray-800 text-white text-sm rounded-full px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-youku-pink"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              <Link href="/youku/vip" className="flex items-center text-yellow-500 text-sm hover:text-yellow-400">
                <FaCrown className="mr-1" />
                <span>会员特惠</span>
              </Link>

              <div className="flex items-center space-x-3 text-gray-400">
                <Link href="/youku/history" className="hover:text-white">
                  <FaHistory className="w-4 h-4" />
                </Link>
                <button className="hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>

              <Link href="/youku/user" className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">酷</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-14 flex">
          {/* Left Sidebar */}
          <aside className="w-56 min-h-screen bg-youku-dark border-r border-gray-800 fixed left-0 top-14 bottom-0 overflow-y-auto">
            {/* User Info Card */}
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mr-3">
                  <span className="text-white text-lg">😊</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">源源de可否限</div>
                </div>
              </div>

              {/* VIP Status */}
              <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-3 border border-yellow-700/30">
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500 text-xs font-bold flex items-center">
                    <FaCrown className="mr-1" />
                    VIP会员
                  </span>
                  <span className="text-gray-500 text-xs ml-2">2026.02.13到期</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">成为SVIP，与家人共享多端观看</p>
                <button className="w-full bg-gradient-to-r from-yellow-600 to-orange-500 text-white text-xs py-1.5 rounded-full font-medium hover:from-yellow-500 hover:to-orange-400 transition-colors">
                  立即购买
                </button>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="mt-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center px-6 py-3 text-sm transition-colors ${
                      isActive
                        ? 'text-white bg-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 ml-56 p-8">
            {children}
          </main>
        </div>

        {/* Help Button */}
        <button className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export function EmptyState({ icon, message }) {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-24 h-24 mb-6 relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-b from-pink-400 to-pink-600 mx-auto shadow-lg shadow-pink-500/30" />
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-pink-300/50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600" />
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

export function TabNav({ tabs, activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-700 mb-8">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 text-base font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.name}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-youku-pink" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
