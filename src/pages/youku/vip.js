import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import YoukuHeader from '../../components/youku/YoukuHeader';
import YoukuSidebar from '../../components/youku/YoukuSidebar';
import { 
  FaCrown, 
  FaCheck, 
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { currentUser } from '../../data/youkuData';

const VipPage = () => {
  const router = useRouter();
  const [memberType, setMemberType] = useState('vip'); // 'vip' or 'svip'
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // VIP套餐数据
  const vipPlans = [
    { id: 'monthly', name: '连续包月', price: 12, originalPrice: 25, unit: '', tag: '首3月特惠' },
    { id: 'yearly', name: '连续包年', price: 118, originalPrice: 238, unit: '' },
    { id: 'quarterly', name: '连续包季', price: 68, originalPrice: 75, unit: '/月', unitPrice: '22.67元' },
  ];

  // SVIP套餐数据
  const svipPlans = [
    { id: 'monthly', name: '连续包月', price: 30, originalPrice: 45, unit: '', tag: '首月特惠' },
    { id: 'yearly', name: '连续包年', price: 258, originalPrice: 398, unit: '' },
    { id: 'quarterly', name: '连续包季', price: 88, originalPrice: 120, unit: '/月', unitPrice: '29.33元' },
  ];

  const currentPlans = memberType === 'vip' ? vipPlans : svipPlans;
  const selectedPlanData = currentPlans.find(p => p.id === selectedPlan);

  // VIP权益对比数据
  const benefitsComparison = [
    { name: 'VIP内容', nonVip: '-', vip: '抢先看\nVIP集', svip: '额外提前看\n限时' },
    { name: '广告特权', nonVip: '-', vip: '跳过广告', svip: '跳过广告' },
    { name: '画质', nonVip: '1080P', vip: '4K', svip: '4K HDR' },
    { name: '下载', nonVip: '-', vip: '支持', svip: '加速下载' },
    { name: '投屏', nonVip: '-', vip: '支持', svip: '无限投屏' },
  ];

  const handlePurchase = () => {
    if (!agreeTerms) {
      alert('请先同意会员协议');
      return;
    }
    alert(`模拟购买成功！\n\n会员类型：${memberType === 'vip' ? 'VIP会员' : 'SVIP会员'}\n套餐：${selectedPlanData?.name}\n价格：¥${selectedPlanData?.price}\n\n（这是演示页面，实际不会产生任何交易）`);
  };

  return (
    <>
      <Head>
        <title>优酷VIP会员 - 优酷</title>
        <meta name="description" content="开通优酷VIP会员，享受海量独家内容" />
      </Head>

      <div className="min-h-screen bg-youku-dark">
        <YoukuHeader />
        <YoukuSidebar />

        <main className="ml-36 pt-14">
          <div className="p-6 flex items-center justify-center min-h-[calc(100vh-56px)]">
            {/* VIP购买弹窗 */}
            <div className="bg-white rounded-2xl w-full max-w-[700px] shadow-2xl overflow-hidden">
              {/* 头部用户信息 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                    <FaCrown className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{currentUser.username}</span>
                      <span className="text-orange-500 text-sm">🎖️</span>
                      <span className="text-gray-500 text-sm">(136****2596)</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {currentUser.isVip 
                        ? `VIP会员 2026-02-13 到期，到后有效期将延长`
                        : '开通VIP，畅享海量内容'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => router.back()}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="flex">
                {/* 左侧：套餐选择 */}
                <div className="flex-1 p-6">
                  {/* 会员类型切换 */}
                  <div className="flex mb-6">
                    <button
                      onClick={() => setMemberType('vip')}
                      className={`flex-1 py-3 text-center rounded-l-lg border-2 transition-all ${
                        memberType === 'vip'
                          ? 'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-400 text-orange-600'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-orange-500">💎</span>
                        <span className="font-medium">VIP会员</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">手机/平板/电脑均可使用</p>
                    </button>
                    <button
                      onClick={() => setMemberType('svip')}
                      className={`flex-1 py-3 text-center rounded-r-lg border-2 border-l-0 transition-all ${
                        memberType === 'svip'
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-400 text-purple-600'
                          : 'bg-gray-50 border-gray-200 text-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-purple-500">👑</span>
                        <span className="font-medium">SVIP会员</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">VIP会员+电视/激光/SVIP影院</p>
                    </button>
                  </div>

                  {/* 套餐选择 */}
                  <div className="flex gap-3 mb-6">
                    <button className="text-gray-300 hover:text-gray-500 p-1">
                      <FaChevronLeft />
                    </button>
                    
                    {currentPlans.map((plan, index) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`flex-1 relative rounded-lg p-4 border-2 transition-all ${
                          selectedPlan === plan.id
                            ? memberType === 'vip'
                              ? 'border-orange-400 bg-gradient-to-b from-orange-50 to-yellow-50'
                              : 'border-purple-400 bg-gradient-to-b from-purple-50 to-pink-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {plan.tag && (
                          <span className={`absolute -top-2 left-2 px-2 py-0.5 text-xs text-white rounded ${
                            memberType === 'vip' ? 'bg-orange-500' : 'bg-purple-500'
                          }`}>
                            {plan.tag}
                          </span>
                        )}
                        <h4 className="text-gray-700 text-sm mb-2">{plan.name}</h4>
                        <div className="flex items-baseline justify-center">
                          <span className={`text-sm ${memberType === 'vip' ? 'text-orange-500' : 'text-purple-500'}`}>¥</span>
                          <span className={`text-3xl font-bold ${memberType === 'vip' ? 'text-orange-500' : 'text-purple-500'}`}>
                            {plan.price}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-1 line-through">¥{plan.originalPrice}</p>
                        {plan.unitPrice && (
                          <p className="text-gray-500 text-xs mt-1">{plan.unitPrice}/月</p>
                        )}
                      </button>
                    ))}

                    <button className="text-gray-300 hover:text-gray-500 p-1">
                      <FaChevronRight />
                    </button>
                  </div>

                  {/* 优惠提示 */}
                  <p className="text-xs text-gray-500 mb-6">
                    ● 首3月<span className="text-orange-500">12元</span>/月，到期后<span className="text-orange-500">25元</span>/月续费，可随时取消...
                  </p>

                  {/* VIP权益对比表 */}
                  <div>
                    <h3 className="text-gray-800 font-medium mb-4">VIP会员权益</h3>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="py-2 text-left text-gray-500 font-normal"></th>
                          <th className="py-2 text-center text-gray-500 font-normal">非会员</th>
                          <th className={`py-2 text-center font-medium ${memberType === 'vip' ? 'text-orange-500' : 'text-gray-500'}`}>
                            VIP会员
                          </th>
                          <th className={`py-2 text-center font-medium ${memberType === 'svip' ? 'text-purple-500' : 'text-gray-500'}`}>
                            SVIP会员
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {benefitsComparison.map((item, index) => (
                          <tr key={index} className="border-b border-gray-50">
                            <td className="py-3 text-gray-600">{item.name}</td>
                            <td className="py-3 text-center text-gray-400">{item.nonVip}</td>
                            <td className={`py-3 text-center whitespace-pre-line ${memberType === 'vip' ? 'text-orange-500' : 'text-gray-600'}`}>
                              {item.vip}
                            </td>
                            <td className={`py-3 text-center whitespace-pre-line ${memberType === 'svip' ? 'text-purple-500' : 'text-gray-600'}`}>
                              {item.svip}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 右侧：支付信息 */}
                <div className="w-[200px] bg-gray-50 p-5 flex flex-col">
                  {/* 支付金额 */}
                  <div className="text-center mb-4">
                    <p className="text-gray-500 text-sm mb-1">支付</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-orange-500 text-lg">¥</span>
                      <span className="text-orange-500 text-4xl font-bold">{selectedPlanData?.price}</span>
                    </div>
                    {selectedPlanData && selectedPlanData.originalPrice > selectedPlanData.price && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-500 text-xs rounded-full">
                        已减¥{selectedPlanData.originalPrice - selectedPlanData.price} ⓘ
                      </span>
                    )}
                  </div>

                  {/* 协议 */}
                  <div className="text-xs text-gray-500 mb-4 flex-1">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 accent-orange-500"
                      />
                      <span>
                        <Link href="#" className="text-blue-500 hover:underline">《会员协议》</Link>
                        <Link href="#" className="text-blue-500 hover:underline">《付款授权协议》</Link>
                      </span>
                    </label>
                  </div>

                  {/* 支付按钮 */}
                  <button
                    onClick={handlePurchase}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      agreeTerms
                        ? memberType === 'vip'
                          ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:from-orange-500 hover:to-yellow-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    同意并支付
                  </button>

                  {/* 支付方式 */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-400 mb-2">支持</p>
                    <div className="flex justify-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">支</div>
                      <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">微</div>
                      <span className="text-xs text-gray-400">扫码支付</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default VipPage;
