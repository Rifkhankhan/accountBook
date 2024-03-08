import React, { useLayoutEffect, useState } from 'react'
import styles from './Advance.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons'

import ReceiptForm from '../../Components/ReceiptForm/ReceiptForm'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import { deleteAdvance, getAdvances } from '../../Actions/AdvanceActions'
import AdvanceModel from '../../Components/AdvanceModel/AdvanceModel'
import AdvanceForm from '../../Components/Advance/AdvanceForm'
const Advance = () => {
	const advances = useSelector(
		state => state.accountRequest.accountRequests
	)?.filter(expanse => expanse.requestType === 'advance')

	const [gotAdvance, setGotAdvance] = useState(0)
	const [todayGotAdvance, setTodayGotAdvance] = useState(0)
	const [paidAdvance, setPaidAdvance] = useState(0)
	const [todayPaidAdvance, setTodayPaidAdvance] = useState(0)
	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})
	const dispatch = useDispatch()

	const handleModel = id => {
		setClickedRow(id)

		setShowModal(current => !current)
	}

	const deleteHandler = id => {
		handleModel()

		dispatch(deleteReceipt(id))
	}

	// Function to calculate total expense for a specific date
	const getTotalExpenseForDate = (expenses, targetDate) => {
		// Filter expenses for the target date

		const expensesForDate = expenses.filter(
			expense =>
				new Date(expense.date).toISOString().split('T')[0] ===
				new Date(targetDate).toISOString().split('T')[0]
		)

		// got advances amount and list

		const gotAmountList = expensesForDate.filter(
			expense => expense.requestForm === 'got'
		)
		const gottodayAdvanceAmount = gotAmountList.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTodayGotAdvance(gottodayAdvanceAmount)

		// paid advances amount and list

		const padiAmountList = expensesForDate.filter(
			expense => expense.requestForm === 'paid'
		)
		const paidAdvanceAmount = padiAmountList.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTodayPaidAdvance(paidAdvanceAmount)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + expense.amount,
			0
		)

		return totalExpenseForDate
	}

	useLayoutEffect(() => {
		// calcaulate lon amount got

		const loanGotList = advances.filter(loan => loan.requestForm === 'got')
		const gotLoanAmount = loanGotList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setGotAdvance(gotLoanAmount)

		// calcaulate lon amount paid

		const loanPaidList = advances.filter(loan => loan.requestForm === 'paid')
		const paidLoanAmount = loanPaidList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setPaidAdvance(paidLoanAmount)

		getTotalExpenseForDate(advances, new Date())
	}, [advances])

	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5">
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Total
								</h3>
							</div>
							<div className="row">
								<h5 className="col-md-6 ">Got</h5>
								<p className="col-md-6 ">{gotAdvance}</p>
							</div>

							<div className="row">
								<h5 className="col-md-6">Paid</h5>
								<p className="col-md-6">{paidAdvance}</p>
							</div>
						</div>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Today
								</h3>
							</div>
							<div className="row">
								<h5 className="col-md-6 ">Got</h5>
								<p className="col-md-6 ">{todayGotAdvance}</p>
							</div>

							<div className="row">
								<h5 className="col-md-6">Paid</h5>
								<p className="col-md-6">{todayPaidAdvance}</p>
							</div>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<AdvanceForm header="cr" />
				</div>
			</div>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>
					Advances paid & received
				</h2>
				<div className={`col`}>
					<PaginationTable list={advances} handleModel={handleModel} />
				</div>
			</section>

			{showModal && (
				<AdvanceModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleModel}
					deleteHandler={deleteHandler}
				/>
			)}
		</div>
	)
}

export default Advance
