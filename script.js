let total=0,finish=0,editStatus=false ,data=[],finishStatus=[],dataString,statusString
document.addEventListener("DOMContentLoaded",()=>{
    let oruForm=document.getElementById("ourForm")

    let inputObj=document.getElementById("data_block")
    let ourList =document.getElementById("list-ul")
    let markItom=document.getElementById("Mark")
    oruForm.addEventListener("submit",(e) => {
        e.preventDefault()
        console.log(inputObj.value)
        createItom(inputObj.value)
        
    })
    function createItom(x){
        if(x!=""){
        let MessageChannel=`<div class="task"><li><p>${x}</p><div class="but Ebut" onClick="editContent(this)">&#9998</div><div onClick="finishItom(this)" class="Finish_but  but">&check;</div> <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
            data.push(x)
            finishStatus[data.length-1]=0
            // console.log("Update list")
            // console.log(data)
            // console.log(finishStatus)
           
            ourList.insertAdjacentHTML("beforeend",MessageChannel)
            inputObj.value=""
            total+=1;
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
            dataString=JSON.stringify(data)
            statusString=JSON.stringify(finishStatus)
            localStorage.setItem('dataString',dataString)
            localStorage.setItem('statusString',statusString)
            localStorage.setItem("total",total)
            localStorage.setItem("finish",finish)
        }
        inputObj.focus()
    }
    window.onload = function() {
        
            let listUl=document.getElementById('list-ul')
            temp = localStorage.getItem('dataString');
            data = JSON.parse(temp)==null?data: JSON.parse(temp);
            temp = localStorage.getItem('statusString');
            finishStatus=JSON.parse(temp)==null?finishStatus:JSON.parse(temp);
            total=localStorage.getItem('total')==null?total:parseInt(localStorage.getItem('total'))
            finish=localStorage.getItem('finish')==null?finish:parseInt(localStorage.getItem('finish'))
            // console.log(data)
            // console.log(finishStatus)
            // console.log(total)
            // console.log(finish) 
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
            let MessageChannel
            for(i=0;i<data.length;i++){
                if(finishStatus[i]==0){
                    MessageChannel=`<div class="task"><li><p>${data[i]}</p><div class="but Ebut" onClick="editContent(this)">&#9998</div><div onClick="finishItom(this)" class="Finish_but  but">&check;</div> <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
                }else{
                    MessageChannel=`<div class="task"><li class="Finish_work"><p>${data[i]}</p><div class="but Ebut" onClick="editContent(this)">&#9998</div><div onClick="finishItom(this)" class="Finish_but  but">&nbsp;&nbsp;&nbsp;</div> <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
                }
                // console.log(MessageChannel)
                listUl.insertAdjacentHTML("beforeend",MessageChannel)
            }
            
            
    
    }
    
})

function finishItom(elementToDelete){
    let CurrentTask=elementToDelete.parentElement.querySelector('p').innerText;
    console.log(CurrentTask)
    // console.log(editStatus)
    if(elementToDelete.innerHTML=="✓" && !editStatus  ){
        finishStatus[data.indexOf(CurrentTask)]=1;
        // console.log("finish list")
        //  console.log(data)
        // console.log(finishStatus)
        elementToDelete.parentElement.parentElement.classList.add("Finish_work")
        // console.log("Iniside if finish Work")
        elementToDelete.innerHTML="&nbsp;&nbsp;&nbsp;"
        finish+=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
        dataString=JSON.stringify(data)
        statusString=JSON.stringify(finishStatus)
        localStorage.setItem('dataString',dataString)
        localStorage.setItem('statusString',statusString)
        localStorage.setItem("total",total)
        localStorage.setItem("finish",finish)
    }
    editStatus=false
     
}
function deleteItom(elementToDelete){
    // console.log(elementToDelete.parentElement.innerHTML)
    let CurrentTask=elementToDelete.parentElement.querySelector('p').innerText;
    // console.log(CurrentTask)
    if(editStatus)
        editStatus=false
    else{
        
        // console.log("finish list")
        // console.log(data)
        // console.log(finishStatus)
        if(!elementToDelete.parentElement.innerHTML.includes('✓')){
            finish-=1
        }
            // console.log("inisde If to delete")
        // }else{
        //     console.log("inisde else to delete")
        // }
        
    
        total-=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
        let index=data.indexOf(CurrentTask)
        // console.log(data)
        data.splice(index,1)
        // console.log(data)
        finishStatus.splice(index,1)
        dataString=JSON.stringify(data)
        statusString=JSON.stringify(finishStatus)
        localStorage.setItem('dataString',dataString)
        localStorage.setItem('statusString',statusString)
        localStorage.setItem("total",total)
        localStorage.setItem("finish",finish)
        elementToDelete.parentElement.parentElement.remove() 
        elementToDelete.remove()
    }
}
function editContent(edit){
    //editStatus=true
    // if(edit.parentElement.innerHTML.includes('✓')){
        edit.parentElement.classList.add("editing")
        let contetnt=document.getElementsByClassName("editing")
        let editableParagraph=contetnt[0].querySelector('p')
        editableParagraph.dataset.originalContent = editableParagraph.textContent;
        editableParagraph.contentEditable = true;
        editableParagraph.focus();
        // console.log(editableParagraph)
        
        // console.log(edit.parentElement.parentElement.innerHTML)
        editableParagraph.addEventListener('blur', () => {
            // console.log("Enter event list")
            editableParagraph.contentEditable = false; // Disable editing on blur
            const updatedContent = editableParagraph.textContent.trim();
            const originalContent = editableParagraph.dataset.originalContent.trim();
                
            // Check if the content has changed and update the paragraph accordingly
            if (updatedContent !== originalContent) {
                // You can implement your own saving logic here, e.g., sending data to the server
                data[data.indexOf(originalContent)]=updatedContent
                dataString=JSON.stringify(data)
                localStorage.setItem('dataString',dataString)
                // console.log('Updated Content:', updatedContent);

            }
            editStatus=true
            edit.parentElement.classList.remove("editing")
        });
        
        
    
    
}
