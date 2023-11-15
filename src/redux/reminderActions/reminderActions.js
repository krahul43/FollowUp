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

  // export const addContact = (givenName, familyName) => {
  //   return {
  //     type: 'ADD_CONTACT',
  //     payload: {
  //       givenName,
  //       familyName,
  //       // Add other payload properties for the new contact based on your requirements
  //     },
  //   };
  // };

  export const addContact = (givenName, familyName) => {
  return async (dispatch, getState) => {
    // Simulate an asynchronous operation (e.g., fetching data from a server)
    const newContactData = await simulateAsyncContactAddition(givenName, familyName);

    // Dispatch the action to add the contact to the state
    dispatch({
      type: 'ADD_CONTACT',
      payload: {
        givenName: newContactData.givenName,
        familyName: newContactData.familyName,
        // Add other payload properties for the new contact based on your requirements
      },
    });

    // Compare the new data with existing data and set reminder if newly found
    const existingContacts = getState().contacts.contacts;
    const isNewContact = compareContacts(existingContacts, newContactData);

    if (isNewContact) {
      // Dispatch the action to set a reminder
      dispatch(setReminder(newContactData));
    }
  };
};
// Helper function to simulate asynchronous contact addition
const simulateAsyncContactAddition = async (givenName, familyName) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ givenName, familyName, /* other properties */ });
    }, 1000); // Simulating a 1-second async operation
  });
};
export const compareContacts = (existingContacts, newContact) => {
  // Implement your logic to compare contacts and determine if it's newly found
  // For simplicity, let's assume that the contact is new if not found in the existing contacts
  return !existingContacts.some((contact) => contact.id === newContact.id);
};

  