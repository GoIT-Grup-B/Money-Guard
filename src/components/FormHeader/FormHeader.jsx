import logo from '../../assets/svg/logo-login.svg';

function FormHeader() {
  return (
    <div className="flex flex-col justify-center items-center mb-[52px]">
      <img src={logo} alt="money guard logo" width="35px" className="" />
      <h1 className="font-normal text-[26px]">Money Guard</h1>
    </div>
  );
}

export default FormHeader;
