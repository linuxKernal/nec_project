import {doc,getDoc,db} from './config.js';

const alertMsg = document.getElementById("alertMsg")

alertMsg.innerText  = "Hello World"

const loginFunction = async ()=>{
    const username = document.getElementById("username").value
    const passwd = document.getElementById("password").value
    const ref =  doc(db, "superUser",username.split("@").pop().toUpperCase())
    const text = await getDoc(ref)
    if(text.exists()){
        const userData = text.data()
        if(userData.username===username && userData.passwd === passwd){
            document.cookie = `username=${username}; max-age=3600;path=/`;
            location.href = "dashboard.html"
        }
        else {
            alertMsg.innerText =  "password is incorrect try again";
            alertMsg.style.visibility="visible";
        }
    } 
    else{
       alertMsg.innerText =  "user does not exists" ;
    }
    
}

const handleKey = (event)=>{
    if(event.key === "Enter") loginFunction()
}

const verifyLogin = ()=>{
    const username = document.getElementById("username").value
    const passwd = document.getElementById("password").value
    
    if(username.trim()==="" || passwd.trim()===""){
        alertMsg.innerText = "username or password is empty"
        alertMsg.style.visibility="visible";
        return 
    }
    loginFunction()
}


document.getElementById("password").addEventListener("keypress",handleKey)


document.getElementById("login_Button").addEventListener("click",verifyLogin)
