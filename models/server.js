//Servidor de Expres
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');
//Servidor de sockets


class Server {

    constructor(){
        this.app =  express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer(this.app);

        //Configuraciones de sockets
        this.io = socketio(this.server,{ /*dd*/ } ) ;
        
    }

    middlewares(){
        //Desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public') )   )

        this.app.use(cors());
    }

    configuraSockets(){
        new Sockets(this.io);
    }

    execute(){
        //Inicializar Middlewares
        this.middlewares();

        //Inicializar sockets
        this.configuraSockets();
        
        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log('server corriendo en puerto:', this.port);
        });    

    }

}

module.exports = Server;