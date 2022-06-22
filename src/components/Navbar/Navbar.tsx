import React from 'react';
import classes from './Navbar.module.css';
import NavbarItem from "./NavBarComponents/NavbarItem";

const Navbar = () => {
    return (
        <div className='Left-bar'>
            <nav className={classes.Navbar}>
                <NavbarItem item={'ForgotPasswordPage'} />
                <NavbarItem item={'LoginPage'} />
                <NavbarItem item={'NewPasswordPage'} />
                <NavbarItem item={'ProfilePage'} />
                <NavbarItem item={'RegisterPage'} />
                <NavbarItem item={'TestPage'} />
            </nav>

        </div>
    );
};

export default Navbar;

