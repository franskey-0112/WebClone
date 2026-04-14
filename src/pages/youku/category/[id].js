import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import YoukuHeader from '../../../components/youku/YoukuHeader';
import YoukuSidebar from '../../../components/youku/YoukuSidebar';
import VideoCard from '../../../components/youku/VideoCard';
import VideoFilters from '../../../components/youku/VideoFilters';
import { 
  videos, 
  categories, 
  filters as categoryFilters,
  sortOptions,
  getVideosByCategory 
} from '../../../data/youkuData';

const CategoryPage = () => {
  const router = useRouter();
  const { id: categoryId } = router.query;
  
  const [results, setResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [activeSort, setActiveSort] = useState('recommend');
  const [favorites, setFavorites] = useState([]);

  const category = categories.find(c => c.id === categoryId);
  const filters = categoryFilters[categoryId] || {};

  useEffect(() => {
    const savedFavorites = localStorage.getItem('youku-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (!categoryId) return;

    // Initialize filters
    const initialFilters = {};
    Object.keys(filters).forEach(key => {
      initialFilters[key] = '全部';
    });
    setActiveFilters(initialFilters);
  }, [categoryId]);

  useEffect(() => {
    if (!categoryId) return;

    let filtered = videos.filter(v => v.category === categoryId);

    // Apply filters
    Object.entries(activeFilters).forEach(([filterType, value]) => {
      if (value && value !== '全部') {
        if (filterType === 'region') {
          filtered = filtered.filter(v => v.region === value);
        } else if (filterType === 'genre') {
          filtered = filtered.filter(v => v.subcategory === value);
        } else if (filterType === 'year') {
          if (value === '更早') {
            filtered = filtered.filter(v => parseInt(v.year) < 2020);
          } else {
            filtered = filtered.filter(v => v.year === value);
          }
        } else if (filterType === 'status') {
          if (value === '连载中') {
            filtered = filtered.filter(v => v.currentEpisode < v.episodes);
          } else if (value === '已完结') {
            filtered = filtered.filter(v => v.currentEpisode >= v.episodes);
          }
        } else if (filterType === 'audience') {
          // For anime audience filtering (simplified)
          filtered = filtered.filter(v => v.subcategory?.includes(value) || true);
        }
      }
    });

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
  }, [categoryId, activeFilters, activeSort]);

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

  if (!category) {
    return (
      <div className="min-h-screen bg-youku-dark flex items-center justify-center">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{category.name} - 优酷</title>
        <meta name="description" content={`优酷${category.name}频道`} />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar activeCategory={categoryId} />

        <main className="ml-36 pt-14">
          <div className="p-6">
            {/* Category header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.name}
              </h1>
              <p className="text-gray-400">
                共 {results.length} 部作品
              </p>
            </div>

            {/* Filters */}
            {Object.keys(filters).length > 0 && (
              <VideoFilters
                filters={filters}
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
                <div className="text-6xl mb-4">📺</div>
                <h3 className="text-xl text-white mb-2">暂无内容</h3>
                <p className="text-gray-400">请尝试其他筛选条件</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
