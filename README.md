# Nodepop

`Practica Backend-Node - Desarrollo Web XVI`

Nodepop es una aplicación diseñada para facilitar la compra y venta de artículos entre individuos. Su objetivo principal es proporcionar una plataforma donde los usuarios puedan listar sus productos para la venta y buscar productos que deseen comprar, todo ello a través de una interfaz de usuario intuitiva y funcional.

Las tecnologías utilizadas en Nodepop incluyen:

Node.js: Como entorno de ejecución para JavaScript del lado del servidor, proporciona la base para la lógica de la aplicación.

Express.js: Un marco de aplicación web para Node.js que simplifica el desarrollo de aplicaciones web al proporcionar una serie de funciones útiles para la creación de API RESTful y manejo de solicitudes HTTP.

MongoDB: Una base de datos NoSQL ampliamente utilizada que proporciona flexibilidad en el almacenamiento de datos y es especialmente adecuada para aplicaciones con un modelo de datos variable o en constante cambio.

Mongoose: Una biblioteca de modelado de objetos MongoDB para Node.js que simplifica la interacción con la base de datos MongoDB al proporcionar una estructura de datos y un conjunto de métodos coherentes.

HTML y CSS: Para la creación de la interfaz de usuario y el diseño visual de la aplicación web.

JavaScript: Para la lógica del lado del cliente y la interactividad en la interfaz de usuario.

Nodepop ofrece una variedad de características, incluyendo la creación, búsqueda, filtrado y gestión de productos, así como la posibilidad de actualizar y eliminar productos existentes. Además, proporciona una API robusta que permite a los desarrolladores integrar y construir sobre las funcionalidades existentes de la aplicación.
Con su arquitectura basada en Node.js y MongoDB, Nodepop está diseñado para ser escalable y flexible, lo que lo convierte en una opción sólida para aquellos que buscan una solución de comercio electrónico entre pares fácil de usar y personalizable.

# Nodepop - avanzado

`Practica Backend-Node-Avanzado - Desarrollo Web XVI`

En esta nueva version de la aplicación, se incluyen funcionalidades nuevas como Autenticacion (aplicada al API), Internalización de la aplicación y Subida de imagenes con tarea en background

1. Implementada internacionalización de la aplicación. 
2. Implementada authenticacion a través de JWT
3. Implementada subida imagenes (con tarea en background) - 

## Mejoras de la Versión 2.0
### 1- Añadida la opción de cambiar el idioma según la ubicación del usuario
(Usando los botones en la parte superior de la página)

He implementado la internacionalización (i18n) para permitir a los usuarios cambiar entre inglés y español. Esta función mejora la accesibilidad y la experiencia del usuario al proporcionar contenido en el idioma preferido.

#### Cambio de Idioma:

- Los usuarios pueden cambiar el idioma usando los botones en la parte superior de la página.
- La preferencia de idioma seleccionada se almacena y se aplica durante toda la sesión.

### 2- Implementada la autenticación usando JWT para los endpoints de la API
Para asegurar los endpoints de la API, he implementado la autenticación utilizando JSON Web Tokens (JWT). Esto garantiza que solo los usuarios autenticados puedan acceder a ciertas funcionalidades.

#### Generación de Token JWT:

- Los usuarios deben iniciar sesión para recibir un token JWT.
- El token se almacena en el almacenamiento local del navegador.

   **Rutas Protegidas:**

-  Los endpoints de la API requieren el token JWT para acceder.
-  El token se incluye en los encabezados de la solicitud o en los parámetros de consulta.

Ejemplo:

   ```
   # Iniciar sesión para obtener el token JWT
   POST /api/authenticate
   ```

#### Acceder a una ruta protegida con el token

`GET /api/products?token=your_jwt_token`

### 3- Integrada la funcionalidad de subida de imágenes con procesamiento en segundo plano para crear miniaturas usando Cote.js y Jimp
He añadido la capacidad para que los usuarios suban imágenes al crear nuevos listados de productos. Las imágenes se procesan en segundo plano para generar miniaturas, mejorando el rendimiento y la experiencia del usuario.

**Subida de Imágenes:**

- Los usuarios pueden subir imágenes utilizando un formulario.
- Las imágenes se almacenan en el servidor y un proceso en segundo plano crea miniaturas.

**Configuración del Worker:**

- El procesamiento en segundo plano se maneja mediante un microservicio usando Cote.js y Jimp.
- El worker debe ejecutarse en un terminal separado para procesar las subidas de imágenes.

Ejemplo:

   ```
   # Iniciar el servidor principal
   npm run dev
   ```

   ```
   # Iniciar el worker para el procesamiento de miniaturas
   node worker.js
   ```
**Crear un Nuevo Producto con Subida de Imágenes**
Los usuarios pueden crear nuevos listados de productos y subir imágenes a través del formulario del frontend.

**Formulario Frontend:**

- El formulario permite a los usuarios ingresar los detalles del producto y subir una imagen.
- El formulario utiliza codificación multipart/form-data para la subida de archivos.

**Endpoint Backend:**

   ```
   # Crear un nuevo producto con subida de imagen
   POST /api/products
   ```
