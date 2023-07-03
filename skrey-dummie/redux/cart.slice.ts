import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
  id: string
  quantity: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.find((item) => item.id === action.payload.id)
      if (itemExists) {
        itemExists.quantity++
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload)
      if (item) {
        item.quantity++
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.find((item) => item.id === action.payload)
      if (item) {
        if (item.quantity === 1) {
          const index = state.findIndex((item) => item.id === action.payload)
          state.splice(index, 1)
        } else {
          item.quantity--
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const cartReducer = cartSlice.reducer

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions
