import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../redux/auth/authOps';
import { useDispatch } from 'react-redux';
import FormHeader from '../FormHeader/FormHeader';
import FormFooter from '../FormFooter/FormFooter';
import mailSvg from '../../assets/svg/mail.svg';
import passswordSvg from '../../assets/svg/password.svg';

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
    <div
      className={`flex items-center justify-center min-h-screen bg-[url('/src/assets/img/login-desktop.webp')] bg-cover bg-center`}
    >
      <div className="container mx-auto my-auto max-w-[533px] min-w-[320px] px-[20px] md:px-[62px] py-[98px] md:py[80px] bg-white/10 bg-blur-3xl">
        <FormHeader />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[40px]"
        >
          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={mailSvg} alt="" width="24px" />
            <input
              placeholder="E-mail"
              type="text"
              id="mail"
              {...register('email')}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={passswordSvg} alt="" width="24px" />
            <input
              placeholder="Password"
              type="password"
              id="password"
              {...register('password')}
              className="bg-transparent outline-none w-full"
            />
          </div>
          <FormFooter type="login" />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
