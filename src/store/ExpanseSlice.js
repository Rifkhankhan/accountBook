import { createSlice } from '@reduxjs/toolkit'

export const expanseSlice = createSlice({
	name: 'expanse',
	initialState: {
		expanses: []
	},
	reducers: {
		createExpanse: (state, action) => {
			state.expanses.push(action.payload)
		},

		getExpanse: (state, action) => {
			console.log(action.payload)
			if (action.payload.success) state.notification = true
		}
	}
})

export const expanseActins = expanseSlice.actions
// export const classAction = classSlice.actions

export default expanseSlice.reducer
