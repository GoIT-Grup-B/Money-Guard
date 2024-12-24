import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-login.svg';

function LoginForm() {
  function handleSubmit() {}

  return (
    <div>
      <img src={logo} alt="money guard logo" width="35px" />
      <h1>Money Guard</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="mail" />
        <input type="password" id="password" />
        <button type="submit">LOG IN</button>
        <Link to="/register">REGISTER</Link>
      </form>
    </div>
  );
}

export default LoginForm;
