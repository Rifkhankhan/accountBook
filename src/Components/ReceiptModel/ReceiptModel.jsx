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
	const { balance, ...rest } = clickedRow

	// initialInputsState
	const initialInputsState = {
		...rest,
		date: {
			value: new Date(clickedRow.date).toISOString().split('T')[0],
			isValid: true
		},
		amount: { value: +clickedRow?.amount, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },
		methode: { value: clickedRow?.methode, isValid: true },
		id: { value: currentUser?.id, isValid: true },
		requestForm: { value: clickedRow?.requestForm, isValid: true },
		requestType: { value: clickedRow?.requestType, isValid: true }
	}

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.amount.isValid &&
				inputs.methode.isValid &&
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
			...rest,
			date: inputs.date.value,

			narration: inputs.narration.value,
			amount: +inputs.amount.value,
			id: inputs.id.value,
			methode: inputs.methode.value,
			requestForm: inputs.requestForm.value,
			requestType: inputs.requestType.value
		}

		const methodeValid = data.methode?.trim().length > 0
		const narrationValid = data.narration?.trim().length > 0
		const categoryValid = data.requestForm?.trim().length > 0
		const amountValid = +data.amount > 0
		const dateValid = data.date?.trim().length > 0
		if (!narrationValid || !amountValid || !categoryValid || !methodeValid) {
			setInputs(currentInputs => {
				return {
					...rest,
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					date: {
						value: currentInputs.date.value,
						isValid: dateValid
					},
					amount: {
						value: +currentInputs.amount.value,
						isValid: amountValid
					},
					requestForm: {
						value: currentInputs.requestForm.value,
						isValid: categoryValid
					},
					methode: {
						value: currentInputs.methode.value,
						isValid: methodeValid
					}
				}
			})
			return
		}

		dispatch(updateAccountRequest(data))
		closeHandler()
		setFormSubmit(true)

		setInputs(initialInputsState)
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
									Income/Capital
								</label>
								<p>{inputs.requestForm.value}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Transfer Methode
								</label>
								<p>
									{inputs.methode.value === 'transfer'
										? 'Bank Transfer'
										: inputs.methode.value === 'deposite'
										? 'Bank Deposite'
										: inputs.methode.value}
								</p>
							</div>
							<div className="col-12 col-md-6">
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
						</div>

						{clickedRow?.filename !== null && (
							<div className="row">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Image
								</label>
								<img
									src={`http://localhost:5000/uploads/${clickedRow?.filename}`}
									alt="Uploaded"
									style={{ width: '100%', height: '50vh' }}
								/>
							</div>
						)}
					</Modal.Body>
					<Modal.Footer>
						{currentUser.receiptPermission === 'yes' &&
							currentUser.receiptDeletePermission === 'yes' && (
								<Button
									variant="danger"
									onClick={() => deleteHandler(clickedRow)}>
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
							<div class="form-row row">
								<div class="col-md-6 col-sm-6 my-1">
									<div class="form-group">
										<select
											class="form-control mb-2"
											id="requestForm"
											value={inputs.requestForm.value}
											onChange={e =>
												inputTextChangeHandler('requestForm', e.target.value)
											}>
											<option value="" disabled>
												Pay / Receive
											</option>
											<option value="got">Receive</option>
											<option value="paid">Pay</option>
										</select>
									</div>

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
