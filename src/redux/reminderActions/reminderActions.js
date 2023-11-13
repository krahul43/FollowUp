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

  