import { useGlobalContext } from '../context';

function Cart() {
  const { cart, dispatchCart } = useGlobalContext();

  return (
    <div className='cart absolute top-[calc(100%_+_.5rem)] md:top-3/4 right-1/2 translate-x-1/2 z-20 bg-white shadow-2xl w-full rounded-lg md:max-w-sm md:right-0 md:translate-x-0'>
      <h2 className='p-4 lg:p-6 border-b border-blue-200 font-bold text-blue-400 tracking-wider'>
        Cart
      </h2>
      {cart.length > 0 ? (
        cart.map(({ id, name, newPrice, quantity, image }) => {
          return (
            <article
              key={id}
              className='grid grid-cols-[auto_1fr_auto] p-4 lg:p-6 gap-x-4'
            >
              <div className='col-start-1 col-end-2 row-start-1 row-end-3 w-12'>
                <img className='rounded-md' src={image} alt={name} />
              </div>
              <h3 className='col-start-2 col-end-3 capitalize line-clamp-1'>
                {name}
              </h3>
              <p className='col-start-2 col-end-3 row-start-2 row-end-3 tracking-wider text-sm'>
                {`$${parseFloat(newPrice).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} x ${quantity}`}{' '}
                <span className='font-bold text-blue-400'>
                  $
                  {parseFloat(newPrice * quantity).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </p>
              <button
                onClick={() =>
                  dispatchCart({ type: 'REMOVE_ITEM', payload: id })
                }
                type='button'
                className='col-start-3 col-end-4 row-start-1 row-end-3 flex items-center'
              >
                <img src='./images/icon-delete.svg' alt='remove' />
              </button>
            </article>
          );
        })
      ) : (
        <h4 className='min-h-[8rem] grid place-items-center font-bold'>
          Your cart is empty.
        </h4>
      )}
    </div>
  );
}

export default Cart;
