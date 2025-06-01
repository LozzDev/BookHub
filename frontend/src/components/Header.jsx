
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Header = () => {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include'
        });
        setIsAuthenticated(res.ok);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className='flex bg-black w-full h-20 place-items-center mb-20'>
        <div className='logo m-5 cursor-pointer' onClick={() => {
                 navigate(`/`);
            }}>
            <img src="" alt="" />
            <p className='text-amber-200'>BookHub</p>
        </div>
        <div className='gap-9 flex '>
            {
            isAuthenticated && (
                <button className='bg-white cursor-pointer' onClick={() => {
                navigate(`/book-upload`);
                }}>
                Subir un libro
                </button>
            )
            }

            {
            isAuthenticated && (
                <button className='bg-white cursor-pointer' onClick={() => {
                navigate(`/profile`);
                }}>
                Mi perfil
                </button>
            )
            }
            {
            !isAuthenticated && (
                <button className='bg-white cursor-pointer' onClick={() => {
                navigate(`/login`);
                }}>
                Login
                </button>
            )
            }
        </div>

    </div>
  )
}

export default Header