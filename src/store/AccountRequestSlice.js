import { createSlice } from '@reduxjs/toolkit'

export const accountRequestSlice = createSlice({
	name: 'accountRequest',
	initialState: {
		isLoading: false,
		accountRequests: []
	},
	reducers: {
		handleLoading: (state, action) => {
			state.isLoading = !state.isLoading
		},
		createAccountRequest: (state, action) => {
			console.log(action.payload)
			state.accountRequests.push(action.payload)
		},
		getAccountRequests: (state, action) => {
			state.accountRequests = [...action.payload]
		},
		getAccountRequest: (state, action) => {
			//   if (action.payload.success) state.notification = true;
		},
		deleteAccountRequest: (state, action) => {
			state.accountRequests = state.accountRequests.filter(
				accountRequest => accountRequest._id !== action.payload
			)
		},
		updateAccountRequest: (state, action) => {
			const updatedAdvance = {
				_id: action.payload.id,
				...action.payload.formData
			}

			// Find the index of the object to update
			const index = state.accountRequests.findIndex(
				accountRequest => accountRequest._id === action.payload.id
			)

			if (index !== -1) {
				// Create a new array with the updated object
				const updatedAdvances = [
					...state.accountRequests.slice(0, index), // elements before the updated object
					updatedAdvance, // updated object
					...state.accountRequests.slice(index + 1) // elements after the updated object
				]

				state.accountRequests = updatedAdvances
				window.location.reload()
			}
		}
	}
})

export const AccountRequestActions = accountRequestSlice.actions
// export const classAction = classSlice.actions

export default accountRequestSlice.reducer
