import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<section>
				<div className="navigation-cards">
					<h1>Welcome to Rocket Elevators</h1>
					<div className="card">
						<h3>Agent Management</h3>
						<Link to="/agentList">
							<p>
								<button className="btn btn-primary" to="/agentList">
									Agent List
								</button>
							</p>
						</Link>
						<Link to="/create">
							<p>
								<button className="btn btn-primary" to="/create">
									Create Agent
								</button>
							</p>
						</Link>
					</div>
					<div className="card">
						<h3>Transactions</h3>
						<Link to="/transactionList">
							<p>
								<button className="btn btn-danger" to="/transactionList">
									Transaction List
								</button>
							</p>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
