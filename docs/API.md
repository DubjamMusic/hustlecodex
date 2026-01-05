# Virtual Boardroom API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints are public. Admin endpoints require authentication via the `confirmCode` parameter.

---

## Execute Directive

Execute a strategic directive with both competing teams.

**Endpoint:** `POST /api/agents/execute`

**Request Body:**
```typescript
{
  directive: string;          // Required: The strategic directive to analyze
  rulesetName?: string;       // Optional: Ruleset to use for validation (default: 'default-rules')
  competitionMode?: boolean;  // Optional: Enable competitive scoring (default: true)
  includeDetails?: boolean;   // Optional: Include full agent outputs (default: false)
}
```

**Response:**
```typescript
{
  success: boolean;
  executionId: string;
  moderatorJudgment: {
    winningTeam: 'alpha' | 'omega' | 'tie';
    synthesis: string;              // Moderator's synthesis of both teams' work
    reasoning: string;              // Detailed reasoning for the judgment
    praiseMessage: string;          // Recognition message
    confidence: number;             // Moderator's confidence (0-100)
    teamAlphaPerformance: {
      team: 'alpha';
      qualityScore: number;
      speedScore: number;
      collaborationScore: number;
      innovationScore: number;
      totalScore: number;
      strengths: string[];
      improvements: string[];
    };
    teamOmegaPerformance: { ... };  // Same structure as teamAlphaPerformance
    shouldContinue: boolean;
    timestamp: number;
  };
  validationReports: {
    alpha: Array<{
      team: 'alpha';
      agentName: string;
      passed: boolean;
      results: Array<{
        passed: boolean;
        ruleName: string;
        ruleId: string;
        severity: 'error' | 'warning' | 'info';
        message: string;
        suggestion?: string;
      }>;
      overallScore: number;
      timestamp: number;
    }>;
    omega: Array<...>;  // Same structure as alpha
  };
  timestamp: number;
  error?: string;
  
  // Only if includeDetails=true:
  alphaOutputs?: Array<{
    agentName: string;
    team: 'alpha';
    content: string;
    confidence: number;
    processingTime: number;
    metadata: object;
    timestamp: number;
  }>;
  omegaOutputs?: Array<...>;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Develop a go-to-market strategy for a new AI-powered productivity tool targeting remote teams",
    "rulesetName": "strategic-planning",
    "competitionMode": true,
    "includeDetails": true
  }'
```

**Status Codes:**
- `200`: Success
- `400`: Invalid request (missing directive, invalid format)
- `405`: Method not allowed (non-POST request)
- `500`: Internal server error

---

## Get Leaderboard

Retrieve current competition standings.

**Endpoint:** `GET /api/agents/leaderboard`

**Query Parameters:**
- `period` (optional): Time period to retrieve
  - `daily` (default)
  - `monthly`
  - `yearly`

**Response:**
```typescript
{
  success: boolean;
  leaderboard: {
    alpha: {
      wins: number;
      losses: number;
      ties: number;
      averageScore: number;
    };
    omega: {
      wins: number;
      losses: number;
      ties: number;
      averageScore: number;
    };
  };
  mvpAgents: Array<{
    name: string;
    team: 'alpha' | 'omega';
    score: number;
  }>;
  error?: string;
}
```

**Example Request:**
```bash
curl http://localhost:3000/api/agents/leaderboard?period=daily
```

**Status Codes:**
- `200`: Success
- `405`: Method not allowed
- `500`: Internal server error

---

## Compare Teams

Get detailed comparison for a specific execution.

**Endpoint:** `GET /api/agents/compare`

**Query Parameters:**
- `executionId` (required): Execution ID from execute response

**Response:**
```typescript
{
  success: boolean;
  comparison: {
    winningTeam: 'alpha' | 'omega' | 'tie';
    scores: {
      alpha: number;
      omega: number;
    };
    reasoning: string;
  };
  error?: string;
}
```

**Example Request:**
```bash
curl http://localhost:3000/api/agents/compare?executionId=exec_1234567890_abc
```

**Status Codes:**
- `200`: Success
- `400`: Missing execution ID
- `404`: Execution not found
- `405`: Method not allowed
- `500`: Internal server error

---

## Reset Scores (Admin)

Reset leaderboard scores for specified time period.

**Endpoint:** `POST /api/admin/reset-scores`

**Request Body:**
```typescript
{
  period?: 'daily' | 'monthly' | 'yearly' | 'all';  // Default: 'all'
  confirmCode: string;  // Required: Admin authentication code
}
```

**Response:**
```typescript
{
  success: boolean;
  message: string;
  error?: string;
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/admin/reset-scores \
  -H "Content-Type: application/json" \
  -d '{
    "period": "daily",
    "confirmCode": "admin123"
  }'
```

**Status Codes:**
- `200`: Success
- `400`: Invalid period
- `403`: Invalid admin code
- `405`: Method not allowed
- `500`: Internal server error

---

## Error Handling

All endpoints follow a consistent error response format:

```typescript
{
  success: false;
  error: string;  // Human-readable error message
  // ... other fields specific to endpoint with default/empty values
}
```

Common error scenarios:
- **Invalid Input**: Missing required fields, invalid types
- **Not Found**: Resource doesn't exist (execution ID, etc.)
- **Authentication Failed**: Invalid admin code
- **Server Error**: Internal processing error

---

## Rate Limiting

Currently not implemented. Future versions will include:
- Rate limiting per IP address
- API key-based authentication
- Usage quotas

---

## WebSocket Support

Not currently supported. Future enhancement for real-time competition updates:
- Live team execution progress
- Real-time leaderboard updates
- Streaming agent outputs

---

## Best Practices

1. **Input Validation**: Always sanitize and validate directives before submission
2. **Error Handling**: Implement proper error handling for all API calls
3. **Polling**: Use exponential backoff when polling leaderboard for updates
4. **Caching**: Cache leaderboard data for display (updates every few seconds)
5. **Timeouts**: Set appropriate timeouts (executions can take 5-30 seconds)

---

## Example Integration

```typescript
// Execute directive
async function executeDirective(directive: string) {
  const response = await fetch('/api/agents/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      directive,
      competitionMode: true,
      includeDetails: true
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    console.log('Winner:', result.moderatorJudgment.winningTeam);
    console.log('Praise:', result.moderatorJudgment.praiseMessage);
    return result;
  } else {
    throw new Error(result.error);
  }
}

// Get leaderboard
async function getLeaderboard() {
  const response = await fetch('/api/agents/leaderboard?period=daily');
  const result = await response.json();
  
  if (result.success) {
    return result.leaderboard;
  } else {
    throw new Error(result.error);
  }
}
```
