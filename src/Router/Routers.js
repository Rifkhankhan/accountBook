import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Payment from '../Pages/Payment/Payment'
import Receipt from '../Pages/Receipt/Receipt'
import Users from '../Pages/Users/Users'
import Login from '../Pages/Login/Login'
import Advance from '../Pages/Advance/Advance'
import Loan from '../Pages/Loan/Loan'
import { useEffect } from 'react'
import Header from '../Components/Header/Header'
import { getAccountRequests } from '../Actions/AccountRequestActions'
import LoadingSpinner from '../Components/LoadingSpinner/LoadingSpinner'
import { autoLogin } from '../Actions/AuthAction'

const Routers = () => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const isLoading = useSelector(state => state.auth.isLoading)
	const currentUser = useSelector(state => state.auth.user)

	useEffect(() => {
		dispatch(autoLogin())
		dispatch(getAccountRequests())
	}, [dispatch])

	return (
		<>
			<Header />
			{isLoading && <LoadingSpinner />}
			<Routes>
				{
					<Route
						path="/login"
						element={!isAuthenticated ? <Login /> : <Home />}
					/>
				}

				<Route
					path="/"
					index
					element={isAuthenticated ? <Home /> : <Login to="/login" />}
				/>

				<Route
					path="/home"
					index
					element={isAuthenticated ? <Home /> : <Login to="/login" />}
				/>
				<Route
					path="/payment"
					element={isAuthenticated ? <Payment /> : <Login to="/login" />}
				/>
				<Route
					path="/receipt"
					element={isAuthenticated ? <Receipt /> : <Login to="/login" />}
				/>
				<Route
					path="/advance"
					element={isAuthenticated ? <Advance /> : <Login to="/login" />}
				/>
				<Route
					path="/loan"
					element={isAuthenticated ? <Loan /> : <Login to="/login" />}
				/>
				<Route
					path="/users"
					element={
						isAuthenticated && currentUser.isAdmin ? (
							<Users />
						) : (
							<Home to="/home" />
						)
					}
				/>
			</Routes>
		</>
	)
}

export default Routers
