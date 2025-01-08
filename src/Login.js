// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Container, ErrorText } from './styles/styles';
import TopBar from './components/TopBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const defaultPassword = 'contraseña123';

  const handleLogin = () => {
    // Validar si los campos están vacíos
    if (!email || !password) {
      setErrorMessage('Por favor, rellene ambos campos');
      return;
    }

    // Validar formato de correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Ingrese un correo electrónico válido');
      return;
    } else {
      setEmailError('');
    }

    // Realizar la petición al backend para obtener la lista de usuarios
    fetch('https://server-http-mfxe.onrender.com/users') // URL de los usuarios
      .then(response => response.json())
      .then(data => {
        const user = data.find(user => user.email.toLowerCase() === email.toLowerCase());

        if (!user) {
          // Si el usuario no existe
          setErrorMessage('Usuario no encontrado');
        } else if (user && user.password === password) {
          // Si el usuario y la contraseña coinciden
          localStorage.setItem('authToken', 'dummyToken'); // Guardar token de autenticación
          navigate('/dashboard'); // Redirigir a la página protegida
        } else {
          // Si la contraseña es incorrecta
          setErrorMessage('Contraseña incorrecta. Su contraseña ha sido restablecida.');
          // Actualizar contraseña a la predeterminada
          fetch(`https://server-http-mfxe.onrender.com/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, password: defaultPassword }), // Restablecer contraseña
          })
          .then(() => {
            setPassword(defaultPassword); // Rellenar el campo de contraseña con la predeterminada
            alert('La contraseña ha sido restablecida a "contraseña123"'); // Notificación al usuario
          })
          .catch(err => {
            setErrorMessage('Error al restablecer la contraseña');
          });
        }
      });
  };

  return (
    <Container>
      <div>
        <TopBar menuItems={[{ label: 'Iniciar Sesión', path: '/' }, { label: 'Registrarse', path: '/signup' }]} />
        <h3>Iniciar Sesión</h3>
        <h4>Usuario por defecto: admin@sudo.env / admin</h4>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
        {emailError && <ErrorText>{emailError}</ErrorText>} {/* Error de correo */}

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        
        <Button onClick={handleLogin} disabled={!email || !password}>Iniciar sesión</Button>

        {errorMessage && <p>{errorMessage}</p>}
        
        {errorMessage === 'Usuario no encontrado' && (
          <div>
            <p>¿No tienes cuenta? <a href="/signup">Regístrate aquí</a></p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Login;
