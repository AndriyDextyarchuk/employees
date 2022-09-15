import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import employeesSlice from './employeesSlice'

const reducers = combineReducers({
  emloyees: employeesSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
