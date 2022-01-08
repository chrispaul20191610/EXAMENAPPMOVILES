EXAMEN APLICACIONES MOVILES

Integrantes:
Christian Llumiquinga 

Nathaly Bermeo

# Parte inicial del proyecto
Se crea un proyecto en Firebase , esta plataforma permite la creación de mejores apps, minimizando el tiempo de optimización y desarrollo, mediante diferentes funciones, tiene varios tipos de autentificación y permite almacenamiento de nuestros datos.

![image](https://user-images.githubusercontent.com/66235614/145815435-2ba8547a-5cab-4a79-9cf4-8e09e8a504d0.png)

![image](https://user-images.githubusercontent.com/66235614/145815506-82642c60-1a8a-45d9-a79f-b73f6d413241.png)

# Login
Se utilizo varias funciones para el realizar el registro e inicio de sesión.

![image](https://user-images.githubusercontent.com/66235614/145815724-fc57fd8d-dc00-41ac-94cc-fed1a4c4f7f2.png)

![image](https://user-images.githubusercontent.com/66235614/145815739-e518852a-a01f-408a-9d98-6a44537df000.png)

![image](https://user-images.githubusercontent.com/66235614/145816804-9a7c244d-c798-42e2-8592-e323e825900f.png)

# Recuperación de contraseña 
Para la recuperación de contraseña creamos una pagina llamada forgot-password y en la codificación del forgot-password.page.html agregamos elementos como input de tipo email y un botón para llamar a un método llamado onReset.

![image](https://user-images.githubusercontent.com/66235614/145815833-fe1ef2c5-df73-491b-bad2-a7d9bd34ec29.png)

Verificamos las rutas en app.routing.module.ts

![image](https://user-images.githubusercontent.com/66235614/145815861-b47a33d1-b0ce-4f7c-89ec-e9d4bcaf94c4.png)

Creamos un método asíncrono en chat.service.ts para la recuperación de contraseña, utilizamos un try catch para manejar los errores y para el envio de mensaje para recuperar la contraseña.

![image](https://user-images.githubusercontent.com/66235614/145815975-1ffb3ae4-060e-46f6-818c-cbe9d9655c32.png)

En la parte de forgot-password.page.ts  creamos una función asíncrona  que permita recuperar la contraseña y una alerta para verificar el envio de mensaje de recuperación de contraseña al correo electrónico ingresado.

![image](https://user-images.githubusercontent.com/66235614/145816181-d429c097-d290-4548-9407-248b0b943293.png)


![image](https://user-images.githubusercontent.com/66235614/145817142-055df697-7071-4de9-a2bd-8ac57bc43ec3.png)

Mensaje de alerta que verifica el envío de mensaje de recuperación de contraseña al correo ingresado.

![image](https://user-images.githubusercontent.com/66235614/145817172-3ed63ec2-ff32-4578-bdef-9bf457f2195a.png)

Mensaje de recuperación de contraseña.

![image](https://user-images.githubusercontent.com/66235614/145817247-14e24494-1411-4d36-ba00-66e82b04d3dd.png)

Modal que permite el cambio de contraseña

![image](https://user-images.githubusercontent.com/66235614/145817376-b28a0e94-6649-4104-a753-0217232a759a.png)

# Chat
Para el chat vamos a empezar creando en el servicio de chat una interfaz que se llamara message la cual nos servirá, para dar forma a nuestros mensajes y poder tratarlos como un tipo.

![image](https://user-images.githubusercontent.com/66235614/145817771-8af28506-17a4-4fc9-a375-1286f4ce5cbf.png)

De la siguiente manera, donde podemos dar la estructura de nuestros mensajes con los siguientes campos que se muestran en la imagen.
En el servicio de chat declaramos funciones más para el funcionamiento del chat, addChartMessage.
Aquí en esta función vamos a dar un return donde tomaremos el método angularfirestore para obtener la colección de mensajes y añadiremos los siguientes campos que ya definimos en nuestra interfaz.
Msg, el usuario, y la fecha de creación.

![image](https://user-images.githubusercontent.com/66235614/145817875-d45ae30f-324a-42ba-8047-583c49b2502f.png)

Luego después crearemos una nueva función para obtener los mensajes del chat, aquí declaramos un arreglo vacío, que nos servirá para guardar la colección de usuarios que irán generando los chats, todo eso nos retorna un get user, con el atributo pipe, que nos trasforma el contenido que queremos mostrar, también aquí usamos la función switchmap, el mismo que nos devuelve un observable de salida, el cual ya definiremos los valores que necesitamos.

![image](https://user-images.githubusercontent.com/66235614/145818011-397f2e80-e5f6-44db-9e37-b5d314b78244.png)

Así mismo realizaremos un mapeo de nuestros mensajes, que van a ser contenidos con los valores, del nombre de usuario  y el mensaje.

Luego creamos la función getUser() y getUserForMsg(), la función get usuaer nos permite acceder a la collecion de usuarios, y tomar los cambios del usuario, por medio de su id, todo esto va declarado como un observable.
Así mismo la siguiente función que recibirá dos parámetros, el parámetro msgFromId que será un parámetro vacío, y el user, en tipo arreglo, esto nos servirá para obtener el usuario que envía el mensaje siendo que este sea correcto, nos devuelve el valor del email del usuario.

![image](https://user-images.githubusercontent.com/66235614/145818129-24d6feb3-65d9-4a53-90ae-d1609c42c8d5.png)

En el archivo image-zize.pip, tendremos las funciones pipe, y trasform que nos sirven para dar formato a nuestros archivos, con respecto a sus unidades de medida dando en un valor redondeado al tamaño de los archivos, el cual será devuelto en una nueva unidad con un valor de dos decimales.

![image](https://user-images.githubusercontent.com/66235614/145818186-0ec1ae34-45e6-44da-8083-ce5b0000d175.png)

En el archivo chat.ts, tenemos la funcionalidad del chat, así mismo como él envió de archivos, es así que para eso declaramos la función sendMessage el cual nos permite acceder al servicio de chat para la funcionalidad de addChatMessage que nos permite crear el nuevo mensaje explicado anteriormente.

![image](https://user-images.githubusercontent.com/66235614/145818269-adc56dac-0a77-48f0-8341-b6bfcdec61f4.png)

La función uploadimage es la encargada de subir capturar las images y subirlas a la base, este viene con una validación de archivos, donde solo podrán ser archivos, no carpetas porque nos dará un error de archivo no soportado aquí definimos la ruta donde va a ser guardada nuestra imagen las herramientas de carga, y algunos detalles como la barra de progreso. Esta función nos devuelve el observable, de la imagen el cual luego daremos el formato correspondiente al mismo con el que queremos que este se presente.

![image](https://user-images.githubusercontent.com/66235614/145818327-8a33f5bb-e787-4bae-8818-d15fd6a0dda4.png)

 Funcionalidad Chat

![image](https://user-images.githubusercontent.com/66235614/148621902-535f4c72-8d91-4320-80c1-c469cf2aae13.png)

En la funcionalidad de la camara debemos trabajar con otros plugins en este caso tenemos que instalar capacitor/camara a nuestro proyecto.

![Sin título](https://user-images.githubusercontent.com/56648687/148613135-d6c61e4b-6f42-45de-a2f1-f2eb1d38466f.png)

En esta seccion vamos a trabajar con lo que son las funcionalidades de la camara asi mismo como la ventana que se abrira al dar click en la camara.

![Sin título](https://user-images.githubusercontent.com/56648687/148613345-9da848e2-007f-4e68-9671-7035162347f5.png)

Debemos de crear un servicio para fotos en este archivo vamos a tomar las fotos y almacenarlas tambien aqui vamos a leer el filesystem, para leer nuestros archivos de imagen, y asi poder ejecutar las otras funciones de envio, lectura y delete.

![Sin título](https://user-images.githubusercontent.com/56648687/148613655-f896af3f-bda6-457f-a9ae-8c27af5ff2a3.png)

En la aplicacion tenemos la camara funcionando.

La vista final de la aaplicacion es la siguiente:

![Sin título](https://user-images.githubusercontent.com/56648687/148614980-2fcf9426-4619-4013-8909-f908d2de932b.png)


