class DrawableNode extends Node {
    constructor(x, y, width, height, color, collision=false) {
        super(x, y, collision);
        this.width = width;
        this.height = height;
        this.color = color;
        drawables.push(this);
    }
    setPos(pos){
        this.x = pos.x;
        this.y = pos.y;
    }
}

class DrawablePath {
    constructor(nodes, color){
        this.nodes = nodes;
        this.color = color;
        drawablePaths.push(this);
    }
}

const drawables = [];
const drawablePaths = [];

function draw(){
    //Canvas background
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    //Objects
    for(let i = drawables.length-1; i>=0; i--){
        let drawable = drawables[i];
        ctx.fillStyle = drawable.color;
        ctx.fillRect(drawable.x*48, drawable.y*48, drawable.width, drawable.height);
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
    }
}
self.setInterval(draw, 30);