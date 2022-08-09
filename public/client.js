
const socket = io();  //we can use this io, which is the reason out browser is connected

let username;

let textarea = document.querySelector('#textarea');
let filearea = document.querySelector('#file');

let messageArea = document.querySelector('.message_area')

do {
    username =  prompt('please enter your name: ')
} while(!username);



textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value); //the value which is entered will be sent in this function
    }
})



function sendMessage(message){
    let msg= {
        user: username,
        message : message.trim()
    }

    //append message into chat

    appendMessage(msg, 'outgoing')
     textarea.value='';
     scrollToBottom();

    //send/emit message to server via socket by name message
    socket.emit('message', msg)

}

function appendMessage(msg, type){
  
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = 
    `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`

    mainDiv.innerHTML =markup;

    messageArea.appendChild(mainDiv)
}


//Recieve message comming from other end who is connected

socket.on('message', (msg)=>{
    // console.log(msg);
    appendMessage(msg,'incoming')  //append in incoming session
    scrollToBottom();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}