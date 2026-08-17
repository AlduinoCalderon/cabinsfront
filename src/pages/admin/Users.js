import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import NavBar from '../../components/layout/NavBar';
import { RedButton, Button, BlueButton, YellowButton, Input, Select, Container, Title } from '../../styles/styles';
import { useUsers } from '../../hooks/useUsers';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
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

const ErrorText = styled.div`
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
`;

const GestionUsuarios = () => {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();
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
  const [errorMessages, setErrorMessages] = useState({});
  const refContainer = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUsuario({ ...newUsuario, [name]: value });
    validateForm({ ...newUsuario, [name]: value });
  };

  const validateForm = (usuario) => {
    const errors = {};

    if (usuario.password && usuario.confirmPassword && usuario.password !== usuario.confirmPassword) {
      errors.passwordMismatch = 'Las contraseñas no coinciden';
    } else {
      delete errors.passwordMismatch;
    }

    if (usuario.email && !validateEmail(usuario.email)) {
      errors.invalidEmail = 'Correo electrónico no válido';
    } else {
      delete errors.invalidEmail;
    }

    setErrorMessages(errors);
  };

  const isFormValid = () => {
    return newUsuario.first_name && 
           newUsuario.last_name && 
           newUsuario.email && 
           validateEmail(newUsuario.email) && 
           newUsuario.password === newUsuario.confirmPassword;
  };
  
  const checkIfEmailExists = (email) => {
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };
  
  const handleAddOrUpdateUsuario = async () => {
    if (newUsuario.password !== newUsuario.confirmPassword) {
      return alert("Las contraseñas no coinciden.");
    }
  
    if (!validateEmail(newUsuario.email)) {
      return alert("El formato del correo electrónico no es válido.");
    }
  
    if (checkIfEmailExists(newUsuario.email) && !isEditing) {
      setNewUsuario({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '', role: 'user' });
      setIsEditing(false);
      return alert("El correo electrónico ya está registrado.");
    }

    try {
      if (isEditing) {
        await editUser(newUsuario.user_id, newUsuario);
      } else {
        await addUser(newUsuario);
      }
      setNewUsuario({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '', role: 'user' });
      setIsEditing(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await removeUser(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditUsuario = (user) => {
    const passwordactual = user.password;
    user.confirmPassword = passwordactual;
    setNewUsuario(user);
    setIsEditing(true);
    refContainer.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetPassword = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas resetear la contraseña de este usuario?")) {
      try {
        await editUser(id, { password: 'contraseña123' });
        alert(`Contraseña reseteada. La nueva contraseña es: contraseña123`);
      } catch (error) {
        alert(error.message || 'Error al resetear contraseña');
      }
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const filteredUsuarios = filterRole === 'all' ? users : users.filter(user => user.role === filterRole);
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container ref={refContainer}>
      <NavBar/>
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
        {errorMessages.invalidEmail && <ErrorText>{errorMessages.invalidEmail}</ErrorText>}

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
        {errorMessages.passwordMismatch && <ErrorText>{errorMessages.passwordMismatch}</ErrorText>}

        <Label>Rol:</Label>
        <Select name="role" value={newUsuario.role} onChange={handleInputChange}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </Select>
      </FormSection>

      <Button
        onClick={handleAddOrUpdateUsuario}
        disabled={!isFormValid()}
      >
        {isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}
      </Button>

      <Label>Filtrar por Rol:</Label>
      <Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
        <option value="all">Todos</option>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </Select>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsuarios.map(user => (
            <tr key={user.user_id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <BlueButton onClick={() => handleEditUsuario(user)}>Editar</BlueButton>
                <RedButton onClick={() => handleDeleteUsuario(user.user_id)}>Eliminar</RedButton>
                <YellowButton onClick={() => handleResetPassword(user.user_id)}>Resetear Contraseña</YellowButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GestionUsuarios;
