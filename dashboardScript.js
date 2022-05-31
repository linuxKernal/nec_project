const cookies =  document.cookie.split(";").toString().split("=")[1]
if(!cookies){
    location.href = "index.html"
}
document.getElementById("loginID").innerText = cookies.split("@")[1].toUpperCase()+" department"

const currentDepartment = cookies.split("@")[1].toUpperCase()

document.getElementsByClassName("myHallTitle")[0].innerText = "Halls In "+currentDepartment;

import {doc,getDoc,db,collection ,updateDoc,getDocs,arrayUnion,arrayRemove} from "./config.js"



const getData = async ()=>{
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
  if(rdept==="Null" || dept==="Null" ){
      console.log("Form empty");
      return
  }
  const ref  = doc(db,"bookingRequests",rdept.toUpperCase()+"_INBOX")
  const sent = new Date()
  await updateDoc(ref, {
      inbox: arrayUnion({"name":name,"note":note,"sent":`${sent.toLocaleString('en-US')}`,"Date":date.split('-').reverse().join('/'),"staffDept":dept,"desg":desg,"status":"pending","hallName":depthall,"TimeFrom":FromTime,"TimeTo":ToTime,"audioSystem":audioSystem})
  }).then(()=>{
      alertFunc("successfully booked")
      document.getElementById("dataForm").reset(); 
  })
  
}
// const clearform = ()=>{
//   document.getElementById("facultyname").value = ""
//   document.getElementById("facultydepartment").selectedIndex= 0
//   document.getElementById("facultydesignation").value= ""
//   document.getElementById("hallrequirementdep").selectedIndex= 0
//   const opt = document.getElementById("hallrequirementroom")
//   opt.innerHTML = "<option value='Null' selected>Dept Hall</option>"
//   document.getElementById("atdate").value= ""
//   document.getElementById("Ftime1").value= ""
//   document.getElementById("Ftime2").value= ""
//   document.getElementById("Ftime3").selectedIndex= 0
//   document.getElementById("Tto1").value= ""
//   document.getElementById("Tto2").value= ""
//   document.getElementById("Tto3").selectedIndex= 0
//   document.getElementById("PAS").selectedIndex= 0
//   document.getElementById("TextBox").value= ""
// }
// document.getElementById("clearingButn").addEventListener("click",clearform)
const hallData = {
  "IT":[],
  "CSE":[],
  "ECE":[],
  "EEE":[],
  "MECH":[],
  "PUBLIC":[]
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
  const getvalue = rdept.value;  
  hallData[getvalue].forEach(item=>{
    const options = document.createElement('option')
    options.text = options.value = item.hallName
    targetList.add(options)
  })
}


// logButn.addEventListener("click",getData)

const form = document.getElementById("dataForm");
function handleForm(event) { 
    event.preventDefault();
    getData()
} 
form.addEventListener('submit', handleForm);

document.getElementById("hallrequirementdep").addEventListener("change",showHalls)

// dashboard page

const addHallClick = document.getElementById("addHallButn")

