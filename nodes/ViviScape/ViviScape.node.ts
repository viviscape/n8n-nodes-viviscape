import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
} from 'n8n-workflow';

export class ViviScape implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ViviScape',
		name: 'viviScape',
		icon: 'file:viviscape-logo-white.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with ViviScape API',
		defaults: {
			name: 'ViviScape',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'viviScapeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Company',
						value: 'company',
					},
					{
						name: 'CRM',
						value: 'crm',
					},
					{
						name: 'Project',
						value: 'project',
					},
					{
						name: 'Notes',
						value: 'notes',
					},
					{
						name: 'Insights',
						value: 'insights',
					},
				],
				default: 'account',
			},
			// Account Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get Account Info',
						value: 'getAccountInfo',
						description: 'Get platform account detail information',
						action: 'Get account info',
					},
					{
						name: 'Get Account Users',
						value: 'getAccountUsers',
						description: 'Get all users in the account',
						action: 'Get account users',
					},
					{
						name: 'Get User by ID',
						value: 'getUserById',
						description: 'Get specific user details',
						action: 'Get user by ID',
					},
				],
				default: 'getAccountInfo',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['getUserById'],
					},
				},
				description: 'The user ID to retrieve',
			},
			// Company Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['company'],
					},
				},
				options: [
					{
						name: 'Get All Companies',
						value: 'getAllCompanies',
						description: 'Get list of all companies',
						action: 'Get all companies',
					},
					{
						name: 'Get Company Clients',
						value: 'getCompanyClients',
						description: 'Get clients for a company',
						action: 'Get company clients',
					},
					{
						name: 'Get Client by Email',
						value: 'getClientByEmail',
						description: 'Find client by email',
						action: 'Get client by email',
					},
				],
				default: 'getAllCompanies',
			},
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getCompanyClients'],
					},
				},
				description: 'The company ID to get clients for',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getClientByEmail'],
					},
				},
				description: 'The email address to search for',
			},
			// CRM Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['crm'],
					},
				},
				options: [
					{
						name: 'Get Prospect by ID',
						value: 'getProspectById',
						description: 'Get prospect details',
						action: 'Get prospect by ID',
					},
					{
						name: 'Query Prospects',
						value: 'queryProspects',
						description: 'Search prospects',
						action: 'Query prospects',
					},
					{
						name: 'Get Prospect Notes',
						value: 'getProspectNotes',
						description: 'Get all prospect notes',
						action: 'Get prospect notes',
					},
				],
				default: 'getProspectById',
			},
			{
				displayName: 'Prospect ID',
				name: 'prospectId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['getProspectById', 'getProspectNotes'],
					},
				},
				description: 'The prospect ID',
			},
			{
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['queryProspects'],
					},
				},
				options: [
					{
						displayName: 'Query',
						name: 'query',
						type: 'string',
						default: '',
						description: 'Search query string',
					},
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 0,
						description: 'Filter by user ID',
					},
					{
						displayName: 'Stages',
						name: 'stages',
						type: 'string',
						default: '',
						description: 'Comma-separated list of stages to filter by',
					},
				],
			},
			// Project Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Get User Projects',
						value: 'getUserProjects',
						description: 'Get all user projects',
						action: 'Get user projects',
					},
					{
						name: 'Get Active Projects',
						value: 'getActiveProjects',
						description: 'Get active projects',
						action: 'Get active projects',
					},
					{
						name: 'Get Project by ID',
						value: 'getProjectById',
						description: 'Get project details',
						action: 'Get project by ID',
					},
					{
						name: 'Get Project Tasks',
						value: 'getProjectTasks',
						description: 'Get all project tasks',
						action: 'Get project tasks',
					},
					{
						name: 'Get Open Tasks',
						value: 'getOpenTasks',
						description: 'Get all open tasks',
						action: 'Get open tasks',
					},
				],
				default: 'getUserProjects',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getActiveProjects'],
					},
				},
				description: 'The user ID to get active projects for',
			},
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getProjectById', 'getProjectTasks'],
					},
				},
				description: 'The project ID',
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'number',
				default: 0,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getOpenTasks'],
					},
				},
				description: 'Filter by account ID (optional)',
			},
			// Notes Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['notes'],
					},
				},
				options: [
					{
						name: 'Get My Notes',
						value: 'getMyNotes',
						description: 'Get user notes',
						action: 'Get my notes',
					},
					{
						name: 'Get Note by ID',
						value: 'getNoteById',
						description: 'Get specific note',
						action: 'Get note by ID',
					},
					{
						name: 'Query Notes',
						value: 'queryNotes',
						description: 'Search notes',
						action: 'Query notes',
					},
				],
				default: 'getMyNotes',
			},
			{
				displayName: 'Note ID',
				name: 'noteId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['notes'],
						operation: ['getNoteById'],
					},
				},
				description: 'The note ID (UUID) to retrieve',
			},
			{
				displayName: 'Query Parameters',
				name: 'queryParameters',
				type: 'collection',
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						resource: ['notes'],
						operation: ['queryNotes'],
					},
				},
				options: [
					{
						displayName: 'Query',
						name: 'query',
						type: 'string',
						default: '',
						description: 'Search query string',
					},
					{
						displayName: 'Tags',
						name: 'tags',
						type: 'string',
						default: '',
						description: 'Comma-separated list of tags to filter by',
					},
				],
			},
			// Insights Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['insights'],
					},
				},
				options: [
					{
						name: 'Get Hours by Person',
						value: 'getHoursByPerson',
						description: 'Get time tracking data',
						action: 'Get hours by person',
					},
					{
						name: 'Get Time Logs',
						value: 'getTimeLogs',
						description: 'Get detailed time logs',
						action: 'Get time logs',
					},
				],
				default: 'getHoursByPerson',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				default: 0,
				required: true,
				displayOptions: {
					show: {
						resource: ['insights'],
						operation: ['getHoursByPerson'],
					},
				},
				description: 'The user ID',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['insights'],
						operation: ['getHoursByPerson', 'getTimeLogs'],
					},
				},
				description: 'Start date (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						resource: ['insights'],
						operation: ['getHoursByPerson', 'getTimeLogs'],
					},
				},
				description: 'End date (YYYY-MM-DD)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('viviScapeApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				// Account Operations
				if (resource === 'account') {
					if (operation === 'getAccountInfo') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/info`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getAccountUsers') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/users`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getUserById') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/user/id?userid=${userId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					}
				}

				// Company Operations
				else if (resource === 'company') {
					if (operation === 'getAllCompanies') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getCompanyClients') {
						const companyId = this.getNodeParameter('companyId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies/clients?company_id=${companyId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getClientByEmail') {
						const email = this.getNodeParameter('email', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies/client/email?email=${encodeURIComponent(email)}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					}
				}

				// CRM Operations
				else if (resource === 'crm') {
					if (operation === 'getProspectById') {
						const prospectId = this.getNodeParameter('prospectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/id/${prospectId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'queryProspects') {
						const queryParameters = this.getNodeParameter('queryParameters', i, {}) as IDataObject;
						const body: IDataObject = {};
						
						if (queryParameters.query) {
							body.query = queryParameters.query;
						}
						if (queryParameters.user_id) {
							body.user_id = queryParameters.user_id;
						}
						if (queryParameters.stages) {
							body.stages = (queryParameters.stages as string).split(',').map(s => s.trim());
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/crm/prospects/query`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body,
						});
					} else if (operation === 'getProspectNotes') {
						const prospectId = this.getNodeParameter('prospectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/notes/${prospectId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					}
				}

				// Project Operations
				else if (resource === 'project') {
					if (operation === 'getUserProjects') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/user/projects`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getActiveProjects') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/user/projects/active?user_id=${userId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getProjectById') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/id?project_id=${projectId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getProjectTasks') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/tasks/project?project_id=${projectId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getOpenTasks') {
						const body: IDataObject = {};
						const accountId = this.getNodeParameter('accountId', i, 0) as number;
						
						if (accountId) {
							body.account_id = accountId;
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/projects/account/tasks/open`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body,
						});
					}
				}

				// Notes Operations
				else if (resource === 'notes') {
					if (operation === 'getMyNotes') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/notes/me`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getNoteById') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/notes/id/${noteId}`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'queryNotes') {
						const queryParameters = this.getNodeParameter('queryParameters', i, {}) as IDataObject;
						const body: IDataObject = {};
						
						if (queryParameters.query) {
							body.query = queryParameters.query;
						}
						if (queryParameters.tags) {
							body.tags = (queryParameters.tags as string).split(',').map(s => s.trim());
						}

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/notes/query`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body,
						});
					}
				}

				// Insights Operations
				else if (resource === 'insights') {
					if (operation === 'getHoursByPerson') {
						const userId = this.getNodeParameter('userId', i) as number;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/insights/logs/hours/person`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body: {
								user_id: userId,
								start_date: startDate,
								end_date: endDate,
							},
						});
					} else if (operation === 'getTimeLogs') {
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;

						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/insights/logs/account/daterange`,
							headers: {
								APIKey: credentials.apiKey as string,
								'Content-Type': 'application/json',
							},
							body: {
								start_date: startDate,
								end_date: endDate,
							},
						});
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}