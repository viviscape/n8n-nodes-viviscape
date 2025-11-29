"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viviScapeTools = void 0;

const n8n_workflow_1 = require("n8n-workflow");

exports.viviScapeTools = [
    // Account Tools
    {
        name: 'getAccountInfo',
        description: 'Get platform account detail information including account name, settings, and configuration',
        schema: {
            type: 'object',
            properties: {},
            required: [],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/account/info`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getAccountUsers',
        description: 'Get all users associated with the account including their roles, permissions, and contact information',
        schema: {
            type: 'object',
            properties: {},
            required: [],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/account/users`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getUserById',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/account/user/id?userid=${parameters.userId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },

    // Company Tools
    {
        name: 'getAllCompanies',
        description: 'Get a list of all companies in the system including company names, contact information, and status',
        schema: {
            type: 'object',
            properties: {},
            required: [],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/companies/list`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'addCompany',
        description: 'Add a new company to the system with details like name, address, contact information, and business type',
        schema: {
            type: 'object',
            properties: {
                companyData: {
                    type: 'object',
                    description: 'Company data object containing name, address, phone, email, etc.',
                },
            },
            required: ['companyData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/companies/add`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.companyData,
            });
            return response;
        },
    },
    {
        name: 'getCompanyClients',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/companies/clients/company/${parameters.companyId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getClientByEmail',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/companies/client/email`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: { email: parameters.email },
            });
            return response;
        },
    },

    // CRM Tools
    {
        name: 'getProspectById',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/crm/prospect/id/${parameters.prospectId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'addProspect',
        description: 'Add a new prospect to the CRM with contact information, company details, and sales stage',
        schema: {
            type: 'object',
            properties: {
                prospectData: {
                    type: 'object',
                    description: 'Prospect data including name, email, phone, company, stage, assigned rep, etc.',
                },
            },
            required: ['prospectData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/crm/prospect/add`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.prospectData,
            });
            return response;
        },
    },
    {
        name: 'updateProspect',
        description: 'Update an existing prospect\'s information including contact details, stage, or assigned sales rep',
        schema: {
            type: 'object',
            properties: {
                prospectData: {
                    type: 'object',
                    description: 'Updated prospect data including prospect_id and fields to update',
                },
            },
            required: ['prospectData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/crm/prospect/update`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.prospectData,
            });
            return response;
        },
    },
    {
        name: 'queryProspects',
        description: 'Search and filter prospects by various criteria like name, company, stage, or assigned rep',
        schema: {
            type: 'object',
            properties: {
                queryData: {
                    type: 'object',
                    description: 'Query parameters including query string, account_id, user_id, stages array, etc.',
                },
            },
            required: ['queryData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/crm/prospects/query`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.queryData,
            });
            return response;
        },
    },
    {
        name: 'addProspectNote',
        description: 'Add a note to a prospect to track communications, meetings, or important information',
        schema: {
            type: 'object',
            properties: {
                noteData: {
                    type: 'object',
                    description: 'Note data including prospect_id, note text, and optional metadata',
                },
            },
            required: ['noteData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/crm/prospect/note/add`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.noteData,
            });
            return response;
        },
    },
    {
        name: 'getProspectNotes',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/crm/prospect/notes/${parameters.prospectId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },

    // Project Tools
    {
        name: 'getUserProjects',
        description: 'Get all projects for the current user including project details, status, and timelines',
        schema: {
            type: 'object',
            properties: {},
            required: [],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/projects/user/projects`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getActiveProjects',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/projects/user/projects/active?user_id=${parameters.userId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getProjectById',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/projects/id?project_id=${parameters.projectId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getProjectStaff',
        description: 'Get all staff members assigned to a specific project including their roles and responsibilities',
        schema: {
            type: 'object',
            properties: {
                projectId: {
                    type: 'number',
                    description: 'The project ID to get staff for',
                },
            },
            required: ['projectId'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/projects/project/staff?project_id=${parameters.projectId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getProjectTasks',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/projects/tasks/project?project_id=${parameters.projectId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'addProjectTask',
        description: 'Create a new task for a project with details like description, assignee, due date, and priority',
        schema: {
            type: 'object',
            properties: {
                taskData: {
                    type: 'object',
                    description: 'Task data including project_id, title, description, assigned_to, due_date, priority, etc.',
                },
            },
            required: ['taskData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/projects/task/add`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.taskData,
            });
            return response;
        },
    },
    {
        name: 'updateProjectTask',
        description: 'Update an existing project task including status, assignee, due date, or other details',
        schema: {
            type: 'object',
            properties: {
                taskData: {
                    type: 'object',
                    description: 'Updated task data including task_id and fields to update',
                },
            },
            required: ['taskData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/projects/task/update`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.taskData,
            });
            return response;
        },
    },
    {
        name: 'getOpenTasks',
        description: 'Get all open/incomplete tasks for the account, optionally filtered by project, assignee, or priority',
        schema: {
            type: 'object',
            properties: {
                requestData: {
                    type: 'object',
                    description: 'Request data including account_id and optional filters',
                },
            },
            required: ['requestData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/projects/account/tasks/open`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.requestData,
            });
            return response;
        },
    },

    // Notes Tools
    {
        name: 'getMyNotes',
        description: 'Get all notes created by or assigned to the current user',
        schema: {
            type: 'object',
            properties: {},
            required: [],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/notes/me`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'getNoteById',
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
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'GET',
                url: `${credentials.baseUrl}/api/v1/notes/id/${parameters.noteId}`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
            });
            return response;
        },
    },
    {
        name: 'addNote',
        description: 'Create a new note with title, content, tags, and optional associations to projects or contacts',
        schema: {
            type: 'object',
            properties: {
                noteData: {
                    type: 'object',
                    description: 'Note data including title, content, tags, project_id, contact_id, etc.',
                },
            },
            required: ['noteData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/notes/add`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.noteData,
            });
            return response;
        },
    },
    {
        name: 'updateNote',
        description: 'Update an existing note\'s content, title, tags, or associations',
        schema: {
            type: 'object',
            properties: {
                noteData: {
                    type: 'object',
                    description: 'Updated note data including note_id and fields to update',
                },
            },
            required: ['noteData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/notes/update`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.noteData,
            });
            return response;
        },
    },
    {
        name: 'queryNotes',
        description: 'Search notes by keywords, tags, date range, or other criteria to find relevant information',
        schema: {
            type: 'object',
            properties: {
                queryData: {
                    type: 'object',
                    description: 'Query parameters including search term, tags, date filters, etc.',
                },
            },
            required: ['queryData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/notes/query`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.queryData,
            });
            return response;
        },
    },

    // Insights Tools
    {
        name: 'getHoursByPerson',
        description: 'Get aggregated hours worked by a specific person over a date range for time tracking and billing',
        schema: {
            type: 'object',
            properties: {
                insightsData: {
                    type: 'object',
                    description: 'Request data including user_id, start_date, and end_date',
                },
            },
            required: ['insightsData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/insights/logs/hours/person`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.insightsData,
            });
            return response;
        },
    },
    {
        name: 'getTimeLogs',
        description: 'Get detailed time logs for the account within a specific date range showing all time entries',
        schema: {
            type: 'object',
            properties: {
                insightsData: {
                    type: 'object',
                    description: 'Request data including start_date and end_date',
                },
            },
            required: ['insightsData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/insights/logs/account/daterange`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.insightsData,
            });
            return response;
        },
    },
    {
        name: 'getPersonStats',
        description: 'Get comprehensive statistics for a person including productivity metrics, project involvement, and performance data',
        schema: {
            type: 'object',
            properties: {
                insightsData: {
                    type: 'object',
                    description: 'Request data including user_id, start_date, and end_date',
                },
            },
            required: ['insightsData'],
        },
        execute: async (parameters, context) => {
            const credentials = await context.getCredentials('viviScapeApi');
            const response = await context.helpers.httpRequest({
                method: 'POST',
                url: `${credentials.baseUrl}/api/v1/insights/person/stats`,
                headers: {
                    APIKey: credentials.apiKey,
                    'Content-Type': 'application/json',
                },
                body: parameters.insightsData,
            });
            return response;
        },
    },
];