import { useNavigate } from 'react-router-dom';
import { useGetAccountQuery } from '../features/api/apiSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const Account = () => {
  const navigate = useNavigate();
  const { data: account, error, isLoading } = useGetAccountQuery();
  const token = localStorage.getItem('token');

  if (!token) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Account Access Required</CardTitle>
            <CardDescription>
              Please log in or create an account to view this page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-x-4">
            <Button onClick={() => navigate('/login')}>Login</Button>
            <Button variant="outline" onClick={() => navigate('/register')}>
              Create Account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center p-8">Loading account details...</div>;
  }

  if (error) {
    console.error('Error loading account details:', error);
    return (
      <div className="text-center p-8 text-red-500">
        Error loading account details: {error.message}
        <br />
        Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Welcome back, {account.firstname}!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Your Books</h3>
              {account.books && account.books.length > 0 ? (
                <ul className="space-y-2">
                  {account.books.map((book) => (
                    <li key={book.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>{book.title}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/books/${book.id}`)}
                      >
                        View Details
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  You haven't checked out any books yet.{' '}
                  <Button 
                    variant="link" 
                    className="p-0"
                    onClick={() => navigate('/books')}
                  >
                    Browse our catalog
                  </Button>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;