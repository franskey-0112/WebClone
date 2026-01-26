import Link from 'next/link';
import { useState } from 'react';
import { categories } from '../../data/ebayData';

const EbayHeader = () => {
    const [isCategoriesFlyoutOpen, setIsCategoriesFlyoutOpen] = useState(false);
    const [isIdentityFlyoutOpen, setIsIdentityFlyoutOpen] = useState(false);
    const [isWatchlistFlyoutOpen, setIsWatchlistFlyoutOpen] = useState(false);
    const [isMyEbayFlyoutOpen, setIsMyEbayFlyoutOpen] = useState(false);
    const [isNotificationsFlyoutOpen, setIsNotificationsFlyoutOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('0');

    return (
        <>
            <div className="ghw ghw--loaded">
                <header data-marko-key="@gh s0-1-4" id="gh" className="gh-header">
                    <div className="gh-a11y-skip-button">
                        <a className="gh-a11y-skip-button__link" href="#mainContent" tabIndex={1}>Skip to main content</a>
                    </div>
                    {/* Container for gh-nav and gh-header__main */}
                    <div className="gh-header__top-container">
                        <nav className="gh-nav">
                            <div className="gh-nav__left-wrap">
                                <span className="gh-identity">
                                    <div className="gh-flyout is-left-aligned">
                                        <button
                                            className="gh-flyout__target gh-flyout__target--left"
                                            aria-controls="s0-1-4-8-3[0]-0-9-dialog"
                                            aria-expanded={isIdentityFlyoutOpen}
                                            onClick={() => setIsIdentityFlyoutOpen(!isIdentityFlyoutOpen)}
                                        >
                                            <span className="gh-identity__greeting">Hi <span>Ju!</span></span>
                                            <svg aria-hidden="true" tabIndex={-1} className="gh-flyout__chevron icon icon--12" focusable="false">
                                                <use href="#icon-chevron-down-12"></use>
                                            </svg>
                                        </button>
                                        <div className="gh-flyout__dialog" id="s0-1-4-8-3[0]-0-9-dialog" style={{ display: isIdentityFlyoutOpen ? 'block' : 'none' }}>
                                            <div className="gh-flyout__box">
                                                <div className="gh-identity__dialog">
                                                    <div className="gh-flyout-loading gh-identity__loading">
                                                        <span aria-label="Loading..." className="progress-spinner progress-spinner--large gh-flyout-loading__spinner" role="img">
                                                            <svg aria-hidden="true" className="icon icon--30" focusable="false">
                                                                <use href="#icon-spinner-30"></use>
                                                            </svg>
                                                        </span>
                                                        <span>Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                                <span className="gh-nav-link">
                                    <Link href="/ebay/globaldeals" aria-label="Daily Deals">Daily Deals</Link>
                                </span>
                                <span className="gh-nav-link">
                                    <Link href="/ebay/brand-outlet" aria-label="Brand Outlet">Brand Outlet</Link>
                                </span>
                                <span className="gh-nav-link">
                                    <Link href="/ebay/giftcards" aria-label="Gift Cards">Gift Cards</Link>
                                </span>
                                <span className="gh-nav-link">
                                    <Link href="/ebay/help" aria-label="Help & Contact">Help & Contact</Link>
                                </span>
                            </div>
                            <div className="gh-nav__right-wrap">
                                <span className="gh-nav-link" data-id="SELL_LINK">
                                    <Link href="/ebay/sell" aria-label="Sell">Sell</Link>
                                </span>
                                <div className="gh-flyout is-right-aligned gh-watchlist">
                                    <a
                                        className="gh-flyout__target"
                                        href="/ebay/watchlist"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsWatchlistFlyoutOpen(!isWatchlistFlyoutOpen);
                                        }}
                                    >
                                        <span className="gh-watchlist__target">Watchlist</span>
                                        <svg className="gh-flyout__chevron icon icon--12" focusable="false" tabIndex={-1} aria-hidden="true">
                                            <use href="#icon-chevron-down-12"></use>
                                        </svg>
                                    </a>
                                    <button
                                        aria-controls="s0-1-4-8-12-0-0-dialog"
                                        aria-expanded={isWatchlistFlyoutOpen}
                                        aria-haspopup="true"
                                        className="gh-flyout__target-a11y-btn"
                                        tabIndex={0}
                                        onClick={() => setIsWatchlistFlyoutOpen(!isWatchlistFlyoutOpen)}
                                    >
                                        Expand Watch List
                                    </button>
                                    <div className="gh-flyout__dialog" id="s0-1-4-8-12-0-0-dialog" style={{ display: isWatchlistFlyoutOpen ? 'block' : 'none' }}>
                                        <div className="gh-flyout__box"></div>
                                    </div>
                                </div>
                                <div className="gh-flyout is-left-aligned gh-my-ebay">
                                    <a
                                        className="gh-flyout__target"
                                        href="/ebay/myebay"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMyEbayFlyoutOpen(!isMyEbayFlyoutOpen);
                                        }}
                                    >
                                        <span className="gh-my-ebay__link gh-rvi-menu">My eBay<i className="gh-sprRetina gh-eb-arw gh-rvi-chevron"></i></span>
                                        <svg className="gh-flyout__chevron icon icon--12" focusable="false" tabIndex={-1} aria-hidden="true">
                                            <use href="#icon-chevron-down-12"></use>
                                        </svg>
                                    </a>
                                    <button
                                        aria-controls="s0-1-4-8-13-0-dialog"
                                        aria-expanded={isMyEbayFlyoutOpen}
                                        aria-haspopup="true"
                                        className="gh-flyout__target-a11y-btn"
                                        tabIndex={0}
                                        onClick={() => setIsMyEbayFlyoutOpen(!isMyEbayFlyoutOpen)}
                                    >
                                        Expand My eBay
                                    </button>
                                    <div className="gh-flyout__dialog" id="s0-1-4-8-13-0-dialog" style={{ display: isMyEbayFlyoutOpen ? 'block' : 'none' }}>
                                        <div className="gh-flyout__box">
                                            <ul className="gh-my-ebay__list">
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/summary">Summary</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/rvi">Recently Viewed</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/bidsoffers">Bids/Offers</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/watchlist">Watchlist</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/purchase">Purchase History</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/buyagain">Buy Again</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/selling">Selling</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/saved">Saved Feed</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/savedsearches">Saved Searches</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/savedsellers">Saved Sellers</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/payments">Payments</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/garage">My Garage</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/preferences">Preferences</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/collection">My Collection</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/messages">Messages</Link>
                                                </li>
                                                <li className="gh-my-ebay__list-item">
                                                    <Link href="/ebay/mye/vault">PSA Vault</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="gh-notifications">
                                    <div className="gh-flyout is-right-aligned gh-flyout--icon-target">
                                        <button
                                            className="gh-flyout__target"
                                            aria-controls="s0-1-4-8-14-0-1-dialog"
                                            aria-expanded={isNotificationsFlyoutOpen}
                                            onClick={() => setIsNotificationsFlyoutOpen(!isNotificationsFlyoutOpen)}
                                        >
                                            <span className="gh-hidden">Expand Notifications</span>
                                            <svg className="icon icon--20" focusable="false" aria-hidden="true">
                                                <use href="#icon-notification-20"></use>
                                            </svg>
                                        </button>
                                        <div className="gh-flyout__dialog" id="s0-1-4-8-14-0-1-dialog" style={{ display: isNotificationsFlyoutOpen ? 'block' : 'none' }}>
                                            <div className="gh-flyout__box">
                                                <div className="gh-notifications__dialog gh-notifications--loaded">
                                                    <div className="gh-notifications__notloaded"></div>
                                                    <div data-marko-key="@dynamic s0-1-4-8-14-0" className="gh-notifications__loaded">
                                                        {/* Notifications content */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Main Header Area with Logo, Categories and Search */}
                        <section data-marko-key="@gh-main s0-1-4" className="gh-header__main">
                            <div className="gh-header__logo-cats-wrap">
                                <Link href="/ebay" className="gh-logo" tabIndex={2}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="117" height="48" viewBox="0 0 122 48.592" id="gh-logo" aria-labelledby="ebayLogoTitle">
                                        <title id="ebayLogoTitle">eBay Home</title>
                                        <g>
                                            <path fill="#F02D2D" d="M24.355 22.759c-.269-5.738-4.412-7.838-8.826-7.813-4.756.026-8.544 2.459-9.183 7.915zM6.234 26.93c.364 5.553 4.208 8.814 9.476 8.785 3.648-.021 6.885-1.524 7.952-4.763l6.306-.035c-1.187 6.568-8.151 8.834-14.145 8.866C4.911 39.844.043 33.865-.002 25.759c-.05-8.927 4.917-14.822 15.765-14.884 8.628-.048 14.978 4.433 15.033 14.291l.01 1.625z"></path>
                                            <path fill="#0968F6" d="M46.544 35.429c5.688-.032 9.543-4.148 9.508-10.32s-3.947-10.246-9.622-10.214-9.543 4.148-9.509 10.32 3.974 10.245 9.623 10.214zM30.652.029l6.116-.034.085 15.369c2.978-3.588 7.1-4.65 11.167-4.674 6.817-.037 14.412 4.518 14.468 14.454.045 8.29-5.941 14.407-14.422 14.454-4.463.026-8.624-1.545-11.218-4.681a33.237 33.237 0 01-.19 3.731l-5.994.034c.09-1.915.185-4.364.174-6.322z"></path>
                                            <path fill="#FFBD14" d="M77.282 25.724c-5.548.216-8.985 1.229-8.965 4.883.013 2.365 1.94 4.919 6.7 4.891 6.415-.035 9.826-3.556 9.794-9.289v-.637c-2.252.02-5.039.054-7.529.152zm13.683 7.506c.01 1.778.071 3.538.232 5.1l-5.688.032a33.381 33.381 0 01-.225-3.825c-3.052 3.8-6.708 4.909-11.783 4.938-7.532.042-11.585-3.915-11.611-8.518-.037-6.665 5.434-9.049 14.954-9.318 2.6-.072 5.529-.1 7.945-.116v-.637c-.026-4.463-2.9-6.285-7.854-6.257-3.68.021-6.368 1.561-6.653 4.2l-6.434.035c.645-6.566 7.53-8.269 13.595-8.3 7.263-.04 13.406 2.508 13.448 10.192z"></path>
                                            <path fill="#92C821" d="M91.939 19.852l-4.5-8.362 7.154-.04 10.589 20.922 10.328-21.02 6.486-.048-18.707 37.251-6.85.039 5.382-10.348-9.887-18.393"></path>
                                        </g>
                                    </svg>
                                </Link>
                                <div className="gh-categories">
                                    <div className="gh-flyout is-left-aligned">
                                        <button
                                            className="gh-flyout__target"
                                            tabIndex={3}
                                            aria-controls="s0-1-4-11-0-1-dialog"
                                            aria-expanded={isCategoriesFlyoutOpen}
                                            onClick={() => setIsCategoriesFlyoutOpen(!isCategoriesFlyoutOpen)}
                                        >
                                            <span className="gh-categories__title">Shop by category</span>
                                            <svg className="gh-flyout__chevron icon icon--12" focusable="false" tabIndex={-1} aria-hidden="true">
                                                <use href="#icon-chevron-down-12"></use>
                                            </svg>
                                        </button>
                                        <div className="gh-flyout__dialog" id="s0-1-4-11-0-1-dialog" style={{ display: isCategoriesFlyoutOpen ? 'block' : 'none' }}>
                                            <div className="gh-flyout__box">
                                                <div className="gh-categories__main">
                                                    <div>
                                                        <div className="gh-categories__col">
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/motors" tabIndex={3}>
                                                                    <h3>Motors</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/parts-accessories" tabIndex={3}>Parts & accessories</Link></li>
                                                                    <li><Link href="/ebay/category/cars-trucks" tabIndex={3}>Cars & trucks</Link></li>
                                                                    <li><Link href="/ebay/category/motorcycles" tabIndex={3}>Motorcycles</Link></li>
                                                                    <li><Link href="/ebay/category/other-vehicles" tabIndex={3}>Other vehicles</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/clothing-accessories" tabIndex={3}>
                                                                    <h3>Clothing & Accessories</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/women" tabIndex={3}>Women</Link></li>
                                                                    <li><Link href="/ebay/category/men" tabIndex={3}>Men</Link></li>
                                                                    <li><Link href="/ebay/category/handbags" tabIndex={3}>Handbags</Link></li>
                                                                    <li><Link href="/ebay/category/sneakers" tabIndex={3}>Collectible Sneakers</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/sporting-goods" tabIndex={3}>
                                                                    <h3>Sporting goods</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/hunting" tabIndex={3}>Hunting Equipment</Link></li>
                                                                    <li><Link href="/ebay/category/golf" tabIndex={3}>Golf Equipment</Link></li>
                                                                    <li><Link href="/ebay/category/outdoor" tabIndex={3}>Outdoor sports</Link></li>
                                                                    <li><Link href="/ebay/category/cycling" tabIndex={3}>Cycling Equipment</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="gh-categories__col">
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/electronics" tabIndex={3}>
                                                                    <h3>Electronics</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/computers" tabIndex={3}>Computers, Tablets & Network Hardware</Link></li>
                                                                    <li><Link href="/ebay/category/cell-phones" tabIndex={3}>Cell Phones, Smart Watches & Accessories</Link></li>
                                                                    <li><Link href="/ebay/category/gaming" tabIndex={3}>Video Games & Consoles</Link></li>
                                                                    <li><Link href="/ebay/category/cameras" tabIndex={3}>Cameras & Photo</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/business-industrial" tabIndex={3}>
                                                                    <h3>Business & Industrial</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/buildings" tabIndex={3}>Modular & Pre-Fabricated Buildings</Link></li>
                                                                    <li><Link href="/ebay/category/test-equipment" tabIndex={3}>Test, Measurement & Inspection Equipment</Link></li>
                                                                    <li><Link href="/ebay/category/heavy-equipment" tabIndex={3}>Heavy Equipment, Parts & Attachments</Link></li>
                                                                    <li><Link href="/ebay/category/restaurant" tabIndex={3}>Restaurant & Food Service</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/jewelry-watches" tabIndex={3}>
                                                                    <h3>Jewelry & Watches</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/luxury-watches" tabIndex={3}>Luxury Watches</Link></li>
                                                                    <li><Link href="/ebay/category/wristwatches" tabIndex={3}>Wristwatches</Link></li>
                                                                    <li><Link href="/ebay/category/fashion-jewelry" tabIndex={3}>Fashion Jewelry</Link></li>
                                                                    <li><Link href="/ebay/category/fine-jewelry" tabIndex={3}>Fine Jewelry</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="gh-categories__col">
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/collectibles-art" tabIndex={3}>
                                                                    <h3>Collectibles & Art</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/trading-cards" tabIndex={3}>Trading Cards</Link></li>
                                                                    <li><Link href="/ebay/category/collectibles" tabIndex={3}>Collectibles</Link></li>
                                                                    <li><Link href="/ebay/category/coins" tabIndex={3}>Coins & Paper Money</Link></li>
                                                                    <li><Link href="/ebay/category/sports-memorabilia" tabIndex={3}>Sports Memorabilia</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/home-garden" tabIndex={3}>
                                                                    <h3>Home & garden</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/yard-garden" tabIndex={3}>Yard, Garden & Outdoor Living Items</Link></li>
                                                                    <li><Link href="/ebay/category/tools" tabIndex={3}>Tools & Workshop Equipment</Link></li>
                                                                    <li><Link href="/ebay/category/home-improvement" tabIndex={3}>Home Improvement</Link></li>
                                                                    <li><Link href="/ebay/category/kitchen" tabIndex={3}>Kitchen, Dining & Bar Supplies</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="gh-categories__group">
                                                                <Link className="gh-categories__cat" href="/ebay/category/all-categories" tabIndex={3}>
                                                                    <h3>Other categories</h3>
                                                                </Link>
                                                                <ul className="gh-categories__list">
                                                                    <li><Link href="/ebay/category/books-movies-music" tabIndex={3}>Books, Movies & Music</Link></li>
                                                                    <li><Link href="/ebay/category/toys-hobbies" tabIndex={3}>Toys & Hobbies</Link></li>
                                                                    <li><Link href="/ebay/category/health-beauty" tabIndex={3}>Health & Beauty</Link></li>
                                                                    <li><Link href="/ebay/category/baby" tabIndex={3}>Baby Essentials</Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="gh-categories__foot">
                                                        <Link className="gh-categories__col" href="/ebay/brands" tabIndex={3}>
                                                            All Brands
                                                            <svg aria-hidden="true" className="icon icon--12" focusable="false">
                                                                <use href="#icon-chevron-right-12"></use>
                                                            </svg>
                                                        </Link>
                                                        <Link className="gh-categories__col" href="/ebay/category/all-categories" tabIndex={3}>
                                                            All Categories
                                                            <svg aria-hidden="true" className="icon icon--12" focusable="false">
                                                                <use href="#icon-chevron-right-12"></use>
                                                            </svg>
                                                        </Link>
                                                        <Link className="gh-categories__col" href="/ebay/sales-events" tabIndex={3}>
                                                            Seasonal Sales & Events
                                                            <svg aria-hidden="true" className="icon icon--12" focusable="false">
                                                                <use href="#icon-chevron-right-12"></use>
                                                            </svg>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form id="gh-f" className="gh-search" method="get" action="/ebay/sch" style={{ position: 'relative' }}>
                                <span id="ebay-autocomplete-status" role="status" aria-live="polite" className="ebay-autocomplete-helper" aria-hidden="true"></span>
                                <div id="gh-search-box" className="gh-search-box__wrap">
                                    <div className="gh-search__wrap">
                                        <div id="gh-ac-wrap" className="gh-search-input__wrap">
                                            <input
                                                id="gh-ac"
                                                className="gh-search-input gh-tb ui-autocomplete-input"
                                                title="Search"
                                                type="text"
                                                placeholder="Search for anything"
                                                aria-autocomplete="list"
                                                aria-expanded="false"
                                                size="50"
                                                maxLength={300}
                                                aria-label="Search for anything"
                                                name="_nkw"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                autoComplete="off"
                                                aria-haspopup="true"
                                                role="combobox"
                                                tabIndex={4}
                                                aria-controls="ebay-autocomplete"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            <svg className="gh-search-input__icon icon icon--16" focusable="false" aria-hidden="true">
                                                <use href="#icon-search-16"></use>
                                            </svg>
                                            {searchValue && (
                                                <button
                                                    className="gh-search-input__clear-btn icon-btn icon-btn--transparent icon-btn--small"
                                                    type="button"
                                                    aria-label="Clear search"
                                                    tabIndex={5}
                                                    onClick={() => setSearchValue('')}
                                                >
                                                    <svg className="gh-search-input__clear-icon icon icon--16" focusable="false" aria-hidden="true">
                                                        <use href="#icon-clear-16"></use>
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                        <select
                                            aria-label="Select a category for search"
                                            className="gh-search-categories"
                                            size={1}
                                            id="gh-cat"
                                            name="_sacat"
                                            tabIndex={5}
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="0">All Categories</option>
                                            <option value="20081">Antiques</option>
                                            <option value="550">Art</option>
                                            <option value="2984">Baby</option>
                                            <option value="267">Books</option>
                                            <option value="12576">Business & Industrial</option>
                                            <option value="625">Cameras & Photo</option>
                                            <option value="15032">Cell Phones & Accessories</option>
                                            <option value="11450">Clothing, Shoes & Accessories</option>
                                            <option value="11116">Coins & Paper Money</option>
                                            <option value="1">Collectibles</option>
                                            <option value="58058">Computers/Tablets & Networking</option>
                                            <option value="293">Consumer Electronics</option>
                                            <option value="14339">Crafts</option>
                                            <option value="237">Dolls & Bears</option>
                                            <option value="11232">Movies & TV</option>
                                            <option value="6000">eBay Motors</option>
                                            <option value="45100">Entertainment Memorabilia</option>
                                            <option value="172008">Gift Cards & Coupons</option>
                                            <option value="26395">Health & Beauty</option>
                                            <option value="11700">Home & Garden</option>
                                            <option value="281">Jewelry & Watches</option>
                                            <option value="11233">Music</option>
                                            <option value="619">Musical Instruments & Gear</option>
                                            <option value="1281">Pet Supplies</option>
                                            <option value="870">Pottery & Glass</option>
                                            <option value="10542">Real Estate</option>
                                            <option value="316">Specialty Services</option>
                                            <option value="888">Sporting Goods</option>
                                            <option value="64482">Sports Mem, Cards & Fan Shop</option>
                                            <option value="260">Stamps</option>
                                            <option value="1305">Tickets & Experiences</option>
                                            <option value="220">Toys & Hobbies</option>
                                            <option value="3252">Travel</option>
                                            <option value="1249">Video Games & Consoles</option>
                                            <option value="99">Everything Else</option>
                                        </select>
                                    </div>
                                </div>
                                <input type="hidden" value="R40" name="_from" />
                                <input type="hidden" name="_trksid" value="m570.l1313" />
                                <div className="gh-search-button__wrap">
                                    <button
                                        data-marko='{"onclick":"handleClick s0-1-4-12-8-@btn false","onkeydown":"handleKeydown s0-1-4-12-8-@btn false","onfocus":"handleFocus s0-1-4-12-8-@btn false","onblur":"handleBlur s0-1-4-12-8-@btn false"}'
                                        className="gh-search-button btn btn--primary"
                                        data-ebayui=""
                                        type="submit"
                                        id="gh-search-btn"
                                        role="button"
                                        value="Search"
                                        tabIndex={6}
                                    >
                                        <span className="gh-search-button__label">Search</span>
                                        <svg data-marko-key="@svg s0-1-4-12-8-@btn-7-2-0" className="gh-search-button__icon icon icon--16" focusable="false" aria-hidden="true">
                                            <use href="#icon-search-16"></use>
                                        </svg>
                                    </button>
                                    <Link className="gh-search-button__advanced-link" href="/ebay/search/advanced" tabIndex={7}>Advanced</Link>
                                </div>
                                <div id="gAC">
                                    <ul role="listbox" id="ebay-autocomplete" style={{ width: '686px', display: 'none' }} className="ebay-autocomplete-large ui-autocomplete"></ul>
                                </div>
                            </form>
                        </section>

                        {/* Bottom Category Navigation */}
                        <div className="gh-header__nav">
                            <div className="gh-header__nav-wrap">
                                <ul className="gh-header__nav-list flex gap-6 text-[12px] text-[#767676]">
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/live" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">eBay LIVE</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/saved" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Saved</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/motors" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Motors</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/electronics" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Electronics</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/collectibles" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Collectibles</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/home-garden" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Home and garden</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/clothing" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Clothing, shoes and accessories</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/toys" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Toys</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/sporting-goods" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Sporting goods</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/business-industrial" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Business and industrial</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/jewelry-watches" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Jewelry and watches</Link>
                                    </li>
                                    <li className="gh-header__nav-item">
                                        <Link href="/ebay/b/refurbished" className="gh-header__nav-link hover:text-[#191919] hover:underline whitespace-nowrap">Refurbished</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* SVG Sprite Definitions */}
                        <svg style={{ display: 'none' }} aria-hidden="true">
                            <defs>
                                <symbol id="icon-chevron-down-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                </symbol>
                                <symbol id="icon-chevron-right-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 18l6-6-6-6" />
                                </symbol>
                                <symbol id="icon-search-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </symbol>
                                <symbol id="icon-clear-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </symbol>
                                <symbol id="icon-spinner-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                                </symbol>
                                <symbol id="icon-notification-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                                </symbol>
                            </defs>
                        </svg>
                    </div>{/* End of gh-header__top-container */}
                </header>
            </div>{/* End of ghw */}
        </>
    );
};

export default EbayHeader;
