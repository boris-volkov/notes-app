import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
	mutation signUp($email: String!, $username: String!, $password: String!) {
		signUp(email: $email, username: $username, password: $password)
	}
`;

// include the props passed to the componnet for later
const SignUp = props => {

	useEffect(() => {
		document.title = 'Sign Up - Notedly';
	});

	// apollo client
	const client = useApolloClient({});
	// mutation hook
	const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
		onCompleted: data => {
			// store the token
			localStorage.setItem('token', data.signUp);
			//update local cache
			client.writeData({ data: { isLoggedIn: true } });
			// redirect the user to the homepage
			props.history.push('/');
		}
	});

	// render the form
	return (
		<React.Fragment>
			<UserForm action={signUp} formType="signup" />
			{loading && <p>Loading...</p>}
			{error && <p>Error Creating Account</p>}
		</React.Fragment>
	);
};

export default SignUp;
