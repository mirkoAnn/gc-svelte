import { dbManager } from './db-manager.svelte';

onmessage = ({ data: { id, up, down, category, countryCode } }) => {
	// Build the mutation query based on category and send to DB manager to update sessions count
	let query = `mutation { `;
	switch (category) {
		case 'slot':
			query += 'updateSlot';
			break;
		case 'casino':
			query += 'updateCasino';
			break;
		default:
			return;
	}

	query += `(documentId: "${id}", locale: "${countryCode}", data: { rating: { up: ${up}, down: ${down} } }) 
              { 
              documentId
            } 
        }`;

	// Send the query to dbManager to execute the mutation
	dbManager.executeQuery(query).catch((error) => console.log(error));
};

export {};
