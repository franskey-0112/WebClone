# WebClone

[中文](./README.zh-CN.md) | [English](./README.md)

🌐 **Web Agent 评测环境（10站点离线版）**  
提供可控、可复现的多网站克隆环境，用于 AI Agent 的标准化评测、回归测试和轨迹采集。

## 📌 合并说明

本仓库已将 **WebFactory 项目中的 10 个网站环境部分** 合并为独立的 `WebClone` 项目。  
当前 README 以 `franskey-0112/WebClone` 原有文档风格为基础，并按本仓库实际文件结构与路由更新。

## 🎯 项目意义

在真实网站上评测 Web Agent 时，常见问题包括：

| 问题 | 影响 |
|------|------|
| 网站内容实时变化 | 测试结果难复现（价格、库存、排序不断变化） |
| 网络依赖和外部波动 | 延迟、失败率影响评测稳定性 |
| 反爬限制 | 高频自动化测试容易触发风控 |
| 场景不可控 | 难以稳定复现“指定任务” |
| 隐私与安全风险 | 可能涉及真实账号、支付与个人信息 |

WebClone 的核心价值：

- ✅ 完全离线运行，环境稳定
- ✅ 数据可控，可快速构造任务场景
- ✅ 可复现评测，适合横向对比不同 Agent
- ✅ 支持回归测试，便于版本迭代验证
- ✅ 默认无真实交易风险

## 🌐 已实现网站（10个）

统一入口：`http://localhost:3000`

| 网站 | 路由 | 主要功能 |
|------|------|----------|
| Amazon | `/amazon` | 商品浏览、搜索、分类、详情、购物车、结算、订单 |
| Flights | `/flights` | 航班搜索、筛选、详情、预订 |
| Hotels | `/hotels` | 酒店搜索、详情、预订 |
| StayBnB | `/staybnb` | 民宿检索、房源详情、收藏、行程、房东页 |
| CarRental | `/carrental` | 车型浏览、搜索、优惠、门店、车辆详情、预订 |
| CareerLink | `/careerlink` | 职位搜索、公司页、个人资料、社交网络、消息与通知 |
| MasterTicket | `/masterticket` | 演出活动检索、详情、票务结算 |
| MealDash | `/mealdash` | 餐厅/品类浏览、下单、购物车、结算、订单追踪 |
| CompanyCheck | `/companycheck` | 公司检索、评价、薪资、面试、职位信息 |
| Email | `/email` | 收件箱、标签、文件夹、邮件详情 |

## 📁 项目结构

```text
WebClone/
├── src/
│   ├── pages/
│   │   ├── amazon/
│   │   ├── flights/
│   │   ├── hotels/
│   │   ├── staybnb/
│   │   ├── carrental/
│   │   ├── careerlink/
│   │   ├── masterticket/
│   │   ├── mealdash/
│   │   ├── companycheck/
│   │   ├── email/
│   │   ├── index.js
│   │   └── _app.js
│   ├── components/
│   │   ├── amazon/
│   │   ├── careerlink/
│   │   ├── carrental/
│   │   ├── companycheck/
│   │   ├── email/
│   │   ├── hotels/
│   │   ├── masterticket/
│   │   ├── mealdash/
│   │   ├── staybnb/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── SearchForm.js
│   ├── data/
│   │   ├── amazonData.js
│   │   ├── staticFlightData.js
│   │   ├── staticHotelData.js
│   │   ├── staticStaybnbData.js
│   │   ├── staticCarRentalData.js
│   │   ├── staticCareerLinkData.js
│   │   ├── staticMasterTicketData.js
│   │   ├── staticMealDashData.js
│   │   ├── staticCompanyCheckData.js
│   │   └── staticEmailData.js
│   ├── utils/
│   └── styles/
├── public/
├── package.json
└── README.md
```

## 🚀 快速开始

### 1) 安装依赖

```bash
npm install
```

### 2) 启动开发环境

```bash
npm run dev
```

打开：`http://localhost:3000`

### 3) 生产构建与运行

```bash
npm run build
npm start
```

## 📊 批量场景生成

通过修改 `src/data/` 下静态数据文件，即可快速构造可复现任务。

示例：

- `src/data/amazonData.js`：商品、价格、库存、类目
- `src/data/staticFlightData.js`：航班班次、票价、出发到达时间
- `src/data/staticHotelData.js`：酒店、房型、价格、可订状态

## 🧪 评测建议

建议统一任务定义模板，便于多 Agent 对比：

```javascript
const task = {
  id: "amazon-search-001",
  description: "在 Amazon 搜索 iPhone 15，筛选后加入购物车",
  startUrl: "/amazon",
  expectedActions: ["search", "filter", "add_to_cart"],
  successCriteria: "购物车中出现目标商品"
};
```

建议记录：

- 每一步页面状态（DOM 或截图）
- Agent 的动作与理由
- 任务完成时间
- 最终结果（成功/失败）与失败原因

## 🧩 如何扩展新网站

1. 在 `src/components/` 新建站点组件目录  
2. 在 `src/pages/` 新建路由与动态页  
3. 在 `src/data/` 增加静态数据文件  
4. 在 `src/pages/index.js` 首页入口补充站点卡片  
5. （可选）在 `public/images/` 添加站点素材

## 🤝 贡献指南

1. Fork 仓库
2. 新建分支（示例：`feature/new-site`）
3. 提交更改
4. 推送分支
5. 发起 Pull Request

欢迎继续补充新的站点克隆场景与评测任务模板。

## 📜 License

MIT License
