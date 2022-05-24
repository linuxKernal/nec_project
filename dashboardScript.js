const cookies =  document.cookie.split(";").toString().split("=")[1]
if(!cookies){
    location.href = "index.html"
}
document.getElementById("loginID").innerText = cookies.split("@")[1].toUpperCase()+" department"

import {doc,getDoc,db,collection ,updateDoc,getDocs,arrayUnion} from "./config.js"

const logButn = document.getElementById("bookingButn")

const getData = async ()=>{
  logButn.innerText = "Booking..."
  const name = document.getElementById("facultyname").value 
  const dept = document.getElementById("facultydepartment").value
  const desg = document.getElementById("facultydesignation").value
  const rdept = document.getElementById("hallrequirementdep").value
  const depthall = document.getElementById("hallrequirementroom").value
  const date = document.getElementById("atdate").value
  const f1 = document.getElementById("Ftime1").value
  const f2 = document.getElementById("Ftime2").value
  const f3 = document.getElementById("Ftime3").value
  const FromTime = `${f1}:${f2} ${f3}`
  const t1 = document.getElementById("Tto1").value
  const t2 = document.getElementById("Tto2").value
  const t3 = document.getElementById("Tto3").value
  const ToTime = `${t1}:${t2} ${t3}`
  const audioSystem = document.getElementById("PAS").value
  const note = document.getElementById("TextBox").value
  const ref  = doc(db,"bookingRequests",rdept.toUpperCase()+"_INBOX")
  const sent = new Date()
  await updateDoc(ref, {
      inbox: arrayUnion({"name":name,"note":note,"sent":`${sent.toLocaleString('en-US')}`,"Date":date.split('-').reverse().join('/'),"staffDept":dept,"desg":desg,"hallName":depthall,"TimeFrom":FromTime,"TimeTo":ToTime,"audioSystem":audioSystem})
  }).then(()=>  logButn.innerText = "Booked"
  )

}
const hallData = {
  "IT":[],
  "CSE":[],
  "ECE":[],
  "EEE":[],
  "MECH":[]
}

const getHalls = async ()=>{
  const querySnapshot = await getDocs(collection(db, "HALL"));
  querySnapshot.forEach((doc) => {
    const dept = `${doc.id}`.split('_')[0]
  doc.data()['listHall'].forEach(item=>{
    hallData[dept].push(item)
  })
});
}

getHalls()

const showHalls = ()=>{
  const rdept = document.getElementById("hallrequirementdep")
  const targetList = document.getElementById("hallrequirementroom")
  targetList.innerText = ""
  const getvalue = rdept.options[rdept.selectedIndex].value;  
  hallData[getvalue].forEach(item=>{
    const options = document.createElement('option')
    options.text = options.value = item.hallName
    targetList.add(options)
  })
}


logButn.addEventListener("click",getData)

document.getElementById("hallrequirementdep").addEventListener("change",showHalls)

// dashboard page

const addHallClick = document.getElementById("addHallButn")

