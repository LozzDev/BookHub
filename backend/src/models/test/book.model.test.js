const Book = require('../book.model');

describe('Modelo Book - validaciones', () => {
  it('falla si faltan campos obligatorios', async () => {
    const book = new Book({}); 

    let error;
    try {
      await book.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.title).toBeDefined();
    expect(error.errors.author).toBeDefined();
    expect(error.errors.description).toBeDefined();
    expect(error.errors.genre).toBeDefined();
    expect(error.errors.coverImage).toBeDefined();
    expect(error.errors.file).toBeDefined();
    expect(error.errors.fileType).toBeDefined();
  });

  it('falla si genre no está en la lista de valores válidos', async () => {
    const book = new Book({
      title: 'Test',
      author: 'Autor',
      description: 'Desc',
      genre: 'Comedia', 
      coverImage: 'img.jpg',
      file: 'libro.pdf',
      fileType: 'PDF',
    });

    await expect(book.validate()).rejects.toThrow();
  });

  it('falla si fileType no es PDF o EPUB', async () => {
    const book = new Book({
      title: 'Test',
      author: 'Autor',
      description: 'Desc',
      genre: 'Drama',
      coverImage: 'img.jpg',
      file: 'libro.txt',
      fileType: 'TXT', 
    });

    await expect(book.validate()).rejects.toThrow();
  });

  it('valida correctamente un libro válido', async () => {
    const book = new Book({
      title: 'Test',
      author: 'Autor',
      description: 'Descripción del libro',
      genre: 'Fantasy',
      coverImage: 'https://portada.jpg',
      file: 'libro.pdf',
      fileType: 'PDF',
      usuarioId: 'usuario123'
    });

    await expect(book.validate()).resolves.toBeUndefined();
  });
});
