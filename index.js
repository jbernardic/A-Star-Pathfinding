const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start_btn");
const ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight * 0.75;

//Define and draw starting and ending points
let startNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)-1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "green");
let endNode = new DrawableNode(Math.floor(canvas.offsetWidth/2/48)+1, Math.floor(canvas.offsetHeight/2/48), 48, 48, "red");
startBtn.style.left = startNode.gridX*48 + "px";
let walls = []

const inCanvas = (e) => e.x < canvas.offsetWidth && e.y < canvas.offsetHeight;
document.addEventListener("contextmenu", e => {
    if(inCanvas(e)){
        //Disable right click inside of canvas
        e.preventDefault();
    }
});

//Creating nodes
const nodes = Array.from(Array(Math.floor(canvas.offsetWidth/48)), (_, x) => new Array(Math.floor(canvas.offsetHeight/48)).fill().map((_, y) =>{
    return new Node(x, y);
}));

//Check if holding click
let clickedNode = null;
document.addEventListener("mousedown", e => {
    if(inCanvas(e)){
        clickedNode = nodes[Math.floor(e.x/48)][Math.floor(e.y/48)];
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            nodes[clickedNode.gridX][clickedNode.gridY] = new DrawableNode(clickedNode.getPos().gridX, clickedNode.getPos().gridY, 48, 48, "black", true);
        }
    }
});
document.addEventListener("mouseup", e => {
    clickedNode = null;
});

document.addEventListener("mousemove", e=> {
    if(clickedNode != null ){
        let mouseNode = nodes[Math.floor(e.x/48)][Math.floor(e.y/48)];
        if(mouseNode.equals(clickedNode) || mouseNode.equals(startNode) || mouseNode.equals(endNode) || mouseNode.collision == true) return;
        if(!clickedNode.equals(startNode) && !clickedNode.equals(endNode)){
            nodes[mouseNode.gridX][mouseNode.gridY] = new DrawableNode(mouseNode.gridX, mouseNode.gridY, 48, 48, "black", true);
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

