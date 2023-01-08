const Header = ({ genres }) => {
  return (
    <header className="movie__header">
      <ul className="movie__genres">
        {genres?.map((genre) => (
          <li key={genre.id} className="movie__genre">
            {genre.name}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
