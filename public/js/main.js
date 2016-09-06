console.log("Client, HI");

//Conectamos el cliente con el servidor socket
var socket=io.connect('http://localhost:8080', {'forceNew':true});

// esuchamos el evento messages
socket.on('messages', function(data){
  render(data); // Data tiene el array de mensajes que envia el servidor
});


//Esta funcion
function render(data){
  var html= data.map(function(elem, index){
    return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em>
            </div>`)
  }).join(" ");

  document.getElementById('messsages').innerHTML=html;
}


//Recoje los valores de los inputs y los envia por el socket con el mensaje new-mensaje para que loe esuche el servidor
function addMessage(e){
  var mensaje={
    author:document.getElementById('username').value,
    text:document.getElementById('texto').value
  }

  socket.emit('new-message',mensaje);
  return false;
}
