import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaStar, FaHeart, FaRegHeart, FaPlus } from 'react-icons/fa';

const VideoCard = ({ video, layout = 'grid', onAddToFavorites, isFavorite = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToFavorites) {
      onAddToFavorites(video);
    }
  };

  const renderTags = () => {
    const tags = [];
    
    if (video.isVip) {
      tags.push(
        <span key="vip" className="tag-vip px-1.5 py-0.5 text-xs font-bold rounded">
          VIP
        </span>
      );
    }
    
    if (video.isExclusive) {
      tags.push(
        <span key="exclusive" className="tag-exclusive px-1.5 py-0.5 text-xs font-bold rounded">
          独播
        </span>
      );
    }
    
    if (video.isNew) {
      tags.push(
        <span key="new" className="tag-new px-1.5 py-0.5 text-xs font-bold rounded">
          NEW
        </span>
      );
    }

    return tags;
  };

  const renderRating = () => {
    if (!video.rating) return null;
    
    const categoryPrefix = video.category === 'movie' ? '影' : 
                          video.category === 'tv' ? '剧' : 
                          video.category === 'anime' ? '动' : 
                          video.category === 'variety' ? '综' : '';
    
    return (
      <div className="flex items-center text-xs text-gray-300">
        <span className="text-gray-500">{categoryPrefix}・</span>
        <span className="text-yellow-500">{video.rating}</span>
      </div>
    );
  };

  if (layout === 'list') {
    return (
      <Link href={`/youku/video/${video.id}`} data-testid={`video-card-${video.id}`}>
        <div 
          className="video-card flex bg-youku-gray rounded-lg overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Thumbnail */}
          <div className="relative w-48 h-28 flex-shrink-0">
            {video.poster ? (
              <img src={video.poster} alt={video.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 text-sm">{video.title}</span>
              </div>
            )}
            
            {/* Tags overlay */}
            <div className="absolute top-2 left-2 flex gap-1">
              {renderTags()}
            </div>

            {/* Play overlay */}
            <div className={`video-overlay absolute inset-0 bg-black/50 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-10 h-10 rounded-full bg-youku-pink/80 flex items-center justify-center">
                <FaPlay className="text-white ml-1" />
              </div>
            </div>

            {/* Update info */}
            {video.updateInfo && (
              <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-xs text-gray-300">
                {video.updateInfo}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-medium mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">{video.description}</p>
            </div>
            <div className="flex items-center justify-between">
              {renderRating()}
              <span className="text-gray-500 text-xs">{video.playCount}次播放</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout (default)
  return (
    <Link href={`/youku/video/${video.id}`} data-testid={`video-card-${video.id}`}>
      <div 
        className="video-card group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-youku-gray mb-2">
          {video.poster ? (
            <img src={video.poster} alt={video.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm text-center px-2">{video.title}</span>
            </div>
          )}
          
          {/* Tags overlay - top left */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {renderTags()}
          </div>

          {/* Rating overlay - top right */}
          <div className="absolute top-2 right-2">
            {renderRating()}
          </div>

          {/* Play overlay */}
          <div className={`video-overlay absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-12 h-12 rounded-full bg-youku-pink/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <FaPlay className="text-white text-lg ml-1" />
            </div>
          </div>

          {/* Update info - bottom */}
          {video.updateInfo && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <span className="text-xs text-gray-200">{video.updateInfo}</span>
            </div>
          )}

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } ${isFavorite ? 'bg-youku-pink text-white' : 'bg-black/50 text-gray-300 hover:bg-youku-pink hover:text-white'}`}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-white text-sm font-medium line-clamp-1 group-hover:text-youku-pink transition-colors">
          {video.title}
        </h3>

        {/* Sub info */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-gray-500 text-xs">{video.playCount}播放</span>
          {video.actors && video.actors.length > 0 && (
            <span className="text-gray-500 text-xs line-clamp-1">
              {video.actors.slice(0, 2).join(' ')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
