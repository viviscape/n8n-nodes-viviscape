# ViviScape n8n Node - Installation & Setup Guide

## Quick Start

### 1. Install the Node

There are three ways to install this community node:

#### Option A: Via n8n Community Nodes (Recommended)
1. Open your n8n instance
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-viviscape`
5. Click **Install**

#### Option B: Manual Installation (Development)
```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-viviscape.git
cd n8n-nodes-viviscape

# Install dependencies
npm install

# Build the node
npm run build

# Link to your n8n installation
npm link
cd ~/.n8n/custom
npm link n8n-nodes-viviscape
```

#### Option C: Docker
Add to your docker-compose.yml:
```yaml
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_COMMUNITY_PACKAGES=n8n-nodes-viviscape
```

### 2. Configure Credentials

1. In n8n, create new credentials
2. Search for "ViviScape API"
3. Enter your credentials:
   - **API Key**: Your ViviScape Bearer token
   - **Base URL**: `https://api.viviscape.io` (default)

### 3. Test Your Connection

Create a simple workflow:
1. Add a **ViviScape** node
2. Select **Resource**: Account
3. Select **Operation**: Get Account Info
4. Execute the node

If successful, you'll see your account information!

## Development Setup

### Prerequisites
- Node.js 16+ and npm
- n8n installed locally or in Docker
- ViviScape API credentials

### Building from Source

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Watch mode for development
npm run dev

# Run linter
npm run lint

# Format code
npm run format
```

### Project Structure
```
n8n-nodes-viviscape/
├── credentials/
│   └── ViviScapeApi.credentials.ts
├── nodes/
│   └── ViviScape/
│       ├── ViviScape.node.ts
│       └── viviscape.svg
├── dist/                    # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Common Use Cases

### Use Case 1: Daily CRM Sync
Sync prospects from ViviScape to your Google Sheets daily:
1. **Schedule Trigger** (daily at 9 AM)
2. **ViviScape** - Query Prospects
3. **Google Sheets** - Append rows

### Use Case 2: Time Tracking Alerts
Send Slack notification when hours exceed threshold:
1. **Schedule Trigger** (weekly)
2. **ViviScape** - Get Time Logs
3. **Function** - Calculate totals
4. **IF** - Check threshold
5. **Slack** - Send message

### Use Case 3: Automated Task Creation
Create tasks from incoming emails:
1. **Email Trigger** (IMAP)
2. **Extract Data** from email
3. **ViviScape** - Add Task

### Use Case 4: Project Reporting
Generate weekly project reports:
1. **Schedule Trigger** (Friday 5 PM)
2. **ViviScape** - Get Projects
3. **ViviScape** - Get Tasks (for each project)
4. **ViviScape** - Get Time Logs
5. **Function** - Generate report
6. **Email** - Send report

## Authentication

The ViviScape API uses Bearer token authentication. Your API key should be added as:

```
Authorization: Bearer YOUR_API_KEY
```

This is handled automatically by the credentials system.

## Rate Limiting

Be aware of API rate limits. Use **Wait** nodes between bulk operations:
- Wait 100-500ms between individual API calls
- For bulk operations, consider batching

## Error Handling

The node includes built-in error handling:
- Connection errors are caught and reported
- Invalid JSON in request bodies will show clear error messages
- HTTP error codes are properly surfaced

Enable "Continue on Fail" in node settings for better error recovery in production workflows.

## Troubleshooting

### "Cannot find module" Error
```bash
npm run build
```

### Credentials Not Working
- Verify your API key is correct
- Check that Base URL is `https://api.viviscape.io`
- Test with the "Get Account Info" operation

### Node Not Appearing in n8n
- Restart n8n after installation
- Check Community Nodes are enabled in settings
- Verify package is in n8n's node_modules

### JSON Parse Errors
- Ensure JSON fields contain valid JSON
- Use the Expression Editor to build complex objects
- Test JSON with `JSON.parse()` in Function node first

## Best Practices

1. **Use Variables**: Store IDs and common values in workflow variables
2. **Error Handling**: Always enable "Continue on Fail" for production
3. **Rate Limiting**: Add delays for bulk operations
4. **Testing**: Test with small datasets first
5. **Logging**: Use Function nodes to log important data points
6. **Credentials**: Never hardcode API keys - always use credentials

## Advanced Usage

### Using Expressions

You can use n8n expressions in JSON fields:

```json
{
  "user_id": "{{ $json.userId }}",
  "start_date": "{{ $now.minus({days: 7}).toISODate() }}",
  "end_date": "{{ $now.toISODate() }}"
}
```

### Batching Requests

For processing multiple items:

```javascript
// In Function node before ViviScape node
const items = $input.all();
return items.map(item => ({
  json: {
    prospect_data: JSON.stringify({
      name: item.json.name,
      email: item.json.email,
      // ... other fields
    })
  }
}));
```

### Error Recovery

```javascript
// In Function node after ViviScape node with "Continue on Fail" enabled
if ($input.item.json.error) {
  // Log error
  console.error('API Error:', $input.item.json.error);
  // Return fallback data or retry logic
}
```

## Support & Contributing

### Getting Help
- Check the [n8n community forum](https://community.n8n.io/)
- Review [ViviScape API docs](https://api.viviscape.io/swagger/docs/v1)
- Open an issue on GitHub

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - See LICENSE file for details
