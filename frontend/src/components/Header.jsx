import React from 'react'
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate();

  return (
    <div className='flex bg-black w-full h-20 place-items-center'>
        <div className='logo m-5 cursor-pointer' onClick={() => {
                 navigate(`/`);
            }}>
            <img src="" alt="" />
            <p className='text-amber-200'>BookHub</p>
        </div>
        <div className='gap-9 flex '>
            <button className='bg-white cursor-pointer' onClick={() => {
                 navigate(`/book-upload`);
            }}>
                Subir un libro
            </button>
            <button className='bg-white cursor-pointer' onClick={() => {
                 navigate(`/profile`);
            }}>
                Mi perfil
            </button>
        </div>

    </div>
  )
}

export default Header