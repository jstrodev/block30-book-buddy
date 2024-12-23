import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Button } from '@/components/ui/button';

const Navigation = ({ token, setToken }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <nav className="flex items-center space-x-4">
      <Link to="/books" className="text-gray-700 hover:text-gray-900">
        Books
      </Link>
      {token ? (
        <>
          <Link to="/account" className="text-gray-700 hover:text-gray-900">
            Account
          </Link>
          <Button 
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;