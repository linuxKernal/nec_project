import {doc,collection,getDoc,db} from './config.js';

const loginFunction = async ()=>{
    const username = document.getElementById("username").value
    const passwd = document.getElementById("password").value
    const alertMsg = document.getElementById("alertMsg")
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


document.getElementById("login_Button").addEventListener("click",loginFunction)
