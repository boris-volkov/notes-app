import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
	border: 1px solid #f5f4f0;
	max-width: 500px;
	padding: 1em;
	margin: 0 auto;
`;

const Form = styled.form`
	label,
	input {
		display: block;
		line-height: 2em;
	}

	input {
		width: 100%;
		margin-bottom: 1em;
	}
`;

// include the props passed to the componnet for later
const UserForm = props => {
	// set default state of the form
	const [values, setValues] = useState();

	// update state when a user types in the form
	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
	};

	// render the form
	return (
		<Wrapper>
		{props.formType === 'signup' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
			<Form
				onSubmit={event => {
					event.preventDefault();
					props.action({
						variables: {
							...values
						}
					});
				}}
			>
				{props.formType === 'signup' && (
					<React.Fragment>
						<label htmlFor="email">Email:</label>
						<input
							required
							type="email"
							id="email"
							name="email"
							placeholder="Email"
							onChange={onChange}
						/>
					</React.Fragment>
				)}
				<label htmlFor="username">Username:</label>
				<input
					required
					type="text"
					id="username"
					name="username"
					placeholder="username"
					onChange={onChange}
				/>
				<label htmlFor="Password">Password:</label>
				<input
					required
					type="password"
					id="password"
					name="password"
					placeholder="Password"
					onChange={onChange}
				/>
				<button type="submit">Submit</button>
			</Form>
		</Wrapper>
	);
};

export default UserForm;
