import React, { useEffect, useState } from 'react'
import styles from './ExpanseForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createExpanse } from '../../Actions/ExpanseActions'
const ExpanseForm = () => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const dispatch = useDispatch()
	const [error, setHasError] = useState(false)
	// Initial state for inputs
	const initialInputsState = {
		amount: { value: '', isValid: true },
		narration: { value: '', isValid: true },
		date: { value: '', isValid: true },
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.amount.isValid &&
				inputs.narration.isValid &&
				inputs.date.isValid 
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
			amount: inputs.amount.value,
			narration: inputs.narration.value,
			date: inputs.date.value
		}
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		const dateString = data.date?.trim()

		const amountValid = data.amount > 0
		const narrationValid = data.narration?.trim().length > 0
		const dateValid = dateRegex.test(dateString)

		if (
			!amountValid ||
			!narrationValid ||
			!dateValid 
		
		) {
			setInputs(currentInputs => {
				return {
					amount: { value: currentInputs.amount.value, isValid: amountValid },
					date: { value: currentInputs.date.value, isValid: dateValid },
				
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					}
				}
			})
			return
		}

		dispatch(createExpanse(data))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}
	return (
		<div className={`container ${styles.container} `}>
			<h2 class="row col-md-12 col-sm-6" className={styles.header}>
				 Create Expanse(Dr)
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
							type="date"
							class="form-control"
							id="date"
							value={inputs.date.value}
							onChange={e => inputTextChangeHandler('date', e.target.value)}
						/>
					</div>

					<div class="form-group col-12 col-md-6 mb-2">
						<input
							type="number"
							class="form-control"
							id="amount"
							placeholder="Amount"
							value={inputs.amount.value}
							onChange={e => inputTextChangeHandler('amount', e.target.value)}
						/>
					</div>
				</div>

				
					<div class="form-row row">
						<div class="col-md-12 col-sm-6 my-1">
							<div class="form-group">
								<textarea
									type="narration"
									class="form-control"
									id="narration"
									placeholder="Narration"
									value={inputs.narration.value}
									rows={4}
									onChange={e =>
										inputTextChangeHandler('narration', e.target.value)
									}
								/>
							</div>
						</div>

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
		

		
			</form>
		</div>
	)
}

export default ExpanseForm