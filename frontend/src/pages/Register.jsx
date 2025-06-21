import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/bookhub/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        setSuccessMessage(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.log('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        {successMessage ? (
          <h1 className="text-4xl font-bold text-green-600">
            ¡Registro exitoso!
          </h1>
        ) : (
          <div className="bg-black/20 flex flex-col w-96 items-center rounded-2xl p-7 shadow-2xl">
            <p className="text-xl mb-4 text-black font-medium">Registrarse</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <label className="text-black">Email</label>
              <input
                type="email"
                className="bg-white rounded-md p-2 shadow"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="text-black">Usuario</label>
              <input
                type="text"
                className="bg-white rounded-md p-2 shadow"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="text-black">Contraseña</label>
              <input
                type="password"
                className="bg-white rounded-md p-2 shadow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="text-black">Repetir contraseña</label>
              <input
                type="password"
                className="bg-white rounded-md p-2 shadow"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white pt-4 pb-4 rounded-2xl mt-4 cursor-pointer"
              >
                Registrarse
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Register;
