/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { authActions } from '../../store/AuthSlice'
import { autoLogin } from '../../Actions/AuthAction'
import { getAccountRequests } from '../../Actions/AccountRequestActions'

function Header() {
	const [scrolled, setScrolled] = useState(false)

	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const currentUser = useSelector(state => state.auth.user)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAccountRequests())
	}, [dispatch])
	// State to manage the visibility of the dropdown
	function handleScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		if (scrollTop > 50) {
			setScrolled(true)
		} else {
			setScrolled(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
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

	const headerClicked = e => {
		const btns = document.getElementsByClassName('head')
	}

	const logOutHandler = () => {
		toggleMenu()
		dispatch(authActions.logout())
	}

	return (
		<section className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
			<div className={styles.logo}>
				<div className={styles.logohead}>
					<h3 style={{ fontSize: '3.5vh' }} className={styles.hightlight}>
						SMART
					</h3>
					<p className={styles.subhead} style={{ margin: 0, padding: 0 }}>
						Account Book
					</p>
				</div>
			</div>
			<div className={styles.headers}>
				<div className={styles.headers}>
					{isAuthenticated && (
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
					{isAuthenticated && (
						<Link
							to="/advance"
							id="services"
							className={`${styles.head} `}
							style={{ textDecorationLine: 'none' }}>
							Advance
						</Link>
					)}
					{isAuthenticated && (
						<Link
							to="/loan"
							id="services"
							className={`${styles.head} `}
							style={{ textDecorationLine: 'none' }}>
							Loan
						</Link>
					)}
					{isAuthenticated && currentUser.isAdmin && (
						<Link
							to="/users"
							id="projects"
							className={`${styles.head} `}
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

			{showCloseButton
				? isAuthenticated && (
						<button className={styles.closeMenu} onClick={toggleMenu}>
							<FontAwesomeIcon icon={faClose} fontSize="1.3em" color="white" />
						</button>
				  )
				: isAuthenticated && (
						<button className={styles.hamburgerMenu} onClick={toggleMenu}>
							<span className={styles.hamburgerLine} />
							<span className={styles.hamburgerLine} />
							<span className={styles.hamburgerLine} />
						</button>
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
						{isAuthenticated && (
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
						{isAuthenticated && (
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
						{isAuthenticated && (
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
						{isAuthenticated && (
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
