import swal from 'sweetalert'
import * as AccountRequestApis from '../Apis/AccountRequestApis'
import { advanceActions } from '../store/AdvanceSlice'
import { AccountRequestActions } from '../store/AccountRequestSlice'

export const createAccountRequest = formData => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await AccountRequestApis.createAccountRequest(formData)
		// dispatch(uiActions.changeAsLoading())
		if (data.success) {
			dispatch(AccountRequestActions.createAccountRequest(data.product))
		}
	} catch (error) {
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

export const getAccountRequests = () => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await AccountRequestApis.getAccountRequests()
		dispatch(AccountRequestActions.getAccountRequests(data))
		// dispatch(uiActions.changeAsLoading())
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
export const getAccountRequest = id => async dispatch => {
	try {
		// dispatch(uiActions.changeAsLoading())
		const { data } = await AccountRequestApis.getAccountRequest(id)
		// dispatch(CustomerAction.getCustomer(data))
		// dispatch(uiActions.changeAsLoading())
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
export const updateAccountRequest = (id, formData) => async dispatch => {
	try {
		const { data } = await AccountRequestApis.updateAccountRequest(id, formData)
		dispatch(AccountRequestActions.updateAccountRequest({ id, formData }))
		// dispatch(CustomerAction.updateCustomer(data))
		// dispatch(uiActions.changeAsLoading())
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

export const deleteAccountRequest = id => async dispatch => {
	try {
		const { data } = await AccountRequestApis.disableAccountRequest(id)
		dispatch(AccountRequestActions.deleteAccountRequest(id))

		// dispatch(CustomerAction.updateCustomer(data))
		// dispatch(uiActions.changeAsLoading())
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
