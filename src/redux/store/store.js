
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  reminders: [], // To be updated from the persisted state if available
  lastId: 0, // Initialize the last used ID
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
      const newReminder = {
        id: state.lastId + 1, // Generate a unique ID for each new reminder
        selectedButton: action.payload.selectedButton,
        selectedDropdownContact: action.payload.selectedDropdownContact,
        selectedDropdownReminder: action.payload.selectedDropdownReminder,
      };
      return {
        ...state,
        reminders: [...state.reminders, newReminder],
        lastId: state.lastId + 1, // Increment the last used ID
      };
    case 'DELETE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.filter((_, index) => index !== action.payload),
      };
    case 'UPDATE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map(reminder => {
          if (reminder.id === action.payload.id) {
            return {
              ...reminder,
              selectedButton: action.payload.selectedButton,
              selectedDropdownContact: action.payload.selectedDropdownContact,
              selectedDropdownReminder: action.payload.selectedDropdownReminder,
            };
          }
          return reminder;
        }),
      };
    default:
      return state;
  }
};

// Initial state for contacts
const initialContactsState = {
  contacts: [],
};
const initialSettingState = {
  backgroundFetchingEnabled: false,
  reminderTime: '15 minutes', 
};
const initialTimeState = {
  reminderTime: '15 minutes', 
};
// Reducer for contacts
const contactsReducer = (state = initialContactsState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      const newContact = {
        id: state.contacts.length + 1,
        givenName: action.payload.givenName,
        familyName: action.payload.familyName,
      };
      return {
        ...state,
        contacts: [...state.contacts, newContact],
      };
    default:
      return state;
  }
};

const settingReducer = (state = initialSettingState, action) => {
  switch (action.type) {
    case 'TOGGLE_BACKGROUND_FETCHING':
      return {
        ...state,
        backgroundFetchingEnabled: action.payload,
      };
    
    default:
      return state;
  }
};

const timeReducer = (state = initialTimeState, action) => {
  switch (action.type) {
    case 'UPDATE_REMINDER_TIME':
      return {
        ...state,
        reminderTime: action.payload,
      };
    
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  reminders: reminderReducer,
  contacts: contactsReducer,
  settings: settingReducer,
  ToggleTime:timeReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['reminders','storedContacts','settings'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);
export default store;

