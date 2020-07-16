const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    client.on('next', function(data, callback){
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    })

    let ultimo = ticketControl.actual();
    let ultimos4 = ticketControl.getUltimos4();

    client.emit('estadoActual', {
        ultimo, 
        ultimos4
    })

    client.on('atenderTicket', (data, callback)=>{

        if( !data.escritorio ){
            return callback({
                ok: false, 
                msg: 'El escritorio es necesario'
            })
        }

        let atender = ticketControl.atenderTicket(data.escritorio);

        callback(atender);

        // actualizar, notificar cambios en los ultimos 4
        // emit ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
        

    })



});