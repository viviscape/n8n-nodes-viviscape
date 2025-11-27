# ViviScape n8n Node Extension - Complete Implementation Guide

## Overview

This package provides a complete n8n community node for integrating with the ViviScape API. The implementation includes support for all major ViviScape API endpoints across 6 resource categories:

- **Account**: Platform account management and user operations
- **Company**: Company and client management
- **CRM**: Prospect management, notes, and followups
- **Insights**: Time tracking and analytics
- **Notes**: Note and notebook management
- **Project**: Project and task management

## Files Included

### Core Node Files
1. **ViviScapeApi.credentials.ts** - Authentication credentials definition
2. **ViviScape.node.ts** - Main node implementation with all operations
3. **package.json** - Node package configuration
4. **tsconfig.json** - TypeScript configuration

### Documentation
5. **README.md** - Main documentation and usage guide
6. **INSTALL.md** - Detailed installation and setup instructions
7. **example-workflow.json** - Sample n8n workflow

## Implementation Details

### Authentication
The node uses Bearer token authentication with the following structure:
- Credential type: `viviScapeApi`
- Authentication method: Bearer token in Authorization header
- Test endpoint: `/api/v1/account/info`

### Supported Operations

#### Account Resource (5 operations)
- Get Account Info
- Get Active Services
- Get All Services
- Get Users
- Get User by ID

#### Company Resource (7 operations)
- Get All Companies
- Add Company
- Update Company
- Get Clients by Company
- Add Client
- Get Client by ID
- Get Client by Email

#### CRM Resource (8 operations)
- Add Prospect
- Update Prospect
- Get Prospect
- Get Prospects by Rep
- Query Prospects
- Remove Prospect
- Add Note
- Get Notes

#### Insights Resource (3 operations)
- Get Hours by Person
- Get Time Logs
- Get Person Stats

#### Notes Resource (6 operations)
- Get My Notes
- Get Note
- Add Note
- Update Note
- Remove Note
- Query Notes

#### Project Resource (8 operations)
- Get Projects
- Get Active Projects
- Get Project by ID
- Get Project Staff
- Add Task
- Update Task
- Get Tasks
- Get Open Tasks

## Quick Start Guide

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Node
```bash
npm run build
```

### Step 3: Link to n8n
```bash
# Link the package
npm link

# In your n8n directory
cd ~/.n8n/custom
npm link n8n-nodes-viviscape
```

### Step 4: Restart n8n
```bash
# If running locally
n8n start

# If using Docker
docker restart n8n
```

### Step 5: Add Credentials
1. Open n8n
2. Go to Credentials > New
3. Search for "ViviScape API"
4. Enter your API key and base URL
5. Test the connection

## Usage Examples

### Example 1: Simple Account Query
```javascript
// Node Configuration
Resource: Account
Operation: Get Account Info

// No additional parameters needed
// Returns full account details
```

### Example 2: Add a Company
```javascript
// Node Configuration
Resource: Company
Operation: Add
Company Data: {
  "strCompanyName": "Tech Solutions Inc",
  "strEmail": "info@techsolutions.com",
  "strPhone": "555-0123",
  "strAddress": "100 Innovation Way",
  "strCity": "San Francisco",
  "strState": "CA",
  "strZip": "94105",
  "bitActive": true
}
```

### Example 3: Query CRM Prospects
```javascript
// Node Configuration
Resource: CRM
Operation: Query Prospects
Query Data: {
  "query": "technology",
  "account_id": 123,
  "user_id": 456,
  "stages": ["new", "firstcontact", "negotiation"]
}
```

### Example 4: Get Time Logs for Analytics
```javascript
// Node Configuration
Resource: Insights
Operation: Get Time Logs
Request Data: {
  "start_date": "2024-01-01T00:00:00Z",
  "end_date": "2024-01-31T23:59:59Z"
}
```

### Example 5: Create Project Task
```javascript
// Node Configuration
Resource: Project
Operation: Add Task
Task Data: {
  "group_id": 789,
  "task_name": "Implement user authentication",
  "task_description": "Set up JWT-based authentication",
  "assigned_user_id": 456,
  "due_date": "2024-12-31T17:00:00Z",
  "priority": "high"
}
```

## Advanced Features

### Dynamic Field Population
Use n8n expressions to populate fields dynamically:

```javascript
{
  "user_id": "={{ $json.userId }}",
  "start_date": "={{ $now.minus({days: 30}).toISO() }}",
  "end_date": "={{ $now.toISO() }}",
  "project_id": "={{ $('previous_node').item.json.id }}"
}
```

### Error Handling
The node includes comprehensive error handling:
- Network errors are caught and reported
- Invalid JSON payloads show clear error messages
- HTTP status codes are properly surfaced
- Continue on Fail mode supported

### Batch Processing
Process multiple items in a loop:

```javascript
// Example: Update multiple prospects
// Input from previous node: Array of prospects
// For each prospect, the node will execute with:
{
  "prospect_id": "={{ $json.id }}",
  "prospectData": JSON.stringify({
    "id": "={{ $json.id }}",
    "stage": "negotiation",
    "notes": "Updated via automation"
  })
}
```

