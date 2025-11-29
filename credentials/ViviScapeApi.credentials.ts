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
			name: 'apiKey',               // <-- lowercase, consistent
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.viviscape.io',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				APIKey: '={{ $credentials.apiKey }}',   // <-- matches "apiKey"
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{ $credentials.baseUrl }}',
			url: '/api/v1/account/info',
			method: 'GET',
			headers: {
				APIKey: '={{ $credentials.apiKey }}',   // <-- matches "apiKey"
			},
		},
	};
}
