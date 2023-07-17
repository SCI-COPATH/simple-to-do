let total=0,finish=0
document.addEventListener("DOMContentLoaded",()=>{
    let oruForm=document.getElementById("ourForm")

    let inputObj=document.getElementById("data_block")
    let ourList =document.getElementById("list-ul")
    let finBut=document.getElementById("finishWork")
    let markItom=document.getElementById("Mark")
    finBut.style.display="none"
    oruForm.addEventListener("submit",(e) => {
        e.preventDefault()
        console.log(inputObj.value)
        createItom(inputObj.value)
        
    })
    function createItom(x){
        if(x!=""){
        let MessageChannel=`<div><li>${x}<button onClick="deleteItom(this)" class="Finish_but">Complete</button></li><div>`
            ourList.insertAdjacentHTML("beforeend",MessageChannel)
            inputObj.value=""
            total+=1;
            if(total==0){
                finBut.style.display="none"
            }else{
                finBut.style.display="block"
                markItom.innerHTML=`${finish}/${total}`
            }

        }
        inputObj.focus()
    }

    
})
function deleteItom(elementToDelete){
     elementToDelete.parentElement.parentElement.classList.add("Finish_work")
     elementToDelete.remove()
     finish+=1
     let markItom=document.getElementById("Mark")
     markItom.innerHTML=`${finish}/${total}`
    //alert("data")
}
function finishTask(){
    let ourList =document.getElementById("list-ul")
    let finBut=document.getElementById("finishWork")
    ourList.innerHTML=''
    total=0
    finish=0
    finBut.style.display="none"
    let markItom=document.getElementById("Mark")
     markItom.innerHTML=""
}