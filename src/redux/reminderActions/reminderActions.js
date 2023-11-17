import Contacts from 'react-native-contacts';
export const ADD_CONTACT = 'ADD_CONTACT';
export const setReminder = 'setReminder'; 
export const TOGGLE_BACKGROUND_FETCHING = 'TOGGLE_BACKGROUND_FETCHING';
import AsyncStorage from '@react-native-async-storage/async-storage';


let nextId = 0; 
export const addReminder = (selectedButton, selectedDropdownContact, selectedDropdownReminder) => {
  return (dispatch) => {
    // Generate a unique ID for the new reminder
    const newId = nextId++;
    dispatch({
      type: 'ADD_REMINDER',
      payload: {
        id: newId,
        selectedButton: selectedButton,
        selectedDropdownContact: selectedDropdownContact,
        selectedDropdownReminder: selectedDropdownReminder,
      },
    });
  };
};
  
  export const deleteReminder = (index) => {
    return {
      type: 'DELETE_REMINDER',
      payload: index,
    };
  };
  
  export const updateReminder = (id, selectedButton, selectedDropdownContact, selectedDropdownReminder) => {
    return {
      type: 'UPDATE_REMINDER',
      payload: { id, selectedButton, selectedDropdownContact, selectedDropdownReminder },
    };
  };

  
  export const toggleTimeFetching = (targetTime) => {
    return async (dispatch, getState) => {
      try {
     
          // Log the correct variable, which is 'newTime'
          console.log(targetTime, '33reminderTime');
          dispatch({
            type: 'UPDATE_REMINDER_TIME',
            payload: targetTime, // Corrected payload to update the reminder time
          });
          await AsyncStorage.setItem('root', JSON.stringify({ ToggleTime: { reminderTime: targetTime } }));
      } catch (error) {
        console.error('Error saving backgroundFetchingEnabled state:', error);
      }
    };
  };
  export const loadReminderTime = () => {
    return async (dispatch) => {
      try {
        const storedReminderTime = await AsyncStorage.getItem('ToggleTime');
        if (storedReminderTime) {
          const reminderTime = JSON.parse(storedReminderTime);
          dispatch({
            type: 'UPDATE_REMINDER_TIME',
            payload: reminderTime,
          });
        }
      } catch (error) {
        console.error('Error loading reminder time:', error);
      }
    };
  };
  
  export const toggleBackgroundFetching = (isEnabled) => {
    return async (dispatch, getState) => {
      try {
        await AsyncStorage.setItem('root', JSON.stringify({ settings: { backgroundFetchingEnabled: isEnabled } }));
        dispatch({
          type: 'TOGGLE_BACKGROUND_FETCHING',
          payload: isEnabled,
        });
      } catch (error) {
        console.error('Error saving backgroundFetchingEnabled state:', error);
      }
    };
  };
  

const fetchDeviceContacts = () => {
  return new Promise((resolve, reject) => {
    Contacts.getAll()
    .then(contacts => {
      resolve(contacts);
    })
    .catch(err => {
      console.warn('Error fetching contacts:', err);
    });
  });
};

const getNewContacts = (existingContacts, newContacts) => {
  return newContacts.filter(
    (newContact) =>
      !existingContacts.some(
        (existingContact) =>
          existingContact.givenName === newContact.givenName &&
          existingContact.familyName === newContact.familyName
      )
  );
};


export const fetchAndAddContacts = () => {
  return async (dispatch, getState) => {
    try {
      // Fetch device contacts
      const newContacts = await fetchDeviceContacts();

      // Retrieve existing contacts from AsyncStorage
      const existingContactsString = await AsyncStorage.getItem('storedContacts');
      const existingContacts = JSON.parse(existingContactsString) || []; 
      console.log(existingContacts,'existingContacts')

      // Compare new contacts with existing contacts
      const newContactsToAdd = getNewContacts(existingContacts, newContacts);
      console.log(newContactsToAdd,'newContactsToAdd')
      const backgroundFetchingEnabled = getState().settings.backgroundFetchingEnabled;
      const reminderTime = getState().ToggleTime.reminderTime;
     

      console.log(backgroundFetchingEnabled,'backgroundFetchingEnabled')
      if (newContactsToAdd.length > 0) {
        // Dispatch action to add new contacts
        newContactsToAdd.forEach((newContact) => {
          dispatch({
            type: ADD_CONTACT,
            payload: newContact,
          });
        });

        if (backgroundFetchingEnabled) {
          // Dispatch action to add reminders for new contacts
          newContactsToAdd.forEach((newContact) => {
            const reminderText = `${newContact.familyName} ${newContact.givenName}`;
            dispatch({
              type: 'ADD_REMINDER',
              payload: {
                selectedButton: '../../assets/message.png',  // Set your default values or get them from somewhere
                selectedDropdownContact: reminderText,
                selectedDropdownReminder: reminderTime,  // Set your default reminder time or get it from somewhere
              },
            });
          });
        }

        // Save updated contacts to AsyncStorage
        const updatedContacts = [...existingContacts, ...newContactsToAdd];
        await AsyncStorage.setItem('storedContacts', JSON.stringify(updatedContacts));
      }
    } catch (error) {
      console.error('Error fetching and adding contacts:', error);
    }
  };
};







  