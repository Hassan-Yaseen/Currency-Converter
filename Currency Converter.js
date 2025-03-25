 const Base_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

 let dropdowns=document.querySelectorAll(".dropdown select");
 let btn=document.querySelector(".btn");
 let fromCurr=document.querySelector(".from select");
 let toCurr=document.querySelector(".to select");
 let msg=document.querySelector(".msg");

 for(let select of dropdowns){
    for(currCode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currCode;
        newoption.value=currCode;
        if(select.name==="From"&&currCode=="USD")
            newoption.selected="selected";
        else if(select.name==="To"&&currCode=="PKR")
            newoption.selected="selected";
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
 }

 const updateFlag=(element)=>{
    let code=element.value;
    let ccode=countryList[code];
    let newsrc=`https://flagsapi.com/${ccode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
 }


const updateRate=async()=>{
    let amount=document.querySelector("form input");
    let amountVal=amount.value;
    if(amountVal===""||amountVal<0){
        amountVal=1;
        amount.value="1";
    }
    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    console.log(response);
    let data=await (response).json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalRate=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
}

btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateRate();
})

window.addEventListener("load",()=>{
    updateRate();
})