import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
	name: 'expanse',
	initialState: {
		isAuthenticated: false,
		token: null,
		user: []
	},
	reducers: {
		login: (state, action) => {
			console.log(action.payload)
			if (action.payload.success) {
				state.isAuthenticated = true
			}

			state.user = action.payload.user
			state.token = action.payload.token

			window.localStorage.setItem('token', action.payload.token)
		},
		logout: (state, action) => {
			state.isAuthenticated = false
			window.localStorage.removeItem('token')
		},
		autoLogin: (state, action) => {
			if (action.payload?.success) {
				state.isAuthenticated = true

				state.user = action.payload.user
				state.token = action.payload.token

				window.localStorage.setItem('token', action.payload.token)
			} else {
				state.isAuthenticated = false
				state.token = null
				state.user = []
				window.localStorage.removeItem('token')
			}
		}
	}
})

export const authActions = authSlice.actions
// export const classAction = classSlice.actions

export default authSlice.reducer
