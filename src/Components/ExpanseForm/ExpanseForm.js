import React, { useEffect, useRef, useState } from 'react'
import styles from './ExpanseForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { createExpanse } from '../../Actions/ExpanseActions'
import { createAccountRequest } from '../../Actions/AccountRequestActions'
import FileUpload from '../FileUpload/FileUpload'
import axios from 'axios'
import ImageUploader from './../ImageUploader/ImageUploader'

const ExpanseForm = () => {
	const [formValid, setFormValid] = useState(true)
	// const notification = useSelector(state => state.customer.notification)
	const [formSubmit, setFormSubmit] = useState(false)
	const currentUser = useSelector(state => state.auth.user)
	const dispatch = useDispatch()

	const [file, setFile] = useState(null)
	const [previewUrl, setPreviewUrl] = useState()
	const filePickerRef = useRef()
	//  set
	// Initial state for inputs
	const initialInputsState = {
		amount: { value: '', isValid: true },
		narration: { value: '', isValid: true },
		date: { value: '', isValid: true },
		methode: { value: '', isValid: true }
	}

	// State for inputs
	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.methode.isValid &&
				inputs.amount.isValid &&
				inputs.narration.isValid &&
				inputs.date.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		if (inputType === 'date') {
			const selectedDate = enteredValue
			const currentTime = new Date().toLocaleTimeString('en-US', {
				hour12: false
			})
			const selectedDateTime = `${selectedDate} ${currentTime}`

			enteredValue = selectedDateTime
		}

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
	const submitHandler = e => {
		e.preventDefault()
		const data = {
			amount: +inputs.amount.value,
			narration: inputs.narration.value,
			date: inputs.date.value,
			methode: inputs.methode.value
		}

		const dateValid = data.date?.trim().length > 0

		const amountValid = +data.amount > 0
		const narrationValid = data.narration?.trim().length > 0
		const methodeValid = data.methode?.trim().length > 0

		if (!amountValid || !narrationValid || !dateValid || !methodeValid) {
			setInputs(currentInputs => {
				return {
					amount: { value: +currentInputs.amount.value, isValid: amountValid },
					date: { value: currentInputs.date.value, isValid: dateValid },
					methode: {
						value: currentInputs.methode.value,
						isValid: methodeValid
					},
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					}
				}
			})
			return
		}

		// dispatch(createExpanse(data))
		const formData = new FormData()
		formData.append('file', file)

		// Append other form data fields to the FormData object
		formData.append('date', data.date)
		formData.append('amount', data.amount)
		formData.append('narration', data.narration)
		formData.append('requestType', 'expense')
		formData.append('requestForm', 'expense')
		formData.append('id', currentUser.id)
		formData.append('methode', data.methode)

		dispatch(createAccountRequest(formData))
		setFormSubmit(true)
		setInputs(initialInputsState)
	}

	// file uploading

	const pickHandler = e => {
		let pickedFile

		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0]
			setFile(pickedFile)
		}
	}
	const pickImageHandler = () => {
		filePickerRef.current.click()
	}

	return (
		<div className={`container ${styles.container} `}>
			<h2 class="row col-md-12 col-sm-6" className={styles.header}>
				Create Expense(D)
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
							value={inputs.date.value ? inputs.date.value.split(' ')[0] : ''}
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
					<div class="col-md-6 col-sm-6 my-1">
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
					<div class="col-md-6 col-sm-6 my-1">
						<div class="form-group">
							<select
								class="form-control mb-2"
								id="methode"
								value={inputs.methode.value}
								onChange={e =>
									inputTextChangeHandler('methode', e.target.value)
								}>
								<option value="" disabled>
									Card / Cash / Cheque
								</option>
								<option value="card">Card</option>
								<option value="cash">Cash</option>
								<option value="cheque">Cheque</option>
								<option value="transfer">Bank Transfer</option>
								<option value="deposite">Bank Deposite</option>
							</select>
						</div>
					</div>
				</div>
				<div class="form-row row">
					<div class="col-md-6 col-sm-6 my-1">
						<div class="form-group">
							<input
								type="file"
								name=""
								value=""
								style={{ display: 'none' }}
								accept=".jpg,.png,.jpeg"
								onChange={pickHandler}
								ref={filePickerRef}
							/>

							<button
								type="button"
								onClick={pickImageHandler}
								class="btn btn-danger "
								style={{ width: '100%' }}>
								{!file ? 'Upload File' : 'File Uploaded'}
							</button>
						</div>
					</div>
				</div>
				<div class="form-row row">
					<div class="col-md-6 col-sm-6 my-1">
						<div class="form-group">
							<button
								type="button "
								class="btn btn-primary "
								style={{ display: 'block', width: '100%' }}
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
