# Inicialización:

_Ejecutar este comando para poder comenzar a utilizar el código sin problemas._

```
npm i
```


# Ejecutar node o nodemon:

_Al ejecutar los comandos de la siguiente manera se estará usando el modo FORK que seria por defecto._

* [NODE] - El código se ejecutará en modo producción.
```
npm start
```

* [NODEMON] - El código se ejecutará modo escucha.
```
npm run watch
```

_Para cambiar el puerto, modo y/o compresion por defecto se puede ejecutar los comandos de la siguiente manera._

```
npm <ingresar "start" o "run watch"> -- -p <número del puerto> -m <ingresar "fork" o "cluster"> -c <boolean>
```


# Ejecutar pm2:

* [FORK] - El código se ejecutará en modo fork.
```
pm2 start src/index.js
```
* [CLUSTER] - El código se ejecutará en modo cluster.
```
pm2 start src/index.js -i max --name "cluster-server"
```

## **🚨 Tener en cuenta 🚨 📢** (Estas configuraciones evitarán ciertos errores durante el testeo)
  
_- Modificar el archivo .env de la siguiente manera:_
  - Ubicarse en "./.env.example"
  - Cambiar el nombre a ".env"
  - Modificar los datos sensibles y guardar.

_- Para crear una cuenta "admin" debe colocar admin. antes de su correo, por ejemplo:_
  ```
    admin.el_correo@mail.com
  ```

_- Para testear las respuestas via email o sms, se recomienda registrarse con una cuenta y números válidas._
##

# Entrega de desafío:

_La respuesta a la consigna la encontrará en la siguiente ruta:_
> ubicación: "./terceraEntrega_proyectoFinal.md"