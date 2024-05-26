const { chessboard } = require("./graph.js");

function knightMoves(startCoordinates, endCoordinates) {
  const startNode = chessboard.nodes[startCoordinates[0]][startCoordinates[1]];
  const endNode = chessboard.nodes[endCoordinates[0]][endCoordinates[1]];

  let queue = [startNode];
  let checked = [];

  if (startNode === endNode) {
    console.log("Please enter unique coordinates");
    return;
  }

  while (queue.length > 0) {
    const currentNode = queue[0];

    if (!checked.some((item) => item === currentNode)) {
      if (currentNode.connections.some((item) => item === endNode)) {
        let path = [currentNode.coordinates, endNode.coordinates];
        let pathNode = currentNode;

        while (pathNode != startNode) {
          let parentNode = checked.find((item) =>
            item.connections.some((item) => item === pathNode)
          );
          path.unshift(parentNode.coordinates);
          pathNode = parentNode;
        }
        console.log(
          `You made it in ${path.length - 1} moves! Here's your path:`
        );
        for (let i = 0; i < path.length; i++) {
          console.log(path[i]);
        }
        return;
      } else {
        checked.push(currentNode);
        queue = queue.concat(currentNode.connections);
      }
    }
    queue.shift();
  }
}

module.exports = { knightMoves };
