// const fs = require('fs');
// const dataJSON = fs.readFileSync(`${__dirname}/data_6_2.json`, 'utf-8');
// const data = JSON.parse(dataJSON);
// console.log('json', data);
let svg = document.getElementById('pic'); 
const form = document.querySelector('.form');
const btnCheck = document.querySelector(".check");
const btnBack = document.querySelector(".back");
const btnReset = document.querySelector(".reset");

let sizeSvg = 14, 
    count = 0,
    mark = 0;
const variant = 0, 
      coordAxes = [[1, sizeSvg+1, 1, 1], [0, sizeSvg,  sizeSvg+1, sizeSvg]];
let rest = data[variant].vectors.length;
let answInputs = [], 
    arrInputs = [], 
    colorProj = Array(data[variant].projections.length).fill('#dcdcdc'),
    answColorVect = [];

const draw_svg_line = (x1, y1, x2, y2) =>{
    x1 *= 10; y1 *= 10; x2 *= 10; y2 *= 10;
    const path_line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var s_line = `M ${x1} ${y1} L ${x2} ${y2} `;
    path_line.setAttribute('d', s_line);
    path_line.setAttribute('stroke-linecap', 'round');
    path_line.setAttribute('stroke-linejoin', 'round');
    path_line.setAttribute('stroke-width', '1');
    path_line.setAttribute('stroke', '#E0E0E0');
    
    svg.appendChild(path_line);
}

const draw_svg_vect = (arr, color = '#414141', width, name) =>{
    let x1 = arr[0], y1 = arr[1], x2 = arr[2], y2 = arr[3];
    x1 *= 10; y1 *= 10; x2 *= 10; y2 *= 10;
    const path_vect = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.sqrt(dx * dx + dy * dy);
    dx /= len; dy /= len;
    var alen = 2.5;
    var ax = x2 - (alen+1) * dx, ay = y2 - (alen) * dy;
    
    var s_vect = `M ${x1} ${y1} L ${x2} ${y2} ` +
        " L " + (ax + dy * alen) + " " + (ay - dx * alen) +
        " M " + x2 + " " + y2 +
        " L " + (ax - dy * alen) + " " + (ay + dx * alen);
    path_vect.setAttribute('d', s_vect);
    path_vect.setAttribute('stroke-linecap', 'round');
    path_vect.setAttribute('stroke-linejoin', 'round');
    path_vect.setAttribute('stroke-width', width);
    path_vect.setAttribute('stroke', color);
    path_vect.setAttribute('data-len', len / 10);  
    path_vect.classList.add(name);
    svg.appendChild(path_vect);
}

const draw_svg_grid = () =>{
    for (var i = 0; i < sizeSvg+2; ++i){
        draw_svg_line(i, 0, i, sizeSvg+1);
        draw_svg_line(0, i, sizeSvg+1, i);
    }
    for (let i = 0; i < coordAxes.length; i++) draw_svg_vect(coordAxes[i], '1.5', 'coordAxes');
}

