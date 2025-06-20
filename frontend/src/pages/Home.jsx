import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const GENRES = [
  { value: 'Fantasy', label: 'Fantasía' },
  { value: 'Science Fiction', label: 'Ciencia Ficción' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Horror', label: 'Terror' },
  { value: 'Mystery', label: 'Misterio' },
  { value: 'Historical', label: 'Histórico' },
  { value: 'Thriller', label: 'Suspense' },
  { value: 'Adventure', label: 'Aventura' },
  { value: 'Biography', label: 'Biografía' },
  { value: 'Children', label: 'Infantil' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Poetry', label: 'Poesía' },
];

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookhub/books`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          setFilteredBooks(data);
        } else {
          console.error('error obteniendo los libros:', response.statusText);
        }
      } catch (error) {
        console.error('error obteniendo los libros:', error);
      }
    };

    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include'
        });
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    fetchData();
    checkAuth();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
      return matchesSearch && matchesGenre;
    });

    setFilteredBooks(filtered);
  }, [searchQuery, selectedGenre, books]);

  const handleDetailsClick = (book) => {
    navigate(`/book-details/${book._id}`);
  };

  return (
    <div>
      <Header />

      {!isAuthenticated && (
        <div className="flex justify-center place-items-center flex-col lg:flex-row">
          <div className="mb-8 text-center">
            <h1
              style={{
                fontFamily: 'Karma, serif',
                textShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
              }}
              className="lg:text-8xl text-6xl font-semibold tracking-widest"
            >
              BOOKHUB
            </h1>
            <p className="text-lg mb-4 font-medium">Lee, descarga y disfruta.</p>
            <button
              className="bg-black text-white px-8 py-1 rounded-full hover:bg-gray-900 transition cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </button>
          </div>
          <div>
            <img src="../../book.png" width={712} />
          </div>
        </div>
      )}

      <div className="catalog p-5">
        <h2
          className="text-3xl font-semibold mb-6 text-center tracking-widest"
          style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)' }}
        >
          CATÁLOGO
        </h2>

        {/* Filtros */}
        

        {/* Lista de libros */}
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row  gap-4 items-center mb-10 w-full max-w-screen-lg ">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-6/12 lg:3/12 px-4 py-2 rounded-xl shadow-lg bg-white focus:outline-none"
          />

<select
  value={selectedGenre}
  onChange={(e) => setSelectedGenre(e.target.value)}
  className="w-6/12 lg:w-3/12 px-4 py-2 rounded-xl shadow-lg bg-white focus:outline-none"
>
  <option value="">Todos los géneros</option>
  {GENRES.map((genre) => (
    <option key={genre.value} value={genre.value}>
      {genre.label}
    </option>
  ))}
</select>
        </div>
          <div className="grid gap-9 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-items-center">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard
                  key={book._id}
                  image={book.coverImage}
                  title={book.title}
                  author={book.author}
                  onDetailsClick={() => handleDetailsClick(book)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No hay libros que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
