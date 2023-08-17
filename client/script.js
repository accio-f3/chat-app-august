let socket;
const joinBtn = document.getElementById('join-btn');
const usernameInput = document.getElementById('username-input');
const form = document.querySelector('.form-username');
const chatRoomContainer = document.querySelector('.chatroom-container');
let username='';

joinBtn.addEventListener('click',event=>{
    event.preventDefault();
    username=usernameInput.value;
    if(username!==''){
        socket=io();
        form.style.display='none';
        chatRoomContainer.style.display='block';
    }
})