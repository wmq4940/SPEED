import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from './HomeImage.png';
import styles from './Navbar.module.css'; // Importing the new CSS module

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref legacyBehavior>
        <a>
          <Image 
            src={HomeIcon} 
            alt="Home Icon" 
            width={60} 
            height={60} 
            style={{ cursor: "pointer" }}
          />
        </a>
      </Link>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}>
          <Link href="/List" passHref legacyBehavior>
            <a className={styles.navLink}>Search</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Moderate</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Analyse</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Administration</a>
          </Link>
        </li>

        {/* Submit Dropdown Menu */}
        <li className={styles.navItem} onClick={toggleDropdown}>
          <a className={`${styles.navLink} ${styles.dropdownToggle}`} style={{ cursor: "pointer" }}>
            Submit
          </a>
          {dropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/SeForm" passHref legacyBehavior>
                  <a className={styles.dropdownItem}>New SE Practice</a>
                </Link>
              </li>
              <li>
                <Link href="/NewClaim" passHref legacyBehavior>
                  <a className={styles.dropdownItem}>New SE Claim</a>
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className={styles.navItem}>
          <Link href="/" passHref legacyBehavior>
            <a className={styles.navLink}>Log Out</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
