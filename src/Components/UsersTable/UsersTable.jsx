import React, { useState } from 'react';
import styles from './UsersTable.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'bootstrap';
const UsersTable = ({ initialData, handleModel, getIdHandler }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };
  return (
    <div className={`container ${styles.tableContainer}`}>
      <input
        type='text'
        value={filter}
        onChange={handleFilterChange}
        className={`form-control mb-3 col-12 col-md-6 ${styles.inputTag}`}
        placeholder='Search for you want..'
			/>
      <table
        className='table table-hover thead-dark'
        style={{ overflow: 'scroll' }}
			>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Expanse Permission</th>
            <th>Receipt Permission</th>
          </tr>
        </thead>
        <tbody>
          {initialData.map(
						(item, index) =>
							(item.name.toLowerCase().includes(filter.toLowerCase()) ||
								item.email.toLowerCase().includes(filter.toLowerCase()) ||
								item.phone.toLowerCase().includes(filter.toLowerCase())) &&
							<tr
  key={index}
  onClick={() => {
    handleModel();
    getIdHandler(item.id);
  }}
							>
  <td>
    {item.name}
  </td>
  <td>
    {item.email}
  </td>
  <td>
    {item.phone}
  </td>
  <td>
    {item.expansePermission ? 'Granted' : 'denied'}
  </td>
  <td>
    {item.receiptPermission ? 'Granted' : 'denied'}
  </td>
							</tr>
					)}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
