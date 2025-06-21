import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Swal from 'sweetalert2';
import ePub from 'epubjs';
import Footer from '../components/Footer';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [liked, setLiked] = useState(false);
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

          if (userData?.likedBooks?.includes(id)) {
            setLiked(true);
          }
        }

      } catch (error) {
        console.error('Error al obtener el libro o el usuario:', error);
      }
    };

    fetchData();
  }, [id]);

  const toggleLike = async () => {
    try {
      const method = liked ? 'DELETE' : 'POST';
      const response = await fetch(`http://localhost:3000/bookhub/users/me/${liked ? 'unlike' : 'like'}/${id}`, {
        method,
        credentials: 'include',
      });

      if (response.ok) {
        setLiked(!liked);
      } else {
        Swal.fire('Error', 'No se pudo actualizar el like.', 'error');
      }
    } catch (error) {
      console.error('❌ Error al hacer like/unlike:', error.message);
      Swal.fire('Error', 'Hubo un problema con el like.', 'error');
    }
  };

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

  const handleRead = () => {
    const fileType = book.fileType?.toLowerCase();
    if (fileType === 'epub') {
      Swal.fire({
        title: '📖 Lector EPUB',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div id="epub-reader" style="width: 100%; height: 65vh; background: white; border-radius: 8px;"></div>
            <div style="display: flex; justify-content: center; gap: 1rem;">
              <button id="prev-page" style="padding: 6px 12px; border-radius: 15px; background: #000; color: white;">⬅️</button>
              <span id="progress" style="color: black; font-weight: 500; margin-top: 7px"></span>
              <button id="next-page" style="padding: 6px 12px; border-radius: 15px; background: #000; color: white;">➡️</button>
            </div>
          </div>
        `,
        width: '90%',
        customClass: {
          popup: 'p-0',
        },
        showConfirmButton: false,
        showCloseButton: true,
        didOpen: () => {
          const bookInstance = ePub(book.file);
          const rendition = bookInstance.renderTo('epub-reader', {
            width: '100%',
            height: '100%',
          });

          rendition.display();

          // Botones navegación
          document.getElementById('prev-page')?.addEventListener('click', () => {
            rendition.prev();
          });

          document.getElementById('next-page')?.addEventListener('click', () => {
            rendition.next();
          });

          // Progreso
          bookInstance.ready.then(() => {
            bookInstance.locations.generate(1000).then(() => {
              rendition.on('relocated', (location) => {
                const percent = bookInstance.locations.percentageFromCfi(location.start.cfi);
                const progressText = `${Math.round(percent * 100)}% leído`;
                const progressElement = document.getElementById('progress');
                if (progressElement) progressElement.textContent = progressText;
              });
            });
          });
        }
      });
    } else if (fileType === 'pdf') {
      window.open(book.file, '_blank');
    } else {
      Swal.fire('Error', 'Formato no soportado para lectura en línea.', 'error');
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
              className="rounded-2xl h-[500px] lg:h-[750px] object-cover outline-1 outline-black"
            />
          </div>

          <div className="w-full flex flex-col items-center h-[650px] lg:h-[750px] justify-between">
            <div className="flex flex-col p-6 w-11/12 bg-black/20 rounded-3xl items-center h-[85%]">
            <h1 className="text-3xl font-bold text-center">{book.title}</h1>
            <p className="text-sm mb-4 text-center">{book.author}</p>
              <div className="flex items-center gap-3 mb-2 justify-center flex-wrap">
                
                {currentUser && (
                  <button onClick={toggleLike} className="focus:outline-none" aria-label="Dar like">
                    {liked ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-600 hover:scale-110 transition-transform cursor-pointer" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
                        2.09C13.09 3.81 14.76 3 16.5 
                        3 19.58 3 22 5.42 22 8.5c0 
                        3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-black hover:scale-110 transition-transform cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21.35l-1.45-1.32C5.4 
                          15.36 2 12.28 2 8.5 2 5.42 4.42 
                          3 7.5 3c1.74 0 3.41 0.81 4.5 
                          2.09C13.09 3.81 14.76 3 16.5 
                          3 19.58 3 22 5.42 22 8.5c0 
                          3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
              

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
                className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-all cursor-pointer"
              >
                Descargar
              </button>

              <button
                onClick={handleRead}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all cursor-pointer"
              >
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
      <Footer/>
    </>
  );
};

export default BookDetails;
