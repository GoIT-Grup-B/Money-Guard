import { useSelector } from 'react-redux';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function RegistrationPage() {
  const { isLoggedIn, error } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
    if (error) toast.error(error.message);
  }, [isLoggedIn, error, navigate]);

  return (
    <>
      <RegistrationForm />;
      <Toaster />
    </>
  );
}

export default RegistrationPage;
