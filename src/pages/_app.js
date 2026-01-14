import './bose/bose.css';
import { CartProvider } from '../context/CartContext';

// App component wrapper
export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
