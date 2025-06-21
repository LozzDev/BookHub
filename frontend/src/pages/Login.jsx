import React, { useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/bookhub/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 🔥 ESTO ES CLAVE PARA ENVIAR Y RECIBIR COOKIES
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Login exitoso:', data)

        // Guardar el token en localStorage si quieres
        localStorage.setItem('token', data.token)

        // Redirigir al dashboard o página principal
        navigate('/')
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      console.error('Error al hacer login:', error)
      setErrorMessage('Ocurrió un error en el servidor')
    }
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className='bg-black/20 flex flex-col w-96 items-center rounded-2xl p-7 shadow-2xl'>
          <p className='text-xl mb-4 text-black font-medium'>Iniciar sesión</p>
          {errorMessage && (
            <p className="text-red-600 text-sm mb-2">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
            <label className='text-black'>Email</label>
            <input
              type="email"
              className='bg-white rounded-md p-2 shadow'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className='text-black'>Contraseña</label>
            <input
              type="password"
              className='bg-white rounded-md p-2 shadow'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className='bg-black text-white pt-4 pb-4 rounded-2xl mt-4 cursor-pointer'
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
     <Footer/> 
    </div>
  )
}

export default Login
