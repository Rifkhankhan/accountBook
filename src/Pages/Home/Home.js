import React, { useLayoutEffect, useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faBuildingColumns,
	faHandHoldingDollar,
	faMoneyBill,
	faSackDollar,
	faWallet
} from '@fortawesome/free-solid-svg-icons'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExpanse, getExpanses } from '../../Actions/ExpanseActions'
import { deleteReceipt, getReceipts } from '../../Actions/ReceiptActions'
import ExpanseModel from '../../Components/ExpanseModel/ExpanseModel'
import ReceiptModel from '../../Components/ReceiptModel/ReceiptModel'
import WeeklyGraph from '../../Components/WeeklyGraph/WeeklyGraph'
const Home = () => {
	const expanses = useSelector(state => state.expanse.expanses)
	const receipts = useSelector(state => state.receipt.receipts)
	const [totalExpanses, setTotalExpanses] = useState(0)
	const [totalIncomes, setTotalIncomes] = useState(0)
	const [totalAdvance, setTotalAdvance] = useState(0)
	const [balance, setBalance] = useState(0)
	const dispatch = useDispatch()

	const [showModal, setShowModal] = useState(false)
	const [showReceiptModal, setShowReceiptModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})

	useLayoutEffect(() => {
		const totalExpanses = expanses.reduce(
			(total, current) => total + current.amount,
			0
		)
		const totalReceipts = receipts.reduce(
			(total, current) => total + current.amount,
			0
		)
		setTotalExpanses(totalExpanses)
		setTotalIncomes(totalReceipts)

		// Balance
		setBalance(totalIncomes - totalExpanses)
	}, [expanses, receipts])

	useLayoutEffect(() => {
		//   dispatch(getExpanses());
		//   dispatch(getReceipts());
	}, [dispatch])

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
	return (
		<div className={`container ${styles.home}`}>
			<section className={`row ${styles.homeComponent}`}>
				<div className={`col-12 col-md-3 mb-2, ${styles.column}`}>
					<div className="row" style={{ border: '1px solid white' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Balance
						</h3>
					</div>

					<p
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							fontSize: '1em',
							border: '1px solid white'
						}}
						className="col">
						{balance}
					</p>
				</div>
				<div className={`col-12 col-md-3 ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Incomes
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
						{totalIncomes}
					</h5>
				</div>

				<div className={`col-12 col-md-3 ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Expenses
						</h3>
						<FontAwesomeIcon
							style={{ margin: 'auto', fontSize: '5em' }}
							className="col"
							icon={faBuildingColumns}
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
						{totalExpanses}
					</h5>
				</div>

				<div className={`col-12 col-md-3 ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Loan Amount
						</h3>
						<FontAwesomeIcon
							style={{ margin: 'auto', fontSize: '5em' }}
							className="col"
							icon={faWallet}
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
						className="col-12">
						150,000,000
					</h5>
				</div>

				<div className={`col-12 col-md-3 ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Advance
						</h3>
						<FontAwesomeIcon
							style={{ margin: 'auto', fontSize: '5em' }}
							className="col"
							icon={faHandHoldingDollar}
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
						className="col-12">
						{totalAdvance}
					</h5>
				</div>
			</section>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Expenses</h2>
				<div className={`col-12`}>
					<PaginationTable list={expanses} handleModel={handleExpenseModel} />
				</div>
			</section>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Incomes</h2>
				<div className={`col-12`}>
					<PaginationTable list={receipts} handleModel={handleReceiptModel} />
				</div>
			</section>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Total Advance</h2>
				<div className={`col-12`}>
					<PaginationTable list={expanses} handleModel={handleModel} />
				</div>
			</section>

			<section className="container-fluid" style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Total Loans</h2>
				<div className={`col-12`}>
					<PaginationTable list={expanses} handleModel={handleModel} />
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
		</div>
	)
}

export default Home
