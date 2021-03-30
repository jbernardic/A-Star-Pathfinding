class Node{
    constructor(x, y, collision=false){
        this.gridX = x;
        this.gridY = y;
        this.collision = collision;
    }
    equals(node){
        if(this.gridX == node.gridX && this.gridY == node.gridY){
            return true;
        }
        return false;
    }
    getPos(){
        var pos = {
            'gridX': this.gridX, 'gridY': this.gridY 
        }
        return pos;
    }
    setPos(pos){
        this.gridX = pos.gridX;
        this.gridY = pos.gridY;
    }
}