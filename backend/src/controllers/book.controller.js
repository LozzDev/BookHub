const Book = require('../models/book.model');
const { cloudinary } = require('../config/cloudinary');
const fs = require('fs');

async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros' });
  }
}

async function getBookById(req, res) {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: `No existe libro con id ${id}` });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar el libro' });
  }
}

async function getBookByUserId(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const userId = req.user.id;
    const books = await Book.find({ userId });

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function createBook(req, res) {
  try {
    const { title, author, genre, description, fileType } = req.body;
    const file = req.files?.file?.[0];
    const coverImage = req.files?.coverImage?.[0];

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (
      !title ||
      !author ||
      !genre ||
      !description ||
      !fileType ||
      !file ||
      !coverImage
    ) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    if (!fs.existsSync(file.path)) {
      return res
        .status(400)
        .json({
          message:
            'Archivo del libro no encontrado. Por favor, vuelve a subirlo.',
        });
    }

    if (!fs.existsSync(coverImage.path)) {
      return res
        .status(400)
        .json({
          message:
            'Imagen de portada no encontrada. Por favor, vuelve a subirla.',
        });
    }

    const fileExt = file.originalname.split('.').pop();

    const uploadedFile = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw',
      folder: 'bookhub/files',
      type: 'upload',
      use_filename: true,
      unique_filename: false,
      filename_override: file.originalname,
      format: file.originalname.split('.').pop(),
    });

    const secureUrlRaw = uploadedFile.secure_url.replace(
      '/image/upload/',
      '/raw/upload/'
    );

    const uploadedCover = await cloudinary.uploader.upload(coverImage.path, {
      resource_type: 'image',
      folder: 'bookhub/covers',
    });

    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    if (fs.existsSync(coverImage.path)) fs.unlinkSync(coverImage.path);

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      fileType,
      file: secureUrlRaw,
      coverImage: uploadedCover.secure_url,
      userId: req.user.id,
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message,
    });
  }
}

async function deleteBookById(req, res) {
  const id = req.params.id;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: `No existe libro con id ${id}` });
    }

    const extractPublicId = (url) => {
      const parts = url.split('/');
      const publicWithExtension = parts[parts.length - 1];
      return publicWithExtension.split('.')[0];
    };

    const fileId = extractPublicId(book.file);
    const coverId = extractPublicId(book.coverImage);

    await cloudinary.uploader.destroy(`bookhub/files/${fileId}`, {
      resource_type: 'raw',
    });
    await cloudinary.uploader.destroy(`bookhub/covers/${coverId}`, {
      resource_type: 'image',
    });

    return res
      .status(200)
      .json({ message: 'Libro y archivos eliminados', book });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error borrando el libro', error: error.message });
  }
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  deleteBookById,
  getBookByUserId,
};
