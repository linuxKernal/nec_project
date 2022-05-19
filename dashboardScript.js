const alertDiv = document.getElementById("alertDivID")
const inboxMsg = document.getElementsByClassName("temp_msg")
const indata = document.getElementById("inboxData")

const inboxPage   = document.getElementById("inboxPage")
const addHallPage = document.getElementById("addHallPage")
const historyPage = document.getElementById("historyPage")
const reservedPage = document.getElementById("reservedPage")

const openDiv = document.getElementById("openDiv")

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

togglePage(1)

const serverData = [
    {id:101,name:"ram krishna",hall:"IT seminor hall",time:"8:05 AM",Ftime:"3:10 PM",Tto:"5:30 PM",desg:"AP/IT",dept:"CSE",Date1:"12.05.2022",Note:"Welcome to my website and welcome you all and have a fun"},
    {id:102,name:"vijay",hall:"CSE semonir hall",time:"10:35 AM",Ftime:"12:50 PM",Tto:"4:30 PM",desg:"AP/IT SG",dept:"IT",Date1:"25.05.2022",Note:"best platfrom for learning programming"},
    {id:103,name:"tamil kannan",hall:"Apple inc",time:"11:05 AM",Ftime:"3:10 PM",Tto:"5:30 PM",desg:"AP/IT",dept:"ECE",Date1:"12.05.2022",Note:"thank and welcome you all and have a fun"},

]

const alertBox = document.getElementById("alertbox");
const alertMessage = document.getElementById("alertMsg");

function alertFunc(str="responce accetped"){
    alertMessage.innerText = str;
    if(alertBox.style.display=="none") alertBox.style.display = "";
    else{
        alertBox.style.display = "none";
        // window.location.href = "index.html"
    }
}


const briefToggle = (sid=0)=>{
    if(openDiv.style.display=="block" && sid==1)
        openDiv.style.display = "none"
    else {
        openDiv.style.display = "block"
    }
}
/*
 <div class="openText">
    <span class="openTextH">descignation</span>
    <span class="openTextD">AP/IT</span>
</div>
*/
const infoBrief = (infoData)=>{
    for(let ID of serverData){
        if(infoData==ID.id){
            const openContent = document.getElementById("openContent")
            openContent.innerText = ""
            const headerList = ['name','department','desgnation','hall name','recived','data','from','to','note']
            Object.values(ID).slice(1,10).forEach((element,index) => {
                const letDiv = document.createElement('div')
                const letSpan1 = document.createElement('span')
                const letSpan2 = document.createElement('span')
                letDiv.setAttribute("class","openText")
                if(headerList[index]=="note")
                    letDiv.className = 'openText oneNote';
                letSpan1.setAttribute("class","openTextH")
                letSpan2.setAttribute("class","openTextD")
                letSpan1.append(headerList[index])
                letSpan2.append(element)
                letDiv.append(letSpan1)
                letDiv.append(letSpan2)
                openContent.append(letDiv)
            });
            briefToggle()
            break
        }
    }
}
// infoBrief(101)
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
        msgDiv.setAttribute("onclick",`infoBrief(${data.id})`)
        indata.append(msgDiv)
    }
     
}

displayInbox()



document.querySelector(".openTitle span").addEventListener("click",()=> briefToggle(1))
// document.getElementById("alertbutn").addEventListener("click",alertToggle)           