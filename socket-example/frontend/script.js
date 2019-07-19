//console.log("Hello");

const socket=io(); //no need to specify path inside io if ants to run on same server

socket.on('coonected',()=>{
    console.log("connected");
})
//console.log("socket formed from"+socket.id);

$(function(){
    let msgBox=$('#msgbox');
    let list=$('#msglist');
    let button=$('#sendmsg')
    let logindiv=$('#logindiv')
    let chatdiv=$('#chatdiv');
    let loginbutton=$('#loginbutton')
    let login=$('#login');

    let user=''

    button.click(function(){
        socket.emit('send_msg',
        {message:msgBox.val(),
        user:user})
        
    })

    loginbutton.click(function(){
       user=login.val();
       logindiv.hide();
       chatdiv.show();
       socket.emit('login',{
           user:user
       })
    })

    socket.on('recv_msg',(data)=>{
        console.log(data.user);
        list.append($('<li>'+data.user+":"+data.message+'</li>'));
    })
})