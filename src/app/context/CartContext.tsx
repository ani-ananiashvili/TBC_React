import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  quantity: number;
  description: string;
}

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCart: (product: Product) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const updateCart = (product: Product) => {
    setCart((prevCart) => {
      return prevCart.map((p) =>
        p.id === product.id ? { ...p, quantity: product.quantity } : p
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
