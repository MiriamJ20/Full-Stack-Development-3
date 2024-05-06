import React, { useState, useEffect } from "react";

export default function TransactionForm() {
	const [form, setForm] = useState({ amount: "", agentId: "" });
	const [agents, setAgents] = useState([]);

	useEffect(() => {
		async function fetchAgentData() {
			try {
				const response = await fetch("http://localhost:5050/agent/");
				if (!response.ok) {
					throw new Error(`An error occurred: ${response.statusText}`);
				}
				const data = await response.json();
				setAgents(data);
			} catch (error) {
				console.error("Error fetching agents:", error);
			}
		}

		fetchAgentData();
	}, []);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		    if (name === "amount" && (isNaN(value) || parseFloat(value) < 0)) {
		return; 
	}
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await fetch("http://localhost:5050/transaction/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amount: form.amount, agentId: form.agentId }),
			});
			setForm({ amount: "", agentId: "" });
		} catch (error) {
			console.error("Error submitting transaction:", error);
		}
	};

	return (
		<div>
			<h2>Add New Transaction</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group col-md-3">
					<label htmlFor="amount">Enter Amount:</label>
					<input
						type="number"
						className="form-control"
						id="amount"
						name="amount"
						value={form.amount}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="agentId">Select an Agent:</label>
					<select
						className="form-control"
						id="agentId"
						name="agentId"
						value={form.agentId}
						onChange={handleInputChange}
						required
					>
						<option value="">Select Agent</option>
						{agents.map((agent) => (
							<option key={agent._id} value={agent._id}>
								{agent.first_name} {agent.last_name}
							</option>
						))}
					</select>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
