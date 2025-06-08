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
    <div className="p-3 flex justify-center items-center">
      
      <div className=" rounded-lg  max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8">
        {/* Portada del libro */}
        <div className="w-full  flex  justify-center items-start">
          <img
            src={book.coverImage}
            alt="cover-image"
            className="rounded-2xl h-[500px] lg:h-[750px] object-cover"
          />
        </div>

{/* Información del libro */}
<div className="w-full flex flex-col items-center h-[650px] lg:h-[750px] justify-between">
  <div className="flex flex-col p-6 w-11/12 bg-black/20 rounded-3xl items-center h-[85%]">
    <h1 className="text-3xl font-bold mb-2 text-center">{book.title}</h1>
    <p className="text-sm mb-4 text-center">{book.author}</p>

    <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>

    {/* Contenedor con scroll vertical para la sinopsis */}
    <div className="overflow-y-auto max-h-[400px] lg:max-h-[500px] w-full px-2 overflow-x-hidden">
  <p className="leading-relaxed whitespace-pre-line text-sm text-justify break-all max-w-full">
    {book.description}
  </p>
</div>
  </div>

  {/* Botones */}
  <div className="flex justify-center mt-4 gap-4 mb-2">
    <button
      onClick={async () => {
        try {
          const response = await fetch(book.file);
          const blob = await response.blob();

          const extension = book.fileType?.toLowerCase() === 'pdf' ? 'pdf' : 'epub';
          const filename = `${book.title?.replace(/\s+/g, '_') || 'libro'}.${extension}`;

          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('❌ Error al descargar el archivo:', error.message);
        }
      }}
      className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all cursor-pointer text-center"
    >
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
