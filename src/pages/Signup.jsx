import React, { useState } from "react";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../pages/Signup.css"; // Import the new CSS file

function Signup(){
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			await signup(email, password, name);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="signup-container">
			<div className="signup-content">
				<h2 className="signup-title">Create Account</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
						type="text"
						placeholder="Full Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<Input
						icon={Mail}
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						icon={Lock}
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <p className="error-message">{error}</p>}

					<button className="signup-button" type="submit" disabled={isLoading}>
						{isLoading ? <Loader className="loader-icon" size={24} /> : "Sign Up"}
					</button>
				</form>
			</div>
			<div className="signup-footer">
				<p>
					Already have an account?{" "}
					<Link to="/login" className="login-link">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Signup;
