import React from "react";
import "./Input.css"; // Import the new CSS file

const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className="input-wrapper">
			<div className="input-icon-wrapper">
				<Icon className="input-icon" />
			</div>
			<input {...props} className="input-field" />
		</div>
	);
};

export default Input;
