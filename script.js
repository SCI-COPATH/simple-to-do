let total=0,finish=0
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
        let MessageChannel=`<div class="task"><li><p>${x}</p><div onClick="finishItom(this)" class="Finish_but">&check;</div> <div class="Delete_but" id="intoMark" onClick= deleteItom(this)>&#10008;</div></li><div>`
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
     elementToDelete.parentElement.parentElement.classList.add("Finish_work")
    // console.log(elementToDelete.innerHTML )
    if(elementToDelete.innerHTML=="✓"){
        // console.log("Iniside if finish Work")
        elementToDelete.innerHTML="&nbsp;&nbsp;&nbsp;"
        finish+=1
        let markItom=document.getElementById("Mark")
        markItom.innerHTML=`${finish}/${total}`
    }
     
}
function deleteItom(elementToDelete){
    // console.log(elementToDelete.parentElement.innerHTML)
    
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
