import React, { useState } from 'react';
import styles from './Users.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp,
  faBuildingColumns,
  faMoneyBill,
  faSackDollar,
  faWallet
} from '@fortawesome/free-solid-svg-icons';

import Form from '../../Components/Form/ContactForm';
import { useSelector } from 'react-redux';
import CreateUser from '../../Components/CreateUser/CreateUser';
import image from './../../Images/man.png';
import UsersTable from '../../Components/UsersTable/UsersTable';
import Model from '../../Components/Model/Model';

const initialData = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    expansePermission: true,
    receiptPermission: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '9876543210',
    expansePermission: false,
    receiptPermission: false
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '4567891230',
    expansePermission: true,
    receiptPermission: false
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '7894561230',
    expansePermission: false,
    receiptPermission: true
  }
];

const Users = () => {
  const expanses = useSelector(state => state.expanse.expanses);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const handleModel = () => {
    setShowModal(current => !current);
  };

  const getIdHandler = id => {
    setSelectedUser({ ...initialData.find(data => data.id === id) });
  };

  return (
    <div className={`container-fluid ${styles.home}`}>
      <div className='row'>
        <div className='col-12 col-md-5'>
          <section className={`row ${styles.homeComponent}`}>
            <div className={`col-12 `} style={{ margin: 'auto' }}>
              <div className='row'>
                <div className='col-12 col-md-5' style={{ margin: 'auto' }}>
                  <img src={image} alt='' className='col-12 col-md-12' />
                </div>

                <div
                  className='col-12 col-md-6'
                  style={{ margin: 'auto', textAlign: 'left' }}
                >
                  <p>Mohammed Rifkhan</p>
                  <p>Have Expanse Permission</p>
                  <p>not Have Expanse Permission</p>
                  <p>rifkhanvwev@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className='col-12 col-md-7'>
          <CreateUser header='Create a User' />
        </div>
      </div>

      <div className='row' style={{ marginTop: '3vh', color: 'white' }}>
        <h2>Users</h2>
        <UsersTable
          initialData={initialData}
          handleModel={handleModel}
          getIdHandler={getIdHandler}
        />
      </div>
      {showModal &&
        <Model
          initialData={initialData}
          type='users'
          showModal={showModal}
          closeHandler={handleModel}
          selectedUser={selectedUser}
        />}
    </div>
  );
};

export default Users;
