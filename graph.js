class Node {
  constructor(x, y) {
    this.coordinates = [x, y];
    this.connections = [];
  }
}

class Graph {
  constructor() {
    this.nodes = this.connectNodes(this.buildGraph());
  }

  buildGraph() {
    let graph = [[], [], [], [], [], [], [], []];
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        const newNode = new Node(i, j);
        graph[i][j] = newNode;
      }
    }
    return graph;
  }

  connectNodes(graph) {
    for (let i = 0; i < graph.length; i++) {
      for (let j = 0; j < graph.length; j++) {
        const node = graph[i][j];
        let moves = [];
        moves.push([i + 1, j + 2]);
        moves.push([i - 1, j + 2]);
        moves.push([i + 1, j - 2]);
        moves.push([i - 1, j - 2]);
        moves.push([i + 2, j + 1]);
        moves.push([i + 2, j - 1]);
        moves.push([i - 2, j + 1]);
        moves.push([i - 2, j - 1]);
        moves = moves.filter(
          (item) => item[0] <= 7 && item[0] >= 0 && item[1] <= 7 && item[1] >= 0
        );
        for (let k = 0; k < moves.length; k++) {
          const connection = graph[moves[k][0]][moves[k][1]];
          node.connections.push(connection);
        }
      }
    }
    return graph;
  }

  knightMoves(startCoordinates, endCoordinates) {
    const startNode = this.nodes[startCoordinates[0]][startCoordinates[1]];
    const endNode = this.nodes[endCoordinates[0]][endCoordinates[1]];

    let queue = [startNode];
    let checked = [];

    if (startNode === endNode) {
      return console.log("We found it right away!");
    } else {
      while (queue.length > 0) {
        const currentNode = queue[0];

        if (!checked.some((item) => item === currentNode)) {
          if (currentNode.connections.some((item) => item === endNode)) {
            return console.log(`We found it in ${currentNode.coordinates}`);
          } else {
            checked.push(currentNode);
            queue = queue.concat(currentNode.connections);
          }
        }
        queue.shift();
      }
    }
  }
}

const newGraph = new Graph();
newGraph.knightMoves([0, 0], [1, 7]);
