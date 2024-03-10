import swal from 'sweetalert'
import * as AccountRequestApis from '../Apis/AccountRequestApis'
import { advanceActions } from '../store/AdvanceSlice'
import { AccountRequestActions } from '../store/AccountRequestSlice'

export const createAccountRequest = formData => async dispatch => {
	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.createAccountRequest(formData)
		// dispatch(uiActions.changeAsLoading())
		if (data.success) {
			dispatch(AccountRequestActions.createAccountRequest(data.product))
			swal('Successfully Created!', 'Now You can Continue', 'success')
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
	dispatch(AccountRequestActions.handleLoading())
}

export const getAccountRequests = () => async dispatch => {
	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.getAccountRequests()

		if (data.success) {
			dispatch(AccountRequestActions.getAccountRequests(data.product))
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
	dispatch(AccountRequestActions.handleLoading())
}
export const getAccountRequest = id => async dispatch => {
	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.getAccountRequest(id)
		dispatch(AccountRequestActions.handleLoading())
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}
export const updateAccountRequest = formData => async dispatch => {
	dispatch(AccountRequestActions.handleLoading())

	try {
		const { data } = await AccountRequestApis.updateAccountRequest(
			formData._id,
			formData
		)
		if (data) {
			dispatch(AccountRequestActions.updateAccountRequest(formData))
			swal('Successfully Updated!', 'Now You can Continue', 'success')
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
	dispatch(AccountRequestActions.handleLoading())
}

export const deleteAccountRequest = id => async dispatch => {
	dispatch(AccountRequestActions.handleLoading())
	try {
		const { data } = await AccountRequestApis.disableAccountRequest(id)
		dispatch(AccountRequestActions.deleteAccountRequest(id))
		swal('Successfully Deleted!', 'Now You can Continue', 'success')
	} catch (error) {
		if (error.response?.status === 400) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 404) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		} else if (error.response?.status === 409) {
			swal('Oops! Something Wrong', 'Try again please!', 'error')
		}
	}
	dispatch(AccountRequestActions.handleLoading())
}
