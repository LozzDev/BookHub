const BookCard = ({ image, title, author, onDetailsClick }) => {
  return (
    <div className="book-card bg-black/30 rounded-3xl shadow-lg p-2 w-58 flex flex-col items-center gap-2 transition-transform h-full">
      <div className="book-image-container w-full h-40 overflow-hidden rounded-2xl">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="book-info w-full flex items-center gap-6 justify-center">
        <div className="max-w-[6rem]">
          <p
            className="book-title text-md font-semibold truncate"
            title={title}
          >
            {title}
          </p>
          <p
            className="book-author text-sm text-gray-600 truncate"
            title={author}
          >
            {author}
          </p>
        </div>
        <button
          onClick={onDetailsClick}
          className="mt-2 px-4 py-1 text-sm bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer rounded-full mb-6"
        >
          Detalles
        </button>
      </div>
    </div>
  );
};

export default BookCard;
