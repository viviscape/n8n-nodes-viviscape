import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

export class ViviScape implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ViviScape',
		name: 'viviScape',
		icon: 'file:viviscape.svg',
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
						name: 'Insights',
						value: 'insights',
					},
					{
						name: 'Notes',
						value: 'notes',
					},
					{
						name: 'Project',
						value: 'project',
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
						value: 'getInfo',
						description: 'Get platform account detail information',
						action: 'Get account info',
					},
					{
						name: 'Get Active Services',
						value: 'getActiveServices',
						description: 'Retrieve active services for the account',
						action: 'Get active services',
					},
					{
						name: 'Get All Services',
						value: 'getAllServices',
						description: 'Retrieve all services for the account',
						action: 'Get all services',
					},
					{
						name: 'Get Users',
						value: 'getUsers',
						description: 'Get users associated with the account',
						action: 'Get users',
					},
					{
						name: 'Get User by ID',
						value: 'getUserById',
						description: 'Get user by ID',
						action: 'Get user by ID',
					},
				],
				default: 'getInfo',
			},

			// Account User ID field
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['getUserById'],
					},
				},
				default: 0,
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
						name: 'Add',
						value: 'add',
						description: 'Add a new company',
						action: 'Add a company',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all companies',
						action: 'Get all companies',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a company',
						action: 'Update a company',
					},
					{
						name: 'Get Clients',
						value: 'getClients',
						description: 'Get clients by company ID',
						action: 'Get clients',
					},
					{
						name: 'Add Client',
						value: 'addClient',
						description: 'Add a new client',
						action: 'Add a client',
					},
					{
						name: 'Get Client by ID',
						value: 'getClientById',
						description: 'Get client by ID',
						action: 'Get client by ID',
					},
					{
						name: 'Get Client by Email',
						value: 'getClientByEmail',
						description: 'Get client by email',
						action: 'Get client by email',
					},
				],
				default: 'getAll',
			},

			// Company ID field
			{
				displayName: 'Company ID',
				name: 'companyId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getClients', 'update'],
					},
				},
				default: 0,
				description: 'The company ID',
			},

			// Client ID field
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getClientById'],
					},
				},
				default: 0,
				description: 'The client ID',
			},

			// Client Email field
			{
				displayName: 'Client Email',
				name: 'clientEmail',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['getClientByEmail'],
					},
				},
				default: '',
				description: 'The client email address',
			},

			// Company Body (for add/update operations)
			{
				displayName: 'Company Data',
				name: 'companyData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['add', 'update'],
					},
				},
				default: '{}',
				description: 'Company data as JSON',
			},

			// Client Body (for add operation)
			{
				displayName: 'Client Data',
				name: 'clientData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['company'],
						operation: ['addClient'],
					},
				},
				default: '{}',
				description: 'Client data as JSON',
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
						name: 'Add Prospect',
						value: 'addProspect',
						description: 'Add a new prospect',
						action: 'Add a prospect',
					},
					{
						name: 'Update Prospect',
						value: 'updateProspect',
						description: 'Update an existing prospect',
						action: 'Update a prospect',
					},
					{
						name: 'Get Prospect',
						value: 'getProspect',
						description: 'Get prospect by ID',
						action: 'Get a prospect',
					},
					{
						name: 'Get Prospects by Rep',
						value: 'getProspectsByRep',
						description: 'Get prospects for a sales rep',
						action: 'Get prospects by rep',
					},
					{
						name: 'Query Prospects',
						value: 'queryProspects',
						description: 'Query prospects by account',
						action: 'Query prospects',
					},
					{
						name: 'Remove Prospect',
						value: 'removeProspect',
						description: 'Remove a prospect',
						action: 'Remove a prospect',
					},
					{
						name: 'Add Note',
						value: 'addNote',
						description: 'Add a note to a prospect',
						action: 'Add a note',
					},
					{
						name: 'Get Notes',
						value: 'getNotes',
						description: 'Get notes for a prospect',
						action: 'Get notes',
					},
				],
				default: 'getProspect',
			},

			// Prospect ID field
			{
				displayName: 'Prospect ID',
				name: 'prospectId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['getProspect', 'removeProspect', 'getNotes'],
					},
				},
				default: 0,
				description: 'The prospect ID',
			},

			// Rep ID field
			{
				displayName: 'Rep ID',
				name: 'repId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['getProspectsByRep'],
					},
				},
				default: 0,
				description: 'The sales rep ID',
			},

			// Prospect Data
			{
				displayName: 'Prospect Data',
				name: 'prospectData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['addProspect', 'updateProspect'],
					},
				},
				default: '{}',
				description: 'Prospect data as JSON',
			},

			// Query Data
			{
				displayName: 'Query Data',
				name: 'queryData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['queryProspects'],
					},
				},
				default: '{}',
				description: 'Query parameters as JSON (query, account_id, user_id, stages)',
			},

			// Note Data
			{
				displayName: 'Note Data',
				name: 'noteData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['crm'],
						operation: ['addNote'],
					},
				},
				default: '{}',
				description: 'Note data as JSON',
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
						description: 'Get aggregated hours for a person',
						action: 'Get hours by person',
					},
					{
						name: 'Get Time Logs',
						value: 'getTimeLogs',
						description: 'Get time logs for account by date range',
						action: 'Get time logs',
					},
					{
						name: 'Get Person Stats',
						value: 'getPersonStats',
						description: 'Get aggregated statistics for a person',
						action: 'Get person stats',
					},
				],
				default: 'getHoursByPerson',
			},

			// Insights Request Data
			{
				displayName: 'Request Data',
				name: 'insightsData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['insights'],
					},
				},
				default: '{"user_id": 0, "start_date": "", "end_date": ""}',
				description: 'Request data as JSON (user_id, start_date, end_date)',
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
						description: 'Get notes for the current user',
						action: 'Get my notes',
					},
					{
						name: 'Get Note',
						value: 'getNote',
						description: 'Get a note by ID',
						action: 'Get a note',
					},
					{
						name: 'Add Note',
						value: 'addNote',
						description: 'Add a new note',
						action: 'Add a note',
					},
					{
						name: 'Update Note',
						value: 'updateNote',
						description: 'Update an existing note',
						action: 'Update a note',
					},
					{
						name: 'Remove Note',
						value: 'removeNote',
						description: 'Remove a note',
						action: 'Remove a note',
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

			// Note ID field
			{
				displayName: 'Note ID',
				name: 'noteId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['notes'],
						operation: ['getNote', 'removeNote'],
					},
				},
				default: '',
				description: 'The note ID (UUID)',
			},

			// Note Data
			{
				displayName: 'Note Data',
				name: 'noteData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['notes'],
						operation: ['addNote', 'updateNote'],
					},
				},
				default: '{}',
				description: 'Note data as JSON',
			},

			// Query Data for notes
			{
				displayName: 'Query Data',
				name: 'queryData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['notes'],
						operation: ['queryNotes'],
					},
				},
				default: '{}',
				description: 'Query parameters as JSON',
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
						name: 'Get Projects',
						value: 'getProjects',
						description: 'Get all projects for a user',
						action: 'Get projects',
					},
					{
						name: 'Get Active Projects',
						value: 'getActiveProjects',
						description: 'Get active projects for a user',
						action: 'Get active projects',
					},
					{
						name: 'Get Project by ID',
						value: 'getProjectById',
						description: 'Get project by ID',
						action: 'Get project by ID',
					},
					{
						name: 'Get Project Staff',
						value: 'getProjectStaff',
						description: 'Get staff assigned to a project',
						action: 'Get project staff',
					},
					{
						name: 'Add Task',
						value: 'addTask',
						description: 'Create a new project task',
						action: 'Add a task',
					},
					{
						name: 'Update Task',
						value: 'updateTask',
						description: 'Update an existing task',
						action: 'Update a task',
					},
					{
						name: 'Get Tasks',
						value: 'getTasks',
						description: 'Get tasks for a project',
						action: 'Get tasks',
					},
					{
						name: 'Get Open Tasks',
						value: 'getOpenTasks',
						description: 'Get open tasks for account',
						action: 'Get open tasks',
					},
				],
				default: 'getProjects',
			},

			// User ID for projects
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getProjects', 'getActiveProjects'],
					},
				},
				default: 0,
				description: 'The user ID',
			},

			// Project ID
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getProjectById', 'getProjectStaff', 'getTasks'],
					},
				},
				default: 0,
				description: 'The project ID',
			},

			// Task Data
			{
				displayName: 'Task Data',
				name: 'taskData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['addTask', 'updateTask'],
					},
				},
				default: '{}',
				description: 'Task data as JSON',
			},

			// Open Tasks Request Data
			{
				displayName: 'Request Data',
				name: 'requestData',
				type: 'json',
				required: true,
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['getOpenTasks'],
					},
				},
				default: '{}',
				description: 'Request data as JSON (account_id, filters)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);
		const credentials = await this.getCredentials('viviScapeApi');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: any;

				if (resource === 'account') {
					// Account operations
					if (operation === 'getInfo') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/info`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getActiveServices') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/services/active`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getAllServices') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/services/list`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getUsers') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/users`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getUserById') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/account/user/id?userid=${userId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					}
				} else if (resource === 'company') {
					// Company operations
					if (operation === 'getAll') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies/list`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'add') {
						const companyData = this.getNodeParameter('companyData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/companies/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(companyData),
						});
					} else if (operation === 'update') {
						const companyData = this.getNodeParameter('companyData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/companies/update`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(companyData),
						});
					} else if (operation === 'getClients') {
						const companyId = this.getNodeParameter('companyId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies/clients/company/${companyId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'addClient') {
						const clientData = this.getNodeParameter('clientData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/companies/client/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(clientData),
						});
					} else if (operation === 'getClientById') {
						const clientId = this.getNodeParameter('clientId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/companies/client/id/${clientId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getClientByEmail') {
						const clientEmail = this.getNodeParameter('clientEmail', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/companies/client/email`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: { email: clientEmail },
						});
					}
				} else if (resource === 'crm') {
					// CRM operations
					if (operation === 'addProspect') {
						const prospectData = this.getNodeParameter('prospectData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(prospectData),
						});
					} else if (operation === 'updateProspect') {
						const prospectData = this.getNodeParameter('prospectData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/update`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(prospectData),
						});
					} else if (operation === 'getProspect') {
						const prospectId = this.getNodeParameter('prospectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/id/${prospectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getProspectsByRep') {
						const repId = this.getNodeParameter('repId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospects/rep/${repId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'queryProspects') {
						const queryData = this.getNodeParameter('queryData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/crm/prospects/query`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(queryData),
						});
					} else if (operation === 'removeProspect') {
						const prospectId = this.getNodeParameter('prospectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/remove/${prospectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'addNote') {
						const noteData = this.getNodeParameter('noteData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/note/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(noteData),
						});
					} else if (operation === 'getNotes') {
						const prospectId = this.getNodeParameter('prospectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/crm/prospect/notes/${prospectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					}
				} else if (resource === 'insights') {
					// Insights operations
					const insightsData = this.getNodeParameter('insightsData', i) as string;

					if (operation === 'getHoursByPerson') {
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/insights/logs/hours/person`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(insightsData),
						});
					} else if (operation === 'getTimeLogs') {
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/insights/logs/account/daterange`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(insightsData),
						});
					} else if (operation === 'getPersonStats') {
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/insights/person/stats`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(insightsData),
						});
					}
				} else if (resource === 'notes') {
					// Notes operations
					if (operation === 'getMyNotes') {
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/notes/me`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getNote') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/notes/id/${noteId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'addNote') {
						const noteData = this.getNodeParameter('noteData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/notes/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(noteData),
						});
					} else if (operation === 'updateNote') {
						const noteData = this.getNodeParameter('noteData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/notes/update`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(noteData),
						});
					} else if (operation === 'removeNote') {
						const noteId = this.getNodeParameter('noteId', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/notes/remove/${noteId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'queryNotes') {
						const queryData = this.getNodeParameter('queryData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/notes/query`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(queryData),
						});
					}
				} else if (resource === 'project') {
					// Project operations
					if (operation === 'getProjects') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/user/projects?user_id=${userId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getActiveProjects') {
						const userId = this.getNodeParameter('userId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/user/projects/active?user_id=${userId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getProjectById') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/id?project_id=${projectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getProjectStaff') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/project/staff?project_id=${projectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'addTask') {
						const taskData = this.getNodeParameter('taskData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/projects/task/add`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(taskData),
						});
					} else if (operation === 'updateTask') {
						const taskData = this.getNodeParameter('taskData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/projects/task/update`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(taskData),
						});
					} else if (operation === 'getTasks') {
						const projectId = this.getNodeParameter('projectId', i) as number;
						responseData = await this.helpers.httpRequest({
							method: 'GET',
							url: `${credentials.baseUrl}/api/v1/projects/tasks/project?project_id=${projectId}`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
						});
					} else if (operation === 'getOpenTasks') {
						const requestData = this.getNodeParameter('requestData', i) as string;
						responseData = await this.helpers.httpRequest({
							method: 'POST',
							url: `${credentials.baseUrl}/api/v1/projects/account/tasks/open`,
							headers: {
								'Authorization': `Bearer ${credentials.apiKey}`,
								'Content-Type': 'application/json',
							},
							body: JSON.parse(requestData),
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
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
