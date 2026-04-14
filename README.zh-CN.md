# WebClone

🌐 **Web Agent 评测环境** - 提供离线可控的网站克隆，用于 AI Agent 可复现测试与标准化评估。

## 🎯 项目意义

### 为什么需要 WebClone？

在评测 Web Agent时，直接使用真实网站存在以下问题：

| 问题 | 影响 |
|------|------|
| **网站内容动态变化** | 商品价格、库存、航班信息实时变动，导致测试结果不可复现 |
| **网络依赖** | 需要稳定网络，测试速度受限于网络延迟 |
| **反爬机制** | 频繁访问可能触发验证码或封禁 |
| **数据不可控** | 无法预设特定场景（如"购物车有3件商品"） |
| **隐私风险** | 测试可能涉及真实账户和支付信息 |

### WebClone 的解决方案

✅ **完全离线运行** - 无需网络，本地即可测试  
✅ **数据可控** - 静态数据，每次测试环境一致  
✅ **可复现评估** - 便于对比不同 Agent 性能  
✅ **批量数据生成** - 通过修改数据文件，快速生成不同测试场景  
✅ **安全无风险** - 不涉及真实交易和个人信息、默认为登录状态 

### 应用场景

1. **Agent 能力评测** - 测试 AI Agent 在购物、预订等任务上的表现
2. **对比实验** - 在相同环境下对比不同 Agent 或提示词的效果
3. **回归测试** - 验证 Agent 更新后是否保持原有能力
4. **教学演示** - 展示 Web Agent 工作原理
5. **数据集构建** - 可以批量收集 Agent 交互轨迹用于训练和分析

## 🌐 已实现的网站

| 网站 | 路径 | 功能 |
|------|------|------|
| 航班预订 | `/flights` | 航班搜索、筛选、预订 |
| 亚马逊购物 | `/amazon` | 商品浏览、搜索、购物车、结算 |
| Bose 官网 | `/bose` | 音频产品浏览、搜索、购物车、结算 |
| 优酷视频 | `/youku` | 视频浏览、搜索、播放、VIP会员、收藏、历史记录 |
| 酒店预订 | `/hotels` | 酒店搜索、筛选、详情、预订 |
| 民宿预订 | `/staybnb` | 房源浏览、搜索、收藏、行程、预订 |
| 租车服务 | `/carrental` | 车型搜索、筛选、门店、优惠、预订 |
| 职业社交 | `/careerlink` | 职位搜索、公司页、消息、通知、个人主页 |
| 演出票务 | `/masterticket` | 活动搜索、详情、选座、结算 |
| 外卖平台 | `/mealdash` | 餐厅浏览、分类、购物车、下单、订单追踪 |
| 公司点评 | `/companycheck` | 公司搜索、薪资、面试、评价、岗位信息 |
| 邮件系统 | `/email` | 收件箱、标签、线程、文件夹、邮件详情 |

## 📁 项目结构

