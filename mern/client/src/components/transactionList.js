import React, { useEffect, useState } from "react";
import TransactionForm from "./transactionForm";

export default function TransactionList() {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		async function fetchTransactionData() {
			try {
				const response = await fetch(
					"http://localhost:5050/transaction/transaction"
				);
				if (!response.ok) {
					throw new Error(`An error occurred: ${response.statusText}`);
				}
				const data = await response.json();
				setTransactions(data);
			} catch (error) {
				console.error("Error fetching transactions:", error);
			}
		}

		fetchTransactionData();
	}, []);

	const handleDelete = async (id) => {
		try {
			await fetch(`http://localhost:5050/transaction/${id}`, {
				method: "DELETE",
			});
			setTransactions(
				transactions.filter((transaction) => transaction._id !== id)
			);
		} catch (error) {
			console.error("Error deleting transaction:", error);
		}
	};

	const renderTransactions = () => {
		return transactions.map((transaction) => (
			<tr key={transaction._id}>
				<td>
					{transaction.first_name} {transaction.last_name}
				</td>
				<td>${transaction.amount}</td>
				<td>{transaction.date}</td>
				<td>
					<button onClick={() => handleDelete(transaction._id)}>Delete</button>
				</td>
			</tr>
		));
	};

	return (
		<div>
			<h1>Rocket Elevators Transactions</h1>
			<TransactionForm />
			<h1>Recent Transactions</h1>
			<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>{renderTransactions()}</tbody>
			</table>
		</div>
	);
}
