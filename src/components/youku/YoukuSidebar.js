import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHome,
  FaTv,
  FaFilm,
  FaTheaterMasks,
  FaPalette,
  FaVideo,
  FaBaby,
  FaFutbol,
  FaGraduationCap,
  FaGamepad,
  FaLightbulb
} from 'react-icons/fa';
import { MdMovieFilter } from 'react-icons/md';
import { categories } from '../../data/youkuData';

const iconMap = {
  home: FaHome,
  tv: FaTv,
  movie: FaFilm,
  variety: FaTheaterMasks,
  anime: FaPalette,
  duanju: MdMovieFilter,
  documentary: FaVideo,
  children: FaBaby,
  sports: FaFutbol,
  culture: FaTheaterMasks,
  game: FaGamepad,
  education: FaGraduationCap,
  knowledge: FaLightbulb,
};

const YoukuSidebar = ({ activeCategory = 'home' }) => {
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-14 bottom-0 w-36 bg-youku-dark border-r border-gray-800 overflow-y-auto z-40">
      <nav className="py-4">
        {/* Main categories */}
        <div className="space-y-1">
          {categories.map(category => {
            const Icon = iconMap[category.id] || FaHome;
            const isActive = activeCategory === category.id;
            const path = category.id === 'home' ? '/youku' : `/youku/channel/${category.slug}`;
            
            return (
              <Link
                key={category.id}
                href={path}
                className={`sidebar-item flex items-center gap-3 py-2.5 px-3 mx-2 rounded-lg ${
                  isActive 
                    ? 'bg-youku-pink/20 text-youku-pink' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                data-testid={`sidebar-${category.id}`}
              >
                <Icon className="text-base flex-shrink-0" />
                <span className="text-sm">{category.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default YoukuSidebar;
