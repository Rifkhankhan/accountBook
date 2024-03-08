import React, { useLayoutEffect, useState } from 'react'
import styles from './Loan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons'

import LoanForm from '../../Components/Loan/LoanForm'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'
import { getLoans } from '../../Actions/LoanActions'
import LoanModel from '../../Components/LoanModel/LoanModel'
const Loan = () => {
	const loans = useSelector(
		state => state.accountRequest.accountRequests
	)?.filter(expanse => expanse.requestType === 'loan')

	const [gotLoan, setGotLoan] = useState(0)
	const [paidLoan, setPaidLoan] = useState(0)
	const [todayGotLoan, setTodayGotLoan] = useState(0)
	const [todayPaidLoan, setTodayPaidLoan] = useState(0)

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

		// got loan amount and list

		const gotAmountList = expensesForDate.filter(
			expense => expense.requestForm === 'got'
		)
		const gottodayAdvanceAmount = gotAmountList.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTodayGotLoan(gottodayAdvanceAmount)

		// paid loan amount and list

		const padiAmountList = expensesForDate.filter(
			expense => expense.requestForm === 'paid'
		)
		const paidAdvanceAmount = padiAmountList.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTodayPaidLoan(paidAdvanceAmount)

		// Calculate total amount for the target date
		const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + expense.amount,
			0
		)

		return totalExpenseForDate
	}

	useLayoutEffect(() => {
		// calcaulate lon amount got

		const loanGotList = loans.filter(loan => loan.requestForm === 'got')
		const gotLoanAmount = loanGotList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setGotLoan(gotLoanAmount)

		// calcaulate lon amount paid

		const loanPaidList = loans.filter(loan => loan.requestForm === 'paid')
		const paidLoanAmount = loanPaidList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setPaidLoan(paidLoanAmount)

		getTotalExpenseForDate(loans, new Date())
	}, [loans])

	useLayoutEffect(() => {
		dispatch(getLoans())
	}, [dispatch])
	return (
		<div className={`container-fluid ${styles.home}`}>
			<div className="row">
				<div className="col-12 col-md-5">
					<section className={`row ${styles.homeComponent}`}>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Total Loans
								</h3>
							</div>
							<div className="row">
								<h5 className="col-md-6 ">Got</h5>
								<p className="col-md-6 ">{gotLoan}</p>
							</div>

							<div className="row">
								<h5 className="col-md-6">Paid</h5>
								<p className="col-md-6">{paidLoan}</p>
							</div>
						</div>
						<div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
							<div className="row" style={{ flex: 1, height: '50%' }}>
								<h3 className="col" style={{ margin: 'auto' }}>
									Today Loans
								</h3>
							</div>
							<div className="row">
								<h5 className="col-md-6 ">Got</h5>
								<p className="col-md-6 ">{todayGotLoan}</p>
							</div>

							<div className="row">
								<h5 className="col-md-6">Paid</h5>
								<p className="col-md-6">{todayPaidLoan}</p>
							</div>
						</div>
					</section>
				</div>
				<div className="col-12 col-md-7">
					<LoanForm />
				</div>
			</div>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Total Loans</h2>
				<div className={`col`}>
					<PaginationTable list={loans} handleModel={handleModel} />
				</div>
			</section>

			{showModal && (
				<LoanModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleModel}
					deleteHandler={deleteHandler}
				/>
			)}
		</div>
	)
}

export default Loan
