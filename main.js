const screenWidth = window.document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;

console.log("screenWidth", screenWidth);
console.log("screenHeight", screenHeight);

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//размер одного блока
let boxElementSize = Math.floor(screenHeight / 20) - 2;
console.log("boxElementSize ", boxElementSize);
//ширина и высота canvas
let widthCanvas = boxElementSize * 10;
let heightCanvas = boxElementSize * 20;
//Размер поля canvas для рисования
let canvasWidth = boxElementSize * 10;
let canvasHeight = boxElementSize * 20;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
//обводим canvas
canvas.style.border = "1px solid #000";
//добавляем canvas на страницу
document.body.appendChild(canvas);
//логотип
let logo = { wigth: 525, heigth: 131, x: 0, y: 0, dx: 1, dy: 2 };
// Создание нового объекта изображения
let stnglogo = new Image();
stnglogo.src = "images/stnglogo.png";
// начало координат
coordx = 3;
coordy = 0;
// скорость игры
let sp = 100;
// Событие которое будет исполнено в момент когда изображение будет загружено

stnglogo.onload = function () {
  let pole = [];
  polefix(pole); //заполняем массив поля нулями
  console.log(pole);
  main();
  start();
};

// Основной игровой цикл
function main() {
  var draw = new DrawElemet();
  update(); //обновление данных
  render(); //рисование
  requestAnimFrame(main); //зацикливание этой функции main
}

//заполняем массив поля нулями
function polefix(pole) {
  for (var i = 0; i < 20; i++) {
    pole[i] = [];
    for (var j = 0; j < 10; j++) {
      pole[i][j] = 0;
    }
  }
  //return pole;
}

//Игровое поле в квадратах
function draweBoxPole() {
  ctx.fillStyle = "#ebebeb";
  ctx.strokeStyle = "white";
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      ctx.fillRect(
        x * boxElementSize,
        y * boxElementSize,
        boxElementSize,
        boxElementSize
      );
      ctx.strokeRect(
        x * boxElementSize,
        y * boxElementSize,
        boxElementSize,
        boxElementSize
      );
    }
  }
}

//Квадат с координатами х, у, цветом Color
function drawBox(x, y, color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "white";
  ctx.fillRect(
    x * boxElementSize,
    y * boxElementSize,
    boxElementSize,
    boxElementSize
  );
  ctx.strokeRect(
    x * boxElementSize,
    y * boxElementSize,
    boxElementSize,
    boxElementSize
  );
}

class DrawElemet {
  constructor() {
    let color = "green";
    let block = {
      x: coordx,
      y: coordy,
      color: "green",
      fig: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    };

    this.collision = function () {
      console.log("vfdjhd jgfdk fsdkh g");
    };

    for (let y = 0; y < block.fig.length; y++) {
      for (let x = 0; x < block.fig[y].length; x++) {
        if (block.fig[y][x] != 0) {
          drawBox(x + block.x, y + block.y, color);
        }
      }
    }
    return block;
  }
}

//console.log(block);

function render() {
  ctx.clearRect(0, 0, widthCanvas, heightCanvas);
  draweBoxPole();

  draw.collision;

  //Игровое поле в квадратах
  //ctx.drawImage(stnglogo, logo.x, logo.y, (logo.wigth)/2,(logo.heigth)/2); // Где x и y это координаты левого верхнего угла изображения, а первый параметр это изображение

  //console.log(drawElemet());
}

//повторить с интервалом 2 секунды
function start() {
  timerId = setInterval(function () {
    coordy = coordy + 1;
  }, sp);
}

// let timerId = setInterval(() =>coordy=coordy+1 , sp);
// console.log(timerId);

function update() {
  //var draw = new DrawElemet();
  for (let y = 0; y < draw.fig.length; y++) {
    for (let x = 0; x < draw.fig[y].length; x++) {}
  }

  if (coordy >= 18) {
    //Когда фигура достигнет 18 выведем е координаты в поле
    console.log(draw.fig.length);
    // for (let y = 0; y < drawElemet().block.fig.length; y++) {
    //   for (let x=0; x< drawElemet().block.fig[y].length; x++) {
    //
    //   }

    // }

    coordy = 0;
    clearInterval(timerId);
    //  console.log(timerId);
  }

  logo.x = logo.x + logo.dx;
  logo.y = logo.y + logo.dy;
  if (logo.x > widthCanvas - logo.wigth / 2 || logo.x < 0) {
    logo.dx = -logo.dx;
  }

  if (logo.y > heightCanvas - logo.heigth / 2 || logo.y < 0) {
    logo.dy = -logo.dy;
  }
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (/* function */ callback, /* DOMElement */ element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();
