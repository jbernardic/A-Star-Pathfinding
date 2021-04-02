const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start_btn");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * 0.75;

//Define starting and ending points
let startNode;
let endNode;
function setup(){
    startNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)-1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "green");
    endNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)+1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "red");
}
setup();
startBtn.style.left = startNode.x*48 + "px";
let walls = []

const inCanvas = (e) => e.x < canvas.offsetWidth && e.y < canvas.offsetHeight;
document.addEventListener("contextmenu", e => {
    if(inCanvas(e)){
        //Disable right click inside of canvas
        e.preventDefault();
    }
});

//Creating nodeGrid

const nodeArray = [];
const nodeGrid = Array.from(Array(Math.round(canvas.offsetWidth/48)), (_, x) => new Array(Math.round(canvas.offsetHeight/48)).fill().map((_, y) =>{
    let node = new Node(x, y);
    nodeArray.push(node);
    return node;
}));

//Check if holding click
let clickedNode = null;
document.addEventListener("mousedown", e => {
    if(inCanvas(e)){
        clickedNode = nodeGrid[Math.floor(e.x/48)][Math.floor(e.y/48)];
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            nodeGrid[clickedNode.x][clickedNode.y] = new DrawableNode(clickedNode.getPos().x, clickedNode.getPos().y, 48, 48, "black", true);
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
        if(mouseNode.equals(clickedNode) || mouseNode.equals(startNode) || mouseNode.equals(endNode) || mouseNode.collision == true) return;
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            nodeGrid[mouseNode.x][mouseNode.y] = new DrawableNode(mouseNode.x, mouseNode.y, 48, 48, "black", true);
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
    let path = getPath(nodeGrid, startNode, endNode);
    for(let i = 0; i<path.path.length; i++){
        let pathNode = path.path[i];
        new DrawableNode(pathNode.x, pathNode.y, 48, 48, "yellow", false);
    }
    for(let i = 0; i<path.closed.length; i++){
        let closed = path.closed[i];
        new DrawableNode(closed.x, closed.y, 48, 48, "#85bcf2", false);
    }
    for(let i=0; i<path.opened.length; i++){
        let opened = path.opened[i];
        new DrawableNode(opened.x, opened.y, 48, 48, "#bdffce", false);
    }
});

