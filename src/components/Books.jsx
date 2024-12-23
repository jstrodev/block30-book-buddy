// src/components/Books.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBooksQuery } from "../features/api/apiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

const Books = () => {
  const navigate = useNavigate();
  const { data: books, error, isLoading } = useGetBooksQuery();

  // Debugging: Log the books data
  console.log('Books data:', books);

  // Check if books is an array
  const validBooks = Array.isArray(books) ? books : [];

  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks = validBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center p-8">Loading books...</div>;
  }

  if (error) {
    console.error('Error loading books:', error);
    return (
      <div className="text-center p-8 text-red-500">
        Error loading books: {error.message}
        <br />
        Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Library Catalog</h2>
        <input
          type="text"
          placeholder="Search books..."
          className="px-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks?.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <img
                src={book.coverimage}
                alt={book.title}
                className="h-40 w-full object-contain rounded-t-lg"
              />
              <CardTitle className="mt-4">{book.title}</CardTitle>
              <CardDescription>by {book.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                ${
                  book.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.available ? "Available" : "Checked Out"}
              </span>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate(`/books/${book.id}`)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Books;
