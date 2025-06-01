import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';


const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

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

     const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include'
        });
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleDetailsClick = (book) => {
    console.log('detalles del libro:', book);
    navigate(`/book-details/${book._id}`);
  };



  return (
    <div className="">
      <Header/>
      {
        !isAuthenticated && (
          <div className='flex justify-center place-items-center  flex-col lg:flex-row'>
            <div className="mb-8 text-center">
              <h1 style={{ fontFamily: 'Karma, serif', textShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }} className="lg:text-8xl text-6xl font-semibold tracking-widest">
                BOOKHUB
              </h1>
              <p className="text-lg mb-4 font-medium">Lee, descarga y disfruta.</p>
              <button className="bg-black text-white px-8 py-1 rounded-full hover:bg-gray-900 transition cursor-pointer" onClick={() => {
                navigate('/register')}}>
                Regístrate
              </button>
            </div>
            <div className=''>
                <img src='../../book.png' width={712} />
            </div>
          </div>
      )
      }
      

      <div className="catalog p-5">
        <h2
          className="text-3xl font-semibold mb-4 text-center tracking-widest"
          style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}
        >
          CATÁLOGO
        </h2>

        {/* Contenedor centrado y con ancho máximo */}
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid flexible con tarjetas ajustables */}
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
              <p className="col-span-full text-center text-gray-500">No hay libros disponibles.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
