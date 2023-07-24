let total=0,finish=0,editStatus=false 
let list = []
let arrow=[
    '&#8630;',
    '&#8631;'

]
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
        if(x!=""&&list.map(y=>y.task).indexOf(x)<0){
        let MessageChannel=`<div class="task">
                                <li>
                                    <p>${x}</p>
                                    <div class="but Ebut" onClick="editContent(this)">&#9998</div>
                                    <div onClick="finishItom(this)" class="Finish_but  but">&check;</div>
                                    <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div>
                                    <div class="but des"  onClick="desableOrEnable(this)">${arrow[1]}<div>
                                </li>
                            <div>`
       
        list.push({'task':x,'status':0,'index':list.length,'enable':1})   
           
           
            ourList.insertAdjacentHTML("beforeend",MessageChannel)
            inputObj.value=""
            total+=1;
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
            localStorage.setItem('list',JSON.stringify(list))
           
            // localStorage.setItem('statusString',statusString)
            localStorage.setItem("total",total)
            localStorage.setItem("finish",finish)
        }else if(x!=""){
            alert("Enter an Existing task")
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
            let stateClass=['','class="Finish_work"']
            let stateSymbol=['&check;','&nbsp;&nbsp;&nbsp;']
            let enableClass=['class="Eneble"','']

            for(i=0;i<list.length;i++){
                MessageChannel=`<div class="task">
                                    <li ${stateClass[list[i].status]} ${enableClass[list[i].enable]}>
                                        <p >${list[i].task}</p>
                                        <div class="but Ebut" onClick="editContent(this)">&#9998</div>
                                        <div onClick="finishItom(this)" class="Finish_but  but">${stateSymbol[list[i].status]}</div> 
                                        <div class="Delete_but but" id="intoMark" onClick= deleteItom(this)>&#10008;</div>
                                        <div class="but des"  onClick="desableOrEnable(this)">${arrow[list[i].enable]}<div>
                                    </li>
                                <div>`
                console.log(list[i].status)
                console.log(MessageChannel)
                listUl.insertAdjacentHTML("beforeend",MessageChannel)
            }
            
            
    
    }
    
})

function finishItom(elementToDelete){
    let CurrentTask=elementToDelete.parentElement.querySelector('p').innerText;
    
    // console.log(CurrentTask)
    // console.log(editStatus)
    if(elementToDelete.innerHTML=="✓" && !editStatus  ){
        if(confirm(`Are you Finish ${CurrentTask} ?`)){
            console.log(list.map(x=>x.task).indexOf(CurrentTask))
            list[list.map(x=>x.task).indexOf(CurrentTask)].status=1
       
            elementToDelete.parentElement.parentElement.classList.add("Finish_work")
            
            elementToDelete.innerHTML="&nbsp;&nbsp;&nbsp;"
            finish+=1
            let markItom=document.getElementById("Mark")
            markItom.innerHTML=`${finish}/${total}`
            localStorage.setItem('list',JSON.stringify(list))
           console.log(list)
            // localStorage.setItem('statusString',statusString)
            localStorage.setItem("total",total)
            localStorage.setItem("finish",finish)
        }
        
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
        if(confirm(`Are You Sure to Delete ${CurrentTask} ?`)){
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
function desableOrEnable(desable){
    let CurrentTask=desable.parentElement.querySelector('p').innerText;
    console.log(list[list.map(x=>x.task).indexOf(CurrentTask)].status)
    if(list[list.map(x=>x.task).indexOf(CurrentTask)].status==0){
        list[list.map(x=>x.task).indexOf(CurrentTask)].enable=!list[list.map(x=>x.task).indexOf(CurrentTask)].enable?1:0;
        // console.log(list[list.map(x=>x.task).indexOf(CurrentTask)].enable)
        if(list[list.map(x=>x.task).indexOf(CurrentTask)].enable==0){
            desable.parentElement.parentElement.classList.add("Eneble")
        }else{
            desable.parentElement.parentElement.classList.remove("Eneble")
        }
        localStorage.setItem('list',JSON.stringify(list))
        
        location.reload();
    }
}