import React, { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "react-bootstrap/Alert";
import "../css/loginPage.css";

export default function LoginPage() {
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const [registerForm, setRegisterForm] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
	});

	const [alert, setAlert] = useState({ show: false, variant: "", message: "" });
	const navigate = useNavigate();

	function updateLoginForm(value) {
		return setLoginForm((prev) => {
			return { ...prev, ...value };
		});
	}

	function updateRegisterForm(value) {
		return setRegisterForm((prev) => {
			return { ...prev, ...value };
		});
	}

	async function handleLogin(e) {
		e.preventDefault();

		    console.log("Login form data:", loginForm);

		if (!loginForm.email || !loginForm.password) {
			console.log("Login form is incomplete");
			setAlert({
				show: true,
				variant: "danger",
				message: "Please fill out both Email and Password fields.",
			});
			return;
		}

		try {
			const response = await fetch("http://localhost:5050/login/login/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(loginForm),
			});

			if (!response.ok) {
				throw new Error("Login failed");
			}

			 console.log("Login successful");
			setLoginForm({ email: "", password: "" });
			setAlert({
				show: true,
				variant: "success",
				message: "Login successful.",
			});
			navigate("/agentList");
		} catch (error) {
			console.error(error);
			navigate("/error");
			console.log("Login failed:", error.message);
			setAlert({
				show: true,
				variant: "danger",
				message: "Invalid email or password. Please try again.",
			});
		}
	}

	async function handleRegister(e) {
		e.preventDefault();

		if (!registerForm.email || !registerForm.password) {
			window.alert("Please fill out all fields.");
			return;
		}

		try {
			const response = await fetch("http://localhost:5050/login/register/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(registerForm),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}

			setRegisterForm({
				first_name: "",
				last_name: "",
				email: "",
				password: "",
			});
			navigate("/");
		} catch (error) {
			console.error(error);
			window.alert("Registration Failed, Try Again");
		}
	}

	return (
		<div>
			{alert.show && (
				<Alert
					variant={alert.variant}
					onClose={() => setAlert({ show: false })}
					dismissible
				>
					{alert.message}
				</Alert>
			)}
			<div>
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
					<div className="form-group col-md-3">
						<label htmlFor="login_email">Email:</label>
						<input
							type="text"
							className="form-control"
							id="login_email"
							value={loginForm.email}
							onChange={(e) => updateLoginForm({ email: e.target.value })}
							required
						/>
					</div>
					<div className="form-group  col-md-3">
						<label htmlFor="login_password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="login_password"
							value={loginForm.password}
							onChange={(e) => updateLoginForm({ password: e.target.value })}
							required
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Login" className="btn btn-primary" />
					</div>
				</form>
			</div>
			<div>
				<h2>Register</h2>
				<form onSubmit={handleRegister}>
					<div className="form-group col-md-3">
						<label htmlFor="register_first_name">First Name:</label>
						<input
							type="text"
							className="form-control"
							id="register_first_name"
							value={registerForm.first_name}
							onChange={(e) =>
								updateRegisterForm({ first_name: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group col-md-3">
						<label htmlFor="register_last_name">Last Name:</label>
						<input
							type="text"
							className="form-control"
							id="register_Last_name"
							value={registerForm.last_name}
							onChange={(e) =>
								updateRegisterForm({ last_name: e.target.value })
							}
							required
						/>
					</div>
					<div className="form-group col-md-3">
						<label htmlFor="register_email">Email:</label>
						<input
							type="text"
							className="form-control"
							id="register_email"
							value={registerForm.email}
							onChange={(e) => updateRegisterForm({ email: e.target.value })}
							required
						/>
					</div>
					<div className="form-group col-md-3">
						<label htmlFor="register_password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="register_password"
							value={registerForm.password}
							onChange={(e) => updateRegisterForm({ password: e.target.value })}
							required
						/>
					</div>
					<div className="form-group">
						<input type="submit" value="Register" className="btn btn-danger" />
					</div>
				</form>
			</div>
		</div>
	);
}
