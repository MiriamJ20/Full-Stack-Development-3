import React, { useEffect, useState } from "react";

const Transactions = (props) => (
	<tr>
		<td>
		{props.transactions.first_name} {props.transactions.last_name}
		</td>
		<td>${props.transactions.amount}</td>
		<td>{props.transactions.date}</td>
	</tr>
);

export default function TransactionList() {
	const [transactions, setTransactions] = useState([]);

	// This method fetches the transaction from the database.
	useEffect(() => {
		async function getTransactions() {
			const response = await fetch(`http://localhost:5050/transactionList/`);

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const transactions = await response.json();
			setTransactions(transactions);
		}
		getTransactions();

		return;
	}, [transactions.length]);

	// This method will delete a transaction
	async function deleteTransaction(id) {
		await fetch(`http://localhost:5050/transactionList/${id}`, {
			method: "DELETE",
		});

		const newTransaction = transactions.filter((el) => el._id !== id);
		setTransactions(newTransaction);
	}

	// This method will map out the transactions on the table
	function TransactionList() {
		return transactions.map((transaction) => {
			return (
				<transactions
					Transaction={transactions}
					deleteTransaction={() => deleteTransaction(transactions._id)}
					key={Transactions._id}
				/>
			);
		});
	}

	// This following section will display the table with the Transaction.
	return (
		<div>
			<h1>Transactions</h1>
			<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Amount</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>{TransactionList()}</tbody>
			</table>
		</div>
	);
}
