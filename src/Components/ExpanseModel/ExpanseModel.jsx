import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './ExpanseModel.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPen, } from '@fortawesome/free-solid-svg-icons'
import { updateExpanse } from '../../Actions/ExpanseActions'
import { useDispatch } from 'react-redux'
const ExpanseModel = ({ type, clickedRow, showModal, closeHandler, deleteHandler }) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)
	const dispatch = useDispatch()
	// initialInputsState
	const initialInputsState = {
		date: { value: (new Date(clickedRow?.date).toISOString().split('T')[0]), isValid: true },
		amount: { value: clickedRow?.amount, isValid: true },
		narration: { value: clickedRow?.narration, isValid: true },
	
	}

	const [inputs, setInputs] = useState(initialInputsState)

	useEffect(() => {
		setFormValid(
			inputs.date.isValid &&
				inputs.amount.isValid &&
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
			amount: +inputs.amount.value
		}

		const narrationValid = data.narration?.trim().length > 0
		const dateValid = data.date !== null && !isNaN(Date.parse(data.date));
		const amountValid = +data.amount > 0

		if (!narrationValid || !dateValid || !amountValid) {
			setInputs(currentInputs => {
				return {
					date: { value: currentInputs.date.value, isValid: dateValid },
					narration: {
						value: currentInputs.narration.value,
						isValid: narrationValid
					},
					amount: {
						value: +currentInputs.amount.value,
						isValid: amountValid
					}
				}
			})
			return
		}
		dispatch(updateExpanse(clickedRow._id,data))
		setFormSubmit(true)
		setInputs(initialInputsState)
    	closeHandler()
	}

	return (
		<>
			
			{!showEditModal &&	<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<FontAwesomeIcon className={styles.editBtn} icon={faPen} onClick={() =>setShowEditModal(current => !current)}/>
					</Modal.Header>
					<Modal.Body style={{ marginTop: '0px', marginBlock: '0px' ,paddingBlock:'0px'}}>
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
				
				{showEditModal &&	<Modal show={showModal} onHide={closeHandler} centered size="lg">
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
						<div className='row'>
						<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Narration
								</label>
								<textarea type="text" className='form-control' value={inputs.narration.value} onChange={(e) => inputTextChangeHandler('narration',e.target.value)} rows={5}  style={{marginInline:'auto',width:'98%',border:'2px solid blue',borderRadius:'5px'}}>
								</textarea>
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

export default ExpanseModel
