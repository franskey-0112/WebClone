import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaUser, 
  FaCrown,
  FaHistory,
  FaDownload,
  FaFilter,
  FaTimes
} from 'react-icons/fa';
import { categories, searchSuggestions, currentUser, videos } from '../../data/youkuData';

// 热门搜索榜单数据
const hotSearchList = [
  { id: 1, title: '暗恋者的攻略', category: '电视剧·悬爱·恋情', poster: '/images/youku/posters/video_002.jpg' },
  { id: 2, title: '炙热吸引', category: '电视剧·爱情·都市', poster: '/images/youku/posters/video_003.jpg' },
  { id: 3, title: '秋雪漫过的冬天', category: '电视剧', poster: '/images/youku/posters/video_001.jpg' },
  { id: 4, title: '重返狼群 10周年特别纪念版', category: '纪录片', poster: '/images/youku/posters/video_004.jpg' },
  { id: 5, title: '知否知否应是绿肥红瘦', category: '电视剧', poster: '/images/youku/posters/video_006.jpg' },
];

const YoukuHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showHotSearch, setShowHotSearch] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
      setShowHotSearch(false);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleFocus = () => {
    if (searchQuery) {
      setShowSuggestions(true);
    } else {
      setShowHotSearch(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      setShowHotSearch(false);
    }, 200);
  };

  const handleHotSearchClick = (title) => {
    setSearchQuery(title);
    setShowHotSearch(false);
    router.push(`/youku/search?q=${encodeURIComponent(title)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/youku/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/youku/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-youku-dark border-b border-gray-800">
      <div className="flex items-center h-14 px-4">
        {/* Logo */}
        <Link href="/youku" className="flex items-center gap-2 flex-shrink-0">
          <img 
            src="/images/youku/icon/image.png" 
            alt="优酷" 
            width={100} 
            height={32} 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-white">优酷</span>
        </Link>

        {/* Spacer - 占据左侧空间 */}
        <div className="flex-1"></div>

        {/* Search bar - 靠近右侧 */}
        <div className="w-[360px] mr-4 relative">
          <form onSubmit={handleSearch} className="flex items-center">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="搜索视频、演员、导演"
                className="w-full bg-youku-gray text-white px-4 py-2 rounded-l-full border border-gray-700 focus:border-youku-pink search-input"
                data-testid="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-youku-pink hover:bg-pink-600 text-white px-6 py-2 rounded-r-full transition-colors"
              data-testid="search-button"
            >
              <FaSearch />
            </button>
          </form>

          {/* Search suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-youku-gray border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 text-gray-300 hover:bg-youku-light-gray cursor-pointer flex items-center"
                >
                  <FaSearch className="text-gray-500 mr-3" />
                  {suggestion}
                </div>
              ))}
            </div>
          )}

          {/* 热门搜索榜单 */}
          {showHotSearch && (
            <div 
              ref={dropdownRef}
              className="absolute top-full left-0 mt-1 w-[320px] bg-white rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <span className="text-gray-800 font-medium text-sm">热门搜索</span>
              </div>
              <div className="py-2">
                {hotSearchList.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => handleHotSearchClick(item.title)}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {/* 排名数字 */}
                    <span className={`w-5 h-5 flex items-center justify-center text-xs font-bold rounded ${
                      index === 0 ? 'bg-red-500 text-white' :
                      index === 1 ? 'bg-orange-500 text-white' :
                      index === 2 ? 'bg-yellow-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </span>
                    {/* 海报缩略图 */}
                    <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-200">
                      <img 
                        src={item.poster} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    {/* 标题和分类 */}
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800 text-sm font-medium truncate">{item.title}</div>
                      <div className="text-gray-400 text-xs mt-0.5 truncate">{item.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* VIP */}
          <Link
            href="/youku/vip"
            className="flex items-center space-x-1 text-yellow-500 hover:text-yellow-400 transition-colors"
            data-testid="vip-link"
          >
            <FaCrown />
            <span className="text-sm">续费会员</span>
          </Link>

          {/* Filter */}
          <Link
            href="/youku/search"
            className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
          >
            <FaFilter />
            <span className="text-sm">筛选</span>
          </Link>

          {/* History */}
          <Link
            href="/youku/history"
            className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
          >
            <FaHistory />
            <span className="text-sm">历史</span>
          </Link>

          {/* Download */}
          <div className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <FaDownload />
            <span className="text-sm">客户端</span>
          </div>

          {/* User */}
          <Link
            href="/youku/user"
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            data-testid="user-link"
          >
            <div className="w-8 h-8 rounded-full bg-youku-gray flex items-center justify-center overflow-hidden">
              <FaUser className="text-gray-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{currentUser.username}</span>
              {currentUser.isVip && (
                <span className="text-xs text-yellow-500 flex items-center">
                  <FaCrown className="mr-1 text-xs" />
                  VIP{currentUser.vipLevel}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default YoukuHeader;
