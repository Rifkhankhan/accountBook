import React, { useLayoutEffect, useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faPen } from '@fortawesome/free-solid-svg-icons'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpanse, getExpanses } from '../../Actions/ExpanseActions'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ExpanseModel from '../../Components/ExpanseModel/ExpanseModel'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'

import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'

const Home = () => {
	const requestList = useSelector(state => state.accountRequest.accountRequests)

	const expanses = requestList?.filter(
		request => request.requestType === 'expense'
	)

	const receipts = requestList?.filter(
		request => request.requestType === 'receipt'
	)

	const loans = requestList?.filter(request => request.requestType === 'loan')
	const advances = requestList?.filter(
		request => request.requestType === 'advance'
	)

	const lastRequest = requestList[requestList?.length - 1]

	const currentUser = useSelector(state => state.auth.user)

	const [totalExpanses, setTotalExpanses] = useState(0)
	const [totalIncomes, setTotalIncomes] = useState(0)
	const [captitalAmount, setCapitalAmount] = useState(0)
	const [balance, setBalance] = useState(0)
	const [gotLoan, setGotLoan] = useState(0)
	const [paidLoan, setPaidLoan] = useState(0)
	const [gotAdvance, setGotAdvance] = useState(0)
	const [paidAdvance, setPaidAdvance] = useState(0)
	const [showPasswordModel, setPasswordModel] = useState(false)
	const dispatch = useDispatch()

	const [showModal, setShowModal] = useState(false)
	const [showReceiptModal, setShowReceiptModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})

	const today = new Date()
	const formattedDate = today.toLocaleDateString('en-GB') // Format: dd/mm/yyyy

	useLayoutEffect(() => {
		// calculate total expenses
		const totalExpanses = expanses.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTotalExpanses(totalExpanses)

		// calculate total incomes
		const incomeList = receipts.filter(
			receipt => receipt.requestForm === 'cash'
		)
		const incomes = incomeList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setTotalIncomes(incomes)

		// calcaulate capital amount

		const capitalList = receipts.filter(
			receipt => receipt.requestForm === 'capital'
		)
		const capitalAmount = capitalList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setCapitalAmount(capitalAmount)

		// calcaulate lon amount got

		const loanGotList = loans.filter(loan => loan.requestForm === 'got')
		const gotLoanAmount = loanGotList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setGotLoan(gotLoanAmount)

		// calcaulate lon amount paid

		const advancePaidList = loans.filter(loan => loan.requestForm === 'paid')
		const paidLoanAmount = advancePaidList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setPaidLoan(paidLoanAmount)

		// calcaulate advance amount got

		const advanceGotList = advances.filter(loan => loan.requestForm === 'got')
		const gotAdvanceAmount = advanceGotList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setGotAdvance(gotAdvanceAmount)

		// calcaulate advance amount paid

		const loanPaidList = advances.filter(loan => loan.requestForm === 'paid')
		const paidAdvanceAmount = loanPaidList.reduce(
			(total, current) => total + current.amount,
			0
		)

		setPaidAdvance(paidAdvanceAmount)
	}, [expanses, receipts, loans, advances])

	const handleExpenseModel = row => {
		setClickedRow(row)
		setShowModal(current => !current)
	}

	const handleModel = row => {
		setClickedRow(row)
		setShowModal(current => !current)
	}
	const handleReceiptModel = row => {
		setClickedRow(row)
		setShowReceiptModal(current => !current)
	}

	const deleteReceiptHandler = id => {
		setShowReceiptModal(current => !current)
		dispatch(deleteReceipt(id))
	}

	const deleteExpenseHandler = id => {
		setShowModal(current => !current)
		dispatch(deleteExpanse(id))
	}

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}

	return (
		<div className={`container ${styles.home}`}>
			<section className={`container ${styles.oppComponent}`}>
				<div className="col-12 col-md-4">
					<div className={`row ${styles.smallCard}`}>
						<p className="col-12 col-md-5">Date :</p>
						<p className="col-12 col-md-7 " style={{ textAlign: 'left' }}>
							{formattedDate}
						</p>
					</div>
					<div
						className={`row ${styles.smallCard}`}
						style={{ position: 'relative' }}>
						<p className="col-12 col-md-5">User:</p>
						<p className="col-12 col-md-7 " style={{ textAlign: 'left' }}>
							{currentUser.name}
						</p>
						<FontAwesomeIcon
							className={styles.profileEditBtn}
							icon={faPen}
							onClick={handlePasswordModel}
						/>
					</div>
					<div className={`row ${styles.smallCard}`}>
						<p className="col-12 col-md-5">Opening Balance</p>
						<p className="col-12 col-md-7">{lastRequest?.oppBalance}</p>
					</div>
				</div>
			</section>
			<section className={`row container-fluid ${styles.homeComponent}`}>
				<div className={`col-11 col-md-3 , ${styles.card}`}>
					<div className="row py-3 m-auto">
						<h3
							style={{
								fontWeight: 600,
								fontSize: '2em'
							}}>
							Balance
						</h3>
					</div>
					<div className="row" style={{ width: '100%', margin: 'auto' }}>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Capital
							</p>
							<p
								className="col-9 "
								style={{ textAlign: 'right', fontSize: '1.5em' }}>
								: {captitalAmount}
							</p>
						</div>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Income
							</p>
							<p
								className="col-9 "
								style={{ textAlign: 'right', fontSize: '1.5em' }}>
								: {totalIncomes}
							</p>
						</div>

						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Paid Advance
							</p>
							<p
								className="col-9 "
								style={{ textAlign: 'right', fontSize: '1.5em' }}>
								: {paidAdvance}
							</p>
						</div>

						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Got Advance
							</p>
							<p
								className="col-9 "
								style={{ textAlign: 'right', fontSize: '1.5em' }}>
								: {gotAdvance}
							</p>
						</div>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Loan
							</p>
							<p
								className="col-9 "
								style={{ textAlign: 'right', fontSize: '1.5em' }}>
								: {gotLoan - paidLoan}
							</p>
						</div>
					</div>
					<div
						className="row"
						style={{
							fontSize: '1.5em',
							fontWeight: 500
						}}>
						<span style={{ paddingBlock: '2vh' }}>{lastRequest?.balance}</span>
					</div>
				</div>

				<div className={`col-11 col-md-3 , ${styles.card}`}>
					<div className="row py-3 m-auto">
						<h3
							style={{
								fontWeight: 600,
								fontSize: '2em'
							}}>
							Advances
						</h3>
					</div>

					<div className="row  " style={{ width: '100%', margin: 'auto' }}>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Got
							</p>
							<p
								className="col "
								style={{ textAlign: 'left', fontSize: '1.5em' }}>
								: {gotLoan}
							</p>
						</div>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Paid
							</p>
							<p
								className="col text-left"
								style={{ textAlign: 'left', fontSize: '1.5em' }}>
								{' '}
								: {paidAdvance}
							</p>
						</div>
					</div>
				</div>
				<div className={`col-11 col-md-3 , ${styles.card}`}>
					<div className="row py-3 m-auto">
						<h3
							style={{
								fontWeight: 600,
								fontSize: '2em'
							}}>
							Loans
						</h3>
					</div>

					<div className="row  " style={{ width: '100%', margin: 'auto' }}>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Got
							</p>
							<p
								className="col "
								style={{ textAlign: 'left', fontSize: '1.5em' }}>
								: {gotLoan}
							</p>
						</div>
						<div className="row" style={{ width: '100%', margin: 'auto' }}>
							<p className="col-3" style={{ fontSize: '1.5em' }}>
								Paid
							</p>
							<p
								className="col text-left"
								style={{ textAlign: 'left', fontSize: '1.5em' }}>
								{' '}
								: {paidLoan}
							</p>
						</div>
					</div>
				</div>

				<div
					className={`col-11 col-md-3 , ${styles.card}`}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						paddingBlock: '3vh'
					}}>
					<div className="row">
						<h3
							style={{
								fontSize: '2em',
								fontWeight: 600
							}}>
							Expenses
						</h3>
					</div>

					<div className="row">
						<span
							style={{
								fontSize: '1.5em',
								fontWeight: 500
							}}>
							{totalExpanses}
						</span>
					</div>
				</div>
				<div
					className={`col-11 col-md-3 , ${styles.card}`}
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						paddingBlock: '3	vh'
					}}>
					<div className="row">
						<h3
							style={{
								fontSize: '2em',
								fontWeight: 600
							}}>
							Income
						</h3>
					</div>

					<div className="row">
						<span
							style={{
								fontSize: '1.5em',
								fontWeight: 500
							}}>
							{totalIncomes}
						</span>
					</div>
				</div>
			</section>

			<section className={`container-fluid `}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Account Works</h2>
				<div className={`col-12 `}>
					<PaginationTable
						list={requestList}
						handleModel={handleExpenseModel}
					/>
				</div>
			</section>

			<section
				className={`container-fluid py-5 ${styles.pieChartContainer}`}
				style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Pir Chart</h2>
				<div className={`col-12`}>
					<PieChart
						headDatas={[
							totalExpanses,
							totalIncomes,
							gotAdvance,
							paidAdvance,
							gotLoan,
							paidLoan
						]}
					/>
				</div>
			</section>

			<section
				className={`container-fluid py-5 ${styles.pieChartContainer}`}
				style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Line Chart</h2>
				<div className={`col-12`}>
					<LineChart
						expenses={expanses}
						receipts={receipts}
						requestList={requestList}
					/>
				</div>
			</section>
			{showModal && (
				<ExpanseModel
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleExpenseModel}
					deleteHandler={deleteExpenseHandler}
				/>
			)}

			{showReceiptModal && (
				<ReceiptModel
					clickedRow={clickedRow}
					showModal={showReceiptModal}
					closeHandler={handleReceiptModel}
					deleteHandler={deleteReceiptHandler}
				/>
			)}
			{showPasswordModel && (
				<ResetPasswordModel
					selectedUser={currentUser}
					showModal={showPasswordModel}
					closeHandler={handlePasswordModel}
				/>
			)}
		</div>
	)
}

export default Home
