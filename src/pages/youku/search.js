import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import YoukuHeader from '../../components/youku/YoukuHeader';
import YoukuSidebar from '../../components/youku/YoukuSidebar';
import VideoCard from '../../components/youku/VideoCard';
import VideoFilters from '../../components/youku/VideoFilters';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { 
  videos, 
  searchVideos, 
  filters as categoryFilters,
  sortOptions,
  categories 
} from '../../data/youkuData';

const SearchPage = () => {
  const router = useRouter();
  const { q: searchQuery, category: categoryParam, exclusive } = router.query;
  
  const [results, setResults] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState({
    region: '全部',
    genre: '全部',
    year: '全部',
  });
  const [activeSort, setActiveSort] = useState('recommend');
  const [showFilters, setShowFilters] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('youku-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    let filtered = videos;

    // Apply search query
    if (searchQuery) {
      filtered = searchVideos(searchQuery);
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(v => v.category === activeCategory);
    }

    // Apply exclusive filter
    if (exclusive === 'true') {
      filtered = filtered.filter(v => v.isExclusive);
    }

    // Apply region filter
    if (activeFilters.region !== '全部') {
      filtered = filtered.filter(v => v.region === activeFilters.region);
    }

    // Apply genre filter
    if (activeFilters.genre !== '全部') {
      filtered = filtered.filter(v => v.subcategory === activeFilters.genre);
    }

    // Apply year filter
    if (activeFilters.year !== '全部') {
      if (activeFilters.year === '更早') {
        filtered = filtered.filter(v => parseInt(v.year) < 2020);
      } else {
        filtered = filtered.filter(v => v.year === activeFilters.year);
      }
    }

    // Apply sorting
    switch (activeSort) {
      case 'latest':
        filtered = [...filtered].sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case 'hot':
        filtered = [...filtered].sort((a, b) => {
          const aCount = parseFloat(a.playCount.replace(/[^0-9.]/g, ''));
          const bCount = parseFloat(b.playCount.replace(/[^0-9.]/g, ''));
          return bCount - aCount;
        });
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setResults(filtered);
  }, [searchQuery, activeCategory, activeFilters, activeSort, exclusive]);

  const handleAddToFavorites = (video) => {
    setFavorites(prev => {
      const isFavorite = prev.some(item => item.id === video.id);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prev.filter(item => item.id !== video.id);
      } else {
        newFavorites = [...prev, { id: video.id, title: video.title, addedAt: new Date().toISOString() }];
      }
      
      localStorage.setItem('youku-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (videoId) => {
    return favorites.some(item => item.id === videoId);
  };

  const getCurrentFilters = () => {
    if (activeCategory === 'all') {
      return {
        region: ['全部', '内地', '港台', '韩国', '日本', '美国', '英国'],
        genre: ['全部', '言情', '古装', '都市', '喜剧', '悬疑', '动作', '科幻'],
        year: ['全部', '2025', '2024', '2023', '2022', '2021', '2020', '更早'],
      };
    }
    return categoryFilters[activeCategory] || {};
  };

  const categoryTabs = [
    { id: 'all', name: '全部' },
    ...categories.filter(c => c.id !== 'home')
  ];

  return (
    <>
      <Head>
        <title>{searchQuery ? `${searchQuery} - 搜索结果` : '筛选'} - 优酷</title>
        <meta name="description" content="优酷视频搜索" />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar />

        <main className="ml-36 pt-14">
          <div className="p-6">
            {/* Search header */}
            {searchQuery && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">
                  搜索：<span className="text-youku-pink">{searchQuery}</span>
                </h1>
                <p className="text-gray-400">
                  找到 {results.length} 个相关结果
                </p>
              </div>
            )}

            {/* Category tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-700 pb-4">
              {categoryTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveFilters({
                      region: '全部',
                      genre: '全部',
                      year: '全部',
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === tab.id
                      ? 'bg-youku-pink text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  data-testid={`category-tab-${tab.id}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
            >
              <FaFilter />
              <span>{showFilters ? '收起筛选' : '展开筛选'}</span>
            </button>

            {/* Filters */}
            {showFilters && Object.keys(getCurrentFilters()).length > 0 && (
              <VideoFilters
                filters={getCurrentFilters()}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                sortOptions={sortOptions}
                activeSort={activeSort}
                onSortChange={setActiveSort}
              />
            )}

            {/* Results */}
            {results.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.map(video => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    layout="grid"
                    onAddToFavorites={handleAddToFavorites}
                    isFavorite={isFavorite(video.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl text-white mb-2">未找到相关内容</h3>
                <p className="text-gray-400">请尝试其他搜索词或筛选条件</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
