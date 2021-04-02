class Node{
    constructor(x, y, collision=false){
        this.x = x;
        this.y = y;
        this.F = Number.MAX_VALUE;
        this.H = Number.MAX_VALUE;
        this.G = Number.MAX_VALUE;
        this.parent = null;
        this.collision = collision;
    }
    equals(node){
        if(this.x == node.x && this.y == node.y){
            return true;
        }
        return false;
    }
    getPos(){
        var pos = {
            'x': this.x, 'y': this.y 
        }
        return pos;
    }
    setPos(pos){
        this.x = pos.x;
        this.y = pos.y;
    }
}

function getPath(nodeGrid, startNode, endNode){
    let opened = [];
    let closed = [];
    let path = [];
    let current = null;
    startNode.G = 0;
    opened.push(startNode);
    while(opened.length > 0){
        current = opened.pop();
        closed.push(current);

        let neighbours = getNeighbours(current, nodeGrid);

        //Update values
        for(let i = 0; i<neighbours.length; i++){

            if(closed.includes(neighbours[i]) || neighbours[i].collision == true) continue;

            //get neighbour from opened list
            let neigh = opened.find(n => n.equals(neighbours[i]));
            //if theres no neighbour in opened list add it
            if(neigh == undefined){
                neigh = neighbours[i];
                opened.push(neigh);
            }
            //if current G is lower than old G
            if(current.G + 1 < neigh.G){
                neigh.parent = current;
                neigh.G = current.G + 1;
                neigh.H = getManhattan(neigh, endNode);
                neigh.F = neigh.G+neigh.H;
            }
        }

        //End
        if(current.equals(endNode)){
            let node = closed[closed.length-1];
            while(node.parent != null){
                node = node.parent;
                path.push(node);
            }
            return {"opened": opened, "closed": closed, "path": path};
        }

        opened.sort((a, b) => (b.F - a.F));
    }
    return null;

}

function getNeighbours(node, nodeGrid){
    let neighbours = [];
    for(let x = -1; x<=1; x++){
        for(let y = -1; y<=1; y++){
            if(x==0 && y==0 || node.x+x < 0 || node.y+y < 0 || node.x+x >= nodeGrid.length || node.y+y >= nodeGrid[node.x+x].length) continue;
            neighbours.push(nodeGrid[node.x+x][node.y+y]);
        }
    }
    return neighbours;
}

function getManhattan(node1, node2){
    return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}