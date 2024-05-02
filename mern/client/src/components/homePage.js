import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<h1>Welcome to Rocket Elevators</h1>
			<div className="navigation-cards">
				<Link to="/agentList" className="card">
					<h3>Agents</h3>
					<p>
						Navigate to the Agents page 
					</p>
				</Link>
				<Link to="/transactionList" className="card">
					<h3>Transactions</h3>
					<p>
						Navigate to the Transaction page
					</p>
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
