import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   region: "",
   rating: "",
   fee: "",
 });
 const params = useParams();
 const navigate = useNavigate();

 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/agent/${params.id.toString()}`);

     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const agent = await response.json();
     if (!agent) {
       window.alert(`Agent with id ${id} not found`);
       navigate("/agentList");
       return;
     }

     setForm(agent);
   }

   fetchData();

   return;
 }, [params.id, navigate]);

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 async function onSubmit(e) {
	e.preventDefault();
	 
	if (!window.confirm("Are you sure you want to update this agent?")) {
      return;
    }

   const editedAgent = {
     first_name: form.first_name,
     last_name: form.last_name,
     region: form.region,
     rating: form.rating,
     fee: form.fee,
   };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/agent/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedAgent),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   navigate("/agentList");
 }
	
  async function onDelete() {
		// Show a confirmation popup before deleting the agent
		if (!window.confirm("Are you sure you want to delete this agent?")) {
			return;
		}

		// This will send a delete request to delete the agent from the database.
		await fetch(`http://localhost:5050/agent/${params.id}`, {
			method: "DELETE",
		});

		navigate("/agentList");
	}	

 // This following section will display the form that takes input from the user to update the data.
 return (
		<div>
			<h3>Update Agent Information</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group col-md-3">
					<label htmlFor="first_name">First Name: </label>
					<input
						type="text"
						className="form-control"
						id="first_name"
						value={form.first_name}
						onChange={(e) => updateForm({ first_name: e.target.value })}
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="last_name">Last Name: </label>
					<input
						type="text"
						className="form-control"
						id="last_name"
						value={form.last_name}
						onChange={(e) => updateForm({ last_name: e.target.value })}
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
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="rating">Rating:</label>
					<input
						type="number"
						className="form-control"
						id="rating"
						value={form.rating}
						onChange={(e) => updateForm({ rating: e.target.value })}
					/>
				</div>
				<div className="form-group col-md-3">
					<label htmlFor="fee">Fee:</label>
					<input
						type="number"
						className="form-control"
						id="fee"
						value={form.fee}
						onChange={(e) => updateForm({ fee: e.target.value })}
					/>
				</div>
				<br />
				<div className="form-group">
					<input
						type="submit"
						value="Update Agent"
						className="btn btn-primary"
					/>
					<button className="btn btn-danger" onClick={onDelete}>
						Delete Agent
					</button>
				</div>
			</form>
		</div>
 );
}