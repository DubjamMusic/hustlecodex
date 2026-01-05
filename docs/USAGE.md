# Usage Examples

## Basic Usage

### 1. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 2. Execute a Simple Directive

```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Analyze market entry strategy for electric vehicles in Southeast Asia"
  }'
```

### 3. Get Current Leaderboard

```bash
curl http://localhost:3000/api/agents/leaderboard
```

## Advanced Usage

### Execute with Specific Ruleset

Use the `strategic-planning` ruleset for strategic directives:

```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Develop a 5-year growth strategy for a B2B SaaS platform",
    "rulesetName": "strategic-planning",
    "includeDetails": true
  }'
```

Use the `technical-assessment` ruleset for technical directives:

```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Evaluate technical feasibility of implementing blockchain in supply chain",
    "rulesetName": "technical-assessment"
  }'
```

### Get Detailed Results

Include full agent outputs:

```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Your directive here",
    "includeDetails": true
  }'
```

This will include `alphaOutputs` and `omegaOutputs` arrays with all agent responses.

### Compare Specific Execution

```bash
# First, execute and save the execution ID
EXEC_ID=$(curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{"directive": "Test directive"}' | jq -r '.executionId')

# Then compare
curl "http://localhost:3000/api/agents/compare?executionId=$EXEC_ID"
```

### View Different Time Periods

Daily leaderboard:
```bash
curl "http://localhost:3000/api/agents/leaderboard?period=daily"
```

Monthly leaderboard:
```bash
curl "http://localhost:3000/api/agents/leaderboard?period=monthly"
```

Yearly leaderboard:
```bash
curl "http://localhost:3000/api/agents/leaderboard?period=yearly"
```

## JavaScript/TypeScript Integration

### Using Fetch API

```typescript
async function executeDirective(directive: string) {
  const response = await fetch('http://localhost:3000/api/agents/execute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      directive,
      competitionMode: true,
      includeDetails: false
    })
  });

  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return result;
}

// Usage
const result = await executeDirective(
  'Analyze competitive advantages in the AI market'
);

console.log('Winner:', result.moderatorJudgment.winningTeam);
console.log('Praise:', result.moderatorJudgment.praiseMessage);
console.log('Synthesis:', result.moderatorJudgment.synthesis);
```

### Getting Leaderboard

```typescript
async function getLeaderboard(period: 'daily' | 'monthly' | 'yearly' = 'daily') {
  const response = await fetch(
    `http://localhost:3000/api/agents/leaderboard?period=${period}`
  );
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.error);
  }

  return result.leaderboard;
}

// Usage
const leaderboard = await getLeaderboard('daily');
console.log('Team Alpha:', leaderboard.alpha);
console.log('Team Omega:', leaderboard.omega);
```

## Python Integration

```python
import requests
import json

# Execute directive
def execute_directive(directive, ruleset='default-rules'):
    response = requests.post(
        'http://localhost:3000/api/agents/execute',
        json={
            'directive': directive,
            'rulesetName': ruleset,
            'competitionMode': True
        }
    )
    return response.json()

# Get leaderboard
def get_leaderboard(period='daily'):
    response = requests.get(
        f'http://localhost:3000/api/agents/leaderboard?period={period}'
    )
    return response.json()

# Usage
result = execute_directive(
    'Develop a market penetration strategy for renewable energy'
)

if result['success']:
    print(f"Winner: Team {result['moderatorJudgment']['winningTeam']}")
    print(f"Alpha Score: {result['moderatorJudgment']['teamAlphaPerformance']['totalScore']:.2f}")
    print(f"Omega Score: {result['moderatorJudgment']['teamOmegaPerformance']['totalScore']:.2f}")
    print(f"\n{result['moderatorJudgment']['praiseMessage']}")
