export const addReminder = (selectedButton, selectedDropdownContact, selectedDropdownReminder) => {
    return (dispatch) => {
      // Simulating an async operation (API call, timeout, etc.)
      setTimeout(() => {
        dispatch({
          type: 'ADD_REMINDER',
          payload: {
            selectedButton: selectedButton,
            selectedDropdownContact: selectedDropdownContact,
            selectedDropdownReminder: selectedDropdownReminder,
          },
        });
      }, 500); // Delay for simulation purposes
    };
  };
  
  export const deleteReminder = (index) => {
    return {
      type: 'DELETE_REMINDER',
      payload: index,
    };
  };
  
  export const updateReminder = (index, updatedData) => {
    return {
      type: 'UPDATE_REMINDER',
      payload: { index, updatedData },
    };
  };

  