import { authActions } from '../store/AuthSlice'
import * as AuthApi from './../Apis/AuthRequest'
import swal from 'sweetalert'
// import { authUiActions } from '.././Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'

export const logIn = formData => async dispatch => {
	try {
		// dispatch(authUiActions.changeAsLoading())
		console.log(formData)
		const { data } = await AuthApi.logIn(formData)
		dispatch(authActions.login(data))
	} catch (error) {
		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have Smart Account Book account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
	// dispatch(authUiActions.changeAsLoadingFinished())
}

export const logout = () => async dispatch => {
	// dispatch(authUiActions.changeAsLoading())
	await AuthApi.logout()
	dispatch(authActions.logout())

	// dispatch(authUiActions.changeAsLoadingFinished())
}

export const autoLogin = () => async dispatch => {
	const token = window.localStorage.getItem('token')
	try {
		// dispatch(authUiActions.changeAsLoading())
		if (token) {
			const { data } = await AuthApi.autoLogin(token)
			dispatch(authActions.autoLogin(data))
		} else {
			dispatch(authActions.autoLogin())
		}
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal(
				'Please provide an email and password!',
				'Check the email and password!',
				'error'
			)
		} else if (error.response?.status === 404) {
			swal(
				"You don't have HomeDelivery account!",
				'Please create an account! Or enter valid credentials!',
				'error'
			)
		} else if (error.response?.status === 409) {
			swal('Wrong Password!', 'Please check your password!', 'error')
		}
	}
}