const logoutFunction = ()=>{
    document.cookie = `username=${cookies}; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    location.href = "index.html"
}

document.getElementsByClassName("logoutButn")[0].addEventListener("click",logoutFunction)

const clearHall = async (event,str,target)=>{
    target.style.display = "none"
    const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
    await updateDoc(ref,{"listHall": arrayRemove({"hallName":str,"status":"free"})})
    console.log(str+" removed");
}

let currentTagValue = ""

const hallEdit = async (tag)=>{
    if(currentTagValue !== tag.innerText ){
        const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
        await updateDoc(ref,{"listHall": arrayRemove({"hallName":currentTagValue,"status":"free"})})
        await updateDoc(ref,{"listHall": arrayUnion({"hallName":tag.innerText,"status":"free"})})
        console.log("hall edited");
    }
}

const showHall = async()=>{
    const target = document.getElementsByClassName("myHallDiv")[0]
    const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
    const text = await getDoc(ref)
    target.innerText = ""
    text.data().listHall.forEach(item=>{
        const newDiv = document.createElement('div')
        const butn = document.createElement('button')
        butn.addEventListener("click",(event)=>clearHall(event,item.hallName,newDiv))
        const ParagraphTag = document.createElement('p')
        ParagraphTag.contentEditable = true
        butn.innerText = "X"
        ParagraphTag.spellcheck = false
        ParagraphTag.addEventListener('focus',()=>currentTagValue=ParagraphTag.innerText)
        ParagraphTag.addEventListener('focusout',()=>hallEdit(ParagraphTag))
        butn.className = "delButn"
        newDiv.className = "showHall"
        ParagraphTag.innerText = item.hallName;
        newDiv.append(ParagraphTag)
        newDiv.append(butn)
        target.append(newDiv)
    })
    addHallClick.innerText = "Add"
}

if(currentDepartment!=="MAIN") 
showHall()




const addHall  = async ()=>{
    const hallName = document.getElementById("newHallName")
    if(hallName.value.trim()===""){
        console.log("Hall Name is empty");
        return
    }
    addHallClick.innerText = "Adding..."
    const ref  = doc(db,"HALL",cookies.split("@")[1].toUpperCase()+"_HALL")
    await updateDoc(ref, {
        listHall: arrayUnion({'hallName':hallName.value,'status':"free"})
    }).then(()=>console.log("successfully new hall added"))
    hallName.value = ""
    showHall()
}


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
    if(pid==1){
        displayInbox()
        inboxPage.style.display = "block"
    }
    else if(pid==2)
        addHallPage.style.display = "block"
    else if(pid==3){
        showHistory()
        historyPage.style.display = "block"
    }
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

let messageID; 

const infoBrief = (infoData)=>{
    // console.log(infoData);
    messageID = infoData
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
        const butn = document.createElement('img')
        butn.setAttribute("src","./assets/folder.png")
        butn.className = "butnImg"
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
        msgDiv.append(butn)
        butn.addEventListener("click",()=>infoBrief(data.id))
        indata.append(msgDiv)
    }
     
}

displayInbox()

const masterDiv = document.getElementById("historyDataId")
const getHistory = (firebaseData) =>{
    const newDiv = document.createElement('div')
    newDiv.className = "historyData"
    newDiv.setAttribute("title",firebaseData.adminText)
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')
    const div4 = document.createElement('div')
    const div5 = document.createElement('div')
    const div6 = document.createElement('div')
    const div7 = document.createElement('div')
    div1.className = "historytext"
    div2.className = "historytext"
    div3.className = "historytext"
    div4.className = "historytext"
    div5.className = "historytext"
    div6.className = "historytext"
    div7.className = "historytext"
    div1.innerText = firebaseData['name']
    div2.innerText = firebaseData['staffDept']
    div3.innerText = firebaseData['bookedDept']
    div4.innerText = firebaseData['hallName']
    div5.innerText = firebaseData['Date']
    div6.innerText = `${firebaseData['TimeFrom']} - ${firebaseData['TimeTo']}`
    div7.innerText = firebaseData['status']
    newDiv.append(div1)
    newDiv.append(div2)
    newDiv.append(div3)
    newDiv.append(div4)
    newDiv.append(div5)
    newDiv.append(div6)
    newDiv.append(div7)
    masterDiv.append(newDiv)
}

const showHistory = async ()=>{
    masterDiv.innerHTML = ""
    const logs = []
    const ref  = collection(db,"bookingRequests")
    const  text =  await getDocs(ref)
    text.forEach(item1=>{
        item1.data().inbox.forEach(item=>{
            item['bookedDept'] = item1.id.split('_')[0]
            logs.push(item)
        })
        item1.data().view.forEach(item=>{
            item['bookedDept'] = item1.id.split('_')[0]
            logs.push(item)
        })
    })
    logs.sort(function (a, b) {
        const dateA = new Date(a.sent.replace(',',' ')).getTime();
        const dateB = new Date(b.sent.replace(',',' ')).getTime();
        return dateA < dateB ? 1 : -1; 
      });
    
    logs.forEach(item=>getHistory(item))
   
}

showHistory()

const statusFunction = async (num)=>{
    for(let ID of serverData){
        if(ID.id === messageID){
            let data = ID
            delete data['id']
            const ref  = doc(db,"bookingRequests",cookies.split("@")[1].toUpperCase()+"_INBOX")
            await updateDoc(ref, {"inbox": arrayRemove(data)});
            const replyText = document.getElementById("openTextBox")
            data['adminText'] = replyText.value
            if(num===1){
                if((currentDepartment==="PUBLIC" && data['audioSystem']==="Not Need") || currentDepartment!=="PUBLIC"  ){
                    data['status'] = "accepted"
                }
                else{
                    data['status'] = "PA pending"
                }
            } 
            else if(num===2){
                if(currentDepartment==="MAIN"){
                    data['status'] = "PA rejected"
                }
                else{
                    data['status'] = "rejected"
                }
            }
            
            if(data['status'] === "PA pending"){
                await updateDoc(doc(db,"bookingRequests","MAIN_INBOX"),{"inbox":arrayUnion(data)})
            }
            else{
                await updateDoc(ref,{"view":arrayUnion(data)})
            }
            briefToggle(1)
            fetchData()
            break
        }
    }
}

document.getElementsByClassName("appButn")[0].addEventListener("click",()=>statusFunction(1))
document.getElementsByClassName("decButn")[0].addEventListener("click",()=>statusFunction(2))

document.getElementById("page1").addEventListener("click",()=>togglePage(1))
document.getElementById("page2").addEventListener("click",()=>togglePage(2))
document.getElementById("page3").addEventListener("click",()=>togglePage(3))
document.getElementById("page4").addEventListener("click",()=>togglePage(4))

document.getElementsByClassName("actionButn")[0].addEventListener("click",()=>alertFunc())
document.getElementsByClassName("actionButn")[1].addEventListener("click",()=>alertFunc())
document.getElementsByClassName("actionButn")[2].addEventListener("click",()=>alertFunc())
document.getElementById("addHallButn").addEventListener("click",addHall)

document.querySelector(".openTitle span").addEventListener("click",()=> briefToggle(1))
