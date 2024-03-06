import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Payment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import PaginationTable from '../../Components/PaginationTable/PaginationTable';
import ExpanseForm from '../../Components/ExpanseForm/ExpanseForm';
import { deleteExpanse, getExpanses } from '../../Actions/ExpanseActions';
import ExpanseModel from '../../Components/ExpanseModel/ExpanseModel';
import PDFComponent from '../../Components/PDFComponent/PDFComponent';
const Payment = () => {
  const expanses = useSelector(state => state.expanse.expanses);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [clickedRow, setClickedRow] = useState({});
  const [totalExpanses, setTotalExpanses] = useState(0);
  const [todayTotalExpanses, setTodayTotalExpanses] = useState(0);

  const handleModel = id => {
    setClickedRow(id);
    setShowModal(current => !current);
  };

  const deleteHandler = id => {
    handleModel();

    dispatch(deleteExpanse(id));
  };

	// Function to calculate total expense for a specific date
  const getTotalExpenseForDate = (expenses, targetDate) => {
		// Filter expenses for the target date

    const expensesForDate = expenses.filter(
			expense =>
				new Date(expense.date).toISOString().split('T')[0] ===
				new Date(targetDate).toISOString().split('T')[0]
		);

		// Calculate total amount for the target date
    const totalExpenseForDate = expensesForDate.reduce(
			(total, expense) => total + expense.amount,
			0
		);

    return totalExpenseForDate;
  };

  useLayoutEffect(
		() => {
  const total = expanses.reduce(
				(total, current) => total + current.amount,
				0
			);
  setTotalExpanses(total);
  setTodayTotalExpanses(getTotalExpenseForDate(expanses, new Date()));
},
		[expanses]
	);

  useLayoutEffect(
		() => {
			// dispatch(getExpanses());
},
		[dispatch]
	);

  return (
    <div className={`container-fluid ${styles.home}`}>
      <div className='row'>
        <div className='col-12 col-md-5'>
          <section className={`row ${styles.homeComponent}`}>
            <div className={`col-12 col-md-5 mb-2, ${styles.column}`}>
              <div className='row' style={{ flex: 1, height: '50%' }}>
                <h3
                  className='col'
                  style={{ margin: 'auto', fontSize: '1.3em' }}
								>
									Total Expanses
								</h3>
                <FontAwesomeIcon
                  style={{ margin: 'auto', fontSize: '3em' }}
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
                {totalExpanses}
              </h5>
            </div>
            <div className={`col-12 col-md-5 ${styles.column}`}>
              <div className='row' style={{ flex: 1, height: '50%' }}>
                <h3
                  className='col'
                  style={{ margin: 'auto', fontSize: '1.3em' }}
								>
									Today Expanses
								</h3>
                <FontAwesomeIcon
                  style={{ margin: 'auto', fontSize: '3em' }}
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
                {todayTotalExpanses}
              </h5>
            </div>
          </section>
        </div>

        <div className='col-12 col-md-7'>
          <ExpanseForm />
        </div>
      </div>

      <section className='container-fluid' style={{ margin: 'auto' }}>
        <h2 style={{ textAlign: 'left', color: 'white' }}>Expenses</h2>
        <div className={`col-12`}>
          <PaginationTable list={expanses} handleModel={handleModel} />
        </div>
      </section>

      {/* <PDFComponent /> */}
      {showModal &&
      <ExpanseModel
        clickedRow={clickedRow}
        showModal={showModal}
        closeHandler={handleModel}
        deleteHandler={deleteHandler}
				/>}
    </div>
  );
};

export default Payment;