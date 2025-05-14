const BookCard = ({ image, title, author, onDetailsClick }) => {
  return (
    <div className="book-card bg-white rounded-xl shadow-md p-4 w-64 flex flex-col items-center gap-4 transition-transform hover:scale-105">
      <div className="book-image-container w-full h-64 overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="book-info w-full flex flex-col items-start gap-2">
        <div>
          <p className="book-title text-lg font-semibold">{title}</p>
          <p className="book-author text-sm text-gray-600">de {author}</p>
        </div>
        <button
          onClick={onDetailsClick}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Detalles
        </button>
      </div>
    </div>
  );
};

export default BookCard;
