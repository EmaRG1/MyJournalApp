# MyJournalApp

MyJournalApp es una aplicación moderna de notas que permite a los usuarios registrarse, iniciar sesión y gestionar sus notas personales de manera sencilla. La aplicación está desarrollada con React + Vite, utiliza Redux Toolkit para el manejo del estado global, Firebase para la autenticación y Firestore Database como base de datos. Las imágenes asociadas a las notas se almacenan en Cloudinary.

## Características principales

- **Autenticación**: Los usuarios pueden registrarse e iniciar sesión utilizando su correo electrónico y contraseña, o bien a través de Google.
- **Gestor de Notas**:
  - Crear notas con título y contenido.
  - Agregar imágenes a las notas.
  - Editar y eliminar notas existentes.
- **Almacenamiento de Imágenes**: Las imágenes cargadas por los usuarios se almacenan en Cloudinary.
- **Sincronización en Tiempo Real**: Las notas se guardan y sincronizan en la base de datos de Firestore.

## Tecnologías utilizadas

- **Frontend**:
  - [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
  - [Redux Toolkit](https://redux-toolkit.js.org/) para la gestión del estado global
- **Backend y Base de Datos**:
  - [Firebase Authentication](https://firebase.google.com/docs/auth) para la autenticación de usuarios
  - [Firestore Database](https://firebase.google.com/docs/firestore) para la gestión de datos
- **Almacenamiento de Imágenes**:
  - [Cloudinary](https://cloudinary.com/) para almacenar y gestionar imágenes

## Instalación y configuración

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/MyJournalApp.git
   cd MyJournalApp
   ```

2. Instala las dependencias:

   ```bash
   yarn install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   VITE_CLOUDINARY_URL=your_cloudinary_url
   ```

   Reemplaza los valores con tus credenciales de Firebase y Cloudinary.

4. Inicia la aplicación:

   ```bash
   yarn dev
   ```

5. Abre tu navegador y accede a [http://localhost:5173](http://localhost:5173).

## Scripts disponibles

- `yarn dev`: Inicia la aplicación en modo desarrollo.
- `yarn build`: Genera una versión optimizada para producción.
- `yarn preview`: Previsualiza la aplicación construida para producción.


## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección:

   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```

3. Realiza tus cambios y haz un commit:

   ```bash
   git commit -m "Agregada nueva funcionalidad"
   ```

4. Envía tus cambios al repositorio remoto:

   ```bash
   git push origin mi-nueva-funcionalidad
   ```

5. Crea un Pull Request en GitHub.

---

¡Gracias por usar MyJournalApp! Si tienes alguna pregunta o sugerencia, no dudes en abrir un [issue](https://github.com/tu-usuario/JournalApp/issues).

