import { useState } from 'react';
import UserLayout, { EmptyState, TabNav } from '../../../components/youku/UserLayout';
import { FaTicketAlt, FaClock } from 'react-icons/fa';

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState('available');
  const [coupons] = useState([
    { 
      id: 1, 
      title: '会员7天体验卡', 
      description: '新用户专享VIP会员体验',
      validUntil: '2026-02-28',
      status: 'available',
      type: 'vip'
    },
    { 
      id: 2, 
      title: '观影券 x3', 
      description: '可用于观看付费电影',
      validUntil: '2026-03-15',
      status: 'available',
      type: 'movie'
    },
    { 
      id: 3, 
      title: '满30减5优惠券', 
      description: '购买会员时可用',
      validUntil: '2026-01-10',
      status: 'expired',
      type: 'discount'
    },
  ]);

  const tabs = [
    { id: 'available', name: '可使用' },
    { id: 'used', name: '已使用' },
    { id: 'expired', name: '已过期' },
  ];

  const filteredCoupons = coupons.filter(c => {
    if (activeTab === 'available') return c.status === 'available';
    if (activeTab === 'used') return c.status === 'used';
    if (activeTab === 'expired') return c.status === 'expired';
    return true;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'vip': return 'from-yellow-500 to-orange-500';
      case 'movie': return 'from-pink-500 to-red-500';
      case 'discount': return 'from-blue-500 to-purple-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <UserLayout title="卡券包" activeMenu="coupons">
      <h1 className="text-xl font-bold text-white mb-6">卡券包</h1>

      <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {filteredCoupons.length === 0 ? (
        <EmptyState message="暂无卡券" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCoupons.map((coupon) => (
            <div 
              key={coupon.id}
              className={`relative bg-youku-dark rounded-lg overflow-hidden ${
                coupon.status !== 'available' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex">
                {/* Left colored section */}
                <div className={`w-24 bg-gradient-to-b ${getTypeColor(coupon.type)} flex items-center justify-center`}>
                  <FaTicketAlt className="w-8 h-8 text-white" />
                </div>
                
                {/* Right content section */}
                <div className="flex-1 p-4">
                  <h3 className="text-white font-medium mb-1">{coupon.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{coupon.description}</p>
                  <div className="flex items-center text-gray-600 text-xs">
                    <FaClock className="mr-1 w-3 h-3" />
                    <span>有效期至 {coupon.validUntil}</span>
                  </div>
                </div>

                {/* Use button */}
                {coupon.status === 'available' && (
                  <div className="flex items-center pr-4">
                    <button className="px-4 py-1.5 bg-youku-pink text-white text-sm rounded-full hover:bg-pink-600 transition-colors">
                      立即使用
                    </button>
                  </div>
                )}
              </div>

              {/* Status overlay for expired/used */}
              {coupon.status !== 'available' && (
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-gray-700 text-gray-400 text-xs rounded">
                  {coupon.status === 'used' ? '已使用' : '已过期'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </UserLayout>
  );
}
