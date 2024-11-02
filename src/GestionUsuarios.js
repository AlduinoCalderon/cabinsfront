// src/GestionUsuarios.js
import React, { useState } from 'react';
import TopBar from './components/TopBar';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    rol: 'cliente',
    estado: false,
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(newUsuario.password !== newUsuario.confirmPassword);
    }
  };

  const isFormValid = () => {
    return (
      newUsuario.nombre &&
      newUsuario.apellidoPaterno &&
      newUsuario.email &&
      newUsuario.telefono &&
      newUsuario.password &&
      newUsuario.confirmPassword &&
      !passwordMismatch
    );
  };

  const handleAddUsuario = () => {
    if (!isFormValid()) return alert("Por favor, completa todos los campos obligatorios.");
    const usuario = { ...newUsuario, id: Date.now(), deleted: false };
    setUsuarios([...usuarios, usuario]);
    setNewUsuario({
      nombre: '', apellidoPaterno: '', apellidoMaterno: '', email: '', telefono: '',
      password: '', confirmPassword: '', rol: 'cliente', estado: false,
    });
    setPasswordMismatch(false);
  };

  const handleDeleteUsuario = (id) => {
    setUsuarios(usuarios.map(usuario => usuario.id === id ? { ...usuario, deleted: true } : usuario));
  };
  return (
    <div>
      <TopBar 
        menuItems={[{ label: 'Inicio', path: '/' }]}
        gestionLinks={[
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' },
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' },
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <h1>Gestión de Usuarios</h1>
      <div style={{ marginBottom: '20px' }}>
        <input type="text" name="nombre" placeholder="Nombre" value={newUsuario.nombre} onChange={handleInputChange} />
        <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={newUsuario.apellidoPaterno} onChange={handleInputChange} />
        <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={newUsuario.apellidoMaterno} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Correo Electrónico" value={newUsuario.email} onChange={handleInputChange} />
        <input type="tel" name="telefono" placeholder="Teléfono" value={newUsuario.telefono} onChange={handleInputChange} />
        
        <input type="password" name="password" placeholder="Contraseña" value={newUsuario.password} onChange={handleInputChange} />
        <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={newUsuario.confirmPassword} onChange={handleInputChange} />
        
        {passwordMismatch && <p style={{ color: 'red' }}>Las contraseñas no coinciden</p>}

        <select name="rol" value={newUsuario.rol} onChange={handleInputChange}>
          <option value="cliente">Cliente</option>
          <option value="administrador">Administrador</option>
        </select>

        <label>
          Activo: 
          <input type="checkbox" name="estado" checked={newUsuario.estado} onChange={handleInputChange} />
        </label>
        
        <button onClick={handleAddUsuario} disabled={!isFormValid()}>Guardar Nuevo Usuario</button>
      </div>

      <h3>Lista de Usuarios</h3>
      <ul>
        {usuarios.filter(usuario => !usuario.deleted).map(usuario => (
          <li key={usuario.id}>
            <strong>{usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</strong>
            <p>{usuario.email} - {usuario.telefono} - Rol: {usuario.rol}</p>
            <p>Estado: {usuario.estado ? "Activo" : "Inactivo"}</p>
            <button onClick={() => handleDeleteUsuario(usuario.id)}>Borrar Lógico</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionUsuarios;
