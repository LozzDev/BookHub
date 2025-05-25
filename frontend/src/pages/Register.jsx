import React from 'react'
import Header from '../components/Header'

const Register = () => {
  return (
    <div>
      <Header/>
        <div
        className="flex justify-center items-center min-h-screen"
        >
        <div className='bg-black/20 flex flex-col w-96 items-center rounded-2xl p-7 shadow-2xl'>
          <p className='text-xl mb-4 text-black font-medium'>Registrarse</p>
          <form className="flex flex-col gap-3 w-full">
            <label htmlFor="email" className="text-black">Email</label>
            <input id="email" type="text" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="username" className="text-black">Usuario</label>
            <input id="username" type="text" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="password" className="text-black">Contraseña</label>
            <input id="password" type="password" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="repeatPassword" className="text-black">Repetir contraseña</label>
            <input id="repeatPassword" type="password" className="bg-white rounded-md p-2 shadow" required />

            <button className="bg-black text-white pt-4 pb-4 rounded-2xl mt-4 cursor-pointer">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register