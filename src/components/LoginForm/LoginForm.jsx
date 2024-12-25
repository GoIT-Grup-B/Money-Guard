import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo-login.svg';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../redux/auth/authOps';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at lest 6 chracters!')
    .max(12, 'Password can have maximum 12 characters'),
});

function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  // function handleSubmit() {}

  function onSubmit(data) {
    dispatch(loginUser(data));
  }

  return (
    <div>
      <img src={logo} alt="money guard logo" width="35px" />
      <h1>Money Guard</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" id="mail" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input type="password" id="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">LOG IN</button>
        <Link to="/register">REGISTER</Link>
      </form>
    </div>
  );
}

export default LoginForm;
