import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../redux/auth/authOps';

import { PiLineVertical } from 'react-icons/pi';
import { IoLogOutOutline } from 'react-icons/io5';
import logo from '../../assets/svg/logo-login.svg';

const Header = () => {
  const selectUser = (state) => state.user.user;

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector((store) => store.user.token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    dispatch(signOutUser(token));
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-between p-4 shadow-xl bg-gradient-to-r from-[#2e1746] to-[#2e225f]">
      <div className="flex flex-col justify-center items-center">
        <img src={logo} alt="Money Guard Logo" className="w-6 tablet:w-8" />
        <h2 className="text-sm tablet:text-lg text-white">Money Guard</h2>
      </div>
      <div className="flex items-center gap-2 text-white/70">
        <p className="text-sm tablet:text-base">{user.username}</p>
        <PiLineVertical size={30} className="hidden tablet:block" />
        <div
          onClick={handleLogoutClick}
          className="flex items-center gap-2 cursor-pointer hover:scale-90"
        >
          <IoLogOutOutline className="text-lg tablet:text-2xl" />
          <span className="hidden tablet:block">Exit</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-full tablet:w-[533px] tablet:h-[447px] z-20 bg-[#3e2f85] tablet:bg-[#3e2f85]/80 backdrop-blur border-solid tablet:rounded-lg flex flex-col items-center justify-center">
            <div className="flex flex-col gap-14">
              <div className="flex flex-col items-center justify-center">
                <img src={logo} alt="Money Guard Logo" width="40px" />
                <h1 className="font-normal text-[26.96px] text-[#fbfbfb] leading-10">
                  Money Guard
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center gap-14">
                <p className="font-normal text-lg text-[#ffffff]">
                  Are you sure you want to log out?
                </p>
                <div className="flex flex-col gap-5 ">
                  <button
                    onClick={confirmLogout}
                    className="w-80 h-12 rounded-2xl bg-gradient-to-r from-[#ecac43] to-[#a144b5] text-[#ffffff]"
                  >
                    LOGOUT
                  </button>
                  <button
                    onClick={cancelLogout}
                    className="w-80 h-12 rounded-2xl bg-[#fcfcfc] text-[#623f8b]"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
