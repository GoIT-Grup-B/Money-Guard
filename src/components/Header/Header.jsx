import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../redux/auth/authOps';

import { IoLogOutOutline } from 'react-icons/io5';
import logo from '../../assets/img/money-guard-logo.png';

const Header = () => {
  const selectUser = (state) => state.user;

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(signOutUser());
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <img src={logo} alt="Money Guard Logo" />
      <div>
        <p>{user.username}</p>
        <IoLogOutOutline onClick={handleLogoutClick} />
        <span onClick={handleLogoutClick}>Exit</span>
        {isModalOpen && (
          <div>
            <p>Are you sure you want to log out?</p>
            <button onClick={confirmLogout}>Confirm</button>
            <button onClick={cancelLogout}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;