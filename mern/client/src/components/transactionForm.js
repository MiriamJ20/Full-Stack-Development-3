import React, { useState } from "react";

export default function NewTransaction() {
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		amount: "",
		date: "",
	});

	// These methods will update the state properties.
	function updateForm(value) {
		return setForm((prev) => {
		return { ...prev, ...value };
		});
	}

	// This function will handle the submission.
	async function onSubmit(e) {
		e.preventDefault();

		if ( !form.first_name || !form.last_name || !form.amount ||!form.date) {
			window.alert("Please fill out all fields.");
			return;
		}
		const newTransaction = { ...form };

		await fetch("http://localhost:5050/transaction/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTransaction),
		})
			.catch((error) => {
			window.alert(error);
			return;
		});

		setForm({ first_name: "", last_name: "", amount: "", date: "" });
	}

	// This following section will display the form that takes the input from the user.
	return (
		<div>
			<h1>Transaction Form</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group col-md-3">
					<label htmlFor="first_name">First Name:</label>
					<input
						type="text"
						className="form-control"
						id="first_name"
						value={form.first_name}
						onChange={(e) => updateForm({ first_name: e.target.value })}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="last_name">Last Name:</label>
					<input
						type="text"
						className="form-control"
						id="last_name"
						value={form.last_name}
						onChange={(e) => updateForm({ last_name: e.target.value })}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="amount">Amount:</label>
					<input
						type="number"
						className="form-control"
						id="amount"
						value={form.amount}
						onChange={(e) => updateForm({ amount: e.target.value })}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="date">Date:</label>
					<input
						type="date"
						className="form-control"
						id="date"
						value={form.date}
						onChange={(e) => updateForm({ date: e.target.value })}
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<input
						type="submit"
						value="submit"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}

