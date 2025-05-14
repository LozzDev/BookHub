import React from 'react'
import BookCard from '../components/BookCard';
import { useEffect, useState } from 'react';

const Home = () => {

  const [books, setBooks] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      try{
        const response = await fetch(`http://localhost:3000/bookhub/books`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if(response.ok){
          const data = await response.json();
          setBooks(data); 
        }else {
          console.error('error obteniendo los libros:', response.statusText);
        }
      }catch(error){
        console.error('error obteniendo los libros: ' , error);
      }
    }

    fetchData();

  }, [])

  const handleDetailsClick = (book) => {
    console.log("Detalles del libro:", book);
    // en esta función hay que poner el navigate a la pagina de detalles del libro
  };

  return (
    <div>
      <div>Header</div>
      <div className='unlogged-content flex'>
        <div>
          <h1>BOOKHUB</h1>
          <p>Lee, descarga y disfruta.</p>
          <button>Regístrate</button>
        </div>
        <div className='book-image-container'>
          <img src="" alt="" />
        </div>
      </div>
      <div className='catalog'>
          <h2>Catálogo</h2>
          <div className='filters flex'>
            <h2>*Filtros*</h2>
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
  )
}

export default Home