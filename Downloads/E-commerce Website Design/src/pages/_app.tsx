import { AppProps } from 'next/app';
import { CartProvider } from '../contexts/CartContext';
import { Toaster } from '../components/ui/sonner';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </CartProvider>
  );
}