import '../styles/normalize.css';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/interactive.css';
import '../styles/form.css';
import '../styles/misc.css';
import { UIProvider } from '../contexts/UIConttext';
import { CartProvider} from '../contexts/cartContext';
import { FilterProvider } from '../contexts/filterContext';

function MyApp({ Component, pageProps }) {
  return (
    <UIProvider>
      <FilterProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </FilterProvider>
    </UIProvider>
  );
}

export default MyApp
