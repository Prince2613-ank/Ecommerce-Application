import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

const saveToStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }

      saveToStorage(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      saveToStorage(state.items);
    },

    updateQty: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
      }
      saveToStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToStorage([]);
    },

    // ✅ NEW: remove non-existing products after refresh
    syncCartWithProducts: (state, action) => {
      const liveProducts = action.payload;

      const liveIds = new Set(liveProducts.map(p => String(p.id)));

      state.items = state.items.filter(item =>
        liveIds.has(String(item.id))
      );

      saveToStorage(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
  syncCartWithProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
