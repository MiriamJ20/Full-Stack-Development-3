import "bootstrap/dist/css/bootstrap.min.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginPage from "./components/loginPage";
import AgentList from "./components/agentList";
import Edit from "./components/edit";
import Create from "./components/create";
import Error from "./components/error";
import Homepage from "./components/homePage";
import TransactionList from "./components/transactionList";
import "bootstrap/dist/css/bootstrap.min.css";


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
					<Route path="/homePage" element={<Homepage />} />
					<Route path="/transactionList" element={<TransactionList />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
