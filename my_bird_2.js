//https://learn.javascript.ru/variables
//https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Basic_usage
//https://dev.to/tqbit/how-to-create-svg-elements-with-javascript-4mmp
//https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/

"use strict";
//task
var statements = document.getElementsByClassName("statement");
statements[0].innerHTML = "сонаправленные единичные";
statements[1].innerHTML = "противоположно направленные, длина которых равна корень из 2";
statements[2].innerHTML = "противоположно направленные, длина которых равна 1";
statements[3].innerHTML = "сонаправленные, длина которых больше или равна 4";
statements[4].innerHTML = "не коллинеарные, длина которых равна корень из 5";
statements[5].innerHTML = "коллинеарные, длина которых равна 2";
statements[6].innerHTML = "не  равные, длина которых равна 3";
statements[7].innerHTML = "не подходят ни под одно из указанных выше условий";

var svg = document.getElementById('pic');
const colors = document.getElementsByClassName('jsColor');
var cursor = document.getElementById('cursor');

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
    var alen = 1.5;
    var ax = x2 - alen * dx, ay = y2 - alen * dy;
    
    var s_vect = `M ${x1} ${y1} L ${x2} ${y2} ` +
        " L " + (ax + dy * alen) + " " + (ay - dx * alen) +
        " M " + x2 + " " + y2 +
        " L " + (ax - dy * alen) + " " + (ay + dx * alen);
    path_vect.setAttribute('d', s_vect);
    path_vect.setAttribute('stroke-linecap', 'round');
    path_vect.setAttribute('stroke-linejoin', 'round');
    path_vect.setAttribute('stroke-width', '2.5');
    path_vect.setAttribute('stroke', '#d3d3d3');
    path_vect.setAttribute('data-len', len / 10);  
    path_vect.addEventListener('click', function () {
        path_vect.setAttribute('stroke', cursor.style.backgroundColor);
    });
    svg.appendChild(path_vect);
}

//draw grid
for (var i = 0; i < 18; ++i){
    draw_svg_line(i, 0, i, 15, '0.5', '#dcdcdc');
    draw_svg_line(0, i, 16, i, '0.5', '#dcdcdc');
}

//draw vectors and lines
var coords = [
    //line
    [ 4, 1, 5, 2 ], //1
    [ 5, 2, 5, 1 ], //2
    [ 10, 1, 10, 2 ], //3
    [ 10, 2, 11, 1], //4
    [ 4, 3, 5, 2 ], //5
    [ 10, 2, 11, 3 ], //6
    [ 4, 4, 5, 3 ], //7
    [ 5, 3, 6, 4 ], //8
    [ 6, 3, 7, 4 ], //9
    [ 8, 4, 9, 3 ], //10
    [ 9, 4, 10, 3 ], //11
    [ 10, 3, 11, 4 ], //12
    [ 5, 5, 5, 6 ], //13
    [ 9, 4, 9, 7 ], //14
    [ 10, 5, 10, 6 ], //15
    [ 4, 7, 5, 8 ], //16
    [ 5, 8, 6, 7 ], //17
    [ 6, 8, 7, 7 ], //18
    [ 8, 7, 9, 8 ], //19
    [ 9, 7, 10, 8 ], //20
    [ 10, 8, 11, 7 ], //21
    [ 4, 8, 5, 9 ], //22
    [ 10, 9, 11, 8 ], //23
    [ 3, 11, 4, 10 ], //24
    [ 13, 11, 14, 10 ], //25
    [ 7, 14, 7, 13 ], //26
    [ 8, 12, 10, 12 ], //27
    [ 10, 12, 11, 13], //28
    [ 11, 12, 12, 13 ], //29
    //beak
    [ 7, 8, 8, 8 ], //30
    [ 8, 8, 7.5, 9 ], //31
    [7.5, 9, 7, 8 ], //32
    //vectors
    [ 10, 2, 11, 2 ], //3
    [ 5, 2, 10, 2 ], //2
    [ 4, 2, 5, 2 ], //1
    [ 5, 3, 6, 3 ], //4
    [ 9, 3, 10, 3 ], //5
    [ 6, 7, 6, 4 ], //29
    [ 5, 5, 6, 5 ], //6
    [ 9, 5, 10, 5 ], //7
    [ 5, 6, 6, 6 ], //8
    [ 9, 6, 10, 6 ], //9
    [ 5, 8, 6, 8 ], //10
    [ 9, 8, 10, 8 ], //11
    [ 1, 11, 2, 11 ], //12
    [ 4, 5, 4, 3 ], //25
    [ 4, 7, 4, 5 ], //26
    [ 4, 9, 4, 7 ], //27
    [ 5, 11, 4, 9 ], //38
    [ 5, 11, 5, 9 ], //28
    [ 13, 11, 14, 11 ], //20
    [ 14, 11, 15, 11 ], //19
    [ 13, 10, 14, 10 ], //18
    [ 12, 11, 13, 10 ], //41
    [ 11, 3, 11, 5 ], //32
    [ 11, 7, 11, 5 ], //33
    [ 11, 9, 11, 7 ], //34
    [ 10, 11, 11, 9 ], //39
    [ 11, 11, 12, 11 ], //17
    [ 10, 11, 11, 11 ], //16
    [ 5, 11, 10, 11 ], //15
    [ 4, 11, 5, 11 ], //14
    [ 3, 11, 4, 11 ], //13
    [ 10, 9, 10, 11 ], //35
    [ 15, 12, 15, 11 ], //37
    [ 5, 12, 7, 14 ], //42
    [ 1, 12, 5, 12 ], //21
    [ 6, 12, 8, 12 ], //22
    [ 11, 12, 15, 12 ], //23
    [ 11, 13, 12, 13 ], //24
    [ 7, 7, 7, 4 ], //30
    [ 8, 4, 8, 7 ], //31
    [ 1, 11, 1, 12 ], //36
    [ 3, 10, 2, 11 ], //40
    [ 6, 12, 7, 13 ], //43
    [ 3, 10, 4, 10 ], //44
    ];

