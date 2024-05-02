import React, { useState, useEffect } from "react";

const TransactionPage = () => {
	// State to store the list of transactions
	const [transactions, setTransactions] = useState([]);

	// State to store form data for creating new transactions
	const [formData, setFormData] = useState({
		// Initialize form fields if needed
		// Example:
		// amount: "",
		// description: ""
	});

	// useEffect hook to fetch the list of transactions when the component mounts
	useEffect(() => {
		// Fetch the list of transactions from the backend API
		// Example:
		// fetchTransactions();
	}, []);

	// Function to fetch the list of transactions
	const fetchTransactions = async () => {
		try {
			// Make a fetch request to the backend API to get the list of transactions
			// Example:
			// const response = await fetch("http://localhost:5050/transactions");
			// const data = await response.json();
			// setTransactions(data);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	// Function to handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Function to handle form submission for creating a new transaction
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// Make a fetch request to the backend API to create a new transaction
			// Example:
			// const response = await fetch("http://localhost:5050/transactions", {
			//   method: "POST",
			//   headers: {
			//     "Content-Type": "application/json"
			//   },
			//   body: JSON.stringify(formData)
			// });
			// const data = await response.json();
			// // Update the list of transactions with the newly created transaction
			// setTransactions([data, ...transactions.slice(0, 9)]);
			// // Clear the form data
			// setFormData({
			//   amount: "",
			//   description: ""
			// });
		} catch (error) {
			console.error("Error creating transaction:", error);
		}
	};

	return (
		<div>
			<h1>Transaction Page</h1>
			{/* Transaction List */}
			<div>
				<h2>Last 10 Transactions</h2>
				{/* Render the list of transactions here */}
			</div>
			{/* Transaction Form */}
			<div>
				<h2>Create New Transaction</h2>
				<form onSubmit={handleSubmit}>
					{/* Form inputs for creating a new transaction */}
					{/* Example:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
          */}
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default TransactionPage;
