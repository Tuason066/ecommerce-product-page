import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from 'react';
import product from './product';

const AppContext = createContext();

/* slides */
const slidesReducer = (slides, action) => {
  const handleLength = (num) => {
    if (!(num >= product.images.length) && !(num < 0)) return num;

    if (num >= product.images.length) {
      return 0;
    }
    return product.images.length - 1;
  };

  switch (action.type) {
    case 'MAIN':
      return {
        ...slides,
        main: handleLength(
          action.payload === 'increase' ? slides.main + 1 : slides.main - 1
        ),
      };

    case 'SET_MAIN':
      return { ...slides, main: action.payload };

    case 'LIGHTBOX':
      return {
        ...slides,
        lightbox: handleLength(
          action.payload === 'increase'
            ? slides.lightbox + 1
            : slides.lightbox - 1
        ),
      };

    case 'SET_LIGHTBOX':
      return { ...slides, lightbox: action.payload };

    default:
      return slides;
  }
};

/* cart */
const initialCart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

const cartReducer = (cart, action) => {
  switch (action.type) {
    case 'ADD':
      let addSwitch = false;

      cart.forEach((item) => {
        if (item.id === action.payload.id) {
          addSwitch = true;
        }
      });

      if (addSwitch) {
        return cart.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity + item.quantity,
            };
          }
        });
      }

      return [...cart, action.payload];

    case 'REMOVE_ITEM':
      return cart.filter((item) => item.id !== action.payload);

    default:
      return cart;
  }
};

/* keypressed */

const AppProvider = ({ children }) => {
  const [isAsideMenu, setIsAsideMenu] = useState(false);
  const [isLightbox, setIsLightbox] = useState(false);

  const [slides, dispatchSlides] = useReducer(slidesReducer, {
    main: 0,
    lightbox: 0,
  });
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /* keypress */
  useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.key) {
        case 'Escape':
          setIsLightbox(false);
          setIsAsideMenu(false);
          break;

        case 'ArrowRight':
          isLightbox
            ? dispatchSlides({ type: 'LIGHTBOX', payload: 'increase' })
            : dispatchSlides({ type: 'MAIN', payload: 'increase' });

          break;

        case 'ArrowLeft':
          isLightbox
            ? dispatchSlides({ type: 'LIGHTBOX', payload: 'decrease' })
            : dispatchSlides({ type: 'MAIN', payload: 'decrease' });
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  });

  return (
    <AppContext.Provider
      value={{
        isAsideMenu,
        setIsAsideMenu,
        slides,
        dispatchSlides,
        isLightbox,
        setIsLightbox,
        cart,
        dispatchCart,
        isCart,
        setIsCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
