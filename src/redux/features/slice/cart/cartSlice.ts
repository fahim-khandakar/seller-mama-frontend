import { ICartItem } from '@/types/product.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: ICartItem[];
}

const loadCartFromStorage = (): ICartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : [];
};

const initialState: CartState = {
  cart: loadCartFromStorage(),
};

const saveToStorage = (cart: ICartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existing = state.cart.find(
        (item) => item.cartKey === action.payload.cartKey,
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      saveToStorage(state.cart);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.cartKey !== action.payload);
      saveToStorage(state.cart);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ cartKey: string; quantity: number }>,
    ) => {
      const item = state.cart.find(
        (item) => item.cartKey === action.payload.cartKey,
      );
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
      saveToStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      saveToStorage([]);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
