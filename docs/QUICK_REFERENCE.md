# ViviScape n8n Node - Quick Reference Card

## Installation (3 Steps)
```bash
npm install && npm run build && npm link
```

## Setup (2 Steps)
1. Add credentials in n8n: ViviScape API
2. Add node to workflow: Search "ViviScape"

## Most Common Operations

### Get Account Info
```
Resource: Account
Operation: Get Account Info
```

### Add Company
```
Resource: Company
Operation: Add
Company Data: {"strCompanyName": "...", "strEmail": "..."}
```

### Query Prospects
```
Resource: CRM
Operation: Query Prospects
Query Data: {"query": "...", "stages": ["new", "negotiation"]}
```

### Get Time Logs
```
Resource: Insights
Operation: Get Time Logs
Request Data: {"start_date": "...", "end_date": "..."}
```

### Create Task
```
Resource: Project
Operation: Add Task
Task Data: {"task_name": "...", "group_id": 123}
```

## Resource Types
| Resource | Operations | Use For |
|----------|-----------|---------|
| Account | 5 | User management |
| Company | 7 | Client/company CRUD |
| CRM | 8 | Prospect management |
| Insights | 3 | Time tracking data |
| Notes | 6 | Note management |
| Project | 8 | Tasks & projects |

## Common Patterns

### Expression for Date Range
```json
{
  "start_date": "={{ $now.minus({days: 30}).toISO() }}",
  "end_date": "={{ $now.toISO() }}"
}
```

### Expression for Previous Node Data
```json
{
  "company_id": "={{ $json.intCompanyID }}",
  "user_id": "={{ $('Get User').item.json.id }}"
}
```

### Loop Through Items
```
Input: Array of items
For Each: Enable split
Process: ViviScape operation per item
```

## Error Handling
- Enable "Continue on Fail" in production
- Add IF node to check for errors
- Use Function node to log errors

## Best Practices
✅ Test with small data first
✅ Add 100ms delay for bulk ops
✅ Use expressions for dynamic data
✅ Cache frequently used data
✅ Enable error handling

## Troubleshooting Quick Fixes
| Issue | Fix |
|-------|-----|
| Module not found | `npm run build` |
| Invalid credentials | Check API key & URL |
| JSON error | Validate JSON syntax |
| Node not visible | Restart n8n |
| Timeout | Check network/API |

## Example Workflow
```
Manual Trigger
  ↓
Get Account Info (ViviScape)
  ↓
Get All Companies (ViviScape)
  ↓
Get Open Tasks (ViviScape)
  ↓
Send Email (Gmail)
```

## API Endpoints Quick Lookup

**Account**
- GET `/api/v1/account/info`
- GET `/api/v1/account/users`

**Company**
- GET `/api/v1/companies/list`
- POST `/api/v1/companies/add`

**CRM**
- POST `/api/v1/crm/prospects/query`
- POST `/api/v1/crm/prospect/add`

**Insights**
- POST `/api/v1/insights/logs/account/daterange`

**Notes**
- GET `/api/v1/notes/me`
- POST `/api/v1/notes/add`

**Project**
- GET `/api/v1/projects/user/projects`
- POST `/api/v1/projects/task/add`

## Support
- 📖 Docs: README.md, INSTALL.md
- 🔧 Guide: IMPLEMENTATION_GUIDE.md
- 💬 Forum: https://community.n8n.io/
- 🌐 API: https://api.viviscape.io/swagger/docs/v1

## Files Checklist
- [x] ViviScapeApi.credentials.ts
- [x] ViviScape.node.ts
- [x] package.json
- [x] tsconfig.json
- [x] README.md
- [x] INSTALL.md
- [x] IMPLEMENTATION_GUIDE.md
- [x] example-workflow.json

---
**Version**: 1.0.0 | **License**: MIT | **Status**: Production Ready ✅
