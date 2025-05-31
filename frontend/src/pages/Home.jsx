import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookhub/books`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          console.error('error obteniendo los libros:', response.statusText);
        }
      } catch (error) {
        console.error('error obteniendo los libros:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailsClick = (book) => {
    console.log('detalles del libro:', book);
    navigate(`/book-details/${book._id}`);
  };



  return (
    <div className="">
      <Header/>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">BOOKHUB</h1>
        <p className="text-lg mb-4">Lee, descarga y disfruta.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer" onClick={() => {
          navigate('/register')}}>
          Regístrate
        </button>
      </div>

      <div className="catalog p-5 place-items-center">
        <h2 className="text-2xl font-semibold mb-4 place-self-center">Catálogo</h2>

        {/* Grid de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ">
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
            <p>No hay libros disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
