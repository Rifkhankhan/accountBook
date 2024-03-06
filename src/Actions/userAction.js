/* eslint-disable no-unused-expressions */
// import swal from 'sweetalert'
import * as UserApi from './../Apis/UserRequest';

import { userActions } from './../store/UserSlice';

export const logIn = formData => async dispatch => {
	// dispatch({type: "AUTH_START"})
  try {
    const { data } = await UserApi.logIn(formData);
		// dispatch(authActions.login(data))
		// dispatch(authActions.changeLoading())
  } catch (error) {
		// dispatch(authActions.changeLoading())

		// if (error.response.status === 400) {
		// 	// swal("Please provide an email and password!", "Check the email and password!", "error")
		// } else if (error.response.status === 404) {
		// 	// swal("You don't have webH account!", "Please create an account! Or enter valid credentials!", "error")
		// } else if (error.response.status === 409) {
		// 	// swal("Wrong Password!", "Please check your password!", "error")
		// }

    console.log(error);
  }
};

export const autoLogin = formData => async dispatch => {
  try {
    const { data } = await UserApi.autoLogin(formData);
		// dispatch(authActions.autoLogin(data))
  } catch (error) {
		// dispatch(authActions.changeLoading())

		// if (error.response.status === 409) {
		// 	// swal("User with this email already exists!", "Check the email address!", "error")
		// } else if (error.response.status === 500) {
		// 	// swal("Invalid email!", "Check the email address! And provide working email address!", "warning")
		// }

    console.log(error);
  }
};

export const createUser = formData => async dispatch => {
  try {
		// dispatch(uiActions.changeAsLoading())
    const { data } = await UserApi.createCustomer(formData);
    if (data.success) {
      dispatch(userActions.createUser(formData));
    }
		// dispatch(uiActions.changeAsLoading())
  } catch (error) {
    console.log(error);

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
};

export const getUsers = () => async dispatch => {
  try {
		// dispatch(uiActions.changeAsLoading())
    const { data } = await UserApi.getCustomers();
    dispatch(userActions.getUsers(data));
		// dispatch(uiActions.changeAsLoading())
  } catch (error) {
    console.log(error);

		// if (error.response.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
  }
};
export const getUser = id => async dispatch => {
  try {
		// dispatch(uiActions.changeAsLoading())
    const { data } = await UserApi.getCustomer(id);
		// dispatch(CustomerAction.getCustomer(data))
		// dispatch(uiActions.changeAsLoading())
  } catch (error) {
    console.log(error);

		// if (error.response.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
  }
};
export const updateUser = (id, formData) => async dispatch => {
  try {
    const { data } = await UserApi.updateCustomer(id, formData);
    dispatch(userActions.updateUser({ id, formData }));
		// dispatch(uiActions.changeAsLoading())
  } catch (error) {
    console.log(error);

		// if (error.response.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
  }
};

export const deleteUser = (id, formData) => async dispatch => {
  try {
    const { data } = await UserApi.deleteCustomer(id, formData);
		// dispatch(CustomerAction.updateCustomer(data))
		// dispatch(uiActions.changeAsLoading())
  } catch (error) {
    console.log(error);

		// if (error.response.status === 400) {
		// 	// swal(
		// 	// 	'Please provide an email and password!',
		// 	// 	'Check the email and password!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 404) {
		// 	// swal(
		// 	// 	"You don't have HomeDelivery account!",
		// 	// 	'Please create an account! Or enter valid credentials!',
		// 	// 	'error'
		// 	// )
		// } else if (error.response.status === 409) {
		// 	// swal('Wrong Password!', 'Please check your password!', 'error')
		// }
  }
};
