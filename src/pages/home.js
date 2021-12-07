import React from 'react';
import ReactMarkdown from 'react-markdown';

import Header from '../components/Header';
import Navigation from '../components/Navigation';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

import { useQuery, gql } from '@apollo/client';
import { GET_NOTES } from '../gql/query';

const Home = () => {
	// query hook
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
	
	// if the data is loading, display loading message
	if (loading) return <p>Loading...</p>;
	// if there is an error fetching the data, display an error message
	if (error) return <p>Error</p>;

	// if the data is successful, display the data in the UI
	return (
		// add a react fragment element to provide a parent element
		<React.Fragment>
			<NoteFeed notes={data.noteFeed.notes} />
			{data.noteFeed.hasNextPage && (
				<Button
					onClick = {() =>
						fetchMore({
							variables: {
								cursor: data.noteFeed.cursor
							},
							updateQuery: (previousResult, { fetchMoreResult }) => {
								return {
									noteFeed: {
										cursor: fetchMoreResult.noteFeed.cursor,
										hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
										// combine the new results and the old
										notes: [
											...previousResult.noteFeed.notes,
											...fetchMoreResult.noteFeed.notes
										],
										__typename: 'noteFeed'
									}
								};
							}
						})
					}
				>
					Load more
				</Button>
			)}
		</React.Fragment>
	);
};

export default Home;
