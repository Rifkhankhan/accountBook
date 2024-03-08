/* eslint-disable no-unused-expressions */
// import swal from 'sweetalert'
import swal from 'sweetalert'
import * as UserApi from './../Apis/UserRequest'

import { userActions } from './../store/UserSlice'

export const activateToggle = id => async dispatch => {
	try {
		// dispatch(authUiActions.changeAsLoading())
		const { data } = await UserApi.activateToggle(id)
		if (data.success) {
			dispatch(userActions.activateToggle(id))
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

export const createUser = formData => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.createCustomer(formData)
		if (data.success) {
			dispatch(userActions.createUser(formData))
		}
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}

export const getUsers = () => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.getCustomers()
		dispatch(userActions.getUsers(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
export const getUser = id => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await UserApi.getCustomer(id)
		// dispatch(CustomerAction.getCustomer(data))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
export const updateUser = (id, formData) => async dispatch => {
	try {
		const { data } = await UserApi.updateCustomer(id, formData)
		dispatch(userActions.updateUser({ id, formData }))
		// dispatch(uiActions.changeAsLoading())
	} catch (error) {
		console.log(error)

		// if (error.response?.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response?.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
	}
}
