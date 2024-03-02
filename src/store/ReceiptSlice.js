import { createSlice } from '@reduxjs/toolkit'

export const receiptSlice = createSlice({
	name: 'receipt',
	initialState: {
		form: null,
		notification: false
	},
	reducers: {
		createForm: (state, action) => {
			console.log(action.payload)
		},

		getNotification: (state, action) => {
			console.log(action.payload)
			if (action.payload.success) state.notification = true
		}
	}
})

export const receiptActions = receiptSlice.actions
// export const classAction = classSlice.actions

export default receiptSlice.reducer
