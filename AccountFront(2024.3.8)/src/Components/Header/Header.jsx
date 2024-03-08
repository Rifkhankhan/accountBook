/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { authActions } from '../../store/AuthSlice'
import { autoLogin } from '../../Actions/AuthAction'

function Header() {
	const [scrolled, setScrolled] = useState(false)

	const navigate = useNavigate()
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	const currentUser = useSelector(state => state.auth.user)
	console.log(currentUser)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(autoLogin())
	}, [])

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

		console.log(btns)
	}

	const logOutHandler = () => {
		dispatch(authActions.logout())
	}

	return (
		<section className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
			<div className={styles.logo}>
				<div className={styles.logohead}>
					<h3>
						<span className={styles.hightlight}>S</span>ma
						<span className={styles.hightlight}>R</span>t
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

			{showCloseButton ? (
				<button className={styles.closeMenu} onClick={toggleMenu}>
					<FontAwesomeIcon icon={faClose} fontSize="1.3em" color="white" />
				</button>
			) : (
				<button className={styles.hamburgerMenu} onClick={toggleMenu}>
					<span className={styles.hamburgerLine} />
					<span className={styles.hamburgerLine} />
					<span className={styles.hamburgerLine} />
				</button>
			)}

			<nav className={`${styles.nav} ${menuOpen ? styles.menuOpen : ''}`}>
				<ul className={styles.navList}>
					<li className={styles.navItem}>
						<a href="#home" className={styles.navLink}>
							Home
						</a>
					</li>
					<li className={styles.navItem}>
						<a href="#about" className={styles.navLink}>
							About
						</a>
					</li>
					<li className={styles.navItem}>
						<a href="#services" className={styles.navLink}>
							Services
						</a>
					</li>
					<li className={styles.navItem}>
						<a href="#projects" className={styles.navLink}>
							Projects
						</a>
					</li>
					<li className={styles.navItem}>
						<a href="#contact" className={styles.navLink}>
							Contact
						</a>
					</li>
				</ul>
			</nav>
		</section>
	)
}

export default Header
