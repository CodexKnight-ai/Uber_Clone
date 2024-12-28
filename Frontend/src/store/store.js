import { configureStore } from '@reduxjs/toolkit';
import userSlicer from './userSlice.js'
import captainSlicer from './captainSlice.js'

const store = configureStore({
  reducer: {
    user:userSlicer,
    captain:captainSlicer
  },
});

export { store };
