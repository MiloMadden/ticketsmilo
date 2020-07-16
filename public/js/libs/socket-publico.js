// Comando para establecer comunicacion

const socket = io();

socket.on('connect', function(){
    
    console.log('Conectado al Servidor');

});

socket.on('disconnect', function(){
    console.log('Servidor desconectado...');
})

var lblTicket1 = $('#lblTicket1');
var lblEscritorio1 = $('#lblEscritorio1');

var lblTicket2 = $('#lblTicket2');
var lblEscritorio2 = $('#lblEscritorio2');

var lblTicket3 = $('#lblTicket3');
var lblEscritorio3 = $('#lblEscritorio3');

var lblTicket4 = $('#lblTicket4');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', function(resp){
    //console.log(resp);
    actualizaHTML(resp.ultimos4);
});

// on ultimos4
socket.on('ultimos4', function(resp){
    
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    
    actualizaHTML(resp.ultimos4);
});

function actualizaHTML(ultimos4){
    
    for( var i=0 ; i<= ultimos4.length -1 ; i++){
        
        lblTickets[i].text(`Ticket: ${ultimos4[i].numero}`);
        lblEscritorios[i].text(`Escritorio: ${ultimos4[i].escritorio}`);

    }

}