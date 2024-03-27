import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Users.module.css'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import { useDispatch, useSelector } from 'react-redux'
import CreateUser from '../../Components/CreateUser/CreateUser'
import image from './../../Images/man.png'
import UsersTable from '../../Components/UsersTable/UsersTable'
import Model from '../../Components/Model/Model'
import { getUserActivities, getUsers } from '../../Actions/userAction'
import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import { getRequests } from '../../Actions/AccountRequestActions'
import DataActivityTable from '../../Components/DataActivityTable/DataActivityTable'
import UserActivityTable from '../../Components/UserActivityTable/UserActivityTable'
import swal from 'sweetalert'
import { logoutUserAccount } from '../../Actions/AuthAction'

const Users = () => {
	const users = useSelector(state => state.user.users)
	const requests = useSelector(state => state.accountRequest.requests)
	const userActivities = useSelector(state => state.user.userActivities)

	const currentUser = useSelector(state => state.auth.user)

	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const [selectedUser, setSelectedUser] = useState()

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}
	const handleModel = () => {
		setShowModal(current => !current)
	}
	useEffect(() => {
		dispatch(getUsers())
	}, [])

	const getIdHandler = id => {
		setSelectedUser({ ...users.find(data => data.id === id) })
	}

	const handleConfirmation = id => {
		swal({
			title: 'Are you sure?',
			text: 'Are You Want to Logout This Account',
			icon: 'warning',
			buttons: ['No', 'Yes'],
			dangerMode: true
		}).then(confirm => {
			dispatch(logoutUserAccount(id))

			if (confirm) {
				swal('Success!', 'Account is Logout!', 'success')
			}
		})
	}

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5" style={{ position: 'relative' }}>
					<FontAwesomeIcon
						icon={faPen}
						className={styles.profileEditBtn}
						onClick={handlePasswordModel}
					/>
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 `} style={{ margin: 'auto' }}>
							<div className="row">
								<div className="col-12 col-md-5" style={{ margin: 'auto' }}>
									<img src={image} alt="" className="col-12 col-md-12" />
								</div>

								<div
									className="col-12 col-md-6"
									style={{ margin: 'auto', textAlign: 'left' }}>
									<p>{currentUser.name}</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<CreateUser header="Create a User" />
				</div>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Users</h2>
				<UsersTable
					initialData={users}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
				/>
			</div>
			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>Data Activities</h2>
				<DataActivityTable
					initialData={requests}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
				/>
			</div>

			<div className="row" style={{ marginTop: '3vh', color: 'white' }}>
				<h2>User Activities</h2>
				<UserActivityTable
					initialData={userActivities}
					handleModel={handleModel}
					getIdHandler={getIdHandler}
					handleConfirmation={handleConfirmation}
				/>
			</div>
			{showModal && (
				<Model
					showModal={showModal}
					closeHandler={handleModel}
					selectedUser={selectedUser}
				/>
			)}

			{showPasswordModel && (
				<ResetPasswordModel
					selectedUser={selectedUser}
					showModal={showPasswordModel}
					closeHandler={handlePasswordModel}
				/>
			)}
		</div>
	)
}

export default Users
