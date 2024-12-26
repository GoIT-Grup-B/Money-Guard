import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser } from '../../redux/auth/authOps';
import { useDispatch, useSelector } from 'react-redux';
import FormHeader from '../FormHeader/FormHeader';
import FormFooter from '../FormFooter/FormFooter';
import mailSvg from '../../assets/svg/mail.svg';
import passswordSvg from '../../assets/svg/password.svg';
import { InfinitySpin } from 'react-loader-spinner';
import { yupSchema } from '../../utils/yupSchema';

const schema = yupSchema;

function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
    dispatch(loginUser(data));
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[url('/src/assets/img/login-desktop.webp')] bg-cover bg-center`}
    >
      <div className="container mx-auto my-auto max-w-[533px] min-w-[320px] px-[20px] md:px-[62px] py-[98px] md:py[80px] bg-white/10 bg-blur-3xl">
        <FormHeader />
        {loading ? (
          <div className="w-full flex justify-center  h-full">
            <InfinitySpin color="#FFC727" width="200" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[40px]"
          >
            <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
              <img src={mailSvg} alt="" width="24px" />
              <input
                placeholder="E-mail"
                {...register('email')}
                className="bg-transparent outline-none w-full"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}

            <div className="border-b-2 border-white/40 pb-2 px-2 flex gap-5">
              <img src={passswordSvg} alt="" width="24px" />
              <input
                placeholder="Password"
                type="password"
                {...register('password')}
                className="bg-transparent outline-none w-full"
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}
            <FormFooter type="login" />
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
