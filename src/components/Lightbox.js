import product from '../product';
import { useGlobalContext } from '../context';
import svg from '../svg';

function Lightbox() {
  const { images } = product;
  const { setIsLightbox, slides, dispatchSlides } = useGlobalContext();

  return (
    <aside className='lightbox bg-black-100 min-w-full min-h-screen max-h-screen overflow-y-scroll py-12 hidden md:grid place-items-center fixed top-0 left-0 z-50'>
      <div>
        <div className='flex justify-end'>
          <button
            onClick={() => setIsLightbox(false)}
            type='button'
            className='p-4 pr-0 transition-all lightbox-closeBtn'
          >
            {svg.close}
          </button>
        </div>
        <div className='max-w-md mx-auto'>
          <div className='relative'>
            <div className='grid grid-cols-1 grid-rows-1 overflow-hidden'>
              {images.map((item, i) => {
                let position = 'translate-x-full';
                if (i === slides.lightbox) {
                  position = 'translate-x-0 z-10';
                }
                if (
                  i === slides.lightbox - 1 ||
                  (slides.lightbox === 0 && i === images.length - 1)
                ) {
                  position = '-translate-x-full';
                }
                return (
                  <img
                    key={i}
                    className={`${position} col-start-1 col-end-2 row-start-1 row-end-1 md:rounded-2xl lg:rounded-3xl transition-all`}
                    src={item.desktop}
                    alt={`view ${i}`}
                  />
                );
              })}
            </div>
            <button
              onClick={() =>
                dispatchSlides({ type: 'LIGHTBOX', payload: 'decrease' })
              }
              type='button'
              className='z-10 absolute top-1/2 -left-4 -translate-y-1/2 bg-blue-100 w-10 h-10 grid place-items-center rounded-full transition-all lightbox-prevBtn'
            >
              {svg.prev}
            </button>
            <button
              onClick={() =>
                dispatchSlides({ type: 'LIGHTBOX', payload: 'increase' })
              }
              type='button'
              className='z-10 absolute top-1/2 -right-4 -translate-y-1/2 bg-blue-100 w-10 h-10 grid place-items-center rounded-full transition-all lightbox-nextBtn'
            >
              {svg.next}
            </button>
          </div>
          <div className='hidden md:grid md:grid-cols-4 md:gap-x-2 lg:gap-x-4 md:mt-4 lg:mt-8'>
            {images.map((item, i) => {
              return (
                <button
                  onClick={() =>
                    dispatchSlides({ type: 'SET_LIGHTBOX', payload: i })
                  }
                  key={i}
                  className={`${
                    i === slides.lightbox
                      ? 'border-2 border-orange-200 active-thumbnail'
                      : ''
                  } rounded-xl overflow-hidden thumbnail relative`}
                  type='button'
                >
                  <img src={item.thumbnail} alt={`view ${i}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Lightbox;
