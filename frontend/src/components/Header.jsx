import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include',
        });
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:3000/bookhub/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setIsAuthenticated(false);
        window.location.reload();
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  return (
    <div className="flex bg-black w-full h-20 place-items-center mb-20 justify-between px-5">
      {/* Logo */}
      <div
        className="logo cursor-pointer flex items-center gap-3"
        onClick={() => navigate('/')}
      >
        <img src="../../public/MiniBook.png" width={40} />
        <p
          className="text-[#f4ede0] font-medium tracking-widest text-lg lg:text-xl"
          style={{ fontFamily: 'Karma, serif' }}
        >
          BOOKHUB
        </p>
      </div>

      {/* Desktop buttons */}
      <div className="gap-5 hidden lg:flex items-center">
        {isAuthenticated && (
          <>
            <button
              className="bg-[#1064FF] text-white font-medium px-4 py-1 rounded-full cursor-pointer"
              onClick={() => navigate('/book-upload')}
            >
              Subir un libro
            </button>
            <button
              className="bg-white px-4 py-1 rounded-full cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              Mi perfil
            </button>
            <button
              className="text-[#f4ede0] border border-[#f4ede0] px-4 py-1 rounded-full cursor-pointer bg-red-600"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          </>
        )}
        {!isAuthenticated && (
          <button
            className="text-[#f4ede0] px-4 py-1 rounded cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger Menu (Mobile Only) */}
      <div className="lg:hidden relative">
        <button
          className="text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
            {isAuthenticated && (
              <>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/book-upload');
                  }}
                >
                  Subir un libro
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/profile');
                  }}
                >
                  Mi perfil
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                >
                  Cerrar sesión
                </button>
              </>
            )}
            {!isAuthenticated && (
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/login');
                }}
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
