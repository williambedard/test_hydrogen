import {
  Image,
  useCart,
  useCartLineItemCount,
  Money,
  useRemoveLineCallback,
  useUpdateLineQuantityCallback,
  useCartCheckoutURL,
  CartToggle,
  CheckoutButton,
} from '@shopify/hydrogen/client';

export default function Cart() {
  const itemCount = useCartLineItemCount();

  return (
    <>
      <CartHeader />
      <div className="flex-auto bg-gray-100 pl-8 pr-8 overflow-y-scroll">
        {itemCount > 0 ? (
          <CartLineItems />
        ) : (
          <p className="text-center text-gray-600 my-8">Your cart is empty</p>
        )}
      </div>
      {itemCount > 0 ? <CartFooter /> : null}
    </>
  );
}

export function CartIcon() {
  const itemCount = useCartLineItemCount();

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full text-gray-600"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      <div
        className={`bg-gray-900 text-xs rounded-full leading-none text-white absolute top-0 right-0 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 transition-all ${
          itemCount > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
        }`}
      >
        {itemCount > 0 ? itemCount : null}
      </div>
      <span className="sr-only">Cart, {itemCount} items</span>
    </div>
  );
}

function CartHeader() {
  return (
    <header className="px-7 h-20 bg-white border-b border-gray-300 border-solid flex items-center justify-between">
      <CartToggle>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <span className="sr-only">Close cart</span>
      </CartToggle>
      <div className="h-12 w-12 p-2 md:h-7 md:w-7 md:p-0">
        <CartIcon />
      </div>
    </header>
  );
}

function CartLineItems() {
  const {lines} = useCart();
  const remove = useRemoveLineCallback();
  const updateQuantity = useUpdateLineQuantityCallback();

  return (
    <div role="table" aria-label="Shopping cart">
      <div role="row" className="sr-only">
        <div role="columnheader">Image</div>
        <div role="columnheader">Item details</div>
        <div role="columnheader">Price</div>
      </div>
      {lines.map((line) => {
        return (
          <div
            role="row"
            key={line.id}
            className="pt-8 pb-8 border-b border-solid border-gray-300"
          >
            <div className="flex space-x-8 relative">
              <div role="cell">
                <Image
                  className="bg-white rounded w-20 h-20 object-cover"
                  image={line.merchandise.image}
                />
              </div>
              <div
                role="cell"
                className="flex-grow flex flex-col justify-between"
              >
                <div className="flex">
                  <div className="flex-grow">
                    <p className="text-gray-900 font-semibold">
                      {line.merchandise.title}
                    </p>
                    <ul className="text-sm">
                      {line.merchandise.selectedOptions.map((option) => {
                        return (
                          <li key={`${option.name}${option.value}`}>
                            {option.name}: {option.value}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex-shrink">
                    <button
                      onClick={() => {
                        remove(line.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">Remove from cart</span>
                    </button>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="flex-grow">
                    <div className="border border-solid border-gray-300 inline-flex items-center text-gray-500 rounded">
                      <button
                        onClick={() => {
                          updateQuantity(line.id, line.quantity - 1);
                        }}
                        className="p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Decrease quantity</span>
                      </button>
                      <div className="p-2 text-gray-900 text-center">
                        {line.quantity}
                      </div>
                      <button
                        onClick={() => {
                          updateQuantity(line.id, line.quantity + 1);
                        }}
                        className="p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="sr-only">Increase quantity</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div role="cell" className="absolute bottom-0 right-0 mb-3">
                {line.merchandise.priceV2 && (
                  <Money
                    money={{
                      amount: line.merchandise.priceV2.amount * line.quantity,
                      currencyCode: line.merchandise.priceV2.currencyCode,
                    }}
                  ></Money>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CartFooter() {
  const {subtotal} = useCart();
  const checkoutURL = useCartCheckoutURL();

  return (
    <footer className="bg-white border-t border-solid border-gray-300 p-8 space-y-4">
      <div role="table" className="w-full" aria-label="Cost summary">
        {subtotal && (
          <div role="row" className="flex items-center justify-between">
            <div role="rowheader" className="pb-2 font-semibold">
              Subtotal
            </div>
            <div role="cell" className="text-right pb-2">
              <Money money={subtotal}></Money>
            </div>
          </div>
        )}
        <div role="row" className="flex items-center justify-between">
          <div role="rowheader" className="font-semibold">
            Shipping
          </div>
          <div role="cell" className="text-right">
            Free
          </div>
        </div>
      </div>
      <CheckoutButton className="block cursor-pointer bg-black text-white w-full text-center p-4 hover:bg-gray-800 rounded mb-8 uppercase text-lg">
        Checkout
      </CheckoutButton>
    </footer>
  );
}
