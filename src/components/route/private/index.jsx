import React from 'react'
import {
	Route,
	Redirect
} from "react-router-dom";

const PrivateRoute = ({ component: Component, isLogined, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			isLogined ? (
				<Component {...props} />
			) : (
					<Redirect
						to={{
							pathname: "/login",
							state: {
								from: props.location,
							},
						}}
					/>
				)
		}
	/>
);

export default PrivateRoute;