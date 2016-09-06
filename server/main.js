
//Creamos aplicacion express, que pasaremos a un servidor http y todo esto se asocia al servidor websocket creado con socket.io

var express = require('express');
var app=express();

var server = require('http').Server(app);
var io= require('socket.io')(server);

server.listen(8080, function(){
    console.log('Servidor corriendo en localhost:8080')
});


//Indicamos al servidor websocket que este atento a las conexiones que se realicen
//IO escuchando el evento connection
io.on('connection', function(socket){
  console.log('Un cliente se ha conectado');
  //Enviamos el array de objetos mensajes con el evento 'messages' (Dicho evento lo recogeemos en el cliente, en el fichero js de la parte del cliente)
  socket.emit('messages', messages);

  socket.on('new-message', function(data) {  
    messages.push(data);
    io.sockets.emit('messages', messages);
  });


});




//Definimos la ruta de los archivos Estáticos
//Esto lo hacemos con el middeware express.static
app.use(express.static('../public'));


//Array de mensajes de prueba que se enviaran cuando se conecte un cliente
var messages=[{
    author: "Ezequiel miranda",
    text:   "Hola como estas?"
  },
  {
    author: "Kurt",
    text:   "Todo bien y usted?"
  },
  {
    author: "Thom",
    text:   "I'm Fine"
  }];
