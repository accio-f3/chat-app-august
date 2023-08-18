let socket=io();
const joinBtn = document.getElementById('join-btn');
const usernameInput = document.getElementById('username-input');
const messageInput = document.getElementById('message-input');
const form = document.querySelector('.form-username');
const chatRoomContainer = document.querySelector('.chatroom-container');
const messageContainer = document.getElementById('message-container');
const messageSendButton = document.getElementById('send-button');
let username='';

joinBtn.addEventListener('click',event=>{
    event.preventDefault();
    username=usernameInput.value;
    if(username!==''){
        form.style.display='none';
        chatRoomContainer.style.display='block';
    }
})

messageSendButton.addEventListener('click', event => {
    event.preventDefault();
    // i am emitting data through this 'chat message' event
    // data -> ????
    let data = {
        id: socket.id,
        message: messageInput.value,
        username: username,
    }
    console.log(data);
    // this is the first step
    socket.emit('chat message', data);
    appendMessage(data, 'SENT');
})

// this is step 4, all the sockets are hearing
// here socket can be A,B,C & D
// this data is having a specific id
socket.on('chat message', data => {
    if (data.id !== socket.id) {
        appendMessage(data, 'RECIEVED');
    }
})

function appendMessage(data, type) {
    var msgDiv = document.createElement('div');
    msgDiv.innerText = `${data.username}: ${data.message}`;
    if(type==='SENT'){
        msgDiv.setAttribute('class', 'message sent');
    }
    else{
        msgDiv.setAttribute('class', 'message');
    }
    messageContainer.append(msgDiv);
    messageInput.value='';
}
