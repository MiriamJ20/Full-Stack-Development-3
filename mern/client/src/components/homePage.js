import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<h1>Welcome to Rocket Elevators</h1>
			<div className="navigation-cards">
				<h3>Agent Management</h3>
				<Link to="/agentList" className="card">
					<p>
						<button to="/agentList">Agent List</button>
						<br/>
						<button to="/create">Sign Up</button>
					</p>
				</Link>
			</div>
			<div>
				<h3>Transactions</h3>
				<Link to="/transactionList" className="card">
					<p>
						<button to="/transactionList"> Transction List</button>
					</p>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
