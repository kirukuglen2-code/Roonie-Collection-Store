// nextjs-client/src/context/AppContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the shape of our global state
interface AppState {
  cart: CartItem[];
  user: User | null;
}

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

// Create the context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
} | undefined>(undefined);

// Reducer function to handle state updates
const appReducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'SET_CART':
      return { ...state, cart: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    
    default:
      return state;
  }
};

const initialState: AppState = {
  cart: [],
  user: null,
};

// Create the provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ronnies-cart');
    if (savedCart) {
      try {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ronnies-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};