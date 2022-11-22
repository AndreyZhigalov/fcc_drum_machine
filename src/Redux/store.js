import { configureStore } from '@reduxjs/toolkit';
import drumMachineSlice from './drumMachineSlice';

const store = configureStore({
  reducer: {
    drum: drumMachineSlice,
  },
});

export default store