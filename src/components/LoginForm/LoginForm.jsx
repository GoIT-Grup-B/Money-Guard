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

  function onSubmit(data) {
    dispatch(loginUser(data));
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto my-auto max-w-[533px] min-w-[320px] px-[20px] md:px-[62px] py-[98px] md:py[80px] bg-white/10 bg-blur-3xl">
        <header className="flex flex-col justify-center items-center mb-[52px]">
          <img src={logo} alt="money guard logo" width="35px" className="" />
          <h1>Money Guard</h1>
        </header>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[40px]"
        >
          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={logo} alt="" width="24px" />
            <input
              placeholder="E-mail"
              type="text"
              id="mail"
              {...register('email')}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={logo} alt="" width="24px" />
            <input
              placeholder="Password"
              type="password"
              id="password"
              {...register('password')}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="flex flex-col items-center gap-[20px]">
            <button type="submit">LOG IN</button>
            <Link to="/register">REGISTER</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
