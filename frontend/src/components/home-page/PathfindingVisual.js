import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Vertex from "./Vertex.js";
import "./PathfindingVisual.css";
import { dijkstra } from "../../algorithms/dijikstra.js";
import { dfs } from "../../algorithms/dfs.js";

const ROW_SIZE = 18;
const COL_SIZE = 40;
const START_NODE_ROW = 6;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 30;
// let START_NODE_ROW = 6;
// let START_NODE_COL = 5;
// let FINISH_NODE_ROW = 1;
// let FINISH_NODE_COL = 30;

class PathfindingVisual extends React.Component {
	constructor() {
		super();
		this.state = {
			grid: [],
			// sn_row: 1,
			// sn_col: 3,
			// fn_row: 1,
			// fn_col: 30,
		};
		this.visualiseDijkstra = this.visualiseDijkstra.bind(this);
		this.animateDijkstra = this.animateDijkstra.bind(this);
		this.visualiseDFS = this.visualiseDFS.bind(this);
		this.animateDFS = this.animateDFS.bind(this);
		this.clearGrid = this.clearGrid.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
		// this.handleRowChange = this.handleRowChange.bind(this);
		// this.handleColChange = this.handleColChange.bind(this);
	}

	componentDidMount() {
		const grid = getGrid();
		this.setState({ grid });
	}
	clearGrid() {
		const grid = getGrid();
		this.setState({ grid });
		for (let i = 0; i < ROW_SIZE; i++) {
			for (let j = 0; j < COL_SIZE; j++) {
				if(i === START_NODE_ROW && j === START_NODE_COL)
					document.getElementById(`Vertex-${i}-${j}`).className = 'Vertex Vertex-start';
				else if(i === FINISH_NODE_ROW && j === FINISH_NODE_COL)
					document.getElementById(`Vertex-${i}-${j}`).className = 'Vertex Vertex-finish';
				else
					document.getElementById(`Vertex-${i}-${j}`).className = 'Vertex';
			}
		}
	}
	animateDijkstra(visitedNodesInOrder) {
		for(let i = 0; i < visitedNodesInOrder.length; i++){
			
			// const node = visitedNodesInOrder[i];
			// const newGrid = this.state.grid.slice();
			// const newNode = {
			// 	...node,
			// 	isVisited: true,
			// };
			// newGrid[node.row][node.col] = newNode;
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				document.getElementById(`Vertex-${node.row}-${node.col}`).className = 'Vertex Vertex-visited';
			}, 1000 * i);
		}
	}
	animateDFS(visitedNodesInOrder) {
		for(let i = 0; i < visitedNodesInOrder.length; i++){
			setTimeout(() => {
				const node = visitedNodesInOrder[i];
				document.getElementById(`Vertex-${node.row}-${node.col}`).className = 'Vertex Vertex-visited';
			}, 1000 * i);
		}
	}
	visualiseDijkstra() {
		const {grid} = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
		//const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
		console.log(visitedNodesInOrder);
		this.animateDijkstra(visitedNodesInOrder);
	}
	visualiseDFS() {
		const {grid} = this.state;
		const startNode = grid[START_NODE_ROW][START_NODE_COL];
		const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
		const visitedNodesInOrder = dfs(grid, startNode, finishNode);
		console.log(visitedNodesInOrder);
		this.animateDFS(visitedNodesInOrder);
	}

	// handleSubmit(event) {
	// 	event.preventDefault();
	// 	START_NODE_ROW = this.state.sn_row;
	// 	START_NODE_COL = this.state.sn_col;
	// 	const grid = getGrid();
	// 	this.setState({ grid });
	// }

	// handleRowChange(event) {
	// 	this.setState({
	// 		sn_row: event.target.value,
	// 	});
	// }
	// handleColChange(event) {
	// 	this.setState({
	// 		sn_col: event.target.value,
	// 	});
	// }
	render() {
		const { grid } = this.state;
		return (
			<div className="grid_body">
				<Navbar bg="light" variant="light">
					<Button variant="outline-primary" onClick={()=>this.visualiseDijkstra()} >Visualise Dijkstra</Button>
					<Button className="ml-2" variant="outline-primary" onClick={()=>this.visualiseDFS()} >Visualise DFS</Button>
					<Button className="ml-2" variant="outline-primary" onClick={()=>this.clearGrid()} >Clear Grid</Button>
					<div className="grid_legend ml-5">
						<div className="grid_legend_green mr-1"></div>
						<div>Start Node</div>
						<div className="grid_legend_red ml-5"></div>
						<div>End Node</div>
					</div>
					{/* <input type="number" value={this.state.sn_row} onChange={(event)=>this.handleRowChange(event)}></input>
					<input type="number" value={this.state.sn_col} onChange={(event)=>this.handleColChange(event)}></input>
					<input type="submit" value="Submit" onSubmit={(event)=>this.handleSubmit(event)}></input> */}
				</Navbar>
				<div className="Grid">
					{grid.map((row, rowIdx) => {
						return (
							<div key={rowIdx}>
								{row.map((vertex, vertexIdx) => {
									const {row, col, isStart, isFinish, isVisited} = vertex;
									return(
										<Vertex 
											key={vertexIdx} 
											isStart={isStart} 
											isFinish={isFinish} 
											isVisited={isVisited}
											row={row}
											col={col} 
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}


const createNode = (row, col) => {
	return {
		row,
		col,
		isStart: (row === START_NODE_ROW && col === START_NODE_COL),
		isFinish: (row === FINISH_NODE_ROW && col === FINISH_NODE_COL),
		isVisited: false,
		distance: Infinity,
		previousNode: null,
	};
}

const getGrid = () => {
	const grid = [];
	for (let i = 0; i < ROW_SIZE; i++) {
		const currentRow = [];
		for (let j = 0; j < COL_SIZE; j++) {
			const currentNode = createNode(i, j);
			currentRow.push(currentNode);
		}
		grid.push(currentRow);
	}
	return grid;
}
export default PathfindingVisual;
