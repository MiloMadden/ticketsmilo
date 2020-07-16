
// Comando para establecer comunicacion

const socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    
    console.log('Conectado al Servidor');

});

socket.on('disconnect', function(){
    console.log('Servidor desconectado...');
})

socket.on('enviarMensaje', function(msg){
    console.log(msg);
})

socket.on('estadoActual', function(msg){
    label.text(msg.ultimo);
})


$('button').on('click', function(){
    console.log('click')
    socket.emit('next', null, function(resp){
        console.log(resp)
        label.text(resp);
    });
})


