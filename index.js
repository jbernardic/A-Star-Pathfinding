const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * 0.75;



//Creating nodes
const nodes = Array.from(Array(Math.floor(canvas.offsetWidth/48)), (_, x) => new Array(Math.floor(canvas.offsetHeight/48)).fill().map((_, y) =>{
    return new PathNode(x, y);
}));

//Define and draw starting and ending points
let startPoint = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)-1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "green");
let endPoint = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)+1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "red");

const inCanvas = (e) => e.x < canvas.offsetWidth && e.y < canvas.offsetHeight;
document.addEventListener("contextmenu", e => {
    if(inCanvas(e)){
        //Disable right click inside of canvas
        e.preventDefault();
    }
});

//Check if holding click
let clickedPoint = null;
document.addEventListener("mousedown", e => {
    if(inCanvas(e)){
        clickedPoint = [Math.floor(e.x/48), Math.floor(e.y/48)];
    }
});
document.addEventListener("mouseup", e => {
    clickedPoint = null;
});

document.addEventListener("mousemove", e=> {
    if(clickedPoint != null){
        let mousePoint = [Math.floor(e.x/48), Math.floor(e.y/48)];
        if(clickedPoint[0] == startPoint.gridX && clickedPoint[1] == startPoint.gridY){
            startPoint.setPos(mousePoint[0], mousePoint[1])
            clickedPoint = [startPoint.gridX, startPoint.gridY];
        }
        else if(clickedPoint[0] == endPoint.gridX && clickedPoint[1] == endPoint.gridY){
            endPoint.setPos(mousePoint[0], mousePoint[1])
            clickedPoint = [endPoint.gridX, endPoint.gridY];
        }
    }
});