const randomInt = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//randomize
const randomize = (arr) =>{
    return [...arr].map(a => ({ value: a, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.value);   
};

data[variant].colorVect = randomize(data[variant].colorVect);
data[variant].colorProj = colorProj;

const drawTask = (colorVect, colorProj)=>{
    const elH2 = document.querySelector('.condition');
    elH2.innerHTML = `<h3>${data[variant].condition[0]}</h3><p>${data[variant].condition[1]}</p>`;
    draw_svg_grid();
    //colorVectors = randomize(data[variant].color);
    data[variant].vectors.forEach((el, index) => {
        draw_svg_vect(el, colorVect[index], '2', 'vector'); 
    });
    data[variant].projections.forEach((el, ind)=>{
        draw_svg_vect(el, colorProj[ind], '2', 'projection');
    });
    console.log(data);
}

const clickVectors = (e, skalar)=>{
    const clickedVect = e.target;
    clickedVect.classList.add("clicked");
    clickedVect.setAttribute('stroke-width', '3');
    const chooseVectors = document.querySelectorAll(".clicked");
    let color;
    if (chooseVectors.length === 2){
        if (chooseVectors[0].classList.contains('projection'))
            color = chooseVectors[0].getAttribute('stroke') === '#dcdcdc'? chooseVectors[1].getAttribute('stroke'): chooseVectors[0].getAttribute('stroke');
        else 
            color = chooseVectors[1].getAttribute('stroke') === '#dcdcdc'? chooseVectors[0].getAttribute('stroke'): chooseVectors[1].getAttribute('stroke');
    
        chooseVectors.forEach((elem)=>{
            elem.setAttribute('stroke', color);
            elem.classList.remove("clicked");
            if (elem.classList.contains('vector')) elem.style.pointerEvents = "none";
            setTimeout(()=>{ 
               elem.setAttribute('stroke-width', '1.7');
            }, 700);
            
        form.innerHTML = `<p>Скалярная проекция выбранного вектора равна:</p><div class="task"><div class="color" style="background-color: ${color}"></div><input skalar = "${skalar}" style='text'></div>`;
        
        const input = document.querySelector('input');
        input.addEventListener('change', ()=>{
            answInputs.push(input.value);
            form.innerHTML = '';
            arrInputs.push(skalar);
            console.log('input change', answInputs, arrInputs);
            
            });
        });
    };
}

const talkColor=(color)=>{
    switch (color){
        case '#F2E01F': return 'жёлтый';
        case '#963E2A': return 'коричневый';
        case '#F2E01F': return 'жёлтый';
        case '#FF3B84': return 'розовый';
        case '#38CEF3': return 'голубой';
        case '#2788DB': return 'синий';
        case '#2CF2AD': return 'зеленый';
        case '#B87FB6': return 'фиолетовый';  
        case '#FF6947': return 'оранжевый'; 
        case '#dcdcdc': return 'серый'; 
            
    }
}

const dblclickVectors = (e)=>{
    const clickedVect = e.target;
    clickedVect.classList.remove("clicked");
    clickedVect.setAttribute('stroke-width', '2');
}

const addEventToVect = (arr1, arr2)=>{
    arr1.forEach((el, index)=>{
        //el.oncontextmenu = null;
        el.classList.add(arr2[index][4]);
        el.addEventListener('click', (e)=>{
            clickVectors(e, arr2[index][5]);
        });   
        el.addEventListener('dblclick', (e)=>{
            dblclickVectors(e);
        }); 
        el.addEventListener('contextmenu', (e)=>{
            utterance = new SpeechSynthesisUtterance(talkColor(el.getAttribute('stroke')));
            talk();
            
        });    
        
    });   
}

const matchingGenerator = ()=>{
    const arrVect = svg.querySelectorAll('path.vector');
    const arrProj = svg.querySelectorAll('path.projection');
    addEventToVect(arrVect, data[variant].vectors);
    addEventToVect(arrProj, data[variant].projections);
}

drawTask(data[variant].colorVect, data[variant].colorProj);
matchingGenerator();

btnCheck.addEventListener('click', ()=>{
    for (let i=0; i<data[variant].projections.length; i++){
        const sameElem = svg.querySelectorAll(`.group-${i+1}`);
        const colorElem = sameElem[0].getAttribute('stroke');
        if ([...sameElem].every(el=>el.getAttribute('stroke') === colorElem)) count++; else count--;  
    }
    arrInputs.forEach((el, ind)=>{
        if (el == answInputs[ind]) count++; else count--;
    });
    mark = count <= 0 ? 0 : Math.round(count * data[variant].score / data[variant].vectors.length * 2);
    data[variant].rightAnswerInput = arrInputs;
    data[variant].userAnswerInput = answInputs;
    data[variant].mark = mark;
    arrInputs = [], answInputs = [], answColorVect = [], count = 0, mark = 0;
    console.log("check", data);
    //save data web page
    const vect = svg.querySelectorAll('.vector');
    const colorVect =[...vect].map(el=> el.getAttribute('stroke'));
    const proj = svg.querySelectorAll('.projection');
    const colorProj =[...proj].map(el=> el.getAttribute('stroke'));
    data[variant].colorProj = colorProj;
    data[variant].colorVect = colorVect;
});

btnBack.addEventListener('click', ()=>{
    svg.replaceChildren();
    drawTask(data[variant].colorVect, data[variant].colorProj);
    matchingGenerator();
    console.log("back", data);
    
});

btnReset.addEventListener('click', ()=>{
    arrInputs = [], answInputs = [], answColorVect = [], count = 0, mark = 0;
    const arrVect = svg.querySelectorAll('path.vector');
    const arrProj = svg.querySelectorAll('path.projection');
    arrVect.forEach((el, index)=>{
        el.setAttribute('stroke', data[variant].colorVect[index]);
        el.style.pointerEvents = "all";
    });
    arrProj.forEach((el, index)=>{
        el.setAttribute('stroke', '#dcdcdc');
    });
    form.replaceChildren();
    data[variant].rightAnswerInput = arrInputs;
    data[variant].userAnswerInput = answInputs;
    data[variant].mark = mark;
    colorProj = Array(data[variant].projections.length).fill('#dcdcdc');
    data[variant].colorProj = colorProj;
    console.log("reset", data);
});


 // Создаем распознаватель
  var recognizer = new webkitSpeechRecognition();

  // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
  recognizer.interimResults = true;

  // Какой язык будем распознавать?
  recognizer.lang = 'ru-Ru';

  // Используем колбек для обработки результатов
  recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex];
    if (result.isFinal) {
      alert('Вы сказали: ' + result[0].transcript);
    } else {
      console.log('Промежуточный результат: ', result[0].transcript);
    }
  };

  function speech () {
    // Начинаем слушать микрофон и распознавать голос
    recognizer.start();
  }

  var synth = window.speechSynthesis;
  //var utterance = new SpeechSynthesisUtterance('Фиолетовый');
    var utterance;
  function talk () {
    synth.speak (utterance);
  }

  function stop () {
    synth.pause();
  }