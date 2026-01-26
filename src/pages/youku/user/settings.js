import { useState } from 'react';
import UserLayout from '../../../components/youku/UserLayout';
import { FaUser, FaBell, FaLock, FaShieldAlt, FaQuestionCircle, FaSignOutAlt, FaChevronRight, FaToggleOn, FaToggleOff } from 'react-icons/fa';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    autoPlay: true,
    hdDefault: true,
    danmaku: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const menuSections = [
    {
      title: '账号设置',
      items: [
        { id: 'profile', label: '个人资料', icon: FaUser, type: 'link' },
        { id: 'security', label: '账号安全', icon: FaLock, type: 'link' },
        { id: 'privacy', label: '隐私设置', icon: FaShieldAlt, type: 'link' },
      ]
    },
    {
      title: '通知设置',
      items: [
        { id: 'pushNotifications', label: '推送通知', icon: FaBell, type: 'toggle', key: 'pushNotifications' },
        { id: 'emailNotifications', label: '邮件通知', icon: FaBell, type: 'toggle', key: 'emailNotifications' },
      ]
    },
    {
      title: '播放设置',
      items: [
        { id: 'autoPlay', label: '自动播放下一集', type: 'toggle', key: 'autoPlay' },
        { id: 'hdDefault', label: '默认高清画质', type: 'toggle', key: 'hdDefault' },
        { id: 'danmaku', label: '默认开启弹幕', type: 'toggle', key: 'danmaku' },
      ]
    },
    {
      title: '其他',
      items: [
        { id: 'help', label: '帮助与反馈', icon: FaQuestionCircle, type: 'link' },
        { id: 'logout', label: '退出登录', icon: FaSignOutAlt, type: 'action', color: 'red' },
      ]
    },
  ];

  return (
    <UserLayout title="设置" activeMenu="settings">
      <h1 className="text-xl font-bold text-white mb-6">设置</h1>

      <div className="space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="bg-youku-dark rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-800">
              <h3 className="text-gray-400 text-sm font-medium">{section.title}</h3>
            </div>
            <div>
              {section.items.map((item, index) => {
                const Icon = item.icon;
                const isLast = index === section.items.length - 1;
                
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer ${
                      !isLast ? 'border-b border-gray-800/50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      {Icon && (
                        <Icon className={`w-4 h-4 mr-3 ${
                          item.color === 'red' ? 'text-red-500' : 'text-gray-400'
                        }`} />
                      )}
                      <span className={`text-sm ${
                        item.color === 'red' ? 'text-red-500' : 'text-white'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {item.type === 'link' && (
                      <FaChevronRight className="w-3 h-3 text-gray-600" />
                    )}

                    {item.type === 'toggle' && (
                      <button
                        onClick={() => toggleSetting(item.key)}
                        className="text-2xl"
                      >
                        {settings[item.key] ? (
                          <FaToggleOn className="text-youku-pink" />
                        ) : (
                          <FaToggleOff className="text-gray-600" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Version Info */}
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p>优酷视频 v10.0.0</p>
        <p className="mt-1">© 2024 优酷网站克隆 - 仅用于评测演示</p>
      </div>
    </UserLayout>
  );
}
