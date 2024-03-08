// import React from 'react';
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Table columns
//   const columns = [
// 		{ dataField: 'id', text: '#' },
// 		{ dataField: 'column1', text: 'Column 1' },
// 		{ dataField: 'column2', text: 'Column 2' },
// 		{ dataField: 'column3', text: 'Column 3' }
//   ];

// 	// Pagination options
//   const paginationOptions = {
//     sizePerPageList: [
// 			{ text: '5', value: 5 },
// 			{ text: '10', value: 10 },
// 			{ text: 'All', value: data.length }
//     ],
//     showTotal: true,
//     paginationSize: 3
//   };

//   return (
//     <div className='container'>
//       <BootstrapTable
//         keyField='id'
//         data={data}
//         columns={columns}
//         pagination={paginationFactory(paginationOptions)}
// 			/>
//     </div>
//   );
// }

// export default PaginationTable;

// table 2

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5; // Number of items per page

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <h2>Bootstrap Pagination Table</h2>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table 3

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(1);

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Change items per page
//   const handleItemsPerPageChange = e => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const pageNumbers = [];
//     for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <h2>Bootstrap Pagination Table</h2>
//       <div className='row mb-3'>
//         <div className='col-auto'>
//           <label className='mr-2'>Rows per page:</label>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className='form-control form-control-sm'
// 					>
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table 4

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PaginationTable () {
// 	// Sample data, replace it with your actual data
//   const data = [
//     {
//       id: 1,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 2,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 3,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 4,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 5,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 6,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 7,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 8,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 9,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 10,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 11,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 12,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 13,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 14,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 15,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 16,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 17,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 18,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     },
//     {
//       id: 19,
//       column1: 'Data 1',
//       column2: 'Data 2',
//       column3: 'Data 3'
//     },
//     {
//       id: 20,
//       column1: 'Data 5',
//       column2: 'Data 6',
//       column3: 'Data 7'
//     }
// 		// Add more rows as needed
//   ];

// 	// Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(2);
//   const paginationNumbersLimit = 5; // Adjust this number to limit the pagination numbers displayed

// 	// Calculate current items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// 	// Change page
//   const paginate = pageNumber => setCurrentPage(pageNumber);

// 	// Change items per page
//   const handleItemsPerPageChange = e => {
//     setItemsPerPage(parseInt(e.target.value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

// 	// Render pagination buttons
//   const renderPaginationButtons = () => {
//     const totalPageCount = Math.ceil(data.length / itemsPerPage);
//     const currentPageIndex = currentPage - 1;
//     const startPageIndex = Math.max(
// 			currentPageIndex - Math.floor(paginationNumbersLimit / 2),
// 			0
// 		);
//     const endPageIndex = Math.min(
// 			startPageIndex + paginationNumbersLimit,
// 			totalPageCount
// 		);

//     const pageNumbers = [];
//     for (let i = startPageIndex + 1; i <= endPageIndex; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           onClick={() => paginate(i)}
//           className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}
// 				>
//           {i}
//         </button>
// 			);
//     }
//     return pageNumbers;
//   };

//   return (
//     <div className='container'>
//       <div className='row mb-3'>
//         <div className='col-auto'>
//           <label className='mr-2 text-light'>Rows per page</label>
//           <select
//             value={itemsPerPage}
//             onChange={handleItemsPerPageChange}
//             className='form-control form-control-sm'
// 					>
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             {/* Add more options as needed */}
//           </select>
//         </div>
//       </div>
//       <table className='table table-bordered'>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Column 1</th>
//             <th>Column 2</th>
//             <th>Column 3</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map(item =>
//             <tr key={item.id}>
//               <td>
//                 {item.id}
//               </td>
//               <td>
//                 {item.column1}
//               </td>
//               <td>
//                 {item.column2}
//               </td>
//               <td>
//                 {item.column3}
//               </td>
//             </tr>
// 					)}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan='5' className='text-center'>
//               {renderPaginationButtons()}
//             </td>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// }

// export default PaginationTable;

// table with date filter
import jsPDF from 'jspdf'
import styles from './PaginationTable.module.css'
import React, { useLayoutEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import 'jspdf-autotable'
function PaginationTable({ list, handleModel }) {
	const [initialData, setInitialData] = useState()

	useLayoutEffect(() => {
		setInitialData(list)
		setData(list)
	}, [list])

	// State variables
	const [data, setData] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [startDate, setStartDate] = useState(null)
	const [endDate, setEndDate] = useState(null)

	// Calculate current items
	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)
	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber)

	// Change items per page
	const handleItemsPerPageChange = e => {
		setItemsPerPage(parseInt(e.target.value))
		setCurrentPage(1) // Reset to first page when changing items per page
	}

	// Filter data by date range
	const handleDateFilter = () => {
		const filteredData = initialData?.filter(item => {
			const itemDate = new Date(item.date)
			return (
				(!startDate || itemDate >= startDate) &&
				(!endDate || itemDate <= endDate)
			)
		})
		setData(filteredData)
		setCurrentPage(1)
	}

	// Reset date filter
	const resetDateFilter = () => {
		setData(initialData)
		setStartDate(null)
		setEndDate(null)
		setCurrentPage(1)
	}

	// Render pagination buttons
	const renderPaginationButtons = () => {
		const totalPageCount = Math.ceil(data?.length / itemsPerPage)
		const pageNumbers = []
		for (let i = 1; i <= totalPageCount; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => paginate(i)}
					className={`btn ${currentPage === i ? 'btn-primary' : 'btn-light'}`}>
					{i}
				</button>
			)
		}
		return pageNumbers
	}

	// export pdf
	const exportPdf = async () => {
		const doc = new jsPDF({ orientation: 'landscape' })

		doc.autoTable({ html: '#table' })
		doc.save('table.pdf')
	}

	return (
		<div className={`container-fluid my-3 ${styles.tableContainer}`}>
			<div className="row">
				<div className="col-auto m-1">
					<select
						value={itemsPerPage}
						onChange={handleItemsPerPageChange}
						className="form-control form-control-sm">
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={initialData?.length}>All</option>
						{/* Add more options as needed */}
					</select>
				</div>

				<div className="col-auto">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						placeholderText="Start Date"
						selected={startDate}
						onChange={date => setStartDate(date)}
						className="form-control form-control-sm m-1"
					/>
				</div>

				<div className="col-auto">
					<DatePicker
						dateFormat="dd/MM/yyyy"
						placeholderText="End Date"
						selected={endDate}
						onChange={date => setEndDate(date)}
						className="form-control form-control-sm m-1"
					/>
				</div>

				<div className="col-auto">
					<button
						onClick={handleDateFilter}
						className="btn btn-primary btn-sm m-1">
						Apply Filter
					</button>
					<button
						onClick={resetDateFilter}
						className="btn btn-secondary btn-sm m-1">
						Reset Filter
					</button>
				</div>
				<div className="col-auto">
					<button onClick={exportPdf} className="btn btn-secondary btn-sm m-1">
						Download
					</button>
				</div>
			</div>
			<table className={`table table-bordered table-hover `} id="table">
				<thead>
					<tr>
						<th>#</th>
						<th>Date</th>
						<th>Amount</th>
						<th>Transfer Type</th>
						<th>Category</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{currentItems?.map((item, index) => (
						<tr
							key={item._id}
							onClick={() => {
								handleModel(item)
							}}>
							<td>{index + 1}</td>
							<td>{new Date(item.date).toISOString().split('T')[0]}</td>
							<td>{item.amount}</td>
							<td>{item.requestType}</td>
							<td>{item.requestForm}</td>
							<td>{item.balance}</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="6" className="text-right">
							{renderPaginationButtons()}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}

export default PaginationTable
