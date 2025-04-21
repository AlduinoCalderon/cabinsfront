# Sistema de Gestión de Cabañas

Sistema web para la gestión de reservas de cabañas, desarrollado con React y Node.js.

## Características

- Autenticación de usuarios (registro, login, verificación de email)
- Gestión de usuarios (crear, editar, eliminar)
- Gestión de cabañas (crear, editar, eliminar)
- Gestión de reservas
- Panel de administración
- Interfaz responsiva y moderna

## Tecnologías Utilizadas

- **Frontend:**
  - React.js
  - React Router
  - Styled Components
  - Axios

- **Backend:**
  - Node.js
  - Express
  - PostgreSQL
  - JWT para autenticación

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/AlduinoCalderon/cabins.git
cd cabins
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

4. Iniciar el servidor de desarrollo:
```bash
npm start
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── services/      # Servicios de API
├── styles/        # Estilos globales y componentes estilizados
└── utils/         # Utilidades y helpers
```

## Características Principales

### Autenticación
- Registro de usuarios con verificación de email
- Login con JWT
- Recuperación de contraseña

### Gestión de Usuarios
- CRUD completo de usuarios
- Roles de usuario (admin, user)
- Gestión de permisos

### Gestión de Cabañas
- Creación y edición de cabañas
- Gestión de imágenes
- Estados de disponibilidad

### Reservas
- Sistema de reservas
- Calendario de disponibilidad
- Historial de reservas

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Autor

**AlduinoCalderon** - [GitHub](https://github.com/AlduinoCalderon)
