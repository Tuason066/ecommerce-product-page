import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useEffect, useRef } from 'react';

function AsideMenu() {
  const { setIsAsideMenu, setIsLightbox } = useGlobalContext();

  const menu = useRef();

  useEffect(() => {
    let pageX = 0;
    let pageY = 0;
    const minSwipe = 100;
    const allowedTime = 200;
    let startTime = 0;

    menu.current.addEventListener('touchstart', (e) => {
      const obj = e.changedTouches[0];

      pageX = obj.pageX;
      pageY = obj.pageY;
      startTime = new Date().getTime();
    });

    menu.current.addEventListener('touchend', (e) => {
      const obj = e.changedTouches[0];

      const swipeDuration = startTime - new Date().getTime();
      const swipeDistanceX = pageX - obj.pageX;
      const swipeDistanceY = pageY - obj.pageY;
      if (
        swipeDuration <= allowedTime &&
        swipeDistanceX >= minSwipe &&
        Math.abs(swipeDistanceY <= 100)
      ) {
        setIsAsideMenu(false);
      }
    });

    menu.current.addEventListener('click', (e) => {
      e.target.classList.contains('menu') && setIsAsideMenu(false);
    });
  }, []);

  return (
    <aside
      ref={menu}
      className='menu min-w-full min-h-screen max-h-screen overflow-y-scroll fixed top-0 left-0 bg-black-100 md:hidden z-50'
    >
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
