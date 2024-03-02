import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styles from './Model.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPager, faPen } from '@fortawesome/free-solid-svg-icons'
import man from './../../Images/man.png'
const Model = ({ type, clickedRow, showModal, closeHandler, selectedUser }) => {
	const [showEditModal, setShowEditModal] = useState(false)
	const [formSubmit, setFormSubmit] = useState(false)
	const [formValid, setFormValid] = useState(true)

	// initialInputsState
	const initialInputsState = {
		name: { value: selectedUser.name, isValid: true },
		email: { value: selectedUser.email, isValid: true },
		phone: { value: selectedUser.phone, isValid: true },
		expansePermission: { value: selectedUser.expansePermission, isValid: true },
		receiptPermission: { value: selectedUser.receiptPermission, isValid: true }
	}

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
				[inputType]: { value: enteredValue === 'true' ? true : enteredValue === 'false' ? false : enteredValue, isValid: true }
			}
		})
	}

	const submitHandler = () => {
		const data = {
			name: inputs.name.value,

			expansePermission: inputs.expansePermission.value,
			receiptPermission: inputs.receiptPermission.value
		}

		const nameValid = data.name?.trim().length > 0
		const expansePermissionIsValid = data.expansePermission !== null
		const receiptPermissionIsValid = data.receiptPermission !== null
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

		// dispatch(expanseActins.createExpanse(data))
		// setFormSubmit(true)
    setShowEditModal(false)
		console.log(data)

		setInputs(initialInputsState)
	}

	// edit handler
	const editUserHandler = id => {
		// closeHandler()
		setShowEditModal(current => !current)
	}
	return (
		<>
			{type === 'expanse' && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<FontAwesomeIcon className={styles.editBtn} icon={faPen} />
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>Mohammed</p>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			{type === 'users' && !showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>View Details</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faPen}
							onClick={() => editUserHandler(12)}
						/>
					</Modal.Header>
					<Modal.Body>
						<div
							className="row"
							style={{ marginTop: '1vh', marginBlock: '2vh' }}>
							<div className="col-12 col-md-6">
								<img
									src={man}
									alt=""
									className="col-12 col-md-6"
									style={{
										background: 'rgba(83, 60, 97, 0.516)',
										boxShadow: ' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
										backDropFilter: 'blur( 2.5px )',
										// -webkit-backdrop-filter:' blur( 2.5px )',
										borderRadius: '10px'
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Name
								</label>
								<p>{selectedUser.name}</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Expanse Permission
								</label>
								<p>{selectedUser.expansePermission ? 'Granted' : 'Denied'}</p>
							</div>
							<div className="col-12 col-md-6">
								<label style={{ fontWeight: 600, fontSize: '1.5em' }}>
									Receipt Permission
								</label>
								<p>{selectedUser.receiptPermission ? 'Granted' : 'Denied'}</p>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeHandler}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}

			{type === 'users' && showEditModal && (
				<Modal show={showModal} onHide={closeHandler} centered size="lg">
					<Modal.Header
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							backgroundColor: !formValid ? 'red' : '#7993d2'
						}}>
						<Modal.Title style={{ fontSize: '2em' }}>Edit User</Modal.Title>
						<FontAwesomeIcon
							className={styles.editBtn}
							icon={faClose}
							onClick={closeHandler}
						/>
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
					<Modal.Body style={{ marginTop: '0px', marginBlock: '0px' ,paddingBlock:'0px'}}>
						<div
							className="row"
							style={{ marginTop: '1vh', marginBlock: '2vh' }}>
							<div className="col-12 col-md-6">
								<img
									src={man}
									alt="Click to Change"
									className="col-12 col-md-6"
									style={{
										background: 'rgba(83, 60, 97, 0.516)',
										boxShadow: ' 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
										backDropFilter: 'blur( 2.5px )',
										WebkitBackdropFilter: 'blur( 2.5px )',
										borderRadius: '10px'
									}}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6 ">
									Name
								</label>
								<input
									placeholder="Example@gmail.com"
									value={inputs.name.value}
									onChange={e =>
										inputTextChangeHandler('name', e.target.value)
									}
									className="form-control col-12 col-md-6"
									style={{ border: '2px solid blue' }}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Expanse Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.expansePermission.value }
									onChange={ (e) =>
										inputTextChangeHandler('expansePermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option value={true} selected={inputs.expansePermission.value}>Yes</option>
                
									<option value={false} selected={inputs.expansePermission.value}>No</option>
								</select>
							</div>
							<div className="col-12 col-md-6" style={{ marginBlock: '1vh' }}>
								<label
									style={{ fontWeight: 600, fontSize: '1.3em' }}
									className="col-12 col-md-6">
									Receipt Permission
								</label>
								<select
									class="form-control"
									style={{ border: '2px solid blue' }}
									value={inputs.receiptPermission.value }
									onChange={e =>
										inputTextChangeHandler('receiptPermission', e.target.value)
									}
									id="inputGroupSelect01">
									<option value={true} selected={inputs.receiptPermission.value}>Yes</option>
									<option value={false} selected={inputs.receiptPermission.value}>No</option>
								</select>
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

export default Model