const logoutFunction = ()=>{
    document.cookie = `username=${cookies}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    location.href = "index.html"
}

document.getElementsByClassName("logoutButn")[0].addEventListener("click",logoutFunction)

const showHall = async()=>{
    const target = document.getElementsByClassName("myHallDiv")[0]
    target.innerText = ""
    const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
    const text = await getDoc(ref)
    text.data().listHall.forEach(item=>{
        const newDiv = document.createElement('div')
        newDiv.className = "showHall"
        newDiv.innerText = item.hallName;
        target.append(newDiv)
    })
    addHallClick.innerText = "Done"
}

showHall()

const addHall  = async ()=>{
    const hallName = document.getElementById("newHallName")
    addHallClick.innerText = "Adding..."
    const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
    await updateDoc(ref, {
        listHall: arrayUnion({'hallName':hallName.value,'status':"free"})
    }).then(()=>console.log("successfully new hall added"))
    hallName.value = ""
    showHall()
}

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

togglePage(4)

const serverData = [
//     {id:101,name:"ram krishna",hall:"IT seminor hall",time:"8:05 AM",Ftime:"3:10 PM",Tto:"5:30 PM",desg:"AP/IT",dept:"CSE",Date1:"12.05.2022",Note:"Welcome to my website and welcome you all and have a fun"},
//     {id:102,name:"vijay",hall:"CSE semonir hall",time:"10:35 AM",Ftime:"12:50 PM",Tto:"4:30 PM",desg:"AP/IT SG",dept:"IT",Date1:"25.05.2022",Note:"best platfrom for learning programming"},
//     {id:103,name:"tamil kannan",hall:"Apple inc",time:"11:05 AM",Ftime:"3:10 PM",Tto:"5:30 PM",desg:"AP/IT",dept:"ECE",Date1:"12.05.2022",Note:"thank and welcome you all and have a fun"},
]

const fetchData = async ()=>{
    const ref = doc(db,"bookingRequests",cookies.split("@")[1].toUpperCase()+"_INBOX")
    const text = await getDoc(ref)
    serverData.length = 0
    text.data()['inbox'].forEach((item,index)=>{
        item['id'] = index+1
        serverData.push(item)
        // console.log(item);
    })
    displayInbox()
}

fetchData()

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
    // console.log(infoData);
    document.getElementById("openTextBox").value = ""
    for(let ID of serverData){
        if(infoData==ID.id){
            const openContent = document.getElementById("openContent")
            openContent.innerText = ""
            const headerList = ["name","desg","staffDept","hallName","sent","Date","TimeFrom","TimeTo","note"]
            const textList = ["name","designation","department","hall name","received","Date","from","to","note"]
            Object.keys(ID).slice(1,10).forEach((element,index) => {
                const letDiv = document.createElement('div')
                const letSpan1 = document.createElement('span')
                const letSpan2 = document.createElement('span')
                letDiv.setAttribute("class","openText")
                if(headerList[index]=="note")
                    letDiv.className = 'openText oneNote'
                letSpan1.setAttribute("class","openTextH")
                letSpan2.setAttribute("class","openTextD")
                letSpan1.append(textList[index])
                letSpan2.append(ID[headerList[index]])
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
    indata.innerText = ""
    for(let data of serverData){
        const msgDiv = document.createElement('div')
        msgDiv.className = "temp_msg"
        const H1 = document.createElement('h3')
        const H2 = document.createElement('h3')
        const H3 = document.createElement('h3')
        const H4 = document.createElement('h3')
        const H5 = document.createElement('h3')
        H1.innerText = data.id
        H2.innerText = data.name
        H3.innerText = data.desg
        H4.innerText = data.hallName
        H5.innerText = data.sent
        msgDiv.append(H1)
        msgDiv.append(H2)
        msgDiv.append(H3)
        msgDiv.append(H4)
        msgDiv.append(H5)
        msgDiv.addEventListener("click",()=>infoBrief(data.id))
        indata.append(msgDiv)
    }
     
}

displayInbox()

document.getElementById("page1").addEventListener("click",()=>togglePage(1))
document.getElementById("page2").addEventListener("click",()=>togglePage(2))
document.getElementById("page3").addEventListener("click",()=>togglePage(3))
document.getElementById("page4").addEventListener("click",()=>togglePage(4))

document.getElementsByClassName("actionButn")[0].addEventListener("click",()=>alertFunc())
document.getElementsByClassName("actionButn")[1].addEventListener("click",()=>alertFunc())
document.getElementsByClassName("actionButn")[2].addEventListener("click",()=>alertFunc())
document.getElementById("addHallButn").addEventListener("click",addHall)

document.querySelector(".openTitle span").addEventListener("click",()=> briefToggle(1))
// document.getElementById("alertbutn").addEventListener("click",alertToggle)          
