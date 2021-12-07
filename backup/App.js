// index.js
// This is the main entry point of our application

import { 
	ApolloClient, 
	ApolloProvider, 
	createHttpLink,
	InMemoryCache 
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// configure API URI & cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem('token') || ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
	resolvers: {},
	connectToDevTools: true
});

// check for local token
const data = {
	isLoggedIn: !!localStorage.getItem('token')
};
// write the cache data on intial load
cache.writeData({ data });
// write the cache data after cache reset
client.onResetStore(() => cache.writeData({ data }));

import React from 'react';
import ReactDOM from 'react-dom';

// import global styles
import GlobalStyle from '/components/GlobalStyle';
// import routes
import Pages from '/pages';

const App = () => {
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
