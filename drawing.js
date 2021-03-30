class DrawableNode extends Node {
    constructor(gridX, gridY, width, height, color, collision=false) {
        super(gridX, gridY, collision);
        this.x = gridX*48;
        this.y = gridY*48;
        this.width = width;
        this.height = height;
        this.color = color;
        drawables.push(this);
    }
    setPos(pos){
        this.gridX = pos.gridX;
        this.gridY = pos.gridY;
        this.x = this.gridX*48;
        this.y = this.gridY*48;
    }
}

const drawables = [];

function draw(){
    //Drawing canvas
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.fillStyle = "#b8b8b8";
    for(let i = 48; i<window.innerWidth; i+=48){
        ctx.fillRect(i, 0, 1, canvas.offsetHeight);
    }
    for(let i = 0; i<window.innerHeight; i+=48){
        ctx.fillRect(0, i, canvas.offsetWidth, 1);
    }

    for(let i = 0; i<drawables.length; i++){
        let drawable = drawables[i];
        ctx.fillStyle = drawable.color;
        ctx.fillRect(drawable.x, drawable.y, drawable.width, drawable.height);
    }
}
self.setInterval(draw, 30);