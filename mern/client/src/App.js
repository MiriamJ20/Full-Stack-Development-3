import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LoginPage from "./components/loginPage";
import AgentList from "./components/agentList";
import Edit from "./components/edit";
import Create from "./components/create";
import Error from "./components/error";

const App = () => {
  return (
		<div>
			<Navbar />
			<div style={{ margin: 20 }}>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
					<Route path="/agentList" element={<AgentList />} />
					<Route path="/edit/:id" element={<Edit />} />
				  	<Route path="/create" element={<Create />} />
				  	<Route path="/error" element={<Error />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;