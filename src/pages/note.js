// this exists to be able to link to an individual note separate from the note feed

import React from 'react';
// import graphql dependencies
import { useQuery, gql } from '@apollo/client';
import { GET_NOTE } from '../gql/query';

import Note from '../components/Note';

// the note query, which accepts an ID variable

const NotePage = props => {
	// store the id found in the url as a variable
	const id = props.match.params.id;

	// query hook, passing the id value as a variable
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	// if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;
	// if there is an error fetching the data:
	if (error) return <p>Error! Note not found</p>;

	// if the data is successful, display the note
	return <Note note={data.note} />;
};

export default NotePage;
