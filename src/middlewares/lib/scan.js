const server = require("http").createServer();
const io = require("socket.io")(server);

// sockete bağlanıldığında burası çalışır
io.on('connection', function(socket){
    
    console.log('sockete birileri bağlandı.');

    // new-post eventını dinliyoruz, backendden buraya data göndereceğiz
    socket.on('new-post', function(data){
        
        // bir data gelirse bunu client'a gönderiyoruz
        io.emit('posts', data);
        
    });

    // socket bağlantısı sonlandığında burası çalışır
    socket.on('disconnect', function(){
        console.log('birileri geldi ve gitti.');
    });
    
});

// 5000 portundan dinliyoruz
// server.listen(5000);