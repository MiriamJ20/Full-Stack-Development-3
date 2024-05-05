import React, { useEffect, useState } from "react";
import TransactionForm from "./transactionForm";

const Transaction = (props) => (
	<tr>
		<td>
			{props.transaction.first_name} {props.transaction.last_name}
		</td>
		<td>${props.transaction.amount}</td>
		<td>{props.transaction.date}</td>
		<td>
		<button onClick={() => props.deleteTransaction(props.transaction._id)}>
			Delete
		</button>
		</td>
	</tr>
);

export default function TransactionList() {
	const [transactions, setTransactions] = useState([]);

	// This method fetches the tranactions from the database.
useEffect(() => {
	async function getTransactions() {
		const response = await fetch("http://localhost:5050/transaction/");
				
		if (!response.ok) {
			const message = `An error has occurred: ${response.statusText}`;
			window.alert(message);
       		return;
		}

		const transactions = await response.json();
		setTransactions(transactions);
	}
		// getTransactions();
	}, [transactions.length]);

	// This will delete a transaction
async function deleteTransaction(id) {
	await fetch(`http://localhost:5050/transaction/${id}`, {
		method: "DELETE",
	});

	const newTransactions = transactions.filter((el) => el._id !== id);
	setTransactions(newTransactions);
}	

	// This will map out the transactions on the table
	function renderTransactions() {
		return transactions.map((transaction) => (
			<Transaction
				transaction={transaction}
				key={transaction._id}
				deleteTransaction={() => deleteTransaction(transaction._id)}
			/>
		));
	}

	// This section will display the table with the Transactions.
	return (
		<div>
			<h1>Rocket Elevators Transactions</h1>
			<br></br>
			<TransactionForm />
			<br></br>
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
};