import React from 'react'
import Header from '../components/Header'

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen gap-20 flex-col lg:flex-row">
        <div>
          <img
            src="https://lalalab-bo-catalog.s3.eu-west-1.amazonaws.com/Tirages_Photo_Carre_Personnalise_10x10cm_Slide_02_2058eebc61_ec52d91d82.webp"
            alt="Foto de perfil"
            className="rounded-full"
            width="400px"
          />
        </div>
        <div className="bg-black/20 flex flex-col w-96 items-center rounded-2xl p-7 shadow-2xl">
          <p className="text-4xl mb-4 text-black font-medium">Mi perfil</p>
          <form className="flex flex-col gap-3 w-full">
            <label htmlFor="email" className="text-black">Email</label>
            <input id="email" type="text" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="username" className="text-black">Usuario</label>
            <input id="username" type="text" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="password" className="text-black">Contraseña</label>
            <input id="password" type="password" className="bg-white rounded-md p-2 shadow" required />

            <label htmlFor="repeatPassword" className="text-black">Repetir Contraseña</label>
            <input id="repeatPassword" type="password" className="bg-white rounded-md p-2 shadow" required />

            <button className="bg-black text-white pt-4 pb-4 rounded-2xl mt-4 cursor-pointer">
              Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
