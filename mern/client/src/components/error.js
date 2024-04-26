import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
	return (
		<div>
			<h1>Unauthorized Login Creditials</h1>
			<p>Sorry, an error occurred. Please try again.</p>
			<Link className="btn btn-link"  to="/">
				Go back to home page
			</Link>
		</div>
	);
}
