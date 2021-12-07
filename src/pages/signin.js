import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
	mutation signIn($username: String!, $password: String!) {
		signIn(username: $username, password: $password)
	}
`;

const SignIn = props => {
	useEffect(() => {
		document.title = 'Sign In';
	});

	const client = useApolloClient();
	const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
		onCompleted: data => {
			// store the token
			localStorage.setItem('token', data.signIn);
			// update the local cache
			client.writeData({ data: { isLoggedIn: true } });
			// redirect the user to the homepage
			props.history.push('/');
		}
	});

	// render the form
	return (
		<React.Fragment>
			<UserForm action={signIn} formType="signin" />
			{loading && <p>Loading...</p>} 
			{error && <p>Error Signingin!</p>}
		</React.Fragment>
	);
};


export default SignIn;
