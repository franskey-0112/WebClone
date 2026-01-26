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

## 7. Shopping Cart Page (`/cart`)

### A. Skeleton Structure
*   **Cart Header:** "Shopping Cart" title with item count badge.
*   **Cart Items Container:**
    *   **Item Row:** Each item in cart with:
        *   Product Image (square, ~100px)
        *   Product Title (linked to item page)
        *   Item Condition
        *   Seller Name (linked to store)
        *   Quantity Selector (dropdown or +/- buttons)
        *   Unit Price
        *   Item Subtotal
        *   "Remove" link
        *   "Save for later" link
*   **Cart Summary Sidebar (Right):**
    *   Items subtotal
    *   Shipping estimate
    *   Estimated tax
    *   **Order Total** (bold, large)
    *   "Go to checkout" button (Primary Blue)
    *   PayPal / Google Pay / Apple Pay buttons
    *   Security badges
*   **Save for Later Section:** Items moved from cart for future.
*   **Recommended Items:** "You may also like" carousel.

### B. Layout
*   **Two-Column Layout:**
    *   Cart Items: ~70% width
    *   Summary Sidebar: ~30% width (sticky on scroll)
*   **Mobile:** Single column, summary moves to bottom.

### C. Details & Styles
*   **Item Card:**
    *   Border: Light gray (`#e5e5e5`)
    *   Border Radius: 8px
    *   Background: White
    *   Seller info with location badge
*   **Quantity Selector:** Dropdown or stepper with border
*   **Remove/Save Links:** Text links, underlined on hover
*   **Summary Card:**
    *   Background: Light gray (`#f7f7f7`)
    *   Border Radius: 12px
    *   Padding: 24px
*   **Checkout Button:** Full-width, pill-shaped, Blue (`#3665f3`)

### D. Interactions
*   **Quantity Change:** Updates subtotal in real-time (no page reload)
*   **Remove Item:** Fade out animation, updates cart count in header
*   **Hover on Item:** Subtle background color change

### E. Animations
*   **Item Removal:** Smooth fade + slide up
*   **Price Updates:** Number transition effect

---

## 8. Checkout/Payment Page (`/pay/rxo`)

### A. Skeleton Structure
*   **Simplified Header:** eBay logo only (no navigation)
*   **Progress Steps:** Visual stepper (Review, Shipping, Payment, Confirm)
*   **Main Content (Left ~65%):**
    *   **Step 1 - Review Items:**
        *   Item image, title, quantity, price
        *   Seller info
    *   **Step 2 - Shipping:**
        *   Shipping Address (editable)
        *   Delivery Options (Standard, Express, etc.)
        *   Estimated delivery date
    *   **Step 3 - Payment Method:**
        *   Saved payment methods (cards with icons)
        *   Add new card form (Card Number, Expiry, CVV, Billing Address)
        *   Alternative payment buttons (PayPal, Apple Pay, Google Pay, Klarna, Venmo)
    *   **Coupon/Promo Code Input:** Expandable section
    *   **Message to Seller:** Optional text area
*   **Order Summary Sidebar (Right ~35%):**
    *   Item(s) thumbnails
    *   Item subtotal
    *   Shipping cost
    *   Sales tax
    *   **Total** (large, bold)
    *   "Confirm and pay" button
    *   eBay Money Back Guarantee badge

### B. Layout
*   **Two-Column Layout:**
    *   Main checkout form: ~65% width
    *   Order Summary: ~35% width (sticky)
*   **Mobile:** Single column, summary at top (collapsed) or bottom

### C. Details & Styles
*   **Step Indicator:**
    *   Active step: Blue circle with number
    *   Completed step: Blue checkmark
    *   Future step: Gray circle
*   **Payment Cards:**
    *   Card brand icons (Visa, Mastercard, Amex, Discover)
    *   Radio button selection
    *   Card ending in •••• XXXX format
*   **Form Inputs:**
    *   Height: 48px
    *   Border: 1px solid `#767676`
    *   Border Radius: 8px
    *   Focus: Blue border (`#3665f3`)
*   **Security Icons:** Lock icon near payment, SSL badges
*   **Confirm Button:** Large, Blue pill, full-width

### D. Interactions
*   **Address Edit:** Inline editing or modal popup
*   **Payment Method Select:** Radio buttons or clickable cards
*   **Card Input:** Auto-format as user types (4-digit groups)
*   **PayPal Click:** Redirects to PayPal modal/popup

### E. Animations
*   **Step Transitions:** Smooth accordion expand/collapse
*   **Loading States:** Spinner on payment processing
*   **Success:** Checkmark animation on order completion

---

## 9. My eBay Summary Page (`/mye/myebay/summary`)

### A. Skeleton Structure
*   **Left Sidebar Navigation:**
    *   Activity (default)
    *   Messages (with unread count badge)
    *   Account
    *   Buying
    *   Selling (links to Seller Hub for sellers)
*   **Main Content Area:**
    *   **Summary Cards/Modules:**
        *   **Buying:**
            *   "Watching" items count with thumbnails
            *   "Bids/Offers" active count
            *   "Purchases" recent orders
            *   "Saved Searches" count
        *   **Selling:**
            *   "Active Listings" count
            *   "Sold" items count
            *   "Unsold" items count
            *   Draft listings
        *   **Saved Sellers:** List of followed stores
        *   **Recent Activity Feed:** Timeline of actions
