import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
// We import all the components we need in our app
import Navbar from "./components/navbar";
import LoginPage from "./components/loginPage";
import AgentList from "./components/agentList";
import Edit from "./components/edit";
import Create from "./components/create";
import Error from "./components/error";
import Homepage from "./components/homePage";
import TransactionList from "./components/transactionList";

import { getCookie } from "react-use-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


const App = () => {

	const isLoggedIn = getCookie("token_name") || 1;
	const navigate = useNavigate();
	const location = useLocation();

	const [userId, setUserId] = useState("");
	const [authLevel, setAuthLevel] = useState("");
	const [userEmail, setUserEmail] = useState("");
	
useEffect(() => {
    const isLoggedIn = getCookie("token_name")|| "1";
    const isRegister = location.pathname === "/register";
    
const validateToken = async () => {
      try {
        if (isRegister) {
          return;
        }

        const response = await fetch(
          `http://localhost:3007/session/validate?token=${isLoggedIn}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  if (response.ok) {
    const data = await response.json()
    setUserId(data.user_id);
    setAuthLevel(data.auth_level);
    setUserEmail(data.email)
    console.log(authLevel)
  }
 
  if (!response.ok) {
    navigate("/");
    setUserEmail("")
    setAuthLevel("basic")
  }

  }
 catch (error) {
  console.error("Error:", error);
  
}};
 validateToken();  
},
[navigate]
);
console.log(authLevel)
const userLoginCheck = isLoggedIn && location.pathname !== "/" && location.pathname !== "/register";


  return (
		<div>
			{userLoginCheck}
			<Navbar userEmail={userEmail} />
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