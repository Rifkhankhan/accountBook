import React from 'react';
import styles from './Receipt.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUp,
	faBuildingColumns,
	faMoneyBill,
	faSackDollar,
	faWallet
} from '@fortawesome/free-solid-svg-icons';

import Form from '../../Components/Form/ContactForm';
const Receipt = () => {
  return (
    <div className={`container-fluid ${styles.home}`}>
      <div className='row'>
        <div className='col-12 col-md-5'>
          <section className={`row ${styles.homeComponent}`}>
            <div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
              <div className='row' style={{ flex: 1, height: '50%' }}>
                <h3 className='col' style={{ margin: 'auto' }}>
									Balance
								</h3>
                <FontAwesomeIcon
                  style={{ margin: 'auto', fontSize: '5em' }}
                  className='col'
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
                className='col'
							>
								150,000,000
							</h5>
            </div>
            <div className={`col-12 col-md-5 ${styles.column}`}>
              <div className='row' style={{ flex: 1, height: '50%' }}>
                <h3 className='col' style={{ margin: 'auto' }}>
									Expanses
								</h3>
                <FontAwesomeIcon
                  style={{ margin: 'auto', fontSize: '5em' }}
                  className='col'
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
                className='col'
							>
								150,000,000
							</h5>
            </div>
          </section>
        </div>
        <div className='col-12 col-md-7'>
          <Form header='cr' />
        </div>
      </div>
    </div>
  );
};

export default Receipt;
