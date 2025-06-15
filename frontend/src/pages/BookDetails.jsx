import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/bookhub/books/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          console.error('Error obteniendo el libro:', response.statusText);
        }

        const userRes = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include',
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUser(userData);
        }

      } catch (error) {
        console.error('Error al obtener el libro o el usuario:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el libro permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/bookhub/books/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.ok) {
          await Swal.fire({
            icon: 'success',
            title: 'Libro eliminado',
            text: 'El libro se ha eliminado correctamente.',
            timer: 1500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate('/');
          }, 500);
        } else {
          Swal.fire('Error', 'No se pudo eliminar el libro.', 'error');
        }
      } catch (err) {
        console.error('Error al eliminar:', err.message);
        Swal.fire('Error', 'Hubo un problema al eliminar el libro.', 'error');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="p-3 flex justify-center items-center">
        <div className="rounded-lg max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full flex justify-center items-start">
            <img
              src={book.coverImage}
              alt="cover-image"
              className="rounded-2xl h-[500px] lg:h-[750px] object-cover"
            />
          </div>

          <div className="w-full flex flex-col items-center h-[650px] lg:h-[750px] justify-between">
            <div className="flex flex-col p-6 w-11/12 bg-black/20 rounded-3xl items-center h-[85%]">
              <h1 className="text-3xl font-bold mb-2 text-center">{book.title}</h1>
              <p className="text-sm mb-4 text-center">{book.author}</p>

              <h2 className="text-xl font-semibold mb-2">Sinopsis</h2>
              <div className="overflow-y-auto max-h-[400px] lg:max-h-[500px] w-full px-2 overflow-x-hidden">
                <p className="leading-relaxed whitespace-pre-line text-sm text-justify break-all max-w-full">
                  {book.description}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-4 gap-4 mb-2 flex-wrap">
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
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all"
              >
                Descargar
              </button>

              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all">
                Leer
              </button>

              {currentUser && book.userId === currentUser._id && (
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all cursor-pointer"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
