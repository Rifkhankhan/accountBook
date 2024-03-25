/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { authActions } from '../../store/AuthSlice'
import { autoLogin, logout } from '../../Actions/AuthAction'
import { getAccountRequests } from '../../Actions/AccountRequestActions'

function Header() {
	const [scrolled, setScrolled] = useState(false)

	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const currentUser = useSelector(state => state.auth.user)

	const dispatch = useDispatch()

	// State to manage the visibility of the dropdown
	function handleScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		if (scrollTop > 50) {
			setScrolled(true)
		} else {
			setScrolled(false)
		}
	}

	// useEffect(() => {
	// 	const handleBeforeUnload = event => {
	// 		// Perform logout action here
	// 		// For example, you can clear user session, call logout API, etc.
	// 		console.log('Logging out user...')
	// 		// You can call your logout function or dispatch logout action here

	// 		navigate('/login')
	// 		setMenuOpen(!menuOpen)
	// 		setShowCloseButton(!showCloseButton)
	// 		dispatch(logout())
	// 	}

	// 	// Add event listener for beforeunload event
	// 	window.addEventListener('beforeunload', handleBeforeUnload)

	// 	// Clean up by removing the event listener when component unmounts
	// 	return () => {
	// 		window.removeEventListener('beforeunload', handleBeforeUnload)
	// 	}
	// }, []) // Empty dependency array ensures this effect runs only once on component mount

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		if (isAuthenticated) {
			setMenuOpen(false)
			setShowCloseButton(false)
		}
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const [menuOpen, setMenuOpen] = useState(false)
	const [showCloseButton, setShowCloseButton] = useState(false)

	function toggleMenu() {
		setMenuOpen(!menuOpen)
		setShowCloseButton(!showCloseButton)
	}

	const logOutHandler = () => {
		navigate('/login')
		setMenuOpen(!menuOpen)
		setShowCloseButton(!showCloseButton)
		dispatch(logout())
	}

	return (
		<section className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
			<div className={`container ${styles.logo}`}>
				<div className={`col-3 ${styles.logohead}`}>
					<h3
						style={{ fontSize: '1em', margin: 0, padding: 0 }}
						className={styles.hightlight}>
						SMART
					</h3>
					<p className={styles.subhead} style={{ margin: 0, padding: 0 }}>
						Account Book
					</p>
				</div>

				<div className="col-8" style={{ display: 'flex' }}>
					<p
						className={`col-6  ${styles.contact}`}
						style={{ textAlign: 'left', float: 'left', margin: 'auto' }}>
						Contact Us : +94716972318/ +94742625427
					</p>
					<a
						href="https://scitglobal.com/"
						className={`col-6  ${styles.contact}`}
						style={{ textAlign: 'center', textDecoration: 'none' }}>
						Web : www.scitglobal.com
					</a>
				</div>
			</div>
			<div className={styles.headers}>
				<div className={styles.headers}>
					{isAuthenticated && currentUser.status && (
						<Link
							to="/"
							id="home"
							className={`${styles.head}`}
							style={{ textDecorationLine: 'none' }}>
							Home
						</Link>
					)}
					{isAuthenticated && currentUser.expansePermission === 'yes' && (
						<Link
							to="/payment"
							id="about"
							className={`${styles.head}  `}
							style={{ textDecorationLine: 'none' }}>
							Expense
						</Link>
					)}
					{isAuthenticated && currentUser.receiptPermission === 'yes' && (
						<Link
							to="/receipt"
							id="services"
							className={`${styles.head} `}
							style={{ textDecorationLine: 'none' }}>
							Receipt
						</Link>
					)}
					{isAuthenticated && currentUser.advancePermission === 'yes' && (
						<Link
							to="/advance"
							id="services"
							className={`${styles.head} `}
							style={{ textDecorationLine: 'none' }}>
							Advance
						</Link>
					)}
					{isAuthenticated && currentUser.loanPermission === 'yes' && (
						<Link
							to="/loan"
							id="services"
							className={`${styles.head}`}
							style={{ textDecorationLine: 'none' }}>
							Loan
						</Link>
					)}
					{isAuthenticated && currentUser.isAdmin === 1 && (
						<Link
							to="/users"
							id="projects"
							className={`${styles.head}`}
							style={{ textDecorationLine: 'none' }}>
							Users
						</Link>
					)}
					{!isAuthenticated && (
						<Link
							to="/login"
							className={`${styles.head} `}
							style={{ textDecorationLine: 'none' }}>
							Login
						</Link>
					)}
					{isAuthenticated && (
						<Link
							to="/login"
							className={`${styles.head} `}
							onClick={logOutHandler}
							style={{ textDecorationLine: 'none' }}>
							Logout
						</Link>
					)}
				</div>
			</div>

			{showCloseButton ? (
				<button className={styles.closeMenu} onClick={toggleMenu}>
					<FontAwesomeIcon icon={faClose} fontSize="1.3em" color="white" />
				</button>
			) : (
				isAuthenticated && (
					<button className={styles.hamburgerMenu} onClick={toggleMenu}>
						<span className={styles.hamburgerLine} />
						<span className={styles.hamburgerLine} />
						<span className={styles.hamburgerLine} />
					</button>
				)
			)}

			<nav className={`${styles.nav} ${menuOpen ? styles.menuOpen : ''}`}>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						{isAuthenticated && (
							<Link
								to="/"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Home
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && currentUser.expansePermission === 'yes' && (
							<Link
								to="/payment"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Expense
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && currentUser.receiptPermission === 'yes' && (
							<Link
								to="/receipt"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Receipt
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && currentUser.advancePermission === 'yes' && (
							<Link
								to="/advance"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Advance
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && currentUser.loanPermission === 'yes' && (
							<Link
								to="/loan"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Loan
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && currentUser.isAdmin === 1 && (
							<Link
								to="/users"
								className={styles.navLink}
								onClick={toggleMenu}
								style={{ textDecorationLine: 'none' }}>
								Users
							</Link>
						)}
					</li>
					<li className={styles.navItem}>
						{isAuthenticated && (
							<Link
								to="/login"
								className={styles.navLink}
								onClick={logOutHandler}
								style={{ textDecorationLine: 'none' }}>
								Logout
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</section>
	)
}

export default Header
