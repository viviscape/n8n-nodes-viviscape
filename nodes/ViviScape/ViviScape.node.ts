import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ToolViviScape implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ViviScape Tool',
		name: 'toolViviScape',
		icon: 'file:viviscape-logo-white.svg',
		group: ['transform'],
		version: 1,
		description: 'Use ViviScape API with AI Agents',
		defaults: {
			name: 'ViviScape Tool',
		},
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Tools'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://viviscape.com',
					},
				],
			},
		},
		inputs: [],
		outputs: ['ai_tool'],
		outputNames: ['Tool'],
		credentials: [
			{
				name: 'viviScapeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Category',
				name: 'category',
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
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['account'],
					},
				},
				options: [
					{
						name: 'Get Account Info',
						value: 'getAccountInfo',
						description: 'Get platform account detail information',
					},
					{
						name: 'Get Account Users',
						value: 'getAccountUsers',
						description: 'Get all users in the account',
					},
					{
						name: 'Get User by ID',
						value: 'getUserById',
						description: 'Get specific user details',
					},
				],
				default: 'getAccountInfo',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['company'],
					},
				},
				options: [
					{
						name: 'Get All Companies',
						value: 'getAllCompanies',
						description: 'Get list of all companies',
					},
					{
						name: 'Get Company Clients',
						value: 'getCompanyClients',
						description: 'Get clients for a company',
					},
					{
						name: 'Get Client by Email',
						value: 'getClientByEmail',
						description: 'Find client by email',
					},
				],
				default: 'getAllCompanies',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['crm'],
					},
				},
				options: [
					{
						name: 'Get Prospect by ID',
						value: 'getProspectById',
						description: 'Get prospect details',
					},
					{
						name: 'Query Prospects',
						value: 'queryProspects',
						description: 'Search prospects',
					},
					{
						name: 'Get Prospect Notes',
						value: 'getProspectNotes',
						description: 'Get all prospect notes',
					},
				],
				default: 'getProspectById',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['project'],
					},
				},
				options: [
					{
						name: 'Get User Projects',
						value: 'getUserProjects',
						description: 'Get all user projects',
					},
					{
						name: 'Get Active Projects',
						value: 'getActiveProjects',
						description: 'Get active projects',
					},
					{
						name: 'Get Project by ID',
						value: 'getProjectById',
						description: 'Get project details',
					},
					{
						name: 'Get Project Tasks',
						value: 'getProjectTasks',
						description: 'Get all project tasks',
					},
					{
						name: 'Get Open Tasks',
						value: 'getOpenTasks',
						description: 'Get all open tasks',
					},
				],
				default: 'getUserProjects',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['notes'],
					},
				},
				options: [
					{
						name: 'Get My Notes',
						value: 'getMyNotes',
						description: 'Get user notes',
					},
					{
						name: 'Get Note by ID',
						value: 'getNoteById',
						description: 'Get specific note',
					},
					{
						name: 'Query Notes',
						value: 'queryNotes',
						description: 'Search notes',
					},
				],
				default: 'getMyNotes',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						category: ['insights'],
					},
				},
				options: [
					{
						name: 'Get Hours by Person',
						value: 'getHoursByPerson',
						description: 'Get time tracking data',
					},
					{
						name: 'Get Time Logs',
						value: 'getTimeLogs',
						description: 'Get detailed time logs',
					},
				],
				default: 'getHoursByPerson',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const category = this.getNodeParameter('category', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('viviScapeApi');
		
		// Capture httpRequest helper in closure
		const httpRequest = this.helpers.httpRequest.bind(this.helpers);

		// Map of operations to their configurations
		const toolConfig: Record<string, any> = {
			// Account Tools
			getAccountInfo: {
				name: 'viviscape_get_account_info',
				description: 'Get platform account detail information including account name, settings, and configuration',
				schema: {
					type: 'object',
					properties: {},
					required: [],
				},
				func: async () => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/account/info`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getAccountUsers: {
				name: 'viviscape_get_account_users',
				description: 'Get all users associated with the account including their roles, permissions, and contact information',
				schema: {
					type: 'object',
					properties: {},
					required: [],
				},
				func: async () => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/account/users`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getUserById: {
				name: 'viviscape_get_user_by_id',
				description: 'Get detailed information about a specific user by their ID including name, email, role, and permissions',
				schema: {
					type: 'object',
					properties: {
						userId: {
							type: 'number',
							description: 'The user ID to retrieve',
						},
					},
					required: ['userId'],
				},
				func: async (input: { userId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/account/user/id?userid=${input.userId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			// Company Tools
			getAllCompanies: {
				name: 'viviscape_get_all_companies',
				description: 'Get a list of all companies in the system including company names, contact information, and status',
				schema: {
					type: 'object',
					properties: {},
					required: [],
				},
				func: async () => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/companies/list`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getCompanyClients: {
				name: 'viviscape_get_company_clients',
				description: 'Get all clients associated with a specific company by company ID',
				schema: {
					type: 'object',
					properties: {
						companyId: {
							type: 'number',
							description: 'The company ID to get clients for',
						},
					},
					required: ['companyId'],
				},
				func: async (input: { companyId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/companies/clients/company/${input.companyId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getClientByEmail: {
				name: 'viviscape_get_client_by_email',
				description: 'Find a client by their email address to retrieve their full contact and company information',
				schema: {
					type: 'object',
					properties: {
						email: {
							type: 'string',
							description: 'The client email address to search for',
						},
					},
					required: ['email'],
				},
				func: async (input: { email: string }) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/companies/client/email`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: { email: input.email },
					});
				},
			},
			// CRM Tools
			getProspectById: {
				name: 'viviscape_get_prospect_by_id',
				description: 'Get detailed information about a specific prospect by ID including contact info, stage, notes, and history',
				schema: {
					type: 'object',
					properties: {
						prospectId: {
							type: 'number',
							description: 'The prospect ID to retrieve',
						},
					},
					required: ['prospectId'],
				},
				func: async (input: { prospectId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/crm/prospect/id/${input.prospectId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			queryProspects: {
				name: 'viviscape_query_prospects',
				description: 'Search and filter prospects by various criteria like name, company, stage, or assigned rep',
				schema: {
					type: 'object',
					properties: {
						query: {
							type: 'string',
							description: 'Search query string',
						},
						account_id: {
							type: 'number',
							description: 'Filter by account ID',
						},
						user_id: {
							type: 'number',
							description: 'Filter by user ID',
						},
						stages: {
							type: 'array',
							items: { type: 'string' },
							description: 'Filter by stages',
						},
					},
					required: [],
				},
				func: async (input: any) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/crm/prospects/query`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: input,
					});
				},
			},
			getProspectNotes: {
				name: 'viviscape_get_prospect_notes',
				description: 'Get all notes associated with a specific prospect to review communication history',
				schema: {
					type: 'object',
					properties: {
						prospectId: {
							type: 'number',
							description: 'The prospect ID to get notes for',
						},
					},
					required: ['prospectId'],
				},
				func: async (input: { prospectId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/crm/prospect/notes/${input.prospectId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			// Project Tools
			getUserProjects: {
				name: 'viviscape_get_user_projects',
				description: 'Get all projects for the current user including project details, status, and timelines',
				schema: {
					type: 'object',
					properties: {},
					required: [],
				},
				func: async () => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/projects/user/projects`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getActiveProjects: {
				name: 'viviscape_get_active_projects',
				description: 'Get all active projects for a specific user that are currently in progress',
				schema: {
					type: 'object',
					properties: {
						userId: {
							type: 'number',
							description: 'The user ID to get active projects for',
						},
					},
					required: ['userId'],
				},
				func: async (input: { userId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/projects/user/projects/active?user_id=${input.userId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getProjectById: {
				name: 'viviscape_get_project_by_id',
				description: 'Get detailed information about a specific project by ID including tasks, staff, budget, and timeline',
				schema: {
					type: 'object',
					properties: {
						projectId: {
							type: 'number',
							description: 'The project ID to retrieve',
						},
					},
					required: ['projectId'],
				},
				func: async (input: { projectId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/projects/id?project_id=${input.projectId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getProjectTasks: {
				name: 'viviscape_get_project_tasks',
				description: 'Get all tasks for a specific project including task status, assignees, and deadlines',
				schema: {
					type: 'object',
					properties: {
						projectId: {
							type: 'number',
							description: 'The project ID to get tasks for',
						},
					},
					required: ['projectId'],
				},
				func: async (input: { projectId: number }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/projects/tasks/project?project_id=${input.projectId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getOpenTasks: {
				name: 'viviscape_get_open_tasks',
				description: 'Get all open/incomplete tasks for the account, optionally filtered by project, assignee, or priority',
				schema: {
					type: 'object',
					properties: {
						account_id: {
							type: 'number',
							description: 'Filter by account ID',
						},
					},
					required: [],
				},
				func: async (input: any) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/projects/account/tasks/open`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: input,
					});
				},
			},
			// Notes Tools
			getMyNotes: {
				name: 'viviscape_get_my_notes',
				description: 'Get all notes created by or assigned to the current user',
				schema: {
					type: 'object',
					properties: {},
					required: [],
				},
				func: async () => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/notes/me`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			getNoteById: {
				name: 'viviscape_get_note_by_id',
				description: 'Get a specific note by its ID to view the full content and metadata',
				schema: {
					type: 'object',
					properties: {
						noteId: {
							type: 'string',
							description: 'The note ID (UUID) to retrieve',
						},
					},
					required: ['noteId'],
				},
				func: async (input: { noteId: string }) => {
					return await httpRequest({
						method: 'GET',
						url: `${credentials.baseUrl}/api/v1/notes/id/${input.noteId}`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
					});
				},
			},
			queryNotes: {
				name: 'viviscape_query_notes',
				description: 'Search notes by keywords, tags, date range, or other criteria to find relevant information',
				schema: {
					type: 'object',
					properties: {
						query: {
							type: 'string',
							description: 'Search query string',
						},
						tags: {
							type: 'array',
							items: { type: 'string' },
							description: 'Filter by tags',
						},
					},
					required: [],
				},
				func: async (input: any) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/notes/query`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: input,
					});
				},
			},
			// Insights Tools
			getHoursByPerson: {
				name: 'viviscape_get_hours_by_person',
				description: 'Get aggregated hours worked by a specific person over a date range for time tracking and billing',
				schema: {
					type: 'object',
					properties: {
						user_id: {
							type: 'number',
							description: 'The user ID',
						},
						start_date: {
							type: 'string',
							description: 'Start date (YYYY-MM-DD)',
						},
						end_date: {
							type: 'string',
							description: 'End date (YYYY-MM-DD)',
						},
					},
					required: ['user_id', 'start_date', 'end_date'],
				},
				func: async (input: any) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/insights/logs/hours/person`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: input,
					});
				},
			},
			getTimeLogs: {
				name: 'viviscape_get_time_logs',
				description: 'Get detailed time logs for the account within a specific date range showing all time entries',
				schema: {
					type: 'object',
					properties: {
						start_date: {
							type: 'string',
							description: 'Start date (YYYY-MM-DD)',
						},
						end_date: {
							type: 'string',
							description: 'End date (YYYY-MM-DD)',
						},
					},
					required: ['start_date', 'end_date'],
				},
				func: async (input: any) => {
					return await httpRequest({
						method: 'POST',
						url: `${credentials.baseUrl}/api/v1/insights/logs/account/daterange`,
						headers: {
							APIKey: credentials.apiKey as string,
							'Content-Type': 'application/json',
						},
						body: input,
					});
				},
			},
		};

		const config = toolConfig[operation];
		if (!config) {
			throw new Error(`Operation ${operation} not found`);
		}

		// Return the tool configuration in n8n AI tool format
		return [[{ 
			json: { 
				name: config.name,
				description: config.description,
				schema: config.schema,
				func: config.func,
			} 
		}]];
	}
}