import React from 'react';

const VideoFilters = ({ 
  filters, 
  activeFilters, 
  onFilterChange,
  sortOptions,
  activeSort,
  onSortChange 
}) => {
  const handleFilterClick = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-youku-gray rounded-lg p-4 mb-6">
      {/* Filter sections */}
      {Object.entries(filters).map(([filterType, options]) => (
        <div key={filterType} className="mb-4 last:mb-0">
          <div className="flex items-start">
            <span className="text-gray-400 text-sm w-16 flex-shrink-0 pt-1">
              {filterType === 'region' ? '地区' : 
               filterType === 'genre' ? '类型' : 
               filterType === 'year' ? '年份' : 
               filterType === 'status' ? '状态' :
               filterType === 'audience' ? '受众' : filterType}
            </span>
            <div className="flex flex-wrap gap-2">
              {options.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterClick(filterType, option)}
                  className={`filter-chip px-3 py-1 rounded-full text-sm transition-colors ${
                    activeFilters[filterType] === option
                      ? 'bg-youku-pink text-white'
                      : 'bg-youku-light-gray text-gray-300 hover:bg-gray-600'
                  }`}
                  data-testid={`filter-${filterType}-${option}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Sort options */}
      {sortOptions && sortOptions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center">
            <span className="text-gray-400 text-sm w-16 flex-shrink-0">排序</span>
            <div className="flex gap-4">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  className={`text-sm transition-colors ${
                    activeSort === option.id
                      ? 'text-youku-pink'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  data-testid={`sort-${option.id}`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoFilters;
