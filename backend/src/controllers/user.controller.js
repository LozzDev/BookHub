const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function login (req, res){
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        //generar el token
        const token = jwt.sign(
            {
                id: user._id, email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24h
        })

        return res.status(200).json({ message: 'login exitoso' })
    }catch(error){
        console.error('Error al buscar usuario: ', error)
    }
}

async function createUser (req,res){

    const {email, password, name} = req.body;

    try{
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User(
            {
                email,
                password: hashedPassword,
                name
            }
        );

        await newUser.save();

        return res.status(201).json({ message: 'Usuario creado correctamente', user: newUser.name });

    }catch(error){
        console.error('Error creando el usuario: ',error);
        return res.status(500).json({ message: 'Error creando el usuario' });
    }
}

async function deleteUserById(req, res){
    const id = req.params.id.trim();

    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
           return res.status(404).send({message: 'No existe usuario con ese id: '+id}); 
        }
        return res.status(200).json(user)
    }catch(error){
        console.error('Error borrando el usuario: ', error);
        res.status(500).json({message: 'Error borrando el usuario'});
    }
}

async function getUserById(req, res) {
    const id = req.params.id.trim();

    try {
        const user = await User.findById(id).select('-password'); // Excluye el password

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado con ese ID: ' + id });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario: ', error);
        return res.status(500).json({ message: 'Error al obtener el usuario' });
    }
}

async function getMe(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error en getMe:', error);
    return res.status(500).json({ message: 'Error al obtener el usuario' });
  }
}

async function updateUserById(req, res) {
  const id = req.params.id.trim();
  const { name, email, password, currentPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si se quiere cambiar la contraseña, verificar primero la actual
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Debes proporcionar tu contraseña actual para cambiarla' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'La contraseña actual no coincide' });
      }

      const hashedNewPassword = await bcrypt.hash(password, 10);
      user.password = hashedNewPassword;
    }

    // Cambiar email si es diferente
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Ese email ya está en uso' });
      }
      user.email = email;
    }

    // Cambiar nombre si es diferente
    if (name && name !== user.name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({
      message: 'Usuario actualizado correctamente',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error actualizando el usuario: ', error);
    return res.status(500).json({ message: 'Error actualizando el usuario' });
  }
}

module.exports = {
    login,
    createUser,
    deleteUserById,
    getUserById,
    getMe,
    updateUserById
}

