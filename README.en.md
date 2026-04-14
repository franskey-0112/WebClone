# WebClone

[中文](./README.zh-CN.md) | [English](./README.md)

🌐 **Offline Web Agent Evaluation Environment (10-site suite)**  
A controllable and reproducible multi-website clone suite for standardized AI agent evaluation, regression testing, and trajectory collection.

## 📌 Merge Note

This repository has merged the **10 website environments from WebFactory** into an independent `WebClone` project.  
This README follows the documentation style of `franskey-0112/WebClone` and is updated to match the actual routes and file structure in this repo.

## 🎯 Why WebClone

Evaluating web agents on live websites usually has these issues:

| Problem | Impact |
|------|------|
| Dynamic website content | Results are hard to reproduce (prices, stock, ranking keep changing) |
| Network dependency and external variance | Latency and failures reduce evaluation stability |
| Anti-bot protections | High-frequency automation can trigger rate limits or blocks |
| Uncontrollable scenarios | Hard to reproduce a specific task setup reliably |
| Privacy and security risks | Real accounts, payments, or personal data may be involved |

Core value of WebClone:

- ✅ Fully offline and stable runtime
- ✅ Controllable data for fast scenario construction
- ✅ Reproducible evaluation for fair agent comparison
- ✅ Regression-friendly for iterative model updates
- ✅ No real transaction risk by default

## 🌐 Implemented Sites (10)

Unified entry point: `http://localhost:3000`

| Site | Route | Main Capabilities |
|------|------|----------|
| Amazon | `/amazon` | Product browsing, search, category, detail, cart, checkout, orders |
| Flights | `/flights` | Flight search, filtering, detail, booking |
| Hotels | `/hotels` | Hotel search, detail, booking |
| StayBnB | `/staybnb` | Rental search, listing detail, favorites, trips, host pages |
| CarRental | `/carrental` | Vehicle browsing, search, offers, locations, vehicle detail, booking |
| CareerLink | `/careerlink` | Job search, company page, profile, social network, messaging, notifications |
| MasterTicket | `/masterticket` | Event discovery, detail, ticket checkout |
| MealDash | `/mealdash` | Restaurant/category browsing, ordering, cart, checkout, order tracking |
| CompanyCheck | `/companycheck` | Company search, reviews, salaries, interviews, jobs |
| Email | `/email` | Inbox, labels, folders, message detail |

## 📁 Project Structure

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
├── README.md
└── README.en.md
```

## 🚀 Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Open: `http://localhost:3000`

### 3) Production build and run

```bash
npm run build
npm start
```

## 📊 Batch Scenario Generation

You can quickly construct reproducible tasks by editing static files under `src/data/`.

Examples:

- `src/data/amazonData.js`: products, prices, stock, categories
- `src/data/staticFlightData.js`: schedules, fares, departure/arrival
- `src/data/staticHotelData.js`: hotels, room types, prices, availability

## 🧪 Evaluation Suggestions

Use a consistent task template for fair multi-agent comparison:

```javascript
const task = {
  id: "amazon-search-001",
  description: "Search iPhone 15 on Amazon, filter results, and add target item to cart",
  startUrl: "/amazon",
  expectedActions: ["search", "filter", "add_to_cart"],
  successCriteria: "Target item appears in cart"
};
```

Recommended logging:

- Per-step page state (DOM or screenshot)
- Agent actions and reasoning
- Task completion time
- Final outcome (success/failure) and failure reason

## 🧩 How To Add A New Site

1. Create site component folder under `src/components/`  
2. Create routes and dynamic pages under `src/pages/`  
3. Add static data files under `src/data/`  
4. Add a site card entry in `src/pages/index.js`  
5. (Optional) Add assets under `public/images/`

## 🤝 Contributing

1. Fork the repository
2. Create a branch (example: `feature/new-site`)
3. Commit your changes
4. Push your branch
5. Open a Pull Request

Contributions of new site clones and evaluation task templates are welcome.

## 📜 License

MIT License
