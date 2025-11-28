import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ViviScapeApi implements ICredentialType {
	name = 'viviScapeApi';
	displayName = 'ViviScape API';
	documentationUrl = 'https://api.viviscape.io/swagger/docs/v1';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'APIKey', // <-- CHANGED so n8n stores it correctly
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your ViviScape API key',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.viviscape.io',
			required: true,
			description: 'The base URL for the ViviScape API',
		},
	];

	// --- AUTHENTICATION ---
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				APIKey: '={{ $credentials.APIKey }}', // <-- MATCHES new property name
			},
		},
	};

	// --- TEST REQUEST ---
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/api/v1/account/info',
			method: 'GET',
			headers: {
				APIKey: '={{ $credentials.APIKey }}', // <-- MATCHES new property name
			},
		},
	};
}
