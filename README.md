# WebClone

[English](./README.md) | [中文](./README.zh-CN.md)

🌐 **Web Agent Evaluation Environment** - Offline, controllable website clones for reproducible AI agent testing and standardized benchmarking.

## 🎯 Why WebClone?

When evaluating web agents on live websites, we usually face these problems:

| Problem | Impact |
|------|------|
| Dynamic website content | Prices, inventory, and listings change in real time, making results hard to reproduce |
| Network dependency | Test stability and speed are limited by network quality |
| Anti-bot protections | Frequent automated interactions may trigger CAPTCHA or blocking |
| Uncontrollable scenarios | Hard to preset specific states (for example, "cart has 3 items") |
| Privacy risk | Testing may involve real accounts and payment data |

### What WebClone solves

✅ **Fully offline runtime** - no live network dependency  
✅ **Controllable data** - static data makes runs consistent  
✅ **Reproducible evaluation** - easier fair comparison across agents  
✅ **Batch scenario generation** - quickly build new test cases by editing data files  
✅ **Safe by design** - no real transactions or personal account risk by default

### Typical use cases

1. **Agent capability benchmarking** - compare performance on shopping/booking/task workflows
2. **A/B experiments** - evaluate prompts, policies, or models in identical environments
3. **Regression testing** - verify behavior after agent updates
4. **Education and demos** - demonstrate how web agents work end-to-end
5. **Dataset construction** - collect interaction trajectories for training and analysis

## 🌐 Implemented Websites

| Website | Route | Capabilities |
|------|------|------|
| Flight Booking | `/flights` | Search, filter, and book flights |
| Amazon Shopping | `/amazon` | Product browsing, search, cart, checkout |
| Bose Website | `/bose` | Audio product browsing, search, cart, checkout |
| Youku Video | `/youku` | Video browsing, search, playback, VIP, favorites, history |
| Hotel Booking | `/hotels` | Hotel search, filtering, detail, booking |
| StayBnB | `/staybnb` | Listings, search, favorites, trips, booking |
| Car Rental | `/carrental` | Vehicle search, filtering, locations, offers, booking |
| Career Network | `/careerlink` | Jobs, company pages, messaging, notifications, profile |
| Event Ticketing | `/masterticket` | Event search, detail, seat selection, checkout |
| Food Delivery | `/mealdash` | Restaurant browsing, categories, cart, ordering, tracking |
| Company Reviews | `/companycheck` | Company search, salaries, interviews, reviews, jobs |
| Email System | `/email` | Inbox, labels, threads, folders, email details |

## 📁 Project Structure

```text
WebClone/
├── src/
│   ├── components/          # React components
│   │   ├── amazon/
│   │   ├── bose/
│   │   ├── hotels/
│   │   ├── staybnb/
│   │   ├── carrental/
│   │   ├── careerlink/
│   │   ├── masterticket/
│   │   ├── mealdash/
│   │   ├── companycheck/
│   │   ├── email/
│   │   ├── youku/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── SearchForm.js
│   │   ├── FlightCard.js
│   │   ├── FlightDetails.js
│   │   └── FlightFilters.js
│   │
│   ├── pages/               # Next.js routes
│   │   ├── amazon/
│   │   ├── bose/
│   │   ├── youku/
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
│   │
│   ├── data/                # Static data files
│   │   ├── amazonData.js
│   │   ├── boseData.js
│   │   ├── youkuData.js
│   │   ├── staticFlightData.js
│   │   ├── staticHotelData.js
│   │   ├── staticStaybnbData.js
│   │   ├── staticCarRentalData.js
│   │   ├── staticCareerLinkData.js
│   │   ├── staticMasterTicketData.js
│   │   ├── staticMealDashData.js
│   │   ├── staticCompanyCheckData.js
│   │   └── staticEmailData.js
│   │
│   ├── utils/               # Utility helpers
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
│       ├── amazon/
│       ├── bose/
│       ├── hotels/
│       └── youku/
│
├── package.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Quick Start

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open `http://localhost:3000` to access available sites.

### Build for production

```bash
npm run build
npm start
```

## 📊 Batch Scenario Generation

You can quickly create new reproducible scenarios by editing files in `src/data/`.

### Example: edit product data

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
    // edit fields to create different scenarios
  },
  // add more products...
];
```

### Example: edit flight data

```javascript
// src/data/staticFlightData.js
export const flights = [
  {
    id: 1,
    airline: "Eastern Airlines",
    departure: "Beijing",
    arrival: "Shanghai",
    price: 580,
    duration: "2h 15m",
    // edit fields to create different scenarios
  },
  // add more flights...
];
```

### Example: edit hotel data

```javascript
// src/data/staticHotelData.js
export const hotels = [
  {
    id: 1,
    name: "Grand Luxury Hotel",
    city: "New York",
    pricePerNight: 299,
    // edit fields to create different scenarios
  },
  // add more hotels...
];
```

## 📝 How To Add A New Website

### 1) Create component directory

```text
src/components/your_site/
├── YourSiteHeader.js
├── YourSiteCard.js
└── YourSiteFilters.js
```

### 2) Create route pages

```text
src/pages/your_site/
├── index.js
├── search.js
└── [id].js
```

### 3) Add static data

```javascript
// src/data/yourSiteData.js
export const yourSiteItems = [
  {
    id: 1,
    name: "Sample Item",
    price: 99.99,
    // ...more fields
  }
];
```

### 4) Add site entry to homepage

Add a card config in `src/pages/index.js`:

```javascript
{
  name: 'Your Site',
  path: '/your_site',
  description: 'Site description',
  color: '#your-color',
  icon: '🎯'
}
```

### 5) Add assets (optional)

```text
public/images/your_site/
├── products/
├── banners/
└── ...
```

## 🎨 Naming Conventions

- **Component directories**: lowercase, e.g. `amazon`, `flights`, `bose`, `youku`, `hotels`, `staybnb`
- **Component files**: PascalCase, e.g. `ProductCard.js`
- **Page files**: lowercase, e.g. `index.js`, `search.js`
- **Data files**: camelCase, e.g. `amazonData.js`

## 🔬 Evaluation Suggestions

### Define reproducible tasks

```javascript
const task = {
  id: "amazon-search-001",
  description: "Search for iPhone 15 on Amazon, find the lowest-price result, and add it to cart",
  startUrl: "/amazon",
  expectedActions: ["search", "filter", "add_to_cart"],
  successCriteria: "Target product appears in cart"
};
```

### Log interaction traces

Recommended records:
- Per-step DOM state
- Agent decisions and actions
- Task completion time
- Final outcome (success/failure)

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/new-site`)
3. Commit changes (`git commit -m 'Add new site: xxx'`)
4. Push your branch (`git push origin feature/new-site`)
5. Open a Pull Request

Please ensure:
- You follow existing structure and naming conventions
- You provide complete static data
- You update the website list in README

## 📜 License

MIT License
