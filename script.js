let total=0,finish=0,editStatus=false 
let list = []

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
       
        list.push({'task':x,'status':0,'index':list.length})   
           
           
            ourList.insertAdjacentHTML("beforeend",MessageChannel)
            inputObj.value=""
            total+=1;
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
            localStorage.setItem('list',JSON.stringify(list))
           
            // localStorage.setItem('statusString',statusString)
            localStorage.setItem("total",total)
            localStorage.setItem("finish",finish)
        }
        inputObj.focus()
    }
    window.onload = function() {
            
            let listUl=document.getElementById('list-ul')
            
            total=localStorage.getItem('total')==null?total:parseInt(localStorage.getItem('total'))
            finish=localStorage.getItem('finish')==null?finish:parseInt(localStorage.getItem('finish'))
            list=JSON.parse(localStorage.getItem('list'))==null?list:JSON.parse(localStorage.getItem('list'))
            console.log(list)
          
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
            let MessageChannel
            for(i=0;i<list.length;i++){
                if(list[i].status==0){
                    MessageChannel=`<div class="task"><li><p>${list[i].task}</p><div class="but Ebut" onClick="editContent(this)">&#9998</div><div onClick="finishItom(this)" class="Finish_but  but">&check;</div> <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
                }else{
                    MessageChannel=`<div class="task"><li class="Finish_work"><p>${list[i].task}</p><div class="but Ebut" onClick="editContent(this)">&#9998</div><div onClick="finishItom(this)" class="Finish_but  but">&nbsp;&nbsp;&nbsp;</div> <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
                }
                // console.log(MessageChannel)
                listUl.insertAdjacentHTML("beforeend",MessageChannel)
            }
            
            
    
    }
    
})

function finishItom(elementToDelete){
    let CurrentTask=elementToDelete.parentElement.querySelector('p').innerText;
    // console.log(CurrentTask)
    // console.log(editStatus)
    if(elementToDelete.innerHTML=="✓" && !editStatus  ){
        
        list[list.map(x=>x.task).indexOf(CurrentTask)]=1
       
        elementToDelete.parentElement.parentElement.classList.add("Finish_work")
        
        elementToDelete.innerHTML="&nbsp;&nbsp;&nbsp;"
        finish+=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
        localStorage.setItem('list',JSON.stringify(list))
       
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
      
        if(!elementToDelete.parentElement.innerHTML.includes('✓')){
            finish-=1
        }
            
        total-=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
        // let index=data.indexOf(CurrentTask)
        let index=list.map(x=>x.task).indexOf(CurrentTask)
        list.splice(index,1)
       
        localStorage.setItem('list',JSON.stringify(list))
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
                
                list[list.map(x=>x.task).indexOf(originalContent)].task=updatedContent
                localStorage.setItem('list',JSON.stringify(list))
                

            }
            editStatus=true
            edit.parentElement.classList.remove("editing")
        });
        
        
    
    
}
