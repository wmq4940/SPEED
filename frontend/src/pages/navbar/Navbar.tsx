import React from "react";
import Link from "next/link";
import Image from "next/image";
import HomeIcon from './HomeImage.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
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
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href="/List" passHref legacyBehavior>
            <a className="nav-link">Search</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" passHref legacyBehavior>
            <a className="nav-link">Moderate</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" passHref legacyBehavior>
            <a className="nav-link">Analyse</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" passHref legacyBehavior>
            <a className="nav-link">Administration</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/" passHref legacyBehavior>
            <a className="nav-link">Log Out</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;