import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Swal from 'sweetalert2';

const Profile = () => {
  const [userData, setUserData] = useState({ email: '', name: '' });
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/bookhub/users/me', {
          credentials: 'include',
        });
        if (res.ok) {
          const user = await res.json();
          setUserData(user);
          setFormData({ email: user.email, name: user.name });
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error);
      }
    };

    fetchUser();
  }, []);

  const handleInfoChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire('Email inválido', 'Introduce un email con formato válido.', 'warning');
      return;
    }

    if (formData.email === userData.email && formData.name === userData.name) {
      Swal.fire('Sin cambios', 'No has modificado ningún dato.', 'info');
      return;
    }

    const confirm = await Swal.fire({
      title: '¿Confirmar cambios?',
      text: '¿Quieres guardar los nuevos datos del perfil?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/bookhub/users/${userData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire('Actualizado', 'Tu perfil ha sido actualizado con éxito.', 'success');
        setEditable(false);
        setUserData((prev) => ({
          ...prev,
          name: formData.name,
          email: formData.email,
        }));
      } else {
        Swal.fire('Error', 'No se pudo actualizar el perfil.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Hubo un problema al actualizar.', 'error');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      Swal.fire('Campos incompletos', 'Completa ambos campos de contraseña.', 'warning');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      Swal.fire('Contraseña débil', 'La nueva contraseña debe tener al menos 8 caracteres.', 'warning');
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      Swal.fire('Inválido', 'La nueva contraseña no puede ser igual a la actual.', 'warning');
      return;
    }

    const confirm = await Swal.fire({
      title: '¿Confirmar cambio?',
      text: '¿Seguro que quieres cambiar tu contraseña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/bookhub/users/${userData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          password: passwordData.newPassword,
          currentPassword: passwordData.currentPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Contraseña actualizada', 'Tu nueva contraseña ha sido guardada.', 'success');
        setPasswordData({ currentPassword: '', newPassword: '' });
      } else {
        Swal.fire('Error', data.message || 'No se pudo actualizar la contraseña.', 'error');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Hubo un problema al cambiar la contraseña.', 'error');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen gap-30 flex-col lg:flex-row px-4">
        <div>
          <img
            src="/user.webp"
            alt="Foto de perfil"
            className="rounded-full"
            width="300px"
          />
        </div>

        <div className="flex flex-col w-full max-w-md gap-10">
          {/* Sección info personal */}
          <div className="bg-black/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">Mis datos</h2>
            <form className="flex flex-col gap-3" onSubmit={handleUpdateInfo}>
              <label htmlFor="email" className="text-black">Email</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInfoChange}
                disabled={!editable}
                className={`bg-white rounded-md p-2 shadow ${editable ? '' : 'opacity-60 cursor-not-allowed'}`}
                required
              />

              <label htmlFor="name" className="text-black">Usuario</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInfoChange}
                disabled={!editable}
                className={`bg-white rounded-md p-2 shadow ${editable ? '' : 'opacity-60 cursor-not-allowed'}`}
                required
              />

              {editable && (
                <button
                  type="submit"
                  className="bg-white text-black pt-3 pb-3 px-6 rounded-2xl mt-4 cursor-pointer outline-1 outline-black"
                >
                  Guardar cambios
                </button>
              )}
            </form>

            {!editable && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => setEditable(true)}
                  className="bg-black text-white pt-3 pb-3 px-6 rounded-2xl mt-4 cursor-pointer w-full"
                >
                  Modificar datos
                </button>
              </div>
            )}
          </div>

          {/* Sección cambiar contraseña */}
          <div className="bg-black/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-center mb-4 text-black">Cambiar contraseña</h2>
            <form className="flex flex-col gap-3" onSubmit={handleUpdatePassword}>
              <label htmlFor="currentPassword" className="text-black">Contraseña actual</label>
              <input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="bg-white rounded-md p-2 shadow"
                required
              />

              <label htmlFor="newPassword" className="text-black">Nueva contraseña</label>
              <input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="bg-white rounded-md p-2 shadow"
                required
              />

              <button
                type="submit"
                className="bg-black text-white pt-3 pb-3 rounded-2xl mt-4 cursor-pointer"
              >
                Cambiar contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
