/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header () {
  const [scrolled, setScrolled] = useState(false);

	// State to manage the visibility of the dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);
  function handleScroll () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  function toggleMenu () {
    setMenuOpen(!menuOpen);
    setShowCloseButton(!showCloseButton);
  }

  const headerClicked = e => {
    const btns = document.getElementsByClassName('head');

    console.log(btns);
  };

  return (
    <section
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      onClick={toggleMenu}
		>
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
          <Link
            to='/'
            id='home'
            className={`${styles.head}`}
            style={{ textDecorationLine: 'none' }}
					>
						Home
					</Link>
          <Link
            to='/payment'
            id='about'
            className={`${styles.head}  `}
            style={{ textDecorationLine: 'none' }}
					>
						Expense
					</Link>
          <Link
            to='/receipt'
            id='services'
            className={`${styles.head} `}
            style={{ textDecorationLine: 'none' }}
					>
						Receipt
					</Link>
          <Link
            to='/users'
            id='projects'
            className={`${styles.head} `}
            style={{ textDecorationLine: 'none' }}
					>
						Users
					</Link>
          <Link
            to='/users'
            id='contact'
            style={{ textDecorationLine: 'none' }}
            className={`${styles.head} ${styles.dropdownToggle}`}
            onClick={() => setDropdownVisible(!dropdownVisible)}
					>
						Settings
					</Link>
          {dropdownVisible &&
          <div className={styles.dropdownContent}>
            {/* Dropdown content */}
            <Link to='/settings/profile' className={styles.dropdownItem}>
								Change Password
							</Link>
            <Link to='/settings/preferences' className={styles.dropdownItem}>
								Preferences
							</Link>
            {/* Add more dropdown items as needed */}
          </div>}
        </div>
      </div>

      {showCloseButton
				? <button className={styles.closeMenu} onClick={toggleMenu}>
  <span className={styles.closeLine} />
  <span className={styles.closeLine} />
					</button>
				: <button className={styles.hamburgerMenu} onClick={toggleMenu}>
  <span className={styles.hamburgerLine} />
  <span className={styles.hamburgerLine} />
  <span className={styles.hamburgerLine} />
					</button>}

      <nav className={`${styles.nav} ${menuOpen ? styles.menuOpen : ''}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href='#home' className={styles.navLink}>
							Home
						</a>
          </li>
          <li className={styles.navItem}>
            <a href='#about' className={styles.navLink}>
							About
						</a>
          </li>
          <li className={styles.navItem}>
            <a href='#services' className={styles.navLink}>
							Services
						</a>
          </li>
          <li className={styles.navItem}>
            <a href='#projects' className={styles.navLink}>
							Projects
						</a>
          </li>
          <li className={styles.navItem}>
            <a href='#contact' className={styles.navLink}>
							Contact
						</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Header;
