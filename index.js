
const exp= require('express')
const app= exp()
const http= require('http').Server(app)
const path= require('path')
const io= require('socket.io')(http)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))

})




const user= {};
io.on('connection',function(socket){
    console.log('hellow world')
socket.on('user',function(name){
    user[socket.id]=name

   socket.broadcast.emit('new-user',user[socket.id]=name)


})
   
socket.on('message',function(mes){
    console.log(mes)
    socket.broadcast.emit('new-message',{mes:mes,
    name:user[socket.id]})
})
//socket . dissocned evnet //
socket.on('disconnect',function(){
    socket.broadcast.emit('user-dissconnected')
})


    
})







http.listen(3000)