
const BookCard = ({ image, title, author, onDetailsClick }) => {
  return (
    <div className="book-card">
      <div className="book-image-container">
        <img src={image} alt={title} />
      </div>
      <div className="book-info flex">
        <div>
          <p className="book-title">{title}</p>
          <p className="book-author">{author}</p>
        </div>
        <button onClick={onDetailsClick}>Detalles</button>
      </div>
    </div>
  );
};

export default BookCard;