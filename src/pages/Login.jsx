import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import '../pages/Login.css'; // Ensure this file contains styles for the classes used

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate(); // Initialize the navigate function

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
			navigate('/quizsetup'); // Navigate to QuizSetup page on successful login
		} catch (error) {
			// Handle login error here if needed
		}
	};

	return (
		<div className='login-container'>
			<div className='login-content'>
				<h2 className='login-heading'>
					Welcome Back
				</h2>

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						type='email'
						placeholder='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='input-field'
					/>

					<Input
						icon={Lock}
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='input-field'
					/>

					<div className='forgot-password-link'>
						<Link to='/forgot-password' className='footer-link'>
							Forgot password?
						</Link>
					</div>
					{error && <p className='error-message'>{error}</p>}

					<button
						className='submit-button'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className='loader-icon' /> : "Login"}
					</button>
				</form>
			</div>
			<div className='footer'>
				<p className='footer-text'>
					Don't have an account?{" "}
					<Link to='/signup' className='footer-link'>
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
