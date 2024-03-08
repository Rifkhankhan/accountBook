import React, { useEffect, useState } from 'react'
import styles from './CreateUser.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { expanseActions } from '../../store/ExpanseSlice'
import { createUser } from '../../Actions/userAction'
const CreateUser = ({ header }) => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	const [error, setHasError] = useState(false)
	// Initial state for inputs
	const initialInputsState = {
		name: { value: '', isValid: true },
		expansePermission: { value: 'no', isValid: true },
		expanseEditPermission: { value: 'no', isValid: true },
		expanseDeletePermission: { value: 'no', isValid: true },
		receiptPermission: { value: 'no', isValid: true },
		receiptEditPermission: { value: 'no', isValid: true },
		receiptDeletePermission: { value: 'no', isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.receiptPermission.isValid &&
				inputs.expanseEditPermission.isValid &&
				inputs.expanseDeletePermission.isValid &&
				inputs.receiptEditPermission.isValid &&
				inputs.receiptDeletePermission.isValid &&
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
			receiptPermission: inputs.receiptPermission.value,
			expanseEditPermission: inputs.expanseEditPermission.value,
			expanseDeletePermission: inputs.expanseDeletePermission.value,
			receiptDeletePermission: inputs.receiptDeletePermission.value,
			receiptEditPermission: inputs.receiptEditPermission.value
		}

		const nameValid = data.name?.trim().length > 0
		// const phoneValid =
		// 	data.phone?.trim().length > 9 && data.phone?.trim().length <= 10

		if (!nameValid) {
			setInputs(currentInputs => {
				return {
					...currentInputs,
					name: { value: currentInputs.name.value, isValid: nameValid }
				}
			})
			console.log(data)
			return
		}

		dispatch(createUser(data))
		setFormSubmit(true)
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
				</div>
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.expansePermission.value}
							onChange={e =>
								inputTextChangeHandler('expansePermission', e.target.value)
							}
							id="inputGroupSelect01">
							<option selected value="no">
								Access Expanses denied...
							</option>
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
							<option selected value="no">
								Access Incomes denied...
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.expanseEditPermission.value}
							onChange={e =>
								inputTextChangeHandler('expanseEditPermission', e.target.value)
							}
							id="inputGroupSelect01">
							<option selected value="no">
								Access Edit Expanses denied...
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.receiptEditPermission.value}
							onChange={e =>
								inputTextChangeHandler('receiptEditPermission', e.target.value)
							}
							id="inputGroupSelect01">
							<option selected value="no">
								Access Edit Incomes denied...
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
				</div>
				<div class="form-row row">
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.expanseDeletePermission.value}
							onChange={e =>
								inputTextChangeHandler(
									'expanseDeletePermission',
									e.target.value
								)
							}
							id="inputGroupSelect01">
							<option selected value="no">
								Access Delete Expanses denied...
							</option>
							<option value="yes">Yes</option>
							<option value="no">No</option>
						</select>
					</div>
					<div class="form-group col-12 col-md-6 mb-2">
						<select
							class="form-control"
							value={inputs.receiptDeletePermission.value}
							onChange={e =>
								inputTextChangeHandler(
									'receiptDeletePermission',
									e.target.value
								)
							}
							id="inputGroupSelect01">
							<option selected value="no">
								Access Delete Incomes denied...
							</option>
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
								className="btn btn-primary "
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
