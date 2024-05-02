import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Agent = (props) => (
	<tr>
		<td>{props.agent.first_name} {props.agent.last_name}</td>
		<td>{props.agent.region}</td>
		<td>{props.agent.rating}%</td>
		<td>${props.agent.fee}</td>
		<td>
			<Link className="btn btn-link" to={`/edit/${props.agent._id}`}>
				Edit Agent
			</Link>{" "}
			
		</td>
	</tr>
);

export default function AgentList() {
 const [agents, setAgents] = useState([]);

 // This method fetches the agents from the database.
 useEffect(() => {
   async function getAgents() {
     const response = await fetch(`http://localhost:5050/agent/`);

     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const agents = await response.json();
     setAgents(agents);
   }
	 getAgents();

   return;
 }, [agents.length]);

 // This method will delete a Agent
 async function deleteAgent(id) {
   await fetch(`http://localhost:5050/agent/${id}`, {
     method: "DELETE"
   });

   const newAgents = agents.filter((el) => el._id !== id);
   setAgents(newAgents);
 }

 // This method will map out the Agents on the table
 function agentList() {
   return agents.map((agent) => {
     return (
       <Agent
         agent={agent}
         deleteAgent={() => deleteAgent(agent._id)}
         key={agent._id}
       />
     );
   });
 }

 // This following section will display the table with the agents of individuals.
 return (
		<div>
			<h1>Agent List</h1>
			<table className="table table-striped" style={{ marginTop: 20 }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Region</th>
						<th>Rating</th>
						<th>Fee</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{agentList()}</tbody>
			</table>
		</div>
 );
}
