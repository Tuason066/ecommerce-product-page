import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import Cart from './Cart';

function Navbar() {
  const { setIsAsideMenu, cart, isCart, setIsCart } = useGlobalContext();

  const cartQuantities = cart.reduce((total, item) => {
    return item.quantity + total;
  }, 0);

  return (
    <nav className='max-w-screen-xl mx-auto'>
      <div className='mx-auto w-11/12 flex items-center justify-between py-4 md:py-0 md:border-b md:border-blue-200 relative'>
        {/* cart */}
        {isCart && <Cart />}
        {/* left side */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setIsAsideMenu(true)}
            type='button'
            className='md:hidden'
          >
            <img src='./images/icon-menu.svg' alt='menu' />
          </button>
          <Link to={'/'} className='lg:mr-4'>
            <img src='./images/logo.svg' alt='logo' />
          </Link>
          <ul className='hidden md:flex'>
            <li>
              <Link to={'/'} className='nav-links'>
                Collections
              </Link>
            </li>
            <li>
              <Link to={'/'} className='nav-links'>
                Menu
              </Link>
            </li>
            <li>
              <Link to={'/'} className='nav-links'>
                Women
              </Link>
            </li>
            <li>
              <Link to={'/'} className='nav-links'>
                About
              </Link>
            </li>
            <li>
              <Link to={'/'} className='nav-links'>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* right side */}
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setIsCart(!isCart)}
            type='button'
            className='relative'
          >
            {cartQuantities > 0 && (
              <small className='absolute -top-4 -right-2 bg-orange-200 px-[.5em] text-white font-bold rounded-full'>
                {cartQuantities}
              </small>
            )}
            <img src='./images/icon-cart.svg' alt='cart' />
          </button>
          <Link
            to={'/'}
            className='w-8 lg:w-10 lg:hover:border-2 lg:hover:border-orange-200 rounded-full transition-all lg:ml-4'
          >
            <img src='./images/image-avatar.png' alt='avatar' />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
