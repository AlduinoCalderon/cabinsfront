import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GestionPage from './GestionPage';
import GestionUsuarios from './GestionUsuarios';
import GestionCabanas from './GestionCabanas';
import GestionReservas from './GestionReservas';
import ProtectedRoute from './ProtectedRoute';
import Verified from './Verified';
import Login from './Login';
import SignUp from './SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/users/verify-email/:email/:verification_token" element={<Verified />} />
        <Route path="/gestion" element={<ProtectedRoute>
              <GestionPage />
            </ProtectedRoute>} />
        

        <Route
          path="/gestion/usuarios"
          element={
            <ProtectedRoute>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion/cabanas"
          element={
            <ProtectedRoute>
              <GestionCabanas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gestion/reservas"
          element={
            <ProtectedRoute>
              <GestionReservas />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
