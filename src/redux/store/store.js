import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  reminders: [],
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
      return {
        ...state,
        reminders: [...state.reminders, action.payload],
      };
    case 'DELETE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter((_, index) => index !== action.payload),
      };
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map((reminder, index) => {
          if (index === action.payload.index) {
            return { ...reminder, ...action.payload.updatedData };
          }
          return reminder;
        }),
      };
   
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reminders: reminderReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['reminders'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
export default store;
