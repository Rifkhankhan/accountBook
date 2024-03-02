import React, { useState } from 'react'
import styles from './Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faArrowUp,
	faBuildingColumns,
	faMoneyBill,
	faSackDollar,
	faWallet
} from '@fortawesome/free-solid-svg-icons'
import PaginationTable from '../../Components/PaginationTable/PaginationTable'
import { useSelector } from 'react-redux'
import Model from '../../Components/Model/Model'
const Home = () => {
	const expanses = useSelector(state => state.expanse.expanses)

	const [showModal, setShowModal] = useState(false)
	const [clickedRow, setClickedRow] = useState({})

	const handleModel = id => {
		console.log(id)
		setClickedRow(id.amount)
		setShowModal(current => !current)
	}

	return (
		<div className={`container ${styles.home}`}>
			<section className={`row ${styles.homeComponent}`}>
				<div className={`col-12 col-md-3 mb-2, ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Balance
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
						150,000,000
					</h5>
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
						150,000,000
					</h5>
				</div>

				<div className={`col-12 col-md-3 ${styles.column}`}>
					<div className="row" style={{ flex: 1, height: '50%' }}>
						<h3 className="col" style={{ margin: 'auto' }}>
							Expanses
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
						150,000,000
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
			</section>

			<section style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Expenses</h2>
				<div className={`col`}>
					<PaginationTable expanse={expanses} handleModel={handleModel} />
				</div>
			</section>
			<section style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Today Incomes</h2>
				<div className={`col`}></div>
			</section>

			<section style={{ margin: 'auto' }}>
				<h2 style={{ textAlign: 'left', color: 'white' }}>Today Advance</h2>
				<div className={`col`}></div>
			</section>

			{showModal && (
				<Model
					type="expanse"
					clickedRow={clickedRow}
					showModal={showModal}
					closeHandler={handleModel}
				/>
			)}
		</div>
	)
}

export default Home
