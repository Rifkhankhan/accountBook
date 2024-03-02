import React, { useEffect, useState } from 'react'
import styles from './CreateUser.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { expanseActins } from '../../store/ExpanseSlice'
const CreateUser = ({ header }) => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	const [error, setHasError] = useState(false)
	// Initial state for inputs
	const initialInputsState = {
		name: { value: '', isValid: true },

		expansePermission: { value: null, isValid: true },
		receiptPermission: { value: null, isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.receiptPermission.isValid &&
				inputs.expansePermission.isValid &&
				inputs.name.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}
	// if (notification) {
	// 	setTimeout(function () {
	// 		window.location.reload()
	// 	}, 1000)
	// }
	const submitHandler = () => {
		const data = {
			name: inputs.name.value,

			expansePermission: inputs.expansePermission.value,
			receiptPermission: inputs.receiptPermission.value
		}

		const nameValid = data.name?.trim().length > 0
		const expansePermissionIsValid = data.expansePermission !== null
		const receiptPermissionIsValid = data.receiptPermission !== null
		console.log(data)
		if (!nameValid || !expansePermissionIsValid || !receiptPermissionIsValid) {
			setInputs(currentInputs => {
				return {
					name: { value: currentInputs.name.value, isValid: nameValid },
					expansePermission: {
						value: currentInputs.expansePermission.value,
						isValid: expansePermissionIsValid
					},
					receiptPermission: {
						value: currentInputs.receiptPermission.value,
						isValid: receiptPermissionIsValid
					}
				}
			})
			return
		}

		dispatch(expanseActins.createExpanse(data))
		// setFormSubmit(true)
		setInputs(initialInputsState)
	}
	return (
		<div className={`container ${styles.container} `}>
			<h2 class="row col-md-12 col-sm-6" className={styles.header}>
				{header}
			</h2>
			{!formValid && (
				<div className="row ">
					<p
						className="text-warning text-capitalize  "
						style={{ fontSize: '2vh' }}>
						Invalid Data Please check!
					</p>
				</div>
			)}

			{/* {notification && (
				<div className={styles.successContainer}>
					<p className={styles.successMessage}>Successfully sent!</p>
				</div>
			)} */}

			{/* {!notification && !formSubmit && (
				<div className={styles.successContainer}>
					<i class="fas fa-spinner fa-spin"></i>
				</div>
			)} */}

			<form class="form">
				{/* forms row start */}
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="text"
							class="form-control"
							placeholder="Name"
							id="name"
							value={inputs.name.value}
							onChange={e => inputTextChangeHandler('name', e.target.value)}
						/>
					</div>
					{/* <div class="form-group col-12 col-md-6 mb-2">
						<input
							type="text"
							class="form-control"
							placeholder="Last Name"
							id="date"
							value={inputs.date.value}
							onChange={e => inputTextChangeHandler('date', e.target.value)}
						/>
					</div> */}
				</div>
				{/* <div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="email"
							class="form-control"
							placeholder="Email"
							id="date"
							value={inputs.date.value}
							onChange={e => inputTextChangeHandler('date', e.target.value)}
						/>
					</div>
					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="number"
							class="form-control"
							placeholder="Age"
							id="date"
							value={inputs.date.value}
							onChange={e => inputTextChangeHandler('date', e.target.value)}
						/>
					</div>
				</div> */}
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.expansePermission.value}
							onChange={e =>
								inputTextChangeHandler('expansePermission', e.target.value)
							}
							id="inputGroupSelect01">
							<option selected>Access Expanses...</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.receiptPermission.value}
							onChange={e =>
								inputTextChangeHandler('receiptPermission', e.target.value)
							}
							id="inputGroupSelect01">
							<option selected>Access Incomes...</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
				<div class="form-row row">
					<div class="col-md-2 col-sm-6 my-1">
						<div class="form-group">
							<button
								type="button"
								class="btn btn-primary "
								onClick={submitHandler}>
								Submit
							</button>
						</div>
					</div>
				</div>
				)
			</form>
		</div>
	)
}

export default CreateUser
