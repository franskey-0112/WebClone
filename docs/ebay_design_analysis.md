# eBay Website Design & Routing Analysis Report

This document outlines the skeleton structure, layout, styles, interactions, and animations of key eBay pages, based on a browser analysis.

## 1. Home Page (`/`)

### A. Skeleton Structure
*   **Universal Header:**
    *   **Top-bar:** "Hi! Sign in or register", "Daily Deals", "Help & Contact", "Ship to...", "Sell", "Watchlist", "My eBay", Notification Bell, Cart Icon.
    *   **Main-Header:** eBay Logo, "Shop by Category" dropdown, Large Search Bar with Category Select, "Advanced" search link, Search Button.
*   **Global Navigation:** Horizontal list of top categories (Home, Saved, Motors, Electronics, Collectibles, Home & Garden, Fashion, Toys, Sporting Goods, Business & Industrial, Jewelry & Watches, eBay Live, Refurbished).
*   **Hero Section:** Full-width container or large central carousel.
    *   **Content:** Promotional banners (images + text overlays + CTA buttons).
    *   **Right Side (Desktop):** Often features a vertical banner or a "Sign in" card for personalized recommendations.
*   **Dynamic Grids:**
    *   **Recently Viewed:** Horizontal scrollable row of product cards.
    *   **Recommended for you:** Similar horizontal scrollable row.
    *   **Daily Deals:** Grid or row of discounted items.
*   **Footer:**
    *   **Links:** Multi-column layout (Buy, Sell, Stay Connected, About eBay, Help, Community, eBay Sites).
    *   **Legal:** Copyright, User Agreement, Privacy, Cookies, Accessibility.

### B. Layout
*   **Container Width:** Fixed maximum width (approx. 1280px - 1440px) centered on large screens.
*   **Grid System:** Fluid grid.
    *   **Desktop:** Content is often organized in rows. Product carousels usually show 5-7 items visible at once.
    *   **Mobile:** Collapses to single-column vertical stack. Navigation becomes a hamburger menu or horizontal scroll.
*   **Responsiveness:**
    *   Search bar takes prominence on mobile.
    *   Horizontal scroll areas (carousels) are touch-friendly.

### C. Details & Styles
*   **Color Palette:**
    *   **Primary Brand:** eBay Multi-color Logo (Red, Blue, Yellow, Green).
    *   **Primary Action/Link:** Blue (`#3663f4` / `rgb(9, 104, 246)`).
    *   **Background:** White (`#ffffff`), Light Gray (`#f8f8f8`) for sections.
    *   **Text:** Dark Gray/Black (`#191919`) for headings, Medium Gray (`#707070`) for secondary text.
    *   **Accents:** Red (`#dd1e31`) for discounts/alerts.
