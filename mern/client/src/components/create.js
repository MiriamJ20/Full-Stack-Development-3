import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		region: "",
		rating: "",
		fee: "",
	});
 const navigate = useNavigate();

 // These methods will update the state properties.
function updateForm(value) {
    return setForm((prev) => {
    return { ...prev, ...value };
   });
}

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

if (!form.first_name || !form.last_name || !form.region || !form.rating ||!form.fee ) {
	window.alert("Please fill out all fields.");
	return;
}	 
// When a post request is sent to the create url, we'll add a new agent to the database.
const newAgent = { ...form };

   await fetch("http://localhost:5050/agent/", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newAgent),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

	setForm({ first_name: "", last_name: "", region: "", rating: "", fee: "" });
    navigate("/agentList");
}

 // This following section will display the form that takes the input from the user.
	return (
		<div>
			<h1>Register</h1>
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
					<label htmlFor="region">Region:</label>
					<input
						type="text"
						className="form-control"
						id="region"
						value={form.region}
						onChange={(e) => updateForm({ region: e.target.value })}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="rating">Rating:</label>
					<input
						type="number"
						className="form-control"
						id="rating"
						value={form.rating}
						min="0"
						max="100"
						onChange={(e) => updateForm({ rating: e.target.value })}
						required
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="fee">Fee:</label>
					<input
						type="number"
						className="form-control"
						id="fee"
						value={form.fee}
						min="0"
						onChange={(e) => updateForm({ fee: e.target.value })}
						required
					/>
				</div>
				<br />
				<div className="form-group">
					<input
						type="submit"
						value="Create Agent"
						className="btn btn-primary"
					/>
				</div>
			</form>
		</div>
	);
}
