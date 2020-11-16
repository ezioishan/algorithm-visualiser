
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) 
        neighbors.unshift(grid[row - 1][col]);
    if (row < grid.length - 1) 
        neighbors.unshift(grid[row + 1][col]);
    if (col > 0) 
        neighbors.unshift(grid[row][col - 1]);
    if (col < grid[0].length - 1) 
        neighbors.unshift(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    //const unvisitedNodes = getAllNodes(grid);
    let structure = [startNode];
    while(structure.length){
        let currentNode = structure.pop();
        visitedNodesInOrder.push(currentNode);
        currentNode.isVisited = true;

        if(currentNode === finishNode)
            return visitedNodesInOrder;
        
        let curNeighbours = getUnvisitedNeighbors(currentNode, grid);
        curNeighbours.forEach(neigbour => {
            structure.push(neigbour);
        });
    }
    return visitedNodesInOrder;
}