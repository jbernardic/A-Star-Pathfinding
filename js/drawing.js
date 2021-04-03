class DrawableNode extends Node {
    constructor(x, y, width, height, color, collision=false) {
        super(x, y, collision);
        this.width = width;
        this.height = height;
        this.color = color;
        if(!collision){
            drawableNodes.push(this)
        } else drawableWalls.push(this);
    }
    setPos(pos){
        this.x = pos.x;
        this.y = pos.y;
    }
}

class DrawablePath {
    constructor(nodes, color){
        this.nodes = [];
        for(let i = 0; i<nodes.length; i++){
            this.nodes.push({"x": nodes[i].x, "y": nodes[i].y});
        }
        this.color = color;
        drawablePaths.push(this);
    }
}

let drawableNodes = [];
let drawableWalls = [];
let drawablePaths = [];

function draw(){
    //Canvas background
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    //drawableNodes (opened and closed nodes)
    for(let i = drawableNodes.length-1; i>=0; i--){
        let node = drawableNodes[i];
        ctx.fillStyle = node.color;
        ctx.fillRect(node.x*48, node.y*48, node.width, node.height);
    }

    //drawableWalls
    for(let i = drawableWalls.length-1; i>=0; i--){
        let wall = drawableWalls[i];
        ctx.fillStyle = wall.color;
        ctx.fillRect(wall.x*48, wall.y*48, wall.width, wall.height);
    }

    //Grid
    ctx.fillStyle = "#b8b8b8";
    for(let i = 48; i<window.innerWidth; i+=48){
        ctx.fillRect(i, 0, 1, canvas.offsetHeight);
    }
    for(let i = 0; i<window.innerHeight; i+=48){
        ctx.fillRect(0, i, canvas.offsetWidth, 1);
    }

    //Path
    for(let i = 0; i<drawablePaths.length; i++){
        let path = drawablePaths[i];
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        for(let n = 0; n<path.nodes.length-1; n++){
            ctx.moveTo(path.nodes[n].x*48+24, path.nodes[n].y*48+24);
            ctx.lineTo(path.nodes[n+1].x*48+24, path.nodes[n+1].y*48+24)
            ctx.stroke();
        }
        ctx.closePath();
    }
}
self.setInterval(draw, 30);