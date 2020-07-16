
const socket = io();

var searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('h1').text(`Escritorio ${escritorio}`);

var boton = $('button');
var small = $('small');

socket.on('connect', function(){
    
    console.log('Conectado al Servidor');

});

socket.on('disconnect', function(){
    console.log('Servidor desconectado...');
})

boton.on('click', function(){
    
    socket.emit('atenderTicket', {escritorio:escritorio}, function(resp){
        
        if(resp === 'No hay Tickets'){
            small.text(resp);
            alert(resp);
            return
        }
        small.text(`Ticket ${resp.numero}`);
    })

})