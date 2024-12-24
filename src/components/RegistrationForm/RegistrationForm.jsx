import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authOps';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('username')} placeholder="username" />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <input {...register('email')} placeholder="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input
          type="password"
          {...register('password')}
          placeholder="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="confirmpassword"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
