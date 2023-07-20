let total=0,finish=0,editStatus=false
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
            ourList.insertAdjacentHTML("beforeend",MessageChannel)
            inputObj.value=""
            total+=1;
            if(total!=0)
                markItom.innerHTML=`${finish}/${total}`
        }
        inputObj.focus()
    }

    
})
function finishItom(elementToDelete){
     
    console.log(elementToDelete.innerHTML )
    console.log(editStatus)
    if(elementToDelete.innerHTML=="✓" && !editStatus  ){
        
        elementToDelete.parentElement.parentElement.classList.add("Finish_work")
        // console.log("Iniside if finish Work")
        elementToDelete.innerHTML="&nbsp;&nbsp;&nbsp;"
        finish+=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
    }
    editStatus=false
     
}
function deleteItom(elementToDelete){
    // console.log(elementToDelete.parentElement.innerHTML)
    if(editStatus)
        editStatus=false
    else{
        if(!elementToDelete.parentElement.innerHTML.includes('✓')){
            finish-=1
        }
            // console.log("inisde If to delete")
        // }else{
        //     console.log("inisde else to delete")
        // }
        elementToDelete.parentElement.parentElement.remove() 
        elementToDelete.remove()
    
        total-=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
    }
}
function editContent(edit){
    //editStatus=true
    if(edit.parentElement.innerHTML.includes('✓')){
        edit.parentElement.classList.add("editing")
        let contetnt=document.getElementsByClassName("editing")
        let editableParagraph=contetnt[0].querySelector('p')
        editableParagraph.dataset.originalContent = editableParagraph.textContent;
        editableParagraph.contentEditable = true;
        editableParagraph.focus();
        // console.log(editableParagraph)
        
        // console.log(edit.parentElement.parentElement.innerHTML)
        editableParagraph.addEventListener('blur', () => {
            console.log("Enter event list")
            editableParagraph.contentEditable = false; // Disable editing on blur
            const updatedContent = editableParagraph.textContent.trim();
            const originalContent = editableParagraph.dataset.originalContent.trim();
                
            // Check if the content has changed and update the paragraph accordingly
            if (updatedContent !== originalContent) {
                // You can implement your own saving logic here, e.g., sending data to the server
                console.log('Updated Content:', updatedContent);
            }
            editStatus=true
            edit.parentElement.classList.remove("editing")
        });
        
    
    }
}
