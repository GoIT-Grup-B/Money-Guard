import { Link } from 'react-router-dom';

function FormFooter({ type }) {
  if (type === 'login') {
    return (
      <div className="flex flex-col items-center gap-[20px]">
        <button
          type="submit"
          className=" w-[280px] bg-gradient-to-r from-[#FFC727] via-[#9E40BA] to-[#7000FF] rounded-full pb-[13px] pt-[13px]"
        >
          LOG IN
        </button>
        <Link
          to="/register"
          className="text-center w-[280px] rounded-full bg-white text-[#4A56E2] pb-[13px] pt-[13px]"
        >
          REGISTER
        </Link>
      </div>
    );
  }

  if (type === 'register') {
  }
}

export default FormFooter;
