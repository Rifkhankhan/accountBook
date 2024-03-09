/* eslint-disable no-unused-expressions */
// import swal from 'sweetalert'
import swal from 'sweetalert'
import * as UserApi from './../Apis/UserRequest'
import { authActions } from '../store/AuthSlice'

import { userActions } from './../store/UserSlice'

export const activateToggle = id => async dispatch => {
	dispatch(authActions.handleLoading())

	try {
		// dispatch(authUiActions.changeAsLoading())
		dispatch(authActions.handleLoading())
		const { data } = await UserApi.activateToggle(id)
		if (data.success) {
			dispatch(userActions.activateToggle(id))
		}
		dispatch(authActions.handleLoading())
	} catch (error) {
		console.log(error)

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

export const createUser = formData => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.createCustomer(formData)
		if (data.success) {
			dispatch(userActions.createUser(formData))
		}

		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}

export const getUsers = () => async dispatch => {
	dispatch(authActions.handleLoading())

	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.getCustomers()
		dispatch(userActions.getUsers(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}
export const getUser = id => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await UserApi.getCustomer(id)
		dispatch(authActions.handleLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}
export const updateUser = (id, formData) => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		const { data } = await UserApi.updateCustomer(id, formData)
		dispatch(userActions.updateUser({ id, formData }))
		dispatch(authActions.handleLoading())
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}

export const resetPassword = id => async dispatch => {
	dispatch(authActions.handleLoading())
	try {
		await UserApi.resetPassword(id)
		swal('Successfully Reset Password', 'Successfully Reset Password')
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}

export const updatePassword = (id, formData) => async dispatch => {
	console.log(id)
	console.log(formData)
	dispatch(authActions.handleLoading())
	try {
		await UserApi.updatePassword(id, formData)
		swal('Successfully Update Password', 'Successfully Update Password')
	} catch (error) {
		console.log(error)

		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 500) {
			swal('Internal Server Error', 'Check Your network!', 'error')
		}
	}
	dispatch(authActions.handleLoading())
}
