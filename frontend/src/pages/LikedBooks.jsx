import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer'
const LikedBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/bookhub/users/me/liked-books', {
          credentials: 'include', // 🔐 Importante para que se envíe la cookie con el token
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('Error obteniendo los libros favoritos:', response.statusText);
        }
      } catch (error) {
        console.error('Error obteniendo los libros favoritos:', error);
      }
    };

    fetchLikedBooks();
  }, []);

  const handleDetailsClick = (book) => {
    console.log('detalles del libro:', book);
    navigate(`/book-details/${book._id}`);
  };

  return (
    <div >
      <Header />
      <div className="catalog p-5 min-h-screen">
        <h2
          className="text-3xl font-semibold mb-4 text-center tracking-widest"
          style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}
        >
          MIS FAVORITOS
        </h2>

        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-9 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard
                  key={book._id}
                  image={book.coverImage}
                  title={book.title}
                  author={book.author}
                  onDetailsClick={() => handleDetailsClick(book)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No hay libros favoritos.</p>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default LikedBooks;
