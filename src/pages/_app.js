import '../styles/globals.css';
import '../styles/ebay.css';
import '../styles/ebay-product.css';
import { WatchlistProvider } from '../utils/WatchlistContext';

export default function App({ Component, pageProps }) {
  return (
    <WatchlistProvider>
      <Component {...pageProps} />
    </WatchlistProvider>
  )
}
