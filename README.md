# Bose.com Clone

这是一个基于 [Next.js](https://nextjs.org/) 构建的 Bose 官网克隆项目，旨在提供高度还原的视觉体验和核心电商功能。

本项目已适配 [WebClone](https://github.com/franskey-0112/WebClone) 评测环境的标准目录结构。

## ✨ 主要功能

### 1. 高度还原的首页
- **像素级复刻**：精确还原了 Bose 官网的布局、排版、字体和色彩系统。
- **响应式设计**：完美适配桌面端和移动端浏览。
- **动态交互**：
  - 导航栏下拉菜单
  - 横向滚动的分类导航条（带左右切换按钮）
  - 轮播图和 UGC 画廊展示

### 2. 完整的商品加购流程
- **商品浏览**：
  - 首页推荐商品展示
  - 搜索/分类列表页
- **商品详情**：
  - 详细的商品信息、价格、颜色选择
  - “加入购物车”功能，实时更新购物车状态
- **购物车管理**：
  - 购物车页面展示已选商品
  - 自动计算总价
  - 状态持久化（基于 LocalStorage）

## 🛠️ 技术栈

- **框架**：Next.js
- **UI 库**：React, Lucide React (图标)
- **样式**：CSS Modules / Global CSS (Tailwind 风格工具类)
- **状态管理**：React Context API (CartContext)

## 🚀 快速开始

### 前置要求
- Node.js (推荐 v18+)
- npm 或 yarn

### 启动项目

你可以直接运行根目录下的启动脚本（Windows）：

```bash
.\start.bat
```

或者手动运行：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

## 📂 目录结构

```
src/
├── pages/          # 页面路由
│   ├── bose/       # Bose 网站相关页面
│   ├── _app.js     # 全局入口
│   └── index.js    # 根路由重定向
├── components/     # React 组件 (Header, Footer 等)
├── data/           # 静态数据源
└── context/        # 全局状态管理
public/             # 静态资源 (图片等)
```