*   **Right Sidebar (Optional):**
    *   Account summary
    *   Quick links

### B. Layout
*   **Three-Column Layout:**
    *   Left Nav: ~200px fixed width
    *   Main Content: Flexible (60-70%)
    *   Right Sidebar: ~250px (optional, may not always show)
*   **Dashboard Grid:** Cards arranged in 2-3 column grid within main content
*   **Mobile:** Collapsible navigation, single column content

### C. Details & Styles
*   **Navigation:**
    *   Background: White
    *   Active item: Blue text, left border indicator
    *   Icons alongside text labels
*   **Summary Cards:**
    *   Background: White
    *   Border: 1px solid `#e5e5e5`
    *   Border Radius: 12px
    *   Header: Bold title + "See all" link
    *   Content: Thumbnail grid or list
*   **Badge Counts:** Small pill badges with numbers (blue background)
*   **Empty States:** Illustrative icons with "No items" message

### D. Interactions
*   **Card Expansion:** Click card header to expand/navigate
*   **Quick Actions:**
    *   "Relist" button on sold items
    *   "Pay now" button on won auctions
    *   "Leave feedback" prompts
*   **Sidebar Toggle:** Mobile hamburger menu

### E. Animations
*   **Card Hover:** Subtle shadow increase
*   **Navigation:** Smooth highlight transitions
*   **Loading:** Skeleton placeholders while data loads

---

## Summary of Common Elements

*   **Font:** Market Sans (primary), Arial (fallback).
*   **Primary Action Color:** eBay Blue (`#3665f3`).
*   **Secondary Action Color:** eBay Red (`#dd1e31`) for deals/alerts.
*   **Border Radius:** 
    *   Buttons: High (Pill shape, ~24px).
    *   Cards: Medium (8-12px).
    *   Inputs: Medium (8px).
*   **Shadows:** Very subtle drop shadows used primarily on hover states or elevated dropdown menus.
*   **Responsive Breakpoints:**
    *   Mobile: < 768px
    *   Tablet: 768px - 1024px
    *   Desktop: > 1024px
*   **Consistent Components:**
    *   Headers use simplified layout in checkout flows
    *   Footers may be minimal/hidden in checkout
    *   Trust badges appear near payment areas

---

## 10. My eBay Watchlist Page (`/mye/myebay/watchlist`)

### A. Skeleton Structure
*   **Breadcrumbs / Top Tabs:** "Activity", "Messages", "Account" (Market-wide My eBay tabs).
*   **Page Layout:**
    *   **Left Sidebar:** Vertical navigation (Summary, Recently viewed, Bids & offers, Watchlist, Purchases, etc.).
    *   **Main Content Area:**
        *   **Header Section:** "My eBay - Watchlist" title with a dropdown arrow, plus a Search bar specifically for the watchlist.
        *   **Action Bar:** Checkbox for "Select All", "Add to custom list" button (muted if none selected), "Delete" button.
        *   **Filters & Sorting:** "Status: All", "Sort: Ending soonest" dropdowns.
        *   **Category Pills:** Horizontal scroll of category filter chips (e.g., "All Categories (2)", "Cell Phones & Smartphones (1)", "Baby (1)").
        *   **Watchlist Items List:** Vertical stack of item cards.
        *   **Recommendation Section:** "Sponsored items similar to what you've watched" carousel at the bottom.

### B. Layout
*   **Container Width:** Matches the standard eBay 1400px maximum.
*   **Sidebar:** Fixed width (~200px) on the left.
*   **Main Content:** Flexible width (~85%) taking up the rest of the space.
*   **Item Card Layout (List View):**
    *   Left: Selection checkbox + large thumbnail.
    *   Center: Item information (Title, Price, Feedback, Status).
    *   Right: Primary actions ("Buy It Now", "Filled filled", "View in cart", "More Actions").

### C. Details & Styles
*   **Title Font:** Bold, ~24px for "My eBay", slightly smaller for "My eBay - Watchlist".
*   **Category Pills:**
    *   **Active:** Black background or white with thick black border (depending on variant).
    *   **Inactive:** Light gray background, pill-shaped.
*   **Item Card:**
    *   Border: Subtle top/bottom border separating items.
    *   Image: Rounded corners (~8px), consistent aspect ratio.
    *   Title: Standard listing title style (black, bold on hover).
    *   Price: Bold, with conversion notes if international.
*   **Action Buttons (Right Column):**
    *   "Buy It Now": Standard primary pill button (Blue bg).
    *   "View in cart": Standard secondary pill button (Blue border, white bg).
    *   "More Actions": Text with a chevron down, underlined on hover.

### D. Interactions
*   **Search Watchlist:** Instant filtering of the list as the user types or clicks the Search button.
*   **Bulk Actions:** "Delete" and "Add to custom list" become active only when one or more checkboxes are selected.
*   **Category Filter:** Clicking a pill filters the list to show only items from that category.
*   **More Actions Dropdown:** Opens a menu with additional options like "Contact Seller", "Sell similar", etc.

