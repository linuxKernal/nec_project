const getData = ()=>{
    const name = document.getElementById("facultyname").value 
    const dept = document.getElementById("facultydepartment").value
    const desg = document.getElementById("facultydesignation").value
    const rdept = document.getElementById("hallrequirementdep").value
    const depthall = document.getElementById("hallrequirementroom").value
    const date = document.getElementById("atdate").value
    const tfrom = document.getElementById("timerangefrom").value
    const tto = document.getElementById("timerangeto").value
    const audioSystem = document.querySelector('input[name="audiosystem"]:checked').value
    const FAP = document.querySelector('input[name="FAP"]:checked').value    
    const TAP = document.querySelector('input[name="TAP"]:checked').value    
    console.log(name,dept,desg,rdept,depthall,date,tfrom,FAP,tto,TAP,audioSystem);
}