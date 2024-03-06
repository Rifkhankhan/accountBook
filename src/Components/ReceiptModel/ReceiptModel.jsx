import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ReceiptModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPager, faPen, } from '@fortawesome/free-solid-svg-icons'
import { updateReceipt } from '../../Actions/ReceiptActions'
import { useDispatch } from 'react-redux'
const ReceiptModel = ({ type, clickedRow, showModal, closeHandler, deleteHandler }) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()
	// initialInputsState
	const initialInputsState = {
		date: { value: (new Date(clickedRow?.date).toISOString()?.split('T')[0]), isValid: true },
		amount: { value: clickedRow?.amount, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },
		category: { value:clickedRow?.category, isValid: true },
	
	}

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.date.isValid &&
				inputs.amount.isValid &&
				inputs.category.isValid &&
				inputs.narration.isValid
		)

		return () => {}
	}, [inputs])

	const inputTextChangeHandler = (inputType, enteredValue) => {
    
    
		setInputs(currentInputValue => {
      return {
        ...currentInputValue,
				[inputType]: {  value:enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = () => {
		const data = {
			date: inputs.date.value,

			narration: inputs.narration.value,
			amount: inputs.amount.value,
			category: inputs.category.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const categoryValid = data.category?.trim().length > 0
		const dateValid = data.date !== null && !isNaN(Date.parse(data.date));
		const amountValid = data.amount > 0
		if (!narrationValid || !dateValid || !amountValid || !categoryValid) {
			setInputs(currentInputs => {
				return {
					date: { value: currentInputs.date.value, isValid: dateValid },
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					amount: {
						value: currentInputs.amount.value,
						isValid: amountValid
					},
					category: {
						value: currentInputs.category.value,
						isValid: categoryValid
					}
				}
			})
			return
		}

		console.log(data);
		dispatch(updateReceipt(clickedRow._id,data))
		setFormSubmit(true)
    	setShowEditModal(false)

		setInputs(initialInputsState)
    	closeHandler()

	}


	return (
		<>
			
				{!showEditModal && <Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<FontAwesomeIcon className={styles.editBtn} icon={faPen} onClick={() =>setShowEditModal(current => !current)}/>
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
									Category
								</label>
								<p>{inputs.category.value}</p>
							</div>
						</div>
						<div className='row'>
						<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Narration
								</label>
								<textarea rows={5} disabled style={{marginInline:'auto',width:'98%',border:'2px solid blue',borderRadius:'5px'}}>
									{inputs.narration.value}
								</textarea>
						</div>
					
					</Modal.Body>
					<Modal.Footer>
					<Button variant="danger"  onClick={() => deleteHandler(clickedRow._id)}>
							Delete
						</Button>
						<Button variant="secondary" onClick={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>}
			

				{showEditModal && <Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>Edit Details</Modal.Title>
						<FontAwesomeIcon className={styles.editBtn} icon={faClose} onClick={() =>setShowEditModal(current => !current)}/>
					</Modal.Header>
					{!formValid && (
					<div className="row " style={{paddingBlock:'0px',marginBlock:'0px'}}>
						<p
						className="text-danger text-capitalize  "
						style={{ fontSize: '3vh',textAlign:'center' ,paddingBlock:'0px',marginBlock:'0px'}}>
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
								<input type='date' className='form-control' value={inputs.date.value} onChange={(e) => inputTextChangeHandler('date',e.target.value)}  />

							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Amount
								</label>
								<input type='number' className='form-control' value={inputs.amount.value} onChange={(e) => inputTextChangeHandler('amount',e.target.value)}  />

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
										name="category"
										onChange={e => inputTextChangeHandler('category', 'cash')}
										value={inputs.category?.value}
										checked={inputs.category?.value === 'cash'}
										className="col col-2 "
									/>
									<label
										for="eCash"
										class="col col-4"
										style={{ color: 'black', fontSize: '2vh' ,textAlign:'left'}}>
										Cash
									</label>
								</div>

								<div class="row mb-1">
									<input
										type="radio"
										id="eCapital"
										name="category"
										onChange={e =>
											inputTextChangeHandler('category', 'capital')
										}
										checked={inputs.category?.value === 'capital'}

										value={inputs.category?.value}
										class="col col-2"
									/>
									<label
										for="eCapital"
										class="col col-4"

										style={{ color: 'black', fontSize: '2vh' ,}}>

										Capital
									</label>
								</div>

								<div class="row mb-1">
									<input
										type="radio"
										id="eLoan"
										name="category"
										onChange={e => inputTextChangeHandler('category', 'loan')}
										value={inputs.category?.value}
										checked={inputs.category?.value === 'loan'}


										class="col col-2"
									/>
									<label
										for="eLoan"
										class="col col-4"

										style={{ color: 'black', fontSize: '2vh' ,}}>

										Loan
									</label>
								</div>

								<div class="row mb-1">
									<input
										type="radio"
										id="eAdvance"
										name="category"
										onChange={e =>
											inputTextChangeHandler('category', 'advance')
										}
										value={inputs.category?.value}
										class="col col-2"
										checked={inputs.category?.value === 'advance'}

									/>
									<label
										for="eAdvance"
										class="col col-4"

										style={{ color: 'black', fontSize: '2vh' ,}}>

										Advance
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
				</Modal>}

		</>
	)
}

export default ReceiptModel
