import '../styles/globals.css';
import './bose/bose.css';
import './youku/youku.css';
import { CartProvider } from '../context/CartContext';

// App component wrapper
export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
