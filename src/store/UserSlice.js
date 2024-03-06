import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: []
  },
  reducers: {
    createUser: (state, action) => {
      console.log(action.payload);
      state.users.push(action.payload);
    },
    getUsers: (state, action) => {
      state.users = [...action.payload];
    },
    getUser: (state, action) => {
			//   if (action.payload.success) state.notification = true;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = {
        _id: action.payload.id,
        ...action.payload.formData
      };

			// Find the index of the object to update
      const index = state.users.findIndex(
				user => user._id === action.payload.id
			);

      if (index !== -1) {
				// Create a new array with the updated object
        const updatedUsers = [
          ...state.users.slice(0, index), // elements before the updated object
          updatedUser, // updated object
          ...state.users.slice(index + 1) // elements after the updated object
        ];
        state.users = updatedUsers;
      }
			// another way to update............
			// Find the index of the object to update
			// const index = state.expanses.findIndex(expense => expense.id === updatedExpanse.id);

			// if (index !== -1) {
			//   // Update the object at the found index
			//   state.expanses[index] = updatedExpanse;
			// } else {
			//   console.error(`Expense with id ${updatedExpanse.id} not found`);
			// }
			// another way to update end.........
    }
  }
});

export const userActions = userSlice.actions;
// export const classAction = classSlice.actions

export default userSlice.reducer;
