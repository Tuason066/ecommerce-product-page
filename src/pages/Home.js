import { useState } from 'react';
import product from '../product';
import { useGlobalContext } from '../context';

function Home() {
  const { id, category, name, description, price, discount, newPrice, images } =
    product;
  /* slides */
  const { slides, dispatchSlides, setIsLightbox, cart, dispatchCart } =
    useGlobalContext();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener('resize', (e) => setWindowWidth(e.target.innerWidth));

  const handleClick = () => windowWidth >= 678 && setIsLightbox(true);

  /* content */
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    if (count > 0) {
      dispatchCart({
        type: 'ADD',
        payload: {
          id,
          name,
          newPrice,
          quantity: count,
          image: images[0].thumbnail,
        },
      });

      setCount(0);
    }
  };

  return (
    <main className='max-w-screen-xl mx-auto'>
      <div className='md:grid md:grid-cols-2 grid-rows-[auto] md:w-11/12 md:mx-auto md:pb-12 md:pt-16 gap-x-10 lg:gap-x-24'>
        {/* main slide GRID */}
        <div className='h-fit'>
          <div className='grid grid-cols-1 grid-rows-1 relative overflow-hidden'>
            {images.map((item, i) => {
              let position = 'translate-x-full';

              if (i === slides.main) {
                position = 'translate-x-0 z-10';
              }

              if (
                i === slides.main - 1 ||
                (slides.main === 0 && i === images.length - 1)
              ) {
                position = '-translate-x-full';
              }

              return (
                <img
                  onClick={handleClick}
                  key={i}
                  className={`${position} ${
                    windowWidth >= 768 ? 'cursor-pointer' : ''
                  } col-start-1 col-end-2 row-start-1 row-end-1 md:rounded-2xl lg:rounded-3xl`}
                  src={item.desktop}
                  alt={`view ${i}`}
                />
              );
            })}
            <button
              onClick={() =>
                dispatchSlides({ type: 'MAIN', payload: 'decrease' })
              }
              type='button'
              className='md:hidden z-10 absolute top-1/2 left-[5%] -translate-y-1/2 bg-blue-100 w-10 h-10 grid place-items-center rounded-full'
            >
              <img
                className='-translate-x-[2px]'
                src='./images/icon-previous.svg'
                alt='previous'
              />
            </button>
            <button
              onClick={() =>
                dispatchSlides({ type: 'MAIN', payload: 'increase' })
              }
              type='button'
              className='md:hidden z-10 absolute top-1/2 right-[5%] -translate-y-1/2 bg-blue-100 w-10 h-10 grid place-items-center rounded-full'
            >
              <img
                className='translate-x-[2px]'
                src='./images/icon-next.svg'
                alt='previous'
              />
            </button>
          </div>
          <div className='hidden md:grid md:grid-cols-4 md:gap-x-2 lg:gap-x-4 md:mt-4 lg:mt-8'>
            {images.map((item, i) => {
              return (
                <button
                  onClick={() =>
                    dispatchSlides({ type: 'SET_MAIN', payload: i })
                  }
                  key={i}
                  className={`${
                    i === slides.main
                      ? 'border-2 border-orange-200 active-thumbnail'
                      : ''
                  } rounded-xl overflow-hidden thumbnail relative transition-all`}
                  type='button'
                >
                  <img src={item.thumbnail} alt={`view ${i}`} />
                </button>
              );
            })}
          </div>
        </div>
        {/* content */}
        <div className='w-11/12 md:w-full mx-auto pt-6 pb-10 lg:pt-20 lg:pb-0'>
          <h4 className='mb-4 lg:mb-6 text-orange-200 font-bold uppercase text-sm lg:text-base'>
            {category}
          </h4>
          <h1 className='mb-6 lg:mb-8 capitalize font-bold text-blue-400 text-4xl lg:text-5xl'>
            {name}
          </h1>
          <p className='mb-7 lg:mb-9 lg:text-lg'>{description}</p>
          {/* price */}
          <div className='font-bold flex items-center justify-between lg:block'>
            <div className='flex items-center gap-4 lg:mb-2'>
              <h2 className='text-blue-400 text-2xl lg:text-3xl tracking-wider'>
                {`$${newPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              </h2>
              <h3 className='bg-orange-100 text-orange-200 px-[.5em] rounded lg:text-lg tracking-wider'>
                {discount}%
              </h3>
            </div>
            <h4 className='line-through lg:text-lg tracking-wider'>
              {`$${price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            </h4>
          </div>
          <div className='lg:grid grid-cols-3 lg:gap-4 lg:mt-8'>
            {/* count */}
            <div className='my-4 flex items-center justify-between bg-blue-100 rounded-lg lg:m-0'>
              <button
                onClick={() => setCount((prev) => (prev === 0 ? 0 : prev - 1))}
                type='button'
                className='p-4 px-5 md:hover:opacity-50 transition-all'
              >
                <img src='./images/icon-minus.svg' alt='minus' />
              </button>
              <span className='font-bold text-blue-400 lg:text-lg'>
                {count}
              </span>
              <button
                onClick={() => setCount((prev) => prev + 1)}
                type='button'
                className='p-4 px-5 md:hover:opacity-50 transition-all'
              >
                <img src='./images/icon-plus.svg' alt='plus' />
              </button>
            </div>
            {/* add to cart */}
            <button
              onClick={handleAddToCart}
              type='button'
              className='primary-btn flex items-center justify-center gap-4 px-[1em] py-[.5em] rounded-lg bg-orange-200 w-full text-blue-100 font-bold lg:col-start-2 lg:col-end-4 lg:hover:opacity-75 transition-all'
            >
              <svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
                  fill='hsl(223, 64%, 98%)'
                  fillRule='nonzero'
                />
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
