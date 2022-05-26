# Consigna "TERCERA ENTREGA DEL PROYECTO FINAL":

## Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. 
  * Se configura el pasport en la siguiente ruta: 
    > ubicación: "./src/middlewares/passport.middleware.js"
  * Se ejecuta el pasport en la siguiente ruta:
    > ubicación: "./src/routers/auth/auth.routes.js"

### El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.
  * Se configura el rgistro de usuario en la siguiente ruta: 
    > ubicación: "./src/middlewares/passport.middleware.js"

### La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.
  * Se configura el renderizado de la imagen en la siguiente ruta: 
    > ubicación: "./src/routers/profile/profile.routes.js"
  ##
  #

## Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.
  * Formularios: 
    > ubicación: "./public/login.html"
  * Home: 
    > ubicación: "./views/home.ejs"
  * Aplicación de autenticidad:
    > ubicación: "./src/routers/auth/auth.routes.js"

### El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.
  * Acceso al menú a modo de barra de navegación: 
    <p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/menu.PNG?alt=media&token=022839a9-fd64-45f4-b629-9161e60bb64b" alt="menú"/></p>
  * Filtros implementados:
    <p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/filtro.PNG?alt=media&token=b23b6c29-2ca4-4b51-9775-965c7908e0e2" alt="filtro"/></p>
  * Carrito de compras:
    <p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/carrito.PNG?alt=media&token=729c3191-7d8d-45e8-8e0e-24dbb77e3882" alt="carrito"/></p>
  * Datos de registro con la foto:
    <p align="center"><img src="https://firebasestorage.googleapis.com/v0/b/backend-clases.appspot.com/o/perfil.PNG?alt=media&token=53bb8fc5-f85d-42b3-b827-f45027ecf91b" alt="perfil"/></p>

### Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.
  * Enviar mail: 
    > ubicación: "./src/middlewares/passport.middleware.js", linea: 84
  * Variable mail: 
    > ENV: ADMIN_MAIL, ADMIN_PASS
  ##
  #

## Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.
  > ENV: TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE

### El usuario iniciará la acción de pedido en la vista del carrito.
  > ubicación: "./src/routers/app.routes.js", linea: 40

### Será enviado una vez finalizada la elección para la realizar la compra de productos.
  > ubicación: "./src/routers/app.routes.js", linea: 41

### El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.
  * Mail:
    > ubicación: "./src/controllers/routes.controller.js", linea: 82
  * Whatsapp:
    > ubicación: "./src/controllers/routes.controller.js", linea: 83

### El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.
  > ubicación: "./src/controllers/routes.controller.js", linea: 75
  ##
#


>>Aspectos a incluir:
  * El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
    > local: "http://localhost:8080/"
    > heroku: "https://juliopariona-clase36.herokuapp.com/"
  
  * Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
    > ENV: MODE_CLUSTER
  * Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
    - Configuración:
      > ubicación: "./utils/config/logger.config.js"
    - Caso de errores moderados:
      > ubicación: "./utils/logs/error.log"

  * Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.
    - resultado fork:
      > ubicación: "./artillery/result_fork.txt"
    - resultado cluster:
      > ubicación: "./artillery/result_cluster.txt"
