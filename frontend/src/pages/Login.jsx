import React from 'react'
import Header from '../components/Header'
const Login = () => {
  return (
    <div>
      <Header/>
        <div
        className="flex justify-center items-center min-h-screen"
        >
        <div className='bg-black/20 flex flex-col w-96 items-center rounded-2xl p-7 shadow-2xl'>
          <p className='text-xl mb-4 text-black font-medium'>Iniciar sesión</p>
          <form action="" className='flex flex-col gap-5 w-full'>
            <label className='text-black'>Usuario</label>
            <input type="text" className='bg-white rounded-md p-2 shadow' />
            <label className='text-black'>Contraseña</label>
            <input type="password" className='bg-white rounded-md p-2 shadow' />
            <button className='bg-black text-white pt-4 pb-4 rounded-2xl mt-4 cursor-pointer'>
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
    
  )
}

export default Login
