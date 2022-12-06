//https://learn.javascript.ru/variables
//https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Basic_usage
//https://dev.to/tqbit/how-to-create-svg-elements-with-javascript-4mmp
//https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/

"use strict";
//massiv
var coords = [
    //line
    ["l", [ 4, 1, 5, 2 ], 8], //l1
    ["l", [ 5, 2, 5, 1 ], 8], //l2
    ["l", [ 10, 1, 10, 2 ], 8],  //3
    ["l", [ 10, 2, 11, 1], 8], //4
    ["l", [ 4, 3, 5, 2 ], 8], //5
    ["l", [ 10, 2, 11, 3 ], 8], //6
    ["l", [ 4, 4, 5, 3 ], 8], //7
    ["l", [ 5, 3, 6, 4 ], 8], //8
    ["l", [ 6, 3, 7, 4 ], 8], //9
    ["l", [ 8, 4, 9, 3 ], 8], //10
    ["l", [ 9, 4, 10, 3 ], 8], //11
    ["l", [ 10, 3, 11, 4 ], 8], //12
    ["l", [ 5, 5, 5, 6 ], 8], //13
    ["l", [ 9, 4, 9, 7 ], 8], //14
    ["l", [ 10, 5, 10, 6 ], 8], //15
    ["l", [ 4, 7, 5, 8 ], 8], //16
    ["l", [ 5, 8, 6, 7 ], 8], //17
    ["l", [ 6, 8, 7, 7 ], 8], //18
    ["l", [ 8, 7, 9, 8 ], 8], //19
    ["l", [ 9, 7, 10, 8 ], 8], //20
    ["l", [ 10, 8, 11, 7 ], 8], //21
    ["l", [ 4, 8, 5, 9 ], 8], //22
    ["l", [ 10, 9, 11, 8 ], 8], //23
    ["l", [ 3, 11, 4, 10 ], 8], //24
    ["l", [ 13, 11, 14, 10 ], 8], //25
    ["l", [ 7, 14, 7, 13 ], 8], //26
    ["l", [ 8, 12, 10, 12 ], 8], //27
    ["l", [ 10, 12, 11, 13], 8], //28
    ["l", [ 11, 12, 12, 13 ], 8], //29
    //beak
    ["l", [ 7, 8, 8, 8 ], 8], //30
    ["l", [ 8, 8, 7.5, 9 ], 8], //31
    ["l", [7.5, 9, 7, 8 ], 8], //32
    //vectors
    ["v", [ 10, 2, 11, 2 ], 0], //3
    ["v", [ 5, 2, 10, 2 ], 3], //2
    ["v", [ 4, 2, 5, 2 ], 0], //1
    ["v", [ 5, 3, 6, 3 ], 0], //4
    ["v", [ 9, 3, 10, 3 ], 0], //5
    ["v", [ 6, 7, 6, 4 ], 7], //29
    ["v", [ 5, 5, 6, 5 ], 0], //6
    ["v", [ 9, 5, 10, 5 ], 0], //7
    ["v", [ 5, 6, 6, 6 ], 0], //8
    ["v", [ 9, 6, 10, 6 ], 0], //9
    ["v", [ 5, 8, 6, 8 ], 0], //10
    ["v", [ 9, 8, 10, 8 ], 0], //11
    ["v", [ 1, 11, 2, 11 ], 0], //12
    ["v", [ 4, 5, 4, 3 ], 5], //25
    ["v", [ 4, 7, 4, 5 ], 5], //26
    ["v", [ 4, 9, 4, 7 ], 5], //27
    ["v", [ 5, 11, 4, 9 ], 4], //38
    ["v", [ 5, 11, 5, 9 ], 5], //28
    ["v", [ 13, 11, 14, 11 ], 0], //20
    ["v", [ 14, 11, 15, 11 ], 0], //19
    ["v", [ 13, 10, 14, 10 ], 0], //18
    ["v", [ 12, 11, 13, 10 ], 1], //41
    ["v", [ 11, 3, 11, 5 ], 5], //32
    ["v", [ 11, 7, 11, 5 ], 5], //33
    ["v", [ 11, 9, 11, 7 ], 5], //34
    ["v", [ 10, 11, 11, 9 ], 4], //39
    ["v", [ 11, 11, 12, 11 ], 0], //17
    ["v", [ 10, 11, 11, 11 ], 0], //16
    ["v", [ 5, 11, 10, 11 ], 3], //15
    ["v", [ 4, 11, 5, 11 ], 0],  //14
    ["v", [ 3, 11, 4, 11 ], 0], //13
    ["v", [ 10, 9, 10, 11 ], 5],  //35
    ["v", [ 15, 12, 15, 11 ], 2], //37
    ["v", [ 5, 12, 7, 14 ], 7], //42
    ["v", [ 1, 12, 5, 12 ], 3], //21
    ["v", [ 6, 12, 8, 12 ], 7], //22
    ["v", [ 11, 12, 15, 12 ], 3], //23
    ["v", [ 11, 13, 12, 13 ], 0], //24
    ["v", [ 7, 7, 7, 4 ], 6], //30
    ["v", [ 8, 4, 8, 7 ], 6], //31
    ["v", [ 1, 11, 1, 12 ], 2], //36
    ["v", [ 3, 10, 2, 11 ], 1], //40
    ["v", [ 6, 12, 7, 13 ], 7], //43
    ["v", [ 3, 10, 4, 10 ], 0] //44
    ];
