// src/SignUp.js
import React, { useState } from 'react';
import { Input, Button, Container } from './styles/styles';
import TopBar from './components/TopBar';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setErrorMessage('Por favor, rellene todos los campos obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    const newUser = { 
      email, 
      password, 
      first_name: firstName, 
      last_name: lastName, 
      telefono: phone 
    };

    fetch('https://server-http-mfxe.onrender.com/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) { // Código 409: Conflicto (correo ya registrado)
            throw new Error('El correo ya está registrado. ¿Desea restablecer su contraseña?');
          }
          throw new Error(errorData.message || 'Error al registrar el usuario');
        }
        setSuccessMessage('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
        setErrorMessage('');
        clearFields();
        setTimeout(() => {
          navigate('/'); // Redirige al login después de mostrar el mensaje
        }, 3000);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setSuccessMessage('');
      });
  };

  const clearFields = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  return (
    <Container>
      <div>
        <TopBar menuItems={[{ label: 'Iniciar Sesión', path: '/' }, { label: 'Registrarse', path: '/signup' }]} />
        <h3>Registrarse</h3>

        <Input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nombre"
        />
        <Input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        <Input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Teléfono (opcional)"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Contraseña"
        />
        
        <Button onClick={handleSignUp}>Registrar</Button>

        {errorMessage && (
          <p style={{ color: 'red' }}>
            {errorMessage} 
            {errorMessage.includes('restablecer su contraseña') && (
              <span>
                {' '}
                <Button onClick={() => navigate('/reset-password')}>Restablecer contraseña</Button>
              </span>
            )}
          </p>
        )}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </Container>
  );
};

export default SignUp;
