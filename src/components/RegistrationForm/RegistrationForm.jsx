import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOps';
import FormHeader from '../FormHeader/FormHeader';
import mailSvg from '../../assets/svg/mail.svg';
import passswordSvg from '../../assets/svg/password.svg';
import userSvg from '../../assets/svg/user.svg';
import FormFooter from '../FormFooter/FormFooter';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password can be maximum 12 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function RegistrationForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const { confirmPassword, ...formData } = data;
    // eslint-disable-next-line no-unused-vars
    const _ = confirmPassword; // Ignore confirmPassword to avoid ESLint error
    dispatch(registerUser(formData));
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[url('/src/assets/img/register-desktop.webp')] bg-cover bg-center`}
    >
      <div className="container mx-auto my-auto max-w-[533px] min-w-[320px] px-[20px] md:px-[62px] py-[98px] md:py[80px] bg-white/10 bg-blur-3xl">
        <FormHeader />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[40px]"
        >
          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={userSvg} alt="" width="24px" />
            <input
              {...register('username')}
              placeholder="Name"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={mailSvg} alt="" width="24px" />
            <input
              {...register('email')}
              placeholder="E-mail"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={passswordSvg} alt="" width="24px" />
            <input
              type="password"
              {...register('password')}
              placeholder="Password"
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
            <img src={passswordSvg} alt="" width="24px" />

            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm password"
              className="bg-transparent outline-none w-full"
            />
          </div>
          <FormFooter type="register" />
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
