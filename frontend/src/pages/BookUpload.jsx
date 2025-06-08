import React, { useState } from 'react';
import Header from '../components/Header';

const MAX_BOOK_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5 MB

const BookUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    coverImage: null,
    description: '',
    file: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [redirecting, setRedirecting] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 🔄 nuevo estado

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      if (!file) return;

      if (name === 'file' && file.size > MAX_BOOK_SIZE) {
        alert('📘 El archivo del libro supera los 10 MB permitidos.');
        return;
      }

      if (name === 'coverImage' && file.size > MAX_COVER_SIZE) {
        alert('🖼️ La imagen de portada supera los 5 MB permitidos.');
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mostrar spinner

    try {
      if (!formData.file || !formData.coverImage) {
        alert('Debes seleccionar un archivo PDF/EPUB y una imagen de portada.');
        setIsLoading(false);
        return;
      }

      const extension = formData.file.name.split('.').pop().toLowerCase();
      const validTypes = ['pdf', 'epub'];
      if (!validTypes.includes(extension)) {
        alert('Formato no válido. Solo se aceptan PDF o EPUB.');
        setIsLoading(false);
        return;
      }

      const fileType = extension === 'pdf' ? 'PDF' : 'EPUB';

      const form = new FormData();
      form.append('title', formData.title);
      form.append('author', formData.author);
      form.append('genre', formData.genre);
      form.append('description', formData.description);
      form.append('fileType', fileType);
      form.append('file', formData.file);
      form.append('coverImage', formData.coverImage);

      const response = await fetch('http://localhost:3000/bookhub/books', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error del servidor: ${response.status} - ${text}`);
      }

      const result = await response.json();
      console.log('✅ Libro subido:', result);

      setSuccessMessage('✅ Libro subido correctamente');
      setRedirecting(true);

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      setFormData({
        title: '',
        author: '',
        genre: '',
        coverImage: null,
        description: '',
        file: null,
      });
    } catch (error) {
      console.error('❌ Error al subir el libro:', error.message);
      alert(`Error al subir el libro: ${error.message}`);
    } finally {
      setIsLoading(false); // Ocultar spinner
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="bg-black/20 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-center text-xl font-semibold mb-6">¡Sube tu libro!</h2>

          <label htmlFor="title" className="block mb-2 text-sm">Título</label>
          <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 mb-4 rounded-full border-none focus:outline-none bg-white" required />

          <label htmlFor="author" className="block mb-2 text-sm">Autor/Autora</label>
          <input id="author" name="author" type="text" value={formData.author} onChange={handleChange} className="w-full px-4 py-2 mb-4 rounded-full border-none focus:outline-none bg-white" required />

          <label htmlFor="genre" className="block mb-2 text-sm">Género</label>
          <select id="genre" name="genre" value={formData.genre} onChange={handleChange} className="w-full px-4 py-2 mb-4 rounded-full border-none focus:outline-none bg-white" required>
            <option value="">Selecciona un género</option>
            <option value="Fantasy">Fantasía</option>
            <option value="Science Fiction">Ciencia ficción</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Terror</option>
            <option value="Mystery">Misterio</option>
            <option value="Historical">Histórico</option>
            <option value="Thriller">Suspenso</option>
            <option value="Adventure">Aventura</option>
            <option value="Biography">Biografía</option>
            <option value="Children">Infantil</option>
            <option value="Drama">Drama</option>
            <option value="Poetry">Poesía</option>
          </select>

          <label htmlFor="description" className="block mb-2 text-sm">Sinopsis</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 mb-4 rounded-lg border-none focus:outline-none bg-white" required />

          <label htmlFor="coverImage" className="block mb-2 text-sm">Imagen de portada (máx. 5MB)</label>
          <input id="coverImage" name="coverImage" type="file" accept="image/*" onChange={handleChange} className="w-full p-2 mb-6 rounded-lg bg-white text-sm" required />

          <label htmlFor="file" className="block mb-2 text-sm">Archivo libro (PDF o EPUB máx. 10MB)</label>
          <input id="file" name="file" type="file" accept=".pdf,.epub" onChange={handleChange} className="w-full p-2 mb-6 rounded-lg bg-white text-sm" required />

          <div className="flex justify-center">
            <button type="submit" disabled={isLoading} className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all flex items-center gap-2">
              {isLoading ? 'Subiendo...' : 'Subir'}
              {isLoading && <span className="animate-spin">🔄</span>}
            </button>
          </div>

          {successMessage && (
            <p className="mt-4 text-green-600 text-sm text-center">{successMessage}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default BookUpload;
