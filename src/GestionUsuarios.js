// src/GestionUsuarios.js
import React, { useState, useEffect, useRef } from 'react';
import TopBar from './components/TopBar';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: auto;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 9px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }
`;

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [newUsuario, setNewUsuario] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filterRole, setFilterRole] = useState('all');
  const refContainer = useRef(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    fetch('http://localhost:8001/users')
      .then(response => response.json())
      .then(data => setUsuarios(data));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
  };

  const isFormValid = () => {
    return newUsuario.first_name && newUsuario.last_name && newUsuario.email && validateEmail(newUsuario.email) && newUsuario.password === newUsuario.confirmPassword;
  };

  const handleAddOrUpdateUsuario = () => {
    if (!isFormValid()) {
      return alert("Por favor, completa todos los campos obligatorios y asegúrate de que las contraseñas coinciden.");
    }
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:8001/users/${newUsuario.user_id}` : 'http://localhost:8001/users/';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUsuario)
    })
    .then(response => response.json())
    .then(data => {
      if (isEditing) {
        setUsuarios(usuarios.map(user => user.user_id === newUsuario.user_id ? newUsuario : user));
      } else {
        setUsuarios([...usuarios, data.User]);
      }
      fetchUsuarios();
    });

    setNewUsuario({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '', role: 'user' });
    setIsEditing(false);
  };

  const handleDeleteUsuario = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      fetch(`http://localhost:8001/users/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        setUsuarios(usuarios.filter(user => user.user_id !== id));
      });
    }
  };

  const handleEditUsuario = (user) => {
    const passwordactual = user.password;
    user.confirmPassword = passwordactual;
    setNewUsuario(user);

    
    
    setIsEditing(true);
    refContainer.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetPassword = (id) => {
    if (window.confirm("¿Estás seguro de que deseas resetear la contraseña de este usuario?")) {
      fetch(`http://localhost:8001/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: 'contraseña123' })
    })
      .then(response => response.json())
      .then(data => {
        alert(`Contraseña reseteada. La nueva contraseña es: contraseña123`);
      });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const filteredUsuarios = filterRole === 'all' ? usuarios : usuarios.filter(user => user.role === filterRole);

  return (
    <Container ref={refContainer}>
      <TopBar 
        menuItems={[{ label: 'Inicio', path: '/' }]}
        gestionLinks={[ 
          { label: 'Gestión de Usuarios', path: '/gestion/usuarios' },
          { label: 'Gestión de Cabañas', path: '/gestion/cabanas' },
          { label: 'Gestión de Reservas', path: '/gestion/reservas' }
        ]}
      />
      <h1>Gestión de Usuarios</h1>

      <FormSection>
        <Label>Nombre:</Label>
        <Input 
          name="first_name"
          value={newUsuario.first_name}
          onChange={handleInputChange}
        />

        <Label>Apellido:</Label>
        <Input 
          name="last_name"
          value={newUsuario.last_name}
          onChange={handleInputChange}
        />

        <Label>Email:</Label>
        <Input 
          name="email"
          type="email"
          value={newUsuario.email}
          onChange={handleInputChange}
        />

        <Label>Contraseña:</Label>
        <Input 
          name="password"
          type="password"
          value={newUsuario.password}
          onChange={handleInputChange}
        />

        <Label>Confirmar Contraseña:</Label>
        <Input 
          name="confirmPassword"
          type="password"
          value={newUsuario.confirmPassword}
          onChange={handleInputChange}
        />

        <Label>Rol:</Label>
        <select name="role" value={newUsuario.role} onChange={handleInputChange}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </FormSection>

      <Button
        onClick={handleAddOrUpdateUsuario}
        disabled={!isFormValid()}
      >
        {isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}
      </Button>

      <Label>Filtrar por Rol:</Label>
      <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
        <option value="all">Ver Todos</option>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map(user => (
            <tr key={user.user_id} title={`Creado: ${new Date(user.registration_date).toLocaleString()}, Modificado: ${new Date(user.modified_date).toLocaleString()}`}>
              <td>{user.user_id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button onClick={() => handleEditUsuario(user)}>Editar</Button>
                <Button onClick={() => handleDeleteUsuario(user.user_id)}>Eliminar</Button>
                <Button onClick={() => handleResetPassword(user.user_id)}>Resetear Contraseña</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionUsuarios;
