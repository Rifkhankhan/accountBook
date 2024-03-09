import React, { useLayoutEffect, useState } from 'react'
import styles from './Receipt.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons'

import ReceiptForm from '../../Components/ReceiptForm/ReceiptForm'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'
import {
	deleteAccountRequest,
	getAccountRequests
} from '../../Actions/AccountRequestActions'
const Receipt = () => {
	const receipts = useSelector(state => state.accountRequest.accountRequests)
		?.filter(expanse => expanse.requestType === 'receipt')
		?.filter(request => request.status === true)

	const TableReceipt = useSelector(
		state => state.accountRequest.accountRequests
	)?.filter(request => request.status === true)

	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})
	const [totalCash, setTotalCash] = useState(0)
	const [totalTodayCash, setTotalTodayCash] = useState(0)
	const [totalCapital, setTotalCapital] = useState(0)
	const [totalTodayCapital, setTotalTodayCapital] = useState(0)

	const dispatch = useDispatch()
	const [totalReceipts, setTotalReceipts] = useState(0)
	const [todayTotalReceipts, setTodayTotalReceipts] = useState(0)
	const handleModel = id => {
		setClickedRow(id)

		setShowModal(current => !current)
	}

	const deleteHandler = id => {
		handleModel()
		dispatch(deleteAccountRequest(id))

		// dispatch(deleteReceipt(id))
	}

	// Function to calculate total expense for a specific date
	const getTotalExpenseForDate = (expenses, targetDate, type) => {
		// Filter expenses for the target date

		const expensesForDate = expenses
			.filter(
				expense =>
					new Date(expense.date).toISOString().split('T')[0] ===
					new Date(targetDate).toISOString().split('T')[0]
			)
			.filter(expense => expense.requestForm === type)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + expense.amount,
			0
		)

		return totalExpenseForDate
	}
	const getTotalIncomeAmount = incomes => {
		// calculate total expenses

		const totalIncomes = incomes.reduce((total, current) => {
			if (current.requestForm === 'cash') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalCapital = incomes.reduce((total, current) => {
			if (current.requestForm === 'capital') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setTotalCash(totalIncomes)

		setTotalCapital(totalCapital)

		setTotalTodayCapital(
			getTotalExpenseForDate(receipts, new Date(), 'capital')
		)
		setTotalTodayCash(getTotalExpenseForDate(receipts, new Date(), 'cash'))
	}
	useLayoutEffect(() => {
		getTotalIncomeAmount(receipts)
	}, [receipts])

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5">
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div
								className="row"
								style={{
									height: '25%',
									paddingInline: '5vh'
								}}>
								<h3
									className="col"
									style={{
										margin: 'auto',
										fontSize: '3.5vh',
										borderBottom: '1px solid white',
										paddingBlock: '1vh',
										marginBlock: '1vh'
									}}>
									Total
								</h3>
							</div>
							<div
								style={{
									height: '75%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'flex-start',
									flexDirection: 'column',
									margin: 'auto'
								}}>
								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6 " style={{ textAlign: 'center' }}>
										Cash
									</h5>
									<p className="col-md-6 " style={{ textAlign: 'center' }}>
										{totalCash}
									</p>
								</div>

								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6" style={{ textAlign: 'center' }}>
										Capital
									</h5>
									<p className="col-md-6" style={{ textAlign: 'center' }}>
										{totalCapital}
									</p>
								</div>
							</div>
						</div>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div
								className="row"
								style={{
									height: '25%',
									paddingInline: '5vh'
								}}>
								<h3
									className="col"
									style={{
										margin: 'auto',
										fontSize: '3.5vh',
										borderBottom: '1px solid white',
										paddingBlock: '1vh',
										marginBlock: '1vh'
									}}>
									Today
								</h3>
							</div>
							<div
								style={{
									height: '75%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'flex-start',
									flexDirection: 'column',
									margin: 'auto'
								}}>
								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6 " style={{ textAlign: 'center' }}>
										Cash
									</h5>
									<p className="col-md-6 " style={{ textAlign: 'center' }}>
										{totalTodayCapital}
									</p>
								</div>

								<div className="row" style={{ marginInline: 'auto' }}>
									<h5 className="col-md-6" style={{ textAlign: 'center' }}>
										Capital
									</h5>
									<p className="col-md-6" style={{ textAlign: 'center' }}>
										{totalTodayCash}
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<ReceiptForm header="cr" />
				</div>
			</div>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Receipt Table</h2>
				<div className={`col`}>
					<PaginationTable
						list={TableReceipt}
						handleModel={handleModel}
						tableType="receipt"
					/>
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