var svg = document.getElementById('pic');
svg
const colors = document.getElementsByClassName('jsColor');
var cursor = document.getElementById('cursor');
//for cursor
document.addEventListener('mousemove', function(e){
    var x = e.pageX;
    var y = e.pageY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
});

Array.from(colors).forEach(color => color.addEventListener('click', (event) => {
        const color = event.target.style.backgroundColor;
        cursor.style.backgroundColor = color;
    }));

function draw_svg_line(x1, y1, x2, y2, w, c) {
    x1 *= 10; y1 *= 10; x2 *= 10; y2 *= 10;
    const path_line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    var s_line = `M ${x1} ${y1} L ${x2} ${y2} `;
    path_line.setAttribute('d', s_line);
    path_line.setAttribute('stroke-linecap', 'round');
    path_line.setAttribute('stroke-linejoin', 'round');
    path_line.setAttribute('stroke-width', w);
    path_line.setAttribute('stroke', c);
    
    svg.appendChild(path_line);
}

function draw_svg_vect(x1, y1, x2, y2) {
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
    path_vect.setAttribute('stroke-width', '2.2');
    path_vect.setAttribute('stroke', '#E0E0E0');
    path_vect.setAttribute('data-len', len / 10);  
    path_vect.addEventListener('click', function () {
        path_vect.setAttribute('stroke', cursor.style.backgroundColor);
    });
    svg.appendChild(path_vect);
}

//draw grid
for (var i = 0; i < 19; ++i){
    draw_svg_line(i, 0, i, 18, '0.5', '#dcdcdc');
    draw_svg_line(0, i, 19, i, '0.5', '#dcdcdc');
}

var pallete = document.getElementsByClassName("control_color jsColor");
function colors_code(i){
    if (i == 8){
        return '#414141';
    }
    return pallete[i].style.backgroundColor;
}

//draw vectors and lines
var count_vect=0;
for (var i = 0; i < coords.length; ++i) {
    var c = coords[i][1];
    if (coords[i][0] == "l") draw_svg_line(c[0], c[1], c[2], c[3], '2.5', colors_code(coords[i][2])); 
    else {
        draw_svg_vect(c[0], c[1], c[2], c[3]);
        count_vect++;
    }
}

//btn check
const btnCheck = document.getElementById('jsCheck');
var result = document.getElementById("result");
var coef = 10 / count_vect;

btnCheck.addEventListener("click", () => {
    cursor.style.backgroundColor = null;
    var count_true = 0, count_false = 0, k = svg.children.length - 1;;
    for (var i = coords.length-1; i >=0; --i){
        if (coords[i][0] == "v"){
            if (svg.children[k].getAttribute('stroke') === colors_code(coords[i][2])) {
            count_true++;
            console.log(count_true);
        }
        else count_false++;
        k--;
        }
        
    };
    console.log(count_true - count_false);
    if ((count_true - count_false) < 0) var count = 0;
    else count = Math.floor((count_true - count_false) * coef);
    result.innerHTML = `Количество баллов: ${count} из 10`;
    
});



