import React, { useState } from 'react'
import styles from './UserActivityTable.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const UserActivityTable = ({ initialData, handleModel, getIdHandler }) => {
	const [filter, setFilter] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const pageSize = 10 // Number of items per page
	const maxVisiblePages = 5 // Maximum number of visible pagination buttons

	const handleFilterChange = event => {
		setCurrentPage(1) // Reset to first page when filter changes
		setFilter(event.target.value)
	}

	// Filtered and paginated data
	const filteredData = initialData.filter(
		item =>
			String(item.rid).toLowerCase().includes(filter.toLowerCase()) ||
			String(item.id).toLowerCase().includes(filter.toLowerCase()) ||
			String(item.arid).toLowerCase().includes(filter.toLowerCase())
	)
	const totalPages = Math.ceil(filteredData.length / pageSize)

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
	}

	// Calculate the range of visible page numbers
	const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

	const visiblePages = []
	for (let i = startPage; i <= endPage; i++) {
		visiblePages.push(i)
	}

	const visibleData = filteredData.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	)

	return (
		<div className={`container ${styles.tableContainer}`}>
			<input
				type="text"
				value={filter}
				onChange={handleFilterChange}
				className={`form-control mb-3 col-12 col-md-6 ${styles.inputTag}`}
				placeholder="Search for what you want..."
			/>
			<table className="table table-hover thead-dark w-100 f-1">
				<thead className="thead-dark">
					<tr>
						<th>#</th>
						<th>User</th>
						<th>Status</th>
						<th>Login Time</th>
						<th>Logout Time</th>
						<th>Online</th>
					</tr>
				</thead>
				<tbody>
					{visibleData.map((item, index) => (
						<tr key={index}>
							<td>{item?.aid}</td>
							<td>{item?.name}</td>
							<td>{+item?.status === 0 ? 'Blocked' : 'Active'}</td>
							<td>{item?.logintime}</td>
							<td>{item?.logouttime}</td>
							<td
								style={{
									backgroundColor: item?.isLoggedIn === 1 ? 'red' : 'black',
									color: 'white',
									fontWeight: 'bold'
								}}>
								{item?.isLoggedIn === 1 ? 'Online' : 'Offline'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="d-flex justify-content-center align-items-center">
				<button
					className="btn btn-icon btn-primary mx-1"
					onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
					disabled={currentPage === 1}>
					<BsChevronLeft />
				</button>
				{visiblePages.map(pageNumber => (
					<button
						key={pageNumber}
						className={`btn btn-icon btn-danger mx-1 ${
							currentPage === pageNumber ? 'active' : ''
						}`}
						onClick={() => handlePageChange(pageNumber)}>
						{pageNumber}
					</button>
				))}
				<button
					className="btn btn-icon btn-primary"
					onClick={() =>
						setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
					}
					disabled={currentPage === totalPages}>
					<BsChevronRight />
				</button>
			</div>
			<div className="text-center">
				Page {currentPage} of {totalPages}
			</div>
		</div>
	)
}

export default UserActivityTable
