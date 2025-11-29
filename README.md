# n8n-nodes-viviscape

This is an n8n community node that lets you use ViviScape API in your n8n workflows.

ViviScape is a comprehensive business management platform offering CRM, project management, time tracking, and insights capabilities.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node supports the following resources and operations:

### Account
- **Get Account Info**: Retrieve platform account details
- **Get Active Services**: Retrieve active services for the account
- **Get All Services**: Retrieve all services for the account
- **Get Users**: Get users associated with the account
- **Get User by ID**: Get a specific user by ID

### Company
- **Get All**: Retrieve all companies
- **Add**: Add a new company
- **Update**: Update an existing company
- **Get Clients**: Get clients for a specific company
- **Add Client**: Add a new client
- **Get Client by ID**: Get a client by ID
- **Get Client by Email**: Get a client by email address

### CRM
- **Add Prospect**: Create a new prospect
- **Update Prospect**: Update an existing prospect
- **Get Prospect**: Get prospect details by ID
- **Get Prospects by Rep**: Get all prospects for a sales rep
- **Query Prospects**: Search prospects with filters
- **Remove Prospect**: Delete a prospect
- **Add Note**: Add a note to a prospect
- **Get Notes**: Get all notes for a prospect

### Insights
- **Get Hours by Person**: Get aggregated hours for a person in a date range
- **Get Time Logs**: Get time logs for an account by date range
- **Get Person Stats**: Get aggregated statistics for a person

### Notes
- **Get My Notes**: Get all notes for the current user
- **Get Note**: Get a specific note by ID
- **Add Note**: Create a new note
- **Update Note**: Update an existing note
- **Remove Note**: Delete a note
- **Query Notes**: Search notes

### Project
- **Get Projects**: Get all projects for a user
- **Get Active Projects**: Get active projects for a user
- **Get Project by ID**: Get project details by ID
- **Get Project Staff**: Get staff assigned to a project
- **Add Task**: Create a new project task
- **Update Task**: Update an existing task
- **Get Tasks**: Get all tasks for a project
- **Get Open Tasks**: Get open tasks for the account

## Credentials

To use this node, you need to set up ViviScape API credentials:

1. **API Key**: Your ViviScape API authentication key
2. **Base URL**: The base URL for the ViviScape API (default: https://api.viviscape.io)

The node uses Bearer token authentication by adding the API key to the Authorization header.

## Usage Examples

### Example 1: Get Account Information
```
Resource: Account
Operation: Get Account Info
```
This will return detailed information about your ViviScape platform account.

### Example 2: Add a New Company
```
Resource: Company
Operation: Add
Company Data: {
  "strCompanyName": "Acme Corporation",
  "strEmail": "contact@acme.com",
  "strPhone": "555-1234",
  "strAddress": "123 Main St",
  "strCity": "New York",
  "strState": "NY",
  "strZip": "10001"
}
```

### Example 3: Query Prospects
```
Resource: CRM
Operation: Query Prospects
Query Data: {
  "query": "tech",
  "account_id": 123,
  "stages": ["new", "firstcontact", "negotiation"]
}
```

### Example 4: Get Time Logs
```
Resource: Insights
Operation: Get Time Logs
Request Data: {
  "start_date": "2024-01-01",
  "end_date": "2024-01-31"
}
```

### Example 5: Add a Project Task
```
Resource: Project
Operation: Add Task
Task Data: {
  "project_id": 456,
  "task_name": "Complete design mockups",
  "assigned_user_id": 789,
  "due_date": "2024-12-31"
}
```

## API Documentation

For detailed information about the ViviScape API, including all available fields and data structures, refer to the official API documentation:

https://api.viviscape.io/swagger

## Compatibility

- Minimum n8n version: 0.200.0
- Tested with n8n version: 1.0.0+

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [ViviScape API Documentation](https://api.viviscape.io/swagger)

## Support

For issues specific to this node, please open an issue in the GitHub repository.

For ViviScape API support, contact ViviScape support at support@viviscape.io

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