## Best Practices

### 1. Credential Management
- Never hardcode API keys
- Use n8n's credential system
- Test credentials before deploying workflows

### 2. Error Recovery
- Enable "Continue on Fail" for production workflows
- Add error handling branches
- Log errors for debugging

### 3. Rate Limiting
- Add delays between bulk operations
- Use Wait nodes (100-500ms recommended)
- Monitor API usage

### 4. Data Validation
- Validate JSON before sending to API
- Use Function nodes for complex transformations
- Test with small datasets first

### 5. Performance
- Use filters to limit data retrieved
- Paginate large result sets
- Cache frequently accessed data

## Common Workflows

### Workflow 1: Daily CRM Digest
```
Schedule Trigger (daily 8am)
  → ViviScape: Query Prospects (new/updated)
  → Filter: Important prospects only
  → Aggregate: Create summary
  → Email: Send digest
```

### Workflow 2: Project Time Tracking Alert
```
Schedule Trigger (weekly Friday)
  → ViviScape: Get Projects
  → Loop: For each project
    → ViviScape: Get Time Logs
    → Calculate: Total hours
    → IF: Hours > Budget
      → Slack: Send alert
```

### Workflow 3: Automated Client Onboarding
```
Webhook Trigger (new client signup)
  → ViviScape: Add Client
  → ViviScape: Add Prospect
  → ViviScape: Create Project
  → ViviScape: Add Tasks
  → Email: Send welcome
```

### Workflow 4: Invoice Data Collection
```
Schedule Trigger (monthly)
  → ViviScape: Get Companies
  → Loop: For each company
    → ViviScape: Get Time Logs
    → ViviScape: Get Project Tasks
    → Calculate: Billable hours
    → Export: To accounting system
```

## Troubleshooting

### Issue: "Module not found"
**Solution**: Run `npm run build` and ensure files are in dist/ directory

### Issue: "Invalid credentials"
**Solution**: 
- Verify API key is correct
- Check base URL is `https://api.viviscape.io`
- Test with "Get Account Info" operation

### Issue: "JSON parse error"
**Solution**:
- Validate JSON syntax in data fields
- Use JSON.parse() in Function node to test
- Check for missing quotes or commas

### Issue: "Node not appearing in n8n"
**Solution**:
- Restart n8n after installation
- Check Community Nodes are enabled
- Verify package in node_modules

### Issue: "Request timeout"
**Solution**:
- Check network connectivity
- Verify API endpoint is accessible
- Add retry logic for unreliable connections

## API Reference

### Base URL
```
https://api.viviscape.io
```

### Authentication Header
```
Authorization: Bearer YOUR_API_KEY
```

### Common Response Formats

#### Success Response
```json
{
  "data": { ... },
  "status": "success"
}
```

#### Error Response
```json
{
  "error": "Error message",
  "status": "error",
  "code": 400
}
```

## Development

### Project Structure
```
n8n-nodes-viviscape/
├── credentials/
│   └── ViviScapeApi.credentials.ts
├── nodes/
│   └── ViviScape/
│       ├── ViviScape.node.ts
│       └── viviscape.svg
├── dist/                    # Build output
├── package.json
├── tsconfig.json
├── README.md
├── INSTALL.md
└── example-workflow.json
```

### Build Commands
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Development mode (watch)
npm run dev

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Operations

To add a new operation:

1. Add to operations array in node description:
```typescript
{
  name: 'New Operation',
  value: 'newOperation',
  description: 'Description here',
  action: 'Action description'
}
```

2. Add parameter fields if needed:
```typescript
{
  displayName: 'Field Name',
  name: 'fieldName',
  type: 'string',
  displayOptions: {
    show: {
      resource: ['yourResource'],
      operation: ['newOperation']
    }
  },
  default: '',
  required: true
}
```

3. Implement in execute function:
```typescript
if (operation === 'newOperation') {
  const param = this.getNodeParameter('fieldName', i);
  responseData = await this.helpers.httpRequest({
    method: 'POST',
    url: `${credentials.baseUrl}/api/v1/your/endpoint`,
    headers: {
      'Authorization': `Bearer ${credentials.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: { param }
  });
}
```

## Testing

### Manual Testing
1. Create test workflow with Manual Trigger
2. Add ViviScape node with operation
3. Execute and verify response
4. Check error handling with invalid data

### Automated Testing (Future)
```javascript
// Example test structure
describe('ViviScape Node', () => {
  it('should get account info', async () => {
    // Test implementation
  });
  
  it('should handle errors gracefully', async () => {
    // Test implementation
  });
});
```

## Version History

### v1.0.0 (Current)
- Initial release
- Support for 6 resource types
- 37 total operations
- Bearer token authentication
- Comprehensive error handling

## Support

### Getting Help
- GitHub Issues: Report bugs and request features
- n8n Community: https://community.n8n.io/
- ViviScape API Docs: https://api.viviscape.io/swagger/docs/v1

### Contributing
Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License

MIT License

Copyright (c) 2024 ViviScape

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
