import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ReceiptModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPager, faPen } from '@fortawesome/free-solid-svg-icons'
import { updateReceipt } from '../../Actions/ReceiptActions'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountRequest } from '../../Actions/AccountRequestActions'
const ReceiptModel = ({
	type,
	clickedRow,
	showModal,
	closeHandler,
	deleteHandler
}) => {
	const currentUser = useSelector(state => state.auth.user)
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()

	

	// initialInputsState
	const initialInputsState = {
		...clickedRow,
		date: {
			value: new Date(clickedRow.date).toISOString().split('T')[0],
			isValid: true
		},
		amount: { value: clickedRow?.amount, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },
		userId: { value: currentUser?._id, isValid: true },
		requestForm: { value: clickedRow?.requestForm, isValid: true },
		requestType: { value: clickedRow?.requestType, isValid: true }
	}

	

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.amount.isValid &&
				inputs.requestForm.isValid &&
				inputs.narration.isValid
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

	const submitHandler = () => {
		const data = {
			...clickedRow,
			date: inputs.date.value,

			narration: inputs.narration.value,
			amount: inputs.amount.value,
			userId: inputs.userId.value,
			requestForm: inputs.requestForm.value,
			requestType: inputs.requestType.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const categoryValid = data.requestForm?.trim().length > 0
		const amountValid = data.amount > 0
		const dateValid = data.date?.trim().length > 0
		if (!narrationValid || !amountValid || !categoryValid) {
			setInputs(currentInputs => {
				return {
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					date: {
						value: currentInputs.date.value,
						isValid: dateValid
					},
					amount: {
						value: currentInputs.amount.value,
						isValid: amountValid
					},
					requestForm: {
						value: currentInputs.requestForm.value,
						isValid: categoryValid
					}
				}
			})
			return
		}

		dispatch(updateAccountRequest(data))
		setFormSubmit(true)
		// setShowEditModal(false)j

		setInputs(initialInputsState)
		closeHandler()
	}

	const delHandler = () => {
		deleteHandler(clickedRow._id)
	}

	return (
		<>
			{!showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						{currentUser.receiptPermission === 'yes' &&
							currentUser.receiptEditPermission === 'yes' && (
								<FontAwesomeIcon
									className={styles.editBtn}
									icon={faPen}
									onClick={() => setShowEditModal(current => !current)}
								/>
							)}
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-4">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Date
								</label>
								<p>{inputs.date.value}</p>
							</div>
							<div className="col-12 col-md-4">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Amount
								</label>
								<p>{inputs.amount.value}</p>
							</div>
							<div className="col-12 col-md-4">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									RequestForm
								</label>
								<p>{inputs.requestForm.value}</p>
							</div>
						</div>
						<div className="row">
							<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
								Narration
							</label>
							<textarea
								rows={5}
								disabled
								style={{
									marginInline: 'auto',
									width: '98%',
									border: '2px solid blue',
									borderRadius: '5px'
								}}>
								{inputs.narration.value}
							</textarea>
						</div>
					</Modal.Body>
					<Modal.Footer>
						{currentUser.receiptPermission === 'yes' &&
							currentUser.receiptDeletePermission === 'yes' && (
								<Button variant="danger" onClick={delHandler}>
									Delete
								</Button>
							)}
						<Button variant="secondary" onClick={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			{showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>Edit Details</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faClose}
							onClick={() => setShowEditModal(current => !current)}
						/>
					</Modal.Header>
					{!formValid && (
						<div
							className="row "
							style={{ paddingBlock: '0px', marginBlock: '0px' }}>
							<p
								className="text-danger text-capitalize  "
								style={{
									fontSize: '3vh',
									textAlign: 'center',
									paddingBlock: '0px',
									marginBlock: '0px'
								}}>
								Invalid Data Please check!
							</p>
						</div>
					)}
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Date
								</label>
								<input
									type="date"
									value={inputs.date.value}
									className="form-control"
									onChange={e => inputTextChangeHandler('date', e.target.value)}
								/>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									value={inputs.amount.value}
									onChange={e =>
										inputTextChangeHandler('amount', e.target.value)
									}
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

							<div class="col-md-6 col-sm-6 my-3">
								<div class="form-group">
									<div class="row mb-1">
										<input
											type="radio"
											id="eCash"
											name="requestForm"
											onChange={e =>
												inputTextChangeHandler('requestForm', 'cash')
											}
											value={inputs.requestForm?.value}
											checked={inputs.requestForm?.value === 'cash'}
											className="col col-2 "
										/>
										<label
											for="eCash"
											class="col col-4"
											style={{
												color: 'black',
												fontSize: '2vh',
												textAlign: 'left'
											}}>
											Cash
										</label>
									</div>

									<div class="row mb-1">
										<input
											type="radio"
											id="eCapital"
											name="requestForm"
											onChange={e =>
												inputTextChangeHandler('requestForm', 'capital')
											}
											checked={inputs.requestForm?.value === 'capital'}
											value={inputs.requestForm?.value}
											class="col col-2"
										/>
										<label
											for="eCapital"
											class="col col-4"
											style={{ color: 'black', fontSize: '2vh' }}>
											Capital
										</label>
									</div>
								</div>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={submitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	)
}

export default ReceiptModel
