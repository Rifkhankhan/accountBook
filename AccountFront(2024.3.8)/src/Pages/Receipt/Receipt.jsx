import React, { useLayoutEffect, useState } from 'react'
import styles from './Receipt.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons'

import ReceiptForm from '../../Components/ReceiptForm/ReceiptForm'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'
import { getAccountRequests } from '../../Actions/AccountRequestActions'
const Receipt = () => {
	const receipts = useSelector(
		state => state.accountRequest.accountRequests
	)?.filter(expanse => expanse.requestType === 'receipt')
	console.log(receipts)
	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})
	const dispatch = useDispatch()
	const [totalReceipts, setTotalReceipts] = useState(0)
	const [todayTotalReceipts, setTodayTotalReceipts] = useState(0)
	const handleModel = id => {
		setClickedRow(id)

		setShowModal(current => !current)
	}

	const deleteHandler = id => {
		handleModel()

		// dispatch(deleteReceipt(id))
	}

	// Function to calculate total expense for a specific date
	const getTotalExpenseForDate = (expenses, targetDate) => {
		// Filter expenses for the target date

		const expensesForDate = expenses.filter(
			expense =>
				new Date(expense.date).toISOString().split('T')[0] ===
				new Date(targetDate).toISOString().split('T')[0]
		)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + expense.amount,
			0
		)

		return totalExpenseForDate
	}

	useLayoutEffect(() => {
		const total = receipts.reduce((total, current) => total + current.amount, 0)
		setTotalReceipts(total)
		setTodayTotalReceipts(getTotalExpenseForDate(receipts, new Date()))
	}, [receipts])

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5">
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Total Income
								</h3>
								<FontAwesomeIcon
									style={{ margin: 'auto', fontSize: '5em' }}
									className="col"
									icon={faMoneyBill}
								/>
							</div>

							<h5
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									height: '50%',
									fontSize: '2em'
								}}
								className="col">
								{totalReceipts}
							</h5>
						</div>
						<div className={`col-12 col-md-5 ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Today Income
								</h3>
								<FontAwesomeIcon
									style={{ margin: 'auto', fontSize: '5em' }}
									className="col"
									icon={faSackDollar}
								/>
							</div>

							<h5
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									height: '50%',
									fontSize: '2em'
								}}
								className="col">
								{todayTotalReceipts}
							</h5>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<ReceiptForm header="cr" />
				</div>
			</div>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Expenses</h2>
				<div className={`col`}>
					<PaginationTable list={receipts} handleModel={handleModel} />
				</div>
			</section>

			{showModal && (
				<ReceiptModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleModel}
					deleteHandler={deleteHandler}
				/>
			)}
		</div>
	)
}

export default Receipt
