import { createSlice , configureStore } from "@reduxjs/toolkit";

// SLICE'S STATE OBJECTS
const initialCounterState = { counter: 0 , showToggle: true };
const initialAuthState = { isAuthenticated: false };


// COUNTER SLICE
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter ++;
    },
    decrement(state) {
      state.counter --;
    },
    increase(state , action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showToggle = !state.showToggle;
    }
  }
});


// AUTH SLICE
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    }
  }
});



// STORE CONFIGURATION
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer
  }
});


export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;



