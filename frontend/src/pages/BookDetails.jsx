import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookhub/books/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          console.error('error obteniendo el libro:', response.statusText);
        }
      } catch (error) {
        console.error('error obteniendo el libro:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6 flex justify-center items-center">
      
      <div className="bg-[#f5f1ec] shadow-xl rounded-lg p-6 max-w-6xl w-full flex gap-8">
        {/* Portada del libro */}
        <div className="w-1/2 flex justify-center items-start">
          <div className="w-full max-w-md shadow-lg rounded overflow-hidden">
            <img
              src={book.coverImage}
              alt="cover-image"
              className="w-full h-auto rounded"
            />
          </div>
        </div>

        {/* Información del libro */}
        <div className="w-1/2 flex flex-col justify-between">
          <div className="bg-[#e5dfd6] rounded-lg p-6 shadow-inner">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{book.title}</h1>
            <p className="text-sm text-gray-600 mb-4">{book.author}</p>

            <h2 className="text-xl font-semibold text-gray-700 mb-2">Sinopsis</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.description}</p>
          </div>

          {/* Botones */}
          <div className="flex justify-center mt-6 gap-4 ">
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all cursor-pointer">
              Descargar
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer">
              Leer
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default BookDetails;
