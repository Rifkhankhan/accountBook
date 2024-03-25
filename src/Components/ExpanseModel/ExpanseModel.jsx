import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ExpanseModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPen } from '@fortawesome/free-solid-svg-icons'
import { updateExpanse } from '../../Actions/ExpanseActions'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccountRequest } from '../../Actions/AccountRequestActions'
const ExpanseModel = ({
	clickedRow,
	showModal,
	closeHandler,
	deleteHandler
}) => {
	const currentUser = useSelector(state => state.auth.user)
	const list = useSelector(state => state.accountRequest.accountRequests)
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()
	// initialInputsState
	const { balance, ...rest } = clickedRow

	const initialInputsState = {
		...rest,
		date: {
			value: new Date(clickedRow?.date).toISOString().split('T')[0],
			isValid: true
		},
		amount: { value: +clickedRow?.amount, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },

		id: { value: currentUser?.id, isValid: true },

		requestForm: { value: clickedRow?.requestForm, isValid: true },
		methode: { value: clickedRow?.methode, isValid: true },
		requestType: { value: clickedRow?.requestType, isValid: true }
	}

	const [inputs, setInputs] = useState(initialInputsState)
	useEffect(() => {
		setFormValid(
			inputs.amount?.isValid &&
				inputs.narration?.isValid &&
				inputs.methode?.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
		setInputs(currentInputValue => {
			console.log(currentInputValue)
			return {
				...currentInputValue,
				[inputType]: { value: enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = e => {
		e.preventDefault()
		const data = {
			...rest,
			narration: inputs.narration?.value,
			amount: +inputs.amount?.value,
			date: inputs.date?.value,
			id: inputs.id?.value,
			requestForm: inputs.requestForm?.value,
			methode: inputs.methode?.value,

			requestType: inputs.requestType?.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const methodeValid = data.methode?.trim().length > 0

		const amountValid = +data.amount > 0

		if (!narrationValid || !amountValid || !methodeValid) {
			setInputs(currentInputs => {
				return {
					...data,
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					methode: {
						value: currentInputs.methode.value,
						isValid: methodeValid
					},
					amount: {
						value: +currentInputs.amount.value,
						isValid: amountValid
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
						{currentUser.expansePermission === 'yes' &&
							currentUser.expanseEditPermission === 'yes' && (
								<FontAwesomeIcon
									className={styles.editBtn}
									icon={faPen}
									onClick={() => setShowEditModal(current => !current)}
								/>
							)}
					</Modal.Header>
					<Modal.Body
						style={{
							marginTop: '0px',
							marginBlock: '0px',
							paddingBlock: '0px'
						}}>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Date
								</label>
								<p>{inputs.date.value}</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Amount
								</label>
								<p>{inputs.amount.value}</p>
							</div>
						</div>
						<div className="row">
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
						{currentUser.expansePermission === 'yes' &&
							currentUser.expanseDeletePermission === 'yes' && (
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
									disabled
									type="date"
									className="form-control"
									value={inputs.date?.value}
								/>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Amount
								</label>
								<input
									type="number"
									className="form-control"
									value={inputs.amount?.value}
									onChange={e =>
										inputTextChangeHandler('amount', e.target.value)
									}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Narration
								</label>
								<textarea
									rows={5}
									value={inputs.narration?.value}
									onChange={e =>
										inputTextChangeHandler('narration', e.target.value)
									}
									style={{
										marginInline: 'auto',
										width: '100%',
										height: 'auto',
										border: '2px solid blue',
										borderRadius: '5px'
									}}></textarea>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Transfer Methode
								</label>
								<div class="form-group">
									<select
										class="form-control mb-2"
										id="methode"
										value={inputs.methode?.value}
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
						<Button variant="primary" onClick={submitHandler}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	)
}

export default ExpanseModel
