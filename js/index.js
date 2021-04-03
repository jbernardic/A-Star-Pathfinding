const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start_btn");
const clearBtn = document.getElementById("clear_btn");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * 0.75;

//Create a grid
let nodeGrid = Array.from(Array(Math.ceil(canvas.offsetWidth/48)), (_, x) => new Array(Math.ceil(canvas.offsetHeight/48)).fill().map((_, y) =>{
    return new Node(x, y); }));

//Define start and end node
let startNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)-1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "green");
let endNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)+1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "red");

function clearPath(){
    drawablePaths = []; //drawing.js
    drawableNodes.length = 2;
    
    //clear everything except walls
    for(let x = 0; x<nodeGrid.length; x++){
        for(let y = 0; y<nodeGrid[x].length; y++){
            if(nodeGrid[x][y].collision == false){
                nodeGrid[x][y] = new Node(x, y);
            }
        }
    }
}

startBtn.style.left = startNode.x*48-48*2 + "px";
clearBtn.style.left = startNode.x*48+48*2 + "px";

const inCanvas = (e) => e.x < canvas.offsetWidth && e.y < canvas.offsetHeight;
document.addEventListener("contextmenu", e => {
    if(inCanvas(e)){
        //Disable right click inside of canvas
        e.preventDefault();
    }
});

//Check if holding click
let clickedNode = null;
document.addEventListener("mousedown", e => {
    if(inCanvas(e)){
        clickedNode = nodeGrid[Math.floor(e.x/48)][Math.floor(e.y/48)];
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            if(e.which != 3) nodeGrid[clickedNode.x][clickedNode.y] = new DrawableNode(clickedNode.x, clickedNode.y, 48, 48, "gray", true);
            else{
                //remove walls on right click
                drawableWalls = drawableWalls.filter(n => !n.equals(clickedNode));
                nodeGrid[clickedNode.x][clickedNode.y] = new Node(clickedNode.x, clickedNode.y);
            }  
        }
    }
});
document.addEventListener("mouseup", e => {
    clickedNode = null;
});

document.addEventListener("mousemove", e=> {
    if(clickedNode != null && inCanvas(e)){
        let mouseNode = nodeGrid[Math.floor(e.x/48)][Math.floor(e.y/48)];
        if(mouseNode == undefined) return;

        //Remove walls on right click
        if(e.which == 3){
            if(drawableWalls.findIndex(n => n.equals(mouseNode)) > -1){
                drawableWalls = drawableWalls.filter(n => !n.equals(mouseNode));
                nodeGrid[mouseNode.x][mouseNode.y] = new Node(mouseNode.x, mouseNode.y);
            }
            return;
        }

        if(mouseNode.equals(clickedNode) || mouseNode.equals(startNode) || mouseNode.equals(endNode) || mouseNode.collision == true) return;
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            nodeGrid[mouseNode.x][mouseNode.y] = new DrawableNode(mouseNode.x, mouseNode.y, 48, 48, "gray", true);
            clickedNode = mouseNode;
        }
        if(clickedNode.equals(startNode)){
            startNode.setPos(mouseNode.getPos());
            clickedNode = mouseNode;
        }
        else if(clickedNode.equals(endNode)){
            endNode.setPos(mouseNode.getPos());
            clickedNode = mouseNode;
        }
    }
});

startBtn.addEventListener("click", e => {
    clearPath();
    let path = getPath(nodeGrid, startNode, endNode);
    new DrawablePath(path.path, "yellow");
    for(let i = 0; i<path.closed.length; i++){
        let closed = path.closed[i];
        new DrawableNode(closed.x, closed.y, 48, 48, "#85bcf2", false);
    }
    for(let i=0; i<path.opened.length; i++){
        let opened = path.opened[i];
        new DrawableNode(opened.x, opened.y, 48, 48, "#bdffce", false);
    }
});

clearBtn.addEventListener("click", e=> {
    nodeGrid = Array.from(Array(Math.ceil(canvas.offsetWidth/48)), (_, x) => new Array(Math.ceil(canvas.offsetHeight/48)).fill().map((_, y) =>{
        return new Node(x, y); }));
    drawablePaths = []; //drawing.js
    drawableWalls = [];
    drawableNodes.length = 2;
})

