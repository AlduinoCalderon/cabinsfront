import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from './styles/styles';

const Verified = () => {
  const { email, verification_token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (email && verification_token) {
      // Hacer una solicitud para verificar el token
      fetch(`https://server-http-mfxe.onrender.com/verify-email/${email}/${verification_token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setIsVerified(true);
          } else {
            setErrorMessage('No se pudo verificar el correo. El enlace puede haber expirado.');
          }
        })
        .catch(() => {
          setErrorMessage('Hubo un error al verificar tu correo.');
        });
    } else {
      setErrorMessage('No se ha recibido el token de verificación.');
    }
  }, [email, verification_token]);

  return (
    <Container>
      <h3>Verificación de Correo</h3>
      {isVerified ? (
        <div>
          <p>Tu correo ha sido verificado exitosamente. ¡Ya puedes iniciar sesión!</p>
          <Button onClick={() => navigate('/')}>Ir al Login</Button>
        </div>
      ) : (
        <div>
          {errorMessage ? (
            <p style={{ color: 'red' }}>{errorMessage}</p>
          ) : (
            <p>Verificando tu correo...</p>
          )}
        </div>
      )}
    </Container>
  );
};

export default Verified;
