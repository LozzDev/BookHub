import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);

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
    // Aquí irá el navigate a la página de detalles
  };

  return (
    <div className="px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">BOOKHUB</h1>
        <p className="text-lg mb-4">Lee, descarga y disfruta.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Regístrate
        </button>
      </div>

      <div className="catalog">
        <h2 className="text-2xl font-semibold mb-4">Catálogo</h2>

        {/* Grid de libros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
