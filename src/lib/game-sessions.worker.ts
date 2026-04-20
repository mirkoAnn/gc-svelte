import { appManager } from './app-manager.svelte';
import { dbManager } from './db-manager.svelte';

const locale = appManager.getCountryLangCode() || 'it-IT';

onmessage = ({ data: { id, sessions, category } }) => {
	// Build the mutation query based on category and send to DB manager to update sessions count
	let query = `mutation { `;
	switch (category) {
		case 'slot':
			query += 'updateSlot';
			break;
		default:
			return;
	}

	query += `(documentId: "${id}", locale:"${locale}", data: { sessions: ${sessions} }) 
              { 
              documentId
            } 
        }`;

	// Send the query to dbManager to execute the mutation
	dbManager.executeQuery(query).catch((error) => console.log(error));
};

export {};