```

## Example Directives

### Strategic Planning
- "Develop a 3-year expansion strategy for entering the Asian market"
- "Analyze competitive positioning for a new fintech startup"
- "Create a risk mitigation plan for supply chain disruptions"
- "Design a customer acquisition strategy for B2B enterprise software"

### Technical Assessment
- "Evaluate the feasibility of implementing microservices architecture"
- "Assess technical debt and recommend refactoring priorities"
- "Analyze cloud migration strategy and cost implications"
- "Review security architecture and identify vulnerabilities"

### Market Analysis
- "Analyze market trends in artificial intelligence for healthcare"
- "Evaluate competitive landscape for electric vehicle manufacturers"
- "Assess market opportunity for sustainable packaging solutions"
- "Identify growth opportunities in the remote work software market"

### Product Strategy
- "Define product roadmap priorities for next 12 months"
- "Analyze feature requests and prioritize development"
- "Develop pricing strategy for new product tiers"
- "Create go-to-market strategy for product launch"

## Interpreting Results

### Team Performance Scores

Each team is scored across four dimensions:
- **Quality Score (40%)**: Depth of analysis, logical consistency, confidence
- **Speed Score (20%)**: Response time and efficiency
- **Collaboration Score (20%)**: How well agents build on each other
- **Innovation Score (20%)**: Creativity and unique insights

### Winning Team

The `winningTeam` field indicates:
- `"alpha"`: Team Alpha won
- `"omega"`: Team Omega won
- `"tie"`: Scores were within 2 points (very close)

### Moderator Synthesis

The `synthesis` field contains the moderator's integrated analysis combining the best insights from both teams. This is the recommended strategic direction.

### Validation Reports

Each agent's output is validated against the ruleset. Check the `validationReports` for:
- Which rules passed/failed
- Severity levels (error, warning, info)
- Suggestions for improvement

## Admin Operations

### Reset Leaderboard

```bash
curl -X POST http://localhost:3000/api/admin/reset-scores \
  -H "Content-Type: application/json" \
  -d '{
    "period": "daily",
    "confirmCode": "admin123"
  }'
```

⚠️ **Security Note**: Change the `ADMIN_CODE` environment variable in production!

## Customization

### Modify Agent Personalities

Edit files in `/config/agents/team-{alpha|omega}/`:
- `cipher-prompt.md` / `quantum-prompt.md`: Data analysts
- `specter-prompt.md` / `shadow-prompt.md`: Risk assessors
- `nexus-prompt.md` / `apex-prompt.md`: Strategic synthesizers

Changes take effect immediately without restart.

### Create Custom Rulesets

Create a new YAML file in `/config/rulesets/`:

```yaml
name: My Custom Rules
description: Custom validation rules
rules:
  - id: custom_check
    name: Custom Check
    description: Your validation rule
    type: programmatic
    severity: error
```

Then use it:
```bash
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{
    "directive": "Your directive",
    "rulesetName": "my-custom-rules"
  }'
```

### Adjust Scoring Weights

Edit `/config/competition/scoring-weights.yaml`:

```yaml
quality_weight: 0.50    # Increase quality importance
speed_weight: 0.15      # Decrease speed importance
collaboration_weight: 0.20
innovation_weight: 0.15
```

## Troubleshooting

### Server Not Starting
```bash
# Check if port 3000 is in use
lsof -i :3000

# Kill process if needed
kill -9 <PID>

# Start server
npm run dev
```

### API Returning 500 Errors
- Check server logs: `tail -f .next/server.log`
- Verify config files exist in `/config/`
- Ensure dependencies are installed: `npm install`

### Slow Responses
- Currently using mock LLM responses (fast)
- Real LLM integration will be slower
- Consider implementing caching for repeated directives

## Next Steps

1. Integrate real LLM provider (OpenAI, Anthropic)
2. Add Redis for production state management
3. Build web UI for visualizing competitions
4. Implement real-time WebSocket updates
5. Add more comprehensive test coverage

See [ARCHITECTURE.md](ARCHITECTURE.md) and [DEPLOYMENT.md](DEPLOYMENT.md) for more information.
