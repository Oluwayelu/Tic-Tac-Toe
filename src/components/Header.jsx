import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 px-5 lg:px-10 py-5 w-full flex items-center justify-center z-50">
      <Link to="/">
        <h1 className="text-2xl lg:text-6xl font-mono">Tic Tac Toe</h1>
      </Link>
    </nav>
  );
};

export default Header;
