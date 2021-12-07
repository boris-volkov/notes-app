import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'

import NoteForm from '../components/NoteForm';

// new note query mutation

const NEW_NOTE = gql`
	mutation newNote($content: String!) {
		newNote(content: $content) {
			id
			content
			createdAt
			favoriteCount
			favoritedBy {
				id
				username
			}
			author {
				username
				id
			}
		}
	}
`;

const NewNote = props => {
	useEffect(() => {
		document.title = 'New Note';
	});

	const [data, { loading, error }] = useMutation(NEW_NOTE, {
		// refetch the GET_NOTES query to update the cache
		refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES } ],
		onCompleted: data => {
			// when complete, redirect user to the note page
			props.history.push(`note/${data.newNote.id}`);
		}
	});

	return (
		<React.Fragment>
			{loading && <p>Loading...</p>}
			{error && <p>Error saving the note</p>}
			{/* pass the mutation data as a prop */}
			<NoteForm action={data}/>
		</React.Fragment>
	);
};

export default NewNote;
