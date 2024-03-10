import { AccountRequestActions } from '../store/AccountRequestSlice'
import { authActions } from '../store/AuthSlice'

import * as AuthApi from './../Apis/AuthRequest'
import swal from 'sweetalert'
// import { authUiActions } from '.././Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'

export const logIn = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await AuthApi.logIn(formData)
		dispatch(authActions.login(data))
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal("You don't have Account", 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
		swal('Oops! Something Wrong', 'Try again please!', 'error')
	}
	dispatch(authActions.handleLoading())
}

export const logout = () => async dispatch => {
	await AuthApi.logout()
	dispatch(authActions.logout())
}

export const autoLogin = () => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const token = window.localStorage.getItem('token')

		// dispatch(authUiActions.changeAsLoading())
		if (token) {
			const { data } = await AuthApi.autoLogin(token)
			dispatch(authActions.autoLogin(data))
			// dispatch(AccountRequestActions.handleLoading())
		} else {
			dispatch(authActions.autoLogin())
			// dispatch(AccountRequestActions.handleLoading())
		}
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}
