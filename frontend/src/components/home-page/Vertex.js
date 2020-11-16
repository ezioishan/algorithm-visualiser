import React from "react";
import "./Vertex.css";

class Vertex extends React.Component {
	render(){
		const {row, col, isStart, isFinish} = this.props;
		const extraClassName = isFinish ? 'Vertex-finish': isStart ? 'Vertex-start': '';
		return (
		<div
			id={`Vertex-${row}-${col}`} 
			className={`Vertex ${extraClassName}`}
		>
		</div>)
	}
}

export default Vertex;