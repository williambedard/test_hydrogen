import {createContext, useContext, useState, useMemo} from 'react';

const CartAppContext = createContext();

export default function CartContext({children}) {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    return {
      cartOpen: open,
      setCartOpen: setOpen,
    };
  }, [open, setOpen]);

  return (
    <CartAppContext.Provider value={value}>{children}</CartAppContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartAppContext);

  if (!context) {
    throw new Error('No cart context found');
  }

  return context;
}