var colors_vect = [
    'rgb(193, 164, 193)', //1/3
    'rgb(155, 194, 166)', //4/2
    'rgb(193, 164, 193)', //1/1
    'rgb(193, 164, 193)', //1/4
    'rgb(193, 164, 193)', //1/5
    '#d3d3d3', //0/29
    'rgb(193, 164, 193)', //1/6
    'rgb(193, 164, 193)', //1/7
    'rgb(193, 164, 193)', //1/8
    'rgb(193, 164, 193)', //1/9
    'rgb(193, 164, 193)', //1/10
    'rgb(193, 164, 193)', //1/11
    'rgb(193, 164, 193)', //1/12
    'rgb(69, 120, 227)', //6/25
    'rgb(69, 120, 227)', //6/26
    'rgb(69, 120, 227)', //6/27
    'rgb(244, 94, 148)', //5/38
    'rgb(69, 120, 227)', //6/28
    'rgb(193, 164, 193)', //1/20
    'rgb(193, 164, 193)', //1/19
    'rgb(193, 164, 193)', //1/18
    'rgb(254, 216, 174)', //2/41
    'rgb(69, 120, 227)', //6/32
    'rgb(69, 120, 227)', //6/33
    'rgb(69, 120, 227)', //6/34
    'rgb(244, 94, 148)', //5/39
    'rgb(193, 164, 193)', //1/17
    'rgb(193, 164, 193)', //1/16
    'rgb(155, 194, 166)', //4/15
    'rgb(193, 164, 193)', //1/14
    'rgb(193, 164, 193)', //1/13
    'rgb(69, 120, 227)', //6/35
    'rgb(24, 131, 104)', //3/37
    '#d3d3d3', //0/42
    'rgb(155, 194, 166)', //4/21
    '#d3d3d3', //0/22
    'rgb(155, 194, 166)', //4/23
    'rgb(193, 164, 193)', //1/24
    'rgb(66, 201, 239)', //7/30
    'rgb(66, 201, 239)', //7/31
    'rgb(24, 131, 104)', //3/36
    'rgb(254, 216, 174)', //2/40
    '#d3d3d3', //0/43
    'rgb(193, 164, 193)', //1/44    
];

var line_count = coords.length - colors_vect.length;
for (var i = 0; i < line_count; ++i) {
    var c_line = coords[i];
    draw_svg_line(c_line[0], c_line[1], c_line[2], c_line[3], '2.5', '#414141');  
}
for (var i = line_count; i < coords.length; ++i) {
    var c_vect = coords[i];
    draw_svg_vect(c_vect[0], c_vect[1], c_vect[2], c_vect[3]);
}

//btn check
const btnCheck = document.getElementById('jsCheck');
var result = document.getElementById("result");
var coef = 10 / colors_vect.length;
btnCheck.addEventListener("click", () => {
    cursor.style.backgroundColor = null;
    var count_true = 0, count_false = 0, k = svg.children.length - 1;
    for (var i = colors_vect.length -1; i >=0 ; --i){
        if (svg.children[k].getAttribute('stroke') === colors_vect[i]) count_true++;
        else count_false++;
        k--;
    };
    console.log(count_true - count_false);
    if ((count_true - count_false) < 0) var count = 0;
    else count = Math.floor((count_true - count_false) * coef);
    result.innerHTML = `Количество баллов: ${count} из 10`;
    
});



