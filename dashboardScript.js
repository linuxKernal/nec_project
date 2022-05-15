const alertDiv = document.getElementById("alertDivID")
const inboxMsg = document.getElementsByClassName("temp_msg")
const indata = document.getElementById("inboxData")

const inboxPage   = document.getElementById("inboxPage")
const addHallPage = document.getElementById("addHallPage")
const historyPage = document.getElementById("historyPage")
const reservedPage = document.getElementById("reservedPage")

const togglePage = (pid)=>{
    inboxPage.style.display = "none"
    addHallPage.style.display = "none"
    historyPage.style.display = "none"
    reservedPage.style.display = "none"
    if(pid==1)
        inboxPage.style.display = "block"
    else if(pid==2)
        addHallPage.style.display = "block"
    else if(pid==3)
        historyPage.style.display = "block"
    else if(pid=4)
        reservedPage.style.display = "block"
}

togglePage(2)

const serverData = [
    {id:101,name:"vijay kumar",hall:"IT seminor hall",time:"4:30 AM"},
    {id:102,name:"karthick",hall:"CSE seminor hall",time:"11:45 AM"},
    {id:103,name:"ram krishna",hall:"Apple inc",time:"8:05 AM"}
]

const alertToggle = ()=>{
    if(alertDiv.style.display=="flex")
        alertDiv.style.display = "none"
    else{
        alertDiv.style.display = "flex"
    }
}

const startAlert = (data)=>{
    const Aname = document.getElementById("alert_name")
    const Ahall = document.getElementById("alert_hall")
    for(let ID of serverData){
        if(data==ID.id){
            Aname.innerText = ID.name
            Ahall.innerText = ID.hall
            alertToggle()
            break
        }
    }
}

const displayInbox = ()=>{
    for(let data of serverData){
        const msgDiv = document.createElement('div')
        msgDiv.className = "temp_msg"
        const H1 = document.createElement('h3')
        const H2 = document.createElement('h3')
        const H3 = document.createElement('h3')
        const H4 = document.createElement('h3')
        H1.innerText = data.id
        H2.innerText = data.name
        H3.innerText = data.hall
        H4.innerText = data.time
        msgDiv.append(H1)
        msgDiv.append(H2)
        msgDiv.append(H3)
        msgDiv.append(H4)
        msgDiv.setAttribute("onclick",`startAlert(${data.id})`)
        indata.append(msgDiv)
    }
     
}

displayInbox()




document.getElementById("alertbutn").addEventListener("click",alertToggle)