*   **Typography:**
    *   **Font Family:** **"Market Sans"** (eBay's custom font), fallback to `Helvetica Neue`, `Helvetica`, `Arial`, `sans-serif`.
    *   **Headings:** Bold weights (700), tight letter spacing. Sizes range from ~24px (h2) to ~16px (h3).
    *   **Body:** Regular weight (400), ~14px.
*   **Components:**
    *   **Buttons:**
        *   **Primary:** Pill-shaped (fully rounded corners), Blue background, White text.
        *   **Secondary:** Transparent/White background, Blue border, Blue text.
    *   **Search Bar:** Large height (~40-48px), thick borders (`#191919` or dark gray), distinctive blue "Search" button.
    *   ** dividers:** Subtle light gray (`#e5e5e5`) lines.

### D. Interactions
*   **Hover Effects:**
    *   **Links:** Underline appears on hover.
    *   **Product Cards:** Subtle shadow increase or border darken. Title often turns blue and underlines.
*   **Menus:** "Shop by Category" and "My eBay" are hover-triggered dropdowns (flyouts) on desktop.
*   **Search Input:** Blue glow or darker border on focus.

### E. Animations
*   **Transitions:** Fast CSS transitions (approx. 0.2s) for color changes and hover states. No heavy motion effects.
*   **Carousels:** Smooth scrolling when clicking left/right arrows.

---

## 2. Category Page (`/b/[CategoryName]/[ID]`)

### A. Skeleton Structure
*   **Breadcrumbs:** Located at the top left (e.g., eBay > Electronics > Cell Phones & Accessories).
*   **Page Title:** Bold, large heading (H1) of the current category.
*   **Layout Container:**
    *   **Left Sidebar (Desktop):** "Shop by Category" (nested tree), "Shop by Brand", Filters (Price, Condition, etc.).
    *   **Main Content Area:**
        *   **Hero/Banner:** Category-specific image and marketing text.
        *   **Navigation Circles:** Row of circular images for sub-categories.
        *   **Featured Sections:** Rows of products ("Best Selling", "Trending").
        *   **SEO Text:** Often a block of text at the bottom describing the category.

### B. Layout
*   **Two-Column Layout:**
    *   Sidebar: ~20-25% width.
    *   Main Content: ~75-80% width.
*   **Sidebar:** Sticky behavior is sometimes observed for filters but generally static.

### C. Details & Styles
*   **Sub-Category Navigation:** Often uses circular image thumbnails with centered text below.
*   **Filter Toggles:** Checkboxes or simple links for filter options.

### D. Interactions
*   **Sub-Category Hover:** Zoom effect on image or border highlight.
*   **Sidebar:** Expand/Collapse accordions for filter groups.

---

## 3. Search Results Page (`/sch/i.html`)

### A. Skeleton Structure
*   **Top Bar:** "Results for [query]", "Save this search" (Heart), View Switcher (List/Gallery), Sort Dropdown.
*   **Left Sidebar:** "Filter" menu (Category, Condition, Price, Buying Format, Item Location, Delivery Options).
*   **Main List:** The actual search results.
*   **Pagination:** Numeric pagination controls at the bottom.
*   **Related Searches:** "Related to [query]" links top or bottom.

### B. Layout
*   **Views:**
    *   **List View:** Vertical stack. Image left, Details right. Emphasizes information density.
    *   **Gallery View (Grid):** Grid of cards (usually 4 items per row on desktop). Emphasizes images.
*   **Ad Spots:** Sponsored listings interspersed (often first/last items or separate rows).

### C. Details & Styles
*   **Product Card (List View):**
    *   **Title:** Large, blue on hover.
    *   **Subtitle:** Smaller, gray (e.g., "Pre-owned").
    *   **Price:** Large, bold.
    *   **Badges:** "Top Rated Plus" (Seal icon), "Authenticity Guarantee" (Blue check).
    *   **Seller Info:** "Active price", "Free shipping", "Benefits charity".

### D. Interactions
*   **Heart Icon (Watchlist):** Top right of product image. Click converts outline to filled blue heart.
*   **View Toggle:** Instant switch between List and Grid layouts.

---

## 4. Item / Product Page (`/itm/[ItemID]`)

### A. Skeleton Structure
*   **Breadcrumbs:** Detailed path to item.
*   **Top Section (Split):**
    *   **Left:** Image Gallery (Main Image + Thumbnails Carousel).
    *   **Right:** Product Information (Title, Ratings, Price, Variations, Quantity, Buttons, Delivery info, Returns info).
    *   **Far Right (Sometimes):** Seller Information Card.
*   **Middle Section:**
    *   **"About this item":** Specifics (Brand, Model, etc.) in a table-like format.
    *   **Description:** Use-provided HTML content (iframe).
*   **Bottom Section:**
    *   **Related Items:** "Sponsored items", "People who viewed this item also viewed".
    *   **Reviews:** Detailed user reviews.

### B. Layout
*   **Columns:** 2-column split (approx 55% / 45%) for the top section.
*   **Seller Info:** On wider screens, this may be a third narrow column on the far right, or integrated into the right column.

### C. Details & Styles
*   **Price:** Very large, bold font. "US $XX.XX".
*   **Buttons:**
    *   **"Buy It Now":** Large blue pill button.
    *   **"Add to cart":** Large light blue or white pill button with blue border.
    *   **"Add to Watchlist":** Smaller link or button.
*   **Seller Badge:** Star icon with score.
*   **Trust Signals:** "eBay Money Back Guarantee" banner.

### D. Interactions
*   **Image Zoom:** Hovering over the main image triggers a magnifying glass effect or side-by-side zoom view.
*   **Thumbnail Click:** Instantly updates main image.
*   **Sticky Header:** On scrolling down, a mini-header with Title, Price, and "Buy It Now" button often slides down from the top.

---

## 5. Daily Deals (`/globaldeals`)

### A. Skeleton Structure
*   **Deals Header:** Specific Logo ("eBay Deals"), Search deals, Secondary Nav (Tech, Fashion, Home, etc.).
*   **Hero Deal:** One prominent "Featured Deal" (larger card).
*   **Deal Grid:** Dense grid of cards.

### B. Layout
*   **Grid:** Uniform cards, typically 4-5 per row.

### C. Details & Styles
*   **Badges:** Heavy use of **Red** for "% OFF".
*   **Strikethrough:** Original price crossed out next to the deal price.

---

## 6. Store Page (`/str/[StoreName]`)

### A. Skeleton Structure
*   **Store Header:** Billboard Image (Verification tick, Seller Score), Search this store input.
*   **Store Nav:** Home, All Items, About, Feedback.
*   **Featured Items:** "Seller's Picks".
*   **All Items Grid:** Standard search result grid layout scoper to store.

### B. Layout
*   **Customization:** Sellers can customize the banner and featured categories, but the structure remains consistent with the main eBay layout.

---

## Summary of Common Elements

*   **Font:** Market Sans (primary), Arial (fallback).
*   **Primary Action Color:** eBay Blue (`#3663f4`).
*   **Secondary Action Color:** eBay Red (`#dd1e31`) for deals/alerts.
*   **Border Radius:** 
    *   Buttons: High (Pill shape).
    *   Cards: Low/Medium (approx 4-8px).
    *   Inputs: Medium/High.
*   **Shadows:** Very subtle drop shadows used primarily on hover states or elevated dropdown menus.
