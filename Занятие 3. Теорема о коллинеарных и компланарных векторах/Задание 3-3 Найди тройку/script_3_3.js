//https://www.youtube.com/watch?v=7JbBr9q4UF8
//https://www.youtube.com/watch?v=dqqxkrKhfS4
//https://www.youtube.com/watch?v=-tlb4tv4mC4
"use strict";

const section = document.querySelector("section");
let count = 0, mark = 0;

//randomize
const randomize = (arr) =>{
    return [...arr].map(a => ({ value: a, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.value);   
};

const createData = () =>{
    const arrItems = [];
    randomize(data).slice(0, numberOfCards).forEach((item) => {
        for (let i=0; i<item.imageSrc.length; i++){
            arrItems.push({name: item.name, imageSrc: item.imageSrc[i]});
        }});
    return randomize(arrItems);
}
/*const duplicateArr = (arr, n) =>{
    let newArr = [];
    for (let i=0; i<n; i++){
        newArr = newArr.concat(arr);
    }
    return newArr;
}*/

//card generation function
const cardGenerator = () =>{
    createData().forEach((item) => {
        const card = document.createElement("div");
        card.classList.add('card'); //append class 'card' to the element
        card.setAttribute("name", item.name);
        card.innerHTML = `<img class="face" src="${item.imageSrc}"/>`;
        section.appendChild(card);
        
        card.addEventListener('click', (e)=>{
            checkCards(e);
        });     
    });
};

//check cards
const checkCards = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add("clicked");
    const flippedCards = document.querySelectorAll(".clicked");
    const flippedFace = document.querySelectorAll("div.card.clicked img.face");
    createSyle(flippedFace, 'yellow');
    
    if (flippedCards.length === numberOfFlipCards){
        if([...flippedCards].every(el => el.getAttribute("name") === flippedCards[0].getAttribute("name")) ){
            createSyle(flippedFace, 'lightgreen');
            flippedCards.forEach((card)=>{
                card.classList.remove("clicked");
                card.style.pointerEvents = "none"; //make anclickable element
            });
           count++; 
        }else{
            createSyle(flippedFace, 'red');
            setTimeout(()=>{
                flippedCards.forEach((card)=>{
                card.classList.remove("clicked");
            });
                createSyle(flippedFace, 'white');
            }, 1000);
            count--;
        }
    }
    mark = count <= 0 ? 0 : Math.round(count * score / numberOfCards);
    console.log(mark, count, data.length);
    //console.log(clickedCard);
}

const createSyle = (flip, str) =>{
    flip.forEach((elem)=>{
        elem.style.backgroundColor = str;
    });
}

cardGenerator();

const btnRestart = document.querySelector(".restart");
btnRestart.addEventListener('click', ()=>{
    restart();
});   

//Restart
const restart = () =>{
    count = 0, mark = 0;
    let cardData = createData();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    createSyle(faces, "white");
    cardData.forEach((item, index)=>{
        cards[index].removeAttribute("style");
        cards[index].setAttribute("name", item.name);
        faces[index].src = item.imageSrc;
    });
}