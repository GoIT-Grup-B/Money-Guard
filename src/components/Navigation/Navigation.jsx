import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
      <header className="p-4 bg-blue-500 text-white flex justify-between">
        <nav className="flex gap-4">
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? 'underline font-bold' : '')}
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard/statistic"
            className={({ isActive }) => (isActive ? 'underline font-bold' : '')}
          >
            Statistic
          </NavLink>
        </nav>
      </header>
  );
};

export default Navigation;