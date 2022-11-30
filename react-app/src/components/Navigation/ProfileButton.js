import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './ProfileButton.css'
import { IoCreateOutline } from "react-icons/io5";

const ProfileButton = ({user}) => {
  const [showMenu, setShowMenu] = useState();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  return (
    <div className='navbar-profile-container'>
    <div onClick={openMenu} className='navbar-profile-button'>
      <i className="fa-solid fa-user"></i>
      <i className="fa-solid fa-angle-down"></i>
    </div>
    {showMenu && <>
        <div className='profile-dropdown'>
          <div className='dropdown-item-top'>
            <div className='profile-user-img'><i className="fa-solid fa-user"></i></div>
            {/* <div className='profile-name'>{user.firstName} */}
            <span>
            <NavLink exact to="/account"><div className='profile-name'>{user.firstName}</div><div className='profile-link'>View your profile</div></NavLink></span>
            {/* </div> */}
          </div>
          <div className='create-product-tab'>
            <div className='create-icon'><i class="fa-solid fa-right-to-bracket"></i></div>
            <div className='create-product-link'>
              <NavLink exact to="/create-product">Sell your product!</NavLink>
            </div>
            </div>
            <LogoutButton />
        </div>
      </>}
    </div >
  )
}

export default ProfileButton;
