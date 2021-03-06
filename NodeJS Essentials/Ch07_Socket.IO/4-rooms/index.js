/*
   Copyright 2015 Packt Publishing

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var Http = require( 'http' ),
    FS = require( 'fs' );

var server = Http.createServer( handler );

server.listen( 8080 );

function handler( request, response ) {
    var index = FS.readFileSync( 'index.html' );
    index = index.toString( );
    
    response.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': Buffer.byteLength( index )
    });
    response.end( index );
}

var IOServer = require( 'socket.io' );
var io = new IOServer( server );

io.on( 'connection', function( socket ){
    console.log( 'New Connection' );
    var room = 'our room';
    socket.join( room, function( error ) {
        if ( error ) return console.log( error );
        
        console.log( 'Joined room!' );
    });
});
