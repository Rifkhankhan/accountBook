import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBank,
	faClose,
	faDollar,
	faHandHoldingDollar,
	faMoneyBill,
	faMoneyBillTransfer,
	faMoneyBillTrendUp,
	faMoneyCheck,
	faPen
} from '@fortawesome/free-solid-svg-icons'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpanse, getExpanses } from '../../Actions/ExpanseActions'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ExpanseModel from '../../Components/ExpanseModel/ExpanseModel'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'

import ResetPasswordModel from '../../Components/ResetPasswordModel/ResetPasswordModel'
import PieChart from '../../Components/PieChart/PieChart'
import LineChart from '../../Components/LineChart/LineChart'
import TransactionTable from '../../Components/TransectionTable/TransectionTable'
import { deleteAccountRequest } from '../../Actions/AccountRequestActions'

const Home = () => {
	const requestList = useSelector(
		state => state.accountRequest.accountRequests
	).filter(request => request.status === true)

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
	const [openingBalance, setOpeningBalance] = useState(0)
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
		getOpeningBalance(requestList)
		getTotalExpenseAmount(requestList)
		getTotalIncomeAmount(requestList)
		getTotalAdvanceAmount(requestList)
		getTotalLoanAmount(requestList)
	}, [requestList])

	const getOpeningBalance = list => {
		const today = new Date()
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)

		const formattedYesterday = yesterday.toISOString().split('T')[0]

		const lastDayList = list.filter(
			li => li.date.split('T')[0] === formattedYesterday
		)

		const gotAdvanceAmount = lastDayList.reduce((total, current) => {
			if (current.requestForm === 'got' || current.requestType === 'receipt') {
				return total + current.amount
			} else {
				return total - current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setOpeningBalance(gotAdvanceAmount)
	}

	const getTotalExpenseAmount = expanses => {
		// calculate total expenses
		const totalExpanses = expanses.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTotalExpanses(totalExpanses)
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

		setTotalIncomes(totalIncomes)
		setCapitalAmount(totalCapital)
	}

	const getTotalAdvanceAmount = advances => {
		// calculate total expenses

		const totalPaidAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'advance') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotAdvance = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'advance') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidAdvance(totalPaidAdvance)
		setGotAdvance(totalGotAdvance)
	}

	const getTotalLoanAmount = advances => {
		// calculate total expenses

		const totalPaidLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'paid' && current.requestType === 'loan') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		const totalGotLoan = advances.reduce((total, current) => {
			if (current.requestForm === 'got' && current.requestType === 'loan') {
				return total + current.amount
			}
			return total // Make sure to return total even if the condition isn't met
		}, 0)

		setPaidLoan(totalPaidLoan)
		setGotLoan(totalGotLoan)
	}
	const handleExpenseModel = row => {
		setClickedRow(row)
		setShowModal(current => !current)
	}

	const deleteExpenseHandler = id => {
		setShowModal(current => !current)
		dispatch(deleteAccountRequest(id))
	}

	const handlePasswordModel = () => {
		setPasswordModel(current => !current)
	}

	const [chartHeight, setChartHeight] = useState(300) // Initial height, adjust as needed
	// Function to set the height of the charts
	const setChartHeights = () => {
		const windowHeight = window.innerHeight
		const newHeight = windowHeight * 0.4 // Adjust the multiplier as needed
		setChartHeight(newHeight)
	}

	// Update chart heights when component mounts or window resizes
	useEffect(() => {
		setChartHeights()
		window.addEventListener('resize', setChartHeights)
		return () => {
			window.removeEventListener('resize', setChartHeights)
		}
	}, [])

	return (
		<div className={`container ${styles.home}`}>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6 col-12" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>Pie Chart</h2>
						<div
							className={`col-12`}
							style={{
								minHeight: '50vh',
								height: chartHeight,
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								backgroundColor: ' rgba(86, 54, 186, 0.15)',
								borderRadius: '12px',
								border: '1px solid rgba(209, 213, 219, 0.3)'
							}}>
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
					</div>

					<div className="col-md-6 col-12" style={{ margin: 'auto' }}>
						<h2 style={{ textAlign: 'left', color: 'white' }}>Line Chart</h2>
						<div
							className={`col-12`}
							style={{
								minHeight: '50vh',
								height: chartHeight,
								backdropFilter: 'blur(16px) saturate(180%)',
								WebkitBackdropFilter: 'blur(16px) saturate(180%)',
								backgroundColor: ' rgba(86, 54, 186, 0.15)',
								borderRadius: '12px',
								border: '1px solid rgba(209, 213, 219, 0.3)'
							}}>
							<LineChart
								expenses={expanses}
								receipts={receipts}
								requestList={requestList}
							/>
						</div>
					</div>
				</div>
			</div>

			<section className={`container px-4 text-light`}>
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
						<p className="col-12 col-md-7">{openingBalance}</p>
					</div>
				</div>
			</section>

			{/* <section>
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
								Received Advance
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
			</section> */}
			<div className="container-fluid" style={{ marginInline: 'auto' }}>
				<div
					className="row"
					style={{
						width: '100%',
						marginInline: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minWidth: '35vh'
					}}>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							height: '20vh',
							background: 'white',
							minWidth: '35vh',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faHandHoldingDollar}
								fontSize="10vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Income
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{totalIncomes}
								</p>
							</div>
						</div>

						<div className="row">
							<div>
								<p
									style={{
										textAlign: 'center',
										borderTop: '1px solid black',
										width: '80%',
										margin: 'auto',
										fontSize: '3vh'
									}}>
									{totalIncomes}cr
								</p>
							</div>
						</div>
					</div>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							height: '20vh',
							background: 'white',
							minWidth: '35vh',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faMoneyBill}
								fontSize="10vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Expenses
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{totalExpanses}
								</p>
							</div>
						</div>

						<div className="row">
							<div>
								<p
									style={{
										textAlign: 'center',
										borderTop: '1px solid black',
										width: '80%',
										margin: 'auto',
										fontSize: '3vh'
									}}>
									{totalExpanses}dr
								</p>
							</div>
						</div>
					</div>
					<div
						className=" col-md-auto col-12 m-1"
						style={{
							height: '20vh',
							background: 'white',
							minWidth: '35vh',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faMoneyCheck}
								fontSize="10vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Advance
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{paidAdvance - gotAdvance}
								</p>
							</div>
						</div>

						<div className="row">
							<div>
								<p
									style={{
										textAlign: 'center',
										borderTop: '1px solid black',
										width: '80%',
										margin: 'auto',
										fontSize: '3vh'
									}}>
									{paidAdvance}dr -{gotAdvance}cr
								</p>
							</div>
						</div>
					</div>

					<div
						className=" col-md-auto col-12 m-1"
						style={{
							height: '20vh',
							background: 'white',
							minWidth: '35vh',
							backdropFilter: 'blur(20px) saturate(113%)',
							WebkitBackdropFilter: 'blur(20px) saturate(113%)',
							backgroundColor: 'rgba(255, 255, 255, 200)',

							borderRadius: '12px',
							border: '1px solid rgba(209, 213, 219, 0.3)'
						}}>
						<div
							className="row"
							style={{ height: '75%', position: 'relative' }}>
							<FontAwesomeIcon
								icon={faBank}
								fontSize="10vh"
								color="darkblue"
								style={{
									margin: 'auto'
								}}
								className="col"
							/>
							<div className="col" style={{ margin: 'auto' }}>
								<p
									style={{
										fontSize: '3vh',

										textAlign: 'right',
										height: '30%',
										paddingInline: '2vh',
										margin: '0%'
									}}>
									Loans
								</p>
								<p
									style={{
										fontSize: '4.5vh',
										fontWeight: '700',
										textAlign: 'right',
										paddingInline: '2vh',

										margin: '0%'
									}}>
									{gotLoan - paidLoan}
								</p>
							</div>
						</div>

						<div className="row">
							<div>
								<p
									style={{
										textAlign: 'center',
										borderTop: '1px solid black',
										width: '80%',
										margin: 'auto',
										fontSize: '3vh'
									}}>
									{gotLoan}cr -{paidLoan}dr
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<section className={`container-fluid `}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Account Works</h2>
				<div className={`col-12 `}>
					<PaginationTable
						list={requestList}
						handleModel={handleExpenseModel}
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