```
WebClone/
├── src/
│   ├── components/          # React 组件
│   │   ├── amazon/          # Amazon 组件
│   │   ├── bose/            # Bose 组件
│   │   ├── hotels/          # 酒店组件
│   │   ├── staybnb/         # 民宿组件
│   │   ├── carrental/       # 租车组件
│   │   ├── careerlink/      # 职业社交组件
│   │   ├── masterticket/    # 票务组件
│   │   ├── mealdash/        # 外卖组件
│   │   ├── companycheck/    # 公司点评组件
│   │   ├── email/           # 邮件组件
│   │   ├── youku/           # 优酷组件
│   │   ├── Header.js        # 通用头部组件
│   │   ├── Footer.js        # 通用底部组件
│   │   ├── SearchForm.js    # 搜索表单
│   │   ├── FlightCard.js    # 航班卡片
│   │   ├── FlightDetails.js # 航班详情
│   │   └── FlightFilters.js # 航班筛选
│   │
│   ├── pages/               # Next.js 页面路由
│   │   ├── amazon/          # Amazon 页面
│   │   │   ├── index.js     # 首页
│   │   │   ├── search.js    # 搜索页
│   │   │   ├── cart.js      # 购物车
│   │   │   ├── checkout.js  # 结算页
│   │   │   ├── category/    # 分类页
│   │   │   └── product/     # 产品详情页
│   │   ├── bose/            # Bose 页面
│   │   │   ├── index.js     # 首页
│   │   │   ├── search.js    # 搜索页
│   │   │   ├── cart.js      # 购物车
│   │   │   └── product/     # 产品详情页
│   │   ├── youku/           # 优酷页面
│   │   │   ├── index.js     # 首页
│   │   │   ├── search.js    # 搜索页
│   │   │   ├── vip.js       # VIP会员页
│   │   │   ├── favorites.js # 收藏页
│   │   │   ├── history.js   # 历史记录
│   │   │   ├── video/       # 视频详情页
│   │   │   ├── channel/     # 频道页
│   │   │   └── user/        # 用户中心
│   │   ├── flights/         # 航班页面
│   │   │   ├── index.js     # 首页
│   │   │   ├── search.js    # 搜索页
│   │   │   └── [id]/book.js # 预订页
│   │   ├── hotels/          # 酒店页面
│   │   ├── staybnb/         # 民宿页面
│   │   ├── carrental/       # 租车页面
│   │   ├── careerlink/      # 职业社交页面
│   │   ├── masterticket/    # 票务页面
│   │   ├── mealdash/        # 外卖页面
│   │   ├── companycheck/    # 公司点评页面
│   │   ├── email/           # 邮件页面
│   │   ├── index.js         # 主页
│   │   └── _app.js          # App 入口
│   │
│   ├── data/                # 静态数据（可修改以生成不同测试场景）
│   │   ├── amazonData.js    # Amazon 产品数据
│   │   ├── boseData.js      # Bose 产品数据
│   │   ├── youkuData.js     # 优酷视频数据
│   │   ├── staticFlightData.js      # 航班数据
│   │   ├── staticHotelData.js       # 酒店数据
│   │   ├── staticStaybnbData.js     # 民宿数据
│   │   ├── staticCarRentalData.js   # 租车数据
│   │   ├── staticCareerLinkData.js  # 职业社交数据
│   │   ├── staticMasterTicketData.js# 票务数据
│   │   ├── staticMealDashData.js    # 外卖数据
│   │   ├── staticCompanyCheckData.js# 公司点评数据
│   │   └── staticEmailData.js       # 邮件数据
│   │
│   ├── utils/               # 工具函数
│   │   ├── flightData.js
│   │   ├── hotelData.js
│   │   ├── staybnbData.js
│   │   ├── carRentalData.js
│   │   ├── careerLinkData.js
│   │   ├── masterTicketData.js
│   │   ├── mealDashData.js
│   │   ├── companyCheckData.js
│   │   └── emailData.js
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── amazon/          # Amazon 产品图片
│       ├── bose/            # Bose 产品图片
│       ├── hotels/          # 酒店图片
│       └── youku/           # 优酷视频海报
│
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看所有可用网站。

### 构建生产版本

```bash
npm run build
npm start
```

## 📊 批量数据生成

通过修改 `src/data/` 下的数据文件，可以快速生成不同的测试场景：

### 示例：修改商品数据

```javascript
// src/data/amazonData.js
export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999.99,
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    // 修改这些字段来创建不同场景
  },
  // 添加更多商品...
];
```

### 示例：修改航班数据

```javascript
// src/data/staticFlightData.js
export const flights = [
  {
    id: 1,
    airline: "东方航空",
    departure: "北京",
    arrival: "上海",
    price: 580,
    duration: "2h 15m",
    // 修改这些字段来创建不同场景
  },
  // 添加更多航班...
];
```

### 示例：修改酒店数据

```javascript
// src/data/staticHotelData.js
export const hotels = [
  {
    id: 1,
    name: "Grand Luxury Hotel",
    city: "New York",
    pricePerNight: 299,
    // 修改这些字段来创建不同场景
  },
  // 添加更多酒店...
];
```

## 📝 如何添加新网站

### 1. 创建组件目录

在 `src/components/` 下创建新网站的组件目录：

```
src/components/your_site/
├── YourSiteHeader.js    # 头部导航
├── YourSiteCard.js      # 列表卡片
└── YourSiteFilters.js   # 筛选组件
```

### 2. 创建页面路由

在 `src/pages/` 下创建页面目录：

```
src/pages/your_site/
├── index.js             # 首页
├── search.js            # 搜索/列表页
└── [id].js              # 详情页（动态路由）
```

### 3. 创建静态数据

在 `src/data/` 下创建数据文件：

```javascript
// src/data/yourSiteData.js
export const yourSiteItems = [
  {
    id: 1,
    name: "示例项目",
    price: 99.99,
    // ... 其他字段
  }
];
```

### 4. 添加到主页

在 `src/pages/index.js` 的 `sites` 数组中添加：

```javascript
{
  name: '你的网站',
  path: '/your_site',
  description: '网站描述',
  color: '#颜色代码',
  icon: '🎯'
}
```

### 5. 添加资源文件（可选）

如果需要图片资源，放置在：

```
public/images/your_site/
├── products/
├── banners/
└── ...
```

## 🎨 命名规范

- **组件目录**: 小写，如 `amazon`、`flights`、`bose`、`youku`、`hotels`、`staybnb`
- **组件文件**: 大驼峰，如 `ProductCard.js`
- **页面文件**: 小写，如 `index.js`、`search.js`
- **数据文件**: 小驼峰，如 `amazonData.js`

## 🔬 评测建议

### 设计可复现的测试任务

```javascript
// 示例任务定义
const task = {
  id: "amazon-search-001",
  description: "在 Amazon 搜索 'iPhone 15'，找到价格最低的商品并加入购物车",
  startUrl: "/amazon",
  expectedActions: ["search", "filter", "add_to_cart"],
  successCriteria: "购物车中包含目标商品"
};
```

### 记录 Agent 交互轨迹

建议在测试时记录：
- 每一步的 DOM 状态
- Agent 的决策和动作
- 任务完成时间
- 最终结果（成功/失败）

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/new-site`)
3. 提交更改 (`git commit -m 'Add new site: xxx'`)
4. 推送到分支 (`git push origin feature/new-site`)
5. 创建 Pull Request

欢迎贡献新的网站克隆！请确保：
- 遵循现有的代码结构和命名规范
- 提供完整的静态数据
- 更新 README 中的网站列表

## 📜 License

MIT License
