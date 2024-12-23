import { useParams, useNavigate } from 'react-router-dom';
import { useGetSingleBookQuery, useCheckoutBookMutation } from '../features/api/apiSlice';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";

const SingleBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, error, isLoading } = useGetSingleBookQuery(id);
  const [checkoutBook, { isLoading: isCheckingOut }] = useCheckoutBookMutation();
  const token = localStorage.getItem('token');

  const handleCheckout = async () => {
    try {
      await checkoutBook(id).unwrap();
      navigate('/account');
    } catch (error) {
      console.error('Failed to checkout book:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Loading book details...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">Error loading book details!</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <img 
            src={book.coverimage} 
            alt={book.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <CardTitle className="mt-4">{book.title}</CardTitle>
          <CardDescription>by {book.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{book.description}</p>
          <div className="mt-4">
            <span className={`font-semibold ${book.available ? 'text-green-600' : 'text-red-600'}`}>
              Status: {book.available ? 'Available' : 'Checked Out'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/books')}>
            Back to Catalog
          </Button>
          {token && book.available && (
            <Button onClick={handleCheckout} disabled={isCheckingOut}>
              {isCheckingOut ? 'Checking Out...' : 'Check Out'}
            </Button>
          )}
          {!token && book.available && (
            <Alert>
              <AlertDescription>
                Please <Link to="/login" className="text-blue-600">login</Link> to check out this book
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SingleBook;