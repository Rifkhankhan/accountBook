// import * as AuthApi from './../Apis/AuthRequest'
// import swal from 'sweetalert'
// import { authUiActions } from '.././Redux/UI Slice/auth-ui-slice'
// import { authActions } from '../Redux/authSlice'

export const logIn = formData => async dispatch => {
  try {
		// dispatch(authUiActions.changeAsLoading())
		// const { data } = await AuthApi.logIn(formData)
		// dispatch(authActions.login(data))
  } catch (error) {
    console.log(error);

		// if (error.response.status === 400) {
		// 	// swal("Please provide an email and password!", "Check the email and password!", "error")
		// } else if (error.response.status === 404) {
		// 	// swal("You don't have HomeDelivery account!", "Please create an account! Or enter valid credentials!", "error")
		// } else if (error.response.status === 409) {
		// 	// swal("Wrong Password!", "Please check your password!", "error")
		// }
  }
	// dispatch(authUiActions.changeAsLoadingFinished())
};

export const logout = () => async dispatch => {
	// dispatch(authUiActions.changeAsLoading())
	// dispatch(authActions.logout())
	// dispatch(authUiActions.changeAsLoadingFinished())
};

export const autoLogin = () => async dispatch => {
	// try {
	// 	const token = localStorage.getItem('user')
	// 		? JSON.parse(localStorage.getItem('user'))
	// 		: ''
	// 	const { data } = await AuthApi.autoLogin(token)
	// 	dispatch(authActions.getAuthData(data))
	// } catch (err) {
	// 	console.log(err)
	// }
};
