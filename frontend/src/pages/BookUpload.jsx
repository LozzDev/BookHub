import React, { useState } from 'react';
import Header from '../components/Header';

const BookUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    coverImage: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('author', formData.author);
      form.append('genre', formData.genre);
      form.append('coverImage', formData.coverImage);
      form.append('description', formData.description);
      form.append('file', formData.file);

      await fetch('http://localhost:3000/bookhub/books', {
        method: 'POST',
        body: form,
      });
    } catch (error) {
      console.error('Error al subir el libro:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b flex items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="bg-[#d2c5b3] p-8 rounded-xl shadow-lg w-full max-w-md">
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

          <label htmlFor="coverImage" className="block mb-2 text-sm">Imagen de portada</label>
          <input id="coverImage" name="coverImage" type="text" value={formData.coverImage} onChange={handleChange} className="w-full px-4 py-2 mb-4 rounded-full border-none focus:outline-none bg-white" />

          <label htmlFor="description" className="block mb-2 text-sm">Sinopsis</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 mb-4 rounded-lg border-none focus:outline-none bg-white" required />

          <label htmlFor="file" className="block mb-2 text-sm">PDF o Epub</label>
          <input id="file" name="file" type="file" accept=".pdf,.epub" onChange={handleChange} className="w-full p-2 mb-6 rounded-lg bg-white text-sm" required />

          <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all flex items-center gap-2">Subir</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookUpload;