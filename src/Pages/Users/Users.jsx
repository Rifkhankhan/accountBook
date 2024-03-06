import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Users.module.css';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import CreateUser from '../../Components/CreateUser/CreateUser';
import image from './../../Images/man.png';
import UsersTable from '../../Components/UsersTable/UsersTable';
import Model from '../../Components/Model/Model';
import { getUsers } from '../../Actions/userAction';

const Users = () => {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const handleModel = () => {
    setShowModal(current => !current);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const getIdHandler = id => {
    setSelectedUser({ ...users.find(data => data._id === id) });
  };

  return (
    <div className={`container-fluid ${styles.home}`}>
      <div className='row'>
        <div className='col-12 col-md-5' style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faPen} className={styles.profileEditBtn} />
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
          initialData={users}
          handleModel={handleModel}
          getIdHandler={getIdHandler}
				/>
      </div>
      {showModal &&
      <Model
        showModal={showModal}
        closeHandler={handleModel}
        selectedUser={selectedUser}
				/>}
    </div>
  );
};

export default Users;
