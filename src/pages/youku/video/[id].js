import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import YoukuHeader from '../../../components/youku/YoukuHeader';
import YoukuSidebar from '../../../components/youku/YoukuSidebar';
import VideoCard from '../../../components/youku/VideoCard';
import { 
  FaPlay, 
  FaPause,
  FaStepForward,
  FaHeart, 
  FaRegHeart, 
  FaShare, 
  FaDownload,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaCrown,
  FaLock,
  FaThumbsUp,
  FaRegThumbsUp,
  FaComment,
  FaUserCircle,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaClosedCaptioning,
  FaRedo,
  FaCog
} from 'react-icons/fa';
import { 
  MdPictureInPictureAlt, 
  MdOutlineSpeed,
  MdHighQuality,
  MdSubtitles
} from 'react-icons/md';
import { BiMessageRoundedDetail } from 'react-icons/bi';
import { RiLayoutRowLine } from 'react-icons/ri';
import { 
  getVideoById, 
  getRecommendedVideos, 
  currentUser 
} from '../../../data/youkuData';

// 模拟评论数据
const mockComments = [
  {
    id: 1,
    user: '酷友小明同学',
    avatar: null,
    content: '太好看了！强烈推荐！',
    likes: 128,
    time: '2小时前',
    location: '北京',
    isLiked: false,
  },
  {
    id: 2,
    user: '影视爱好者',
    avatar: null,
    content: '剧情设计很好，演员演技也在线，就是更新太慢了，每周都在等。',
    likes: 89,
    time: '5小时前',
    location: '上海',
    isLiked: false,
  },
  {
    id: 3,
    user: '追剧达人',
    avatar: null,
    content: '终于更新了！等了好久！',
    likes: 56,
    time: '1天前',
    location: '广东',
    isLiked: true,
  },
  {
    id: 4,
    user: '酷友u开心的小明同学',
    avatar: null,
    content: '这个反转太精彩了，没想到竟然是这样的结局！',
    likes: 234,
    time: '2天前',
    location: '浙江',
    isLiked: false,
  },
  {
    id: 5,
    user: '在线看剧',
    avatar: null,
    content: '会员都不能看了吗？还要svip？',
    likes: 45,
    time: '3天前',
    location: '湖北',
    isLiked: false,
  },
  {
    id: 6,
    user: '周末追剧党',
    avatar: null,
    content: '音乐和画面都很棒，就是广告有点多。',
    likes: 67,
    time: '3天前',
    location: '四川',
    isLiked: false,
  },
  {
    id: 7,
    user: '酷友x快乐de小鹏同学',
    avatar: null,
    content: '第三集的那个场景太感人了，看哭了',
    likes: 189,
    time: '4天前',
    location: '江苏',
    isLiked: false,
  },
  {
    id: 8,
    user: '影视评论员',
    avatar: null,
    content: '这部剧的服化道具都很用心，值得一看。',
    likes: 78,
    time: '5天前',
    location: '山东',
    isLiked: false,
  },
];

const VideoDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [video, setVideo] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('video'); // 'video' or 'comments'
  const [comments, setComments] = useState(mockComments);
  const [commentSort, setCommentSort] = useState('hot'); // 'hot', 'new'
  const [newComment, setNewComment] = useState('');
  
  // 播放器控件状态
  const [currentTime, setCurrentTime] = useState(76); // 秒
  const [duration, setDuration] = useState(2575); // 秒
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0X');
  const [quality, setQuality] = useState('1080P');
  const [showDanmaku, setShowDanmaku] = useState(true);
  const [danmakuInput, setDanmakuInput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [audioEffect, setAudioEffect] = useState('标准');
  const [language, setLanguage] = useState('普通话');
  
  // 下拉菜单状态
  const [openMenu, setOpenMenu] = useState(null); // 'speed' | 'quality' | 'audio' | 'language' | 'volume' | null

  // 选项数据
  const speedOptions = ['0.5X', '0.75X', '1.0X', '1.25X', '1.5X', '2.0X'];
  const qualityOptions = ['4K', '1080P', '720P', '480P', '360P'];
  const audioOptions = ['标准', '影院', '演唱会', '人声增强'];
  const languageOptions = ['普通话', '粤语', '英语', '原声'];

  // 格式化时间
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (id) {
      const videoData = getVideoById(id);
      setVideo(videoData);
      
      if (videoData) {
        setRecommendedVideos(getRecommendedVideos(id, 12));
        
        // Check if in favorites
        const savedFavorites = localStorage.getItem('youku-favorites');
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.some(item => item.id === id));
        }

        // Add to watch history
        const history = JSON.parse(localStorage.getItem('youku-history') || '[]');
        const newHistory = [
          { id: videoData.id, title: videoData.title, watchedAt: new Date().toISOString() },
          ...history.filter(h => h.id !== videoData.id)
        ].slice(0, 50);
        localStorage.setItem('youku-history', JSON.stringify(newHistory));
      }
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    const savedFavorites = localStorage.getItem('youku-favorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter(item => item.id !== id);
    } else {
      favorites.push({ id, title: video.title, addedAt: new Date().toISOString() });
    }
    
    localStorage.setItem('youku-favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const handlePlay = () => {
    // Check if VIP content and user is not VIP
    if (video.isVip && !currentUser.isVip) {
      if (confirm('此内容为VIP专享，是否开通VIP观看？')) {
        router.push('/youku/vip');
      }
      return;
    }
    setIsPlaying(true);
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          isLiked: !c.isLiked,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1
        };
      }
      return c;
    }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: '我',
      avatar: null,
      content: newComment,
      likes: 0,
      time: '刚刚',
      location: '本地',
      isLiked: false,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === 'hot') return b.likes - a.likes;
    return 0; // 'new' keeps original order
  });

  if (!video) {
    return (
      <div className="min-h-screen bg-youku-dark flex items-center justify-center">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  const episodes = Array.from({ length: video.episodes || 1 }, (_, i) => i + 1);
  const displayedEpisodes = showAllEpisodes ? episodes : episodes.slice(0, 24);

  return (
    <>
      <Head>
        <title>{video.title} - 优酷</title>
        <meta name="description" content={video.description} />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar />

        <main className="ml-36 pt-14">
          <div className="p-4">
            {/* Main Layout: Player Left, Info Right */}
            <div className="flex gap-4">
              {/* Left: Video Player */}
              <div className="flex-1 min-w-0">
                {/* 视频播放器容器 */}
                <div className="bg-black rounded-lg overflow-hidden">
                  {/* 视频区域 */}
                  <div className="aspect-video relative">
                    {isPlaying ? (
                      <div 
                        className="w-full h-full flex items-center justify-center bg-gray-900 cursor-pointer"
                        onClick={() => setIsPlaying(false)}
                      >
                        <div className="text-center">
                          <div className="text-6xl mb-4">🎬</div>
                          <p className="text-white text-xl">正在播放：{video.title}</p>
                          <p className="text-gray-400 mt-2">第 {selectedEpisode} 集</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <button
                          onClick={handlePlay}
                          className="w-16 h-16 rounded-full bg-youku-pink/80 hover:bg-youku-pink flex items-center justify-center transition-all hover:scale-110"
                          data-testid="play-button"
                        >
                          {video.isVip && !currentUser.isVip ? (
                            <FaLock className="text-white text-xl" />
                          ) : (
                            <FaPlay className="text-white text-xl ml-1" />
                          )}
                        </button>
                        {video.isVip && !currentUser.isVip && (
                          <div className="absolute bottom-3 left-3 bg-yellow-500/90 text-black px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                            <FaCrown className="text-xs" />
                            VIP专享
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 播放器控件栏 */}
                  <div className="bg-gray-900 px-3 py-2">
                    {/* 进度条 */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white text-xs font-mono">{formatTime(currentTime)}</span>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full relative cursor-pointer group">
                        <div 
                          className="h-full bg-youku-pink rounded-full"
                          style={{ width: `${(currentTime / duration) * 100}%` }}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ left: `${(currentTime / duration) * 100}%`, transform: 'translate(-50%, -50%)' }}
                        />
                      </div>
                      <span className="text-gray-400 text-xs font-mono">{formatTime(duration)}</span>
                    </div>

                    {/* 控件按钮 */}
                    <div className="flex items-center justify-between">
                      {/* 左侧控件 */}
                      <div className="flex items-center gap-2">
                        {/* 播放/暂停 */}
                        <button 
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-white hover:text-youku-pink p-1.5"
                        >
                          {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
                        </button>
                        {/* 下一集 */}
                        <button className="text-white hover:text-youku-pink p-1.5">
                          <FaStepForward className="text-lg" />
                        </button>
                        {/* 弹幕输入 */}
                        <div className="flex items-center gap-2 ml-2">
                          <input
                            type="text"
                            value={danmakuInput}
                            onChange={(e) => setDanmakuInput(e.target.value)}
                            placeholder="发个友善的弹幕见证当下~"
                            className="w-36 bg-gray-800 text-white text-xs px-3 py-1.5 rounded border border-gray-600 focus:border-youku-pink focus:outline-none"
                          />
                          <button 
                            onClick={() => setShowDanmaku(!showDanmaku)}
                            className={`p-1.5 rounded ${showDanmaku ? 'text-youku-pink' : 'text-gray-500'}`}
                            title="弹幕"
                          >
                            <BiMessageRoundedDetail className="text-lg" />
                          </button>
                        </div>
                      </div>

                      {/* 右侧控件 */}
                      <div className="flex items-center gap-1">
                        {/* 音效 */}
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenu(openMenu === 'audio' ? null : 'audio')}
                            className="text-gray-400 hover:text-white px-2 py-1 text-xs"
                          >
                            音效
                          </button>
                          {openMenu === 'audio' && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-lg py-2 min-w-[80px]">
                              {audioOptions.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => { setAudioEffect(opt); setOpenMenu(null); }}
                                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 ${audioEffect === opt ? 'text-youku-pink' : 'text-white'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 语言 */}
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenu(openMenu === 'language' ? null : 'language')}
                            className="text-gray-400 hover:text-white px-2 py-1 text-xs"
                          >
                            {language}
                          </button>
                          {openMenu === 'language' && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-lg py-2 min-w-[80px]">
                              {languageOptions.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => { setLanguage(opt); setOpenMenu(null); }}
                                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 ${language === opt ? 'text-youku-pink' : 'text-white'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 倍速 */}
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenu(openMenu === 'speed' ? null : 'speed')}
                            className="text-gray-400 hover:text-white px-2 py-1 text-xs"
                          >
                            {playbackSpeed}
                          </button>
                          {openMenu === 'speed' && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-lg py-2 min-w-[60px]">
                              {speedOptions.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => { setPlaybackSpeed(opt); setOpenMenu(null); }}
                                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 ${playbackSpeed === opt ? 'text-youku-pink' : 'text-white'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 画质 */}
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenu(openMenu === 'quality' ? null : 'quality')}
                            className="text-gray-400 hover:text-white px-2 py-1 text-xs"
                          >
                            {quality}
                          </button>
                          {openMenu === 'quality' && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-lg py-2 min-w-[70px]">
                              {qualityOptions.map(opt => (
                                <button
                                  key={opt}
                                  onClick={() => { setQuality(opt); setOpenMenu(null); }}
                                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-gray-700 ${quality === opt ? 'text-youku-pink' : 'text-white'}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* 循环 */}
                        <button 
                          onClick={() => setIsLoop(!isLoop)}
                          className={`p-1.5 ${isLoop ? 'text-youku-pink' : 'text-gray-400 hover:text-white'}`}
                          title={isLoop ? '循环播放已开启' : '循环播放'}
                        >
                          <FaRedo className="text-sm" />
                        </button>
                        {/* 音量 */}
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenu(openMenu === 'volume' ? null : 'volume')}
                            className="text-gray-400 hover:text-white p-1.5"
                          >
                            {isMuted || volume === 0 ? <FaVolumeMute className="text-lg" /> : <FaVolumeUp className="text-lg" />}
                          </button>
                          {openMenu === 'volume' && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 rounded-lg shadow-lg p-3 w-10">
                              <div className="h-24 flex flex-col items-center">
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={isMuted ? 0 : volume}
                                  onChange={(e) => { setVolume(Number(e.target.value)); setIsMuted(false); }}
                                  className="w-24 h-1 -rotate-90 origin-center accent-youku-pink"
                                />
                              </div>
                              <button 
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-xs text-gray-400 hover:text-white mt-2"
                              >
                                {isMuted ? '取消静音' : '静音'}
                              </button>
                            </div>
                          )}
                        </div>
                        {/* 画中画 */}
                        <button 
                          onClick={() => alert('画中画模式（演示）')}
                          className="text-gray-400 hover:text-white p-1.5"
                          title="画中画"
                        >
                          <MdPictureInPictureAlt className="text-lg" />
                        </button>
                        {/* 小窗播放 */}
                        <button 
                          onClick={() => alert('小窗播放模式（演示）')}
                          className="text-gray-400 hover:text-white p-1.5"
                          title="小窗播放"
                        >
                          <RiLayoutRowLine className="text-lg" />
                        </button>
                        {/* 全屏 */}
                        <button 
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="text-gray-400 hover:text-white p-1.5"
                          title={isFullscreen ? '退出全屏' : '全屏'}
                        >
                          {isFullscreen ? <FaCompress className="text-lg" /> : <FaExpand className="text-lg" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 为你推荐横条 */}
                  <div className="bg-gray-900 border-t border-gray-800 px-3 py-2">
                    <div className="flex items-center gap-3 overflow-x-auto">
                      <span className="text-xs text-white bg-youku-pink px-2 py-1 rounded-full flex-shrink-0">为你推荐</span>
                      {recommendedVideos.slice(0, 6).map(v => (
                        <Link 
                          key={v.id} 
                          href={`/youku/video/${v.id}`}
                          className="flex items-center gap-2 flex-shrink-0 group"
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            <span className="text-xs text-gray-400">🎬</span>
                          </div>
                          <span className="text-gray-400 text-xs group-hover:text-white whitespace-nowrap">
                            {v.actors?.[0] || v.title.slice(0, 4)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Info Panel */}
              <div className="w-[300px] flex-shrink-0 overflow-y-auto max-h-[calc(100vh-80px)]">
                {/* Tabs */}
                <div className="flex border-b border-gray-700 mb-3">
                  <button 
                    onClick={() => setActiveTab('video')}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === 'video' 
                        ? 'text-youku-pink border-b-2 border-youku-pink' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    视频
                  </button>
                  <button 
                    onClick={() => setActiveTab('comments')}
                    className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                      activeTab === 'comments' 
                        ? 'text-youku-pink border-b-2 border-youku-pink' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    讨论
                    <span className="text-xs bg-youku-pink/20 text-youku-pink px-1.5 rounded-full">{comments.length}</span>
                  </button>
                </div>

                {/* 视频信息面板 */}
                {activeTab === 'video' && (
                  <>
                    {/* Title */}
                    <h1 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      {video.title}
                      {video.isVip && <span className="tag-vip px-1.5 py-0.5 text-xs rounded">VIP</span>}
                    </h1>

                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />
                        {video.rating}
                      </span>
                      <span>·</span>
                      <span>{video.playCount}播放</span>
                      <span>·</span>
                      <span>{video.year}</span>
                      <span>·</span>
                      <span>{video.region}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-xs mb-3 line-clamp-2">{video.description}</p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={handleFavoriteToggle}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-colors ${
                          isFavorite ? 'bg-youku-pink text-white' : 'bg-youku-gray text-gray-300 hover:bg-youku-light-gray'
                        }`}
                        data-testid="favorite-button"
                      >
                        {isFavorite ? <FaHeart className="text-xs" /> : <FaRegHeart className="text-xs" />}
                        <span>{isFavorite ? '已收藏' : '收藏'}</span>
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-youku-gray text-gray-300 hover:bg-youku-light-gray text-xs">
                        <FaShare className="text-xs" />
                        <span>分享</span>
                      </button>
                    </div>

                    {/* VIP Banner */}
                    {video.isVip && (
                      <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700/50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-yellow-500 text-xs font-medium">首三月9元/月，成为会员立即畅看</p>
                            <p className="text-gray-400 text-xs mt-0.5">万部剧综免费看 | 蓝光1080P | 更新抢先看</p>
                          </div>
                          <Link href="/youku/vip" className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-medium hover:bg-yellow-400">
                            立即开通
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Episode selector */}
                    {video.episodes > 1 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white text-sm font-medium">
                            选集
                          </h3>
                          {video.updateInfo && (
                            <span className="text-youku-pink text-xs">{video.updateInfo}</span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-6 gap-1.5">
                          {displayedEpisodes.map(ep => {
                            const isLocked = video.isVip && !currentUser.isVip && ep > 2;
                            const isAvailable = ep <= video.currentEpisode;
                            
                            return (
                              <button
                                key={ep}
                                onClick={() => !isLocked && isAvailable && setSelectedEpisode(ep)}
                                disabled={isLocked || !isAvailable}
                                className={`episode-item relative py-1.5 rounded text-center text-xs transition-colors ${
                                  selectedEpisode === ep
                                    ? 'bg-youku-pink text-white'
                                    : isLocked
                                    ? 'bg-youku-light-gray text-gray-500 cursor-not-allowed'
                                    : isAvailable
                                    ? 'bg-youku-light-gray text-gray-300 hover:bg-gray-600'
                                    : 'bg-youku-light-gray text-gray-600 cursor-not-allowed'
                                }`}
                                data-testid={`episode-${ep}`}
                              >
                                {ep}
                                {isLocked && <FaCrown className="absolute -top-0.5 -right-0.5 text-yellow-500 text-xs" />}
                              </button>
                            );
                          })}
                        </div>
                        
                        {episodes.length > 24 && (
                          <button
                            onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                            className="flex items-center gap-1 text-gray-400 hover:text-white mt-2 text-xs"
                          >
                            {showAllEpisodes ? <>收起 <FaChevronUp /></> : <>展开全部 <FaChevronDown /></>}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Recommended in sidebar */}
                    <div>
                      <h3 className="text-white text-sm font-medium mb-2">周边视频</h3>
                      <div className="space-y-2">
                        {recommendedVideos.slice(0, 4).map(v => (
                          <Link key={v.id} href={`/youku/video/${v.id}`} className="flex gap-2 group">
                            <div className="w-20 h-12 flex-shrink-0 bg-youku-gray rounded overflow-hidden">
                              {v.poster ? (
                                <img src={v.poster} alt={v.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                                  <span className="text-gray-500 text-xs text-center px-1 line-clamp-1">{v.title}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-xs font-medium line-clamp-2 group-hover:text-youku-pink">{v.title}</h4>
                              <p className="text-gray-500 text-xs mt-0.5">{v.playCount}播放</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 评论面板 */}
                {activeTab === 'comments' && (
                  <div className="comments-panel">
                    {/* 评论输入框 */}
                    <form onSubmit={handleSubmitComment} className="mb-4">
                      <div className="flex gap-2 items-start">
                        <FaUserCircle className="text-gray-500 text-2xl flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="登录后可发布～"
                            className="w-full bg-youku-gray text-white text-sm rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-youku-pink"
                            rows={2}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              type="submit"
                              disabled={!newComment.trim()}
                              className="px-4 py-1.5 bg-youku-pink text-white text-xs rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors"
                            >
                              发布
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {/* 评论排序 */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <button
                        onClick={() => setCommentSort('hot')}
                        className={`${
                          commentSort === 'hot' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        最热
                      </button>
                      <button
                        onClick={() => setCommentSort('new')}
                        className={`${
                          commentSort === 'new' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        最新
                      </button>
                    </div>

                    {/* 评论列表 */}
                    <div className="space-y-4">
                      {sortedComments.map(comment => (
                        <div key={comment.id} className="flex gap-2">
                          <FaUserCircle className="text-gray-500 text-xl flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-gray-300 text-xs font-medium">{comment.user}</span>
                            </div>
                            <p className="text-white text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <button
                                onClick={() => handleLikeComment(comment.id)}
                                className={`flex items-center gap-1 hover:text-youku-pink transition-colors ${
                                  comment.isLiked ? 'text-youku-pink' : ''
                                }`}
                              >
                                {comment.isLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                                <span>{comment.likes > 0 ? comment.likes : '赞'}</span>
                              </button>
                              <button className="hover:text-white">回复</button>
                              <span>{comment.time}</span>
                              <span>·</span>
                              <span>{comment.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 底部提示 */}
                    <div className="text-center text-gray-500 text-xs py-4 mt-4">
                      呀 ~ 到底啦! 不如去看看其他精彩内容 ~
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Below: Recommended Videos Grid */}
            <div className="mt-6">
              <h2 className="text-white text-lg font-medium mb-4">为你推荐</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {recommendedVideos.map(v => (
                  <Link key={v.id} href={`/youku/video/${v.id}`} className="group">
                    <div className="aspect-[3/4] bg-youku-gray rounded-lg overflow-hidden mb-2 relative">
                      {v.poster ? (
                        <img src={v.poster} alt={v.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                          <span className="text-gray-500 text-xs text-center px-2">{v.title}</span>
                        </div>
                      )}
                      {v.isVip && (
                        <span className="absolute top-1 left-1 bg-yellow-500 text-black text-xs px-1 rounded">VIP</span>
                      )}
                      {v.rating && (
                        <span className="absolute bottom-1 right-1 text-white text-xs bg-black/60 px-1 rounded">{v.rating}</span>
                      )}
                    </div>
                    <h4 className="text-white text-xs font-medium line-clamp-1 group-hover:text-youku-pink">{v.title}</h4>
                    <p className="text-gray-500 text-xs">{v.playCount}播放</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VideoDetailPage;
