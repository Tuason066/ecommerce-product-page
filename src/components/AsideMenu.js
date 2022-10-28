import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

function AsideMenu() {
  const { setIsAsideMenu } = useGlobalContext();

  return (
    <aside className='min-w-full min-h-screen max-h-screen absolute top-0 left-0 bg-black-100 md:hidden z-50'>
      <div className='w-9/12 bg-blue-100 min-h-screen p-6'>
        <button onClick={() => setIsAsideMenu(false)} type='button'>
          <img src='./images/icon-close.svg' alt='close' />
        </button>
        <ul className='mt-6'>
          <li>
            <Link
              to={'/'}
              className='block py-2 font-bold text-blue-400 tracking-wide'
            >
              Collections
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className='block py-2 font-bold text-blue-400 tracking-wide'
            >
              Men
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className='block py-2 font-bold text-blue-400 tracking-wide'
            >
              Women
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className='block py-2 font-bold text-blue-400 tracking-wide'
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to={'/'}
              className='block py-2 font-bold text-blue-400 tracking-wide'
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AsideMenu;
