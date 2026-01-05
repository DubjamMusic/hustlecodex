# Virtual Boardroom Multi-Agent System

## Overview

The Virtual Boardroom is a competitive multi-agent system featuring two rival teams (Alpha and Omega) that compete to provide the best strategic analysis and recommendations. The system uses AI-powered agents with distinct personalities and expertise areas, coordinated by an impartial moderator who judges performance and synthesizes the best ideas from both teams.

## Architecture

### Teams

#### Team Alpha (Balanced & Strategic)
- **Cipher**: Data analyst and pattern recognizer - methodical, detail-oriented
- **Specter**: Risk assessor and contrarian thinker - cautious, risk-aware  
- **Nexus**: Strategic synthesizer and vision architect - visionary, integrative

#### Team Omega (Aggressive & Innovative)
- **Quantum**: Advanced data scientist and predictive modeler - cutting-edge, data-driven
- **Shadow**: Deep risk analyzer and devil's advocate - paranoid, deeply skeptical
- **Apex**: Strategic orchestrator and optimization specialist - ruthlessly efficient, results-driven

### Core Components

1. **Agents** (`/lib/agents/`)
   - Base agent class with LLM integration
   - Team-specific implementations
   - System prompts loaded from configuration files

2. **Orchestration** (`/lib/orchestration/`)
   - `CycleOrchestrator`: Main coordination loop
   - `Moderator`: Judges team performance and synthesizes results
   - `PerformanceTracker`: Records metrics and maintains leaderboards

3. **Feedback System** (`/lib/feedback/`)
   - `RulesetEngine`: Validates agent outputs against configurable rules
   - `Comparator`: Compares team performance across dimensions

4. **State Management** (`/lib/state/`)
   - `RedisManager`: Mock Redis implementation for state persistence
   - Stores performance history, leaderboards, execution history

5. **LLM Integration** (`/lib/llm/`)
   - `LLMIntegration`: Abstraction layer for LLM providers
   - Currently uses mock responses for demonstration
   - Easily extensible to real LLM providers (OpenAI, Anthropic, etc.)

6. **Telemetry** (`/lib/telemetry/`)
   - `Logger`: Structured logging system
   - `MetricsEmitter`: Performance metrics tracking

### Configuration

All configuration is externalized for easy modification without code changes:

- **Agent Prompts**: `/config/agents/team-{alpha|omega}/{agent}-prompt.md`
- **Rulesets**: `/config/rulesets/{ruleset-name}.yaml`
- **Scoring Weights**: `/config/competition/scoring-weights.yaml`
- **Praise Templates**: `/config/competition/praise-templates.yaml`

## Execution Flow

1. **Directive Intake**: User submits strategic directive via API
2. **Parallel Team Execution**: Both teams process simultaneously
   - Each team executes agents sequentially (Analyst → Risk → Synthesizer)
   - Agents build on previous team member outputs
3. **Validation**: Outputs validated against ruleset (programmatic + LLM checks)
4. **Moderator Judgment**: Compare teams and synthesize results
5. **Performance Recording**: Update metrics and leaderboards
6. **Recognition**: Generate praise message announcing winner

## Performance Metrics

Teams are scored across four dimensions:
- **Quality** (40%): Logical consistency, depth of analysis, confidence
- **Speed** (20%): Response time, processing efficiency
- **Collaboration** (20%): How well agents build on each other's work
- **Innovation** (20%): Creativity, unique insights, novel approaches

## API Endpoints

### POST `/api/agents/execute`
Execute a directive with both teams and get results.

**Request:**
```json
{
  "directive": "Analyze market entry strategy for Product X",
  "rulesetName": "strategic-planning",
  "competitionMode": true,
  "includeDetails": true
}
```

**Response:**
```json
{
  "success": true,
  "executionId": "exec_123456789_abc",
  "moderatorJudgment": {
    "winningTeam": "alpha",
    "synthesis": "...",
    "reasoning": "...",
    "praiseMessage": "🏆 Team Alpha DOMINATES!",
    "confidence": 87,
    "teamAlphaPerformance": { ... },
    "teamOmegaPerformance": { ... }
  },
  "validationReports": { ... },
  "timestamp": 1234567890
}
```

### GET `/api/agents/leaderboard?period=daily`
Get current leaderboard standings.

**Response:**
```json
{
  "success": true,
  "leaderboard": {
    "alpha": {
      "wins": 5,
      "losses": 3,
      "ties": 1,
      "averageScore": 82.5
    },
    "omega": {
      "wins": 3,
      "losses": 5,
      "ties": 1,
      "averageScore": 78.3
    }
  },
  "mvpAgents": []
}
```

### GET `/api/agents/compare?executionId=exec_123`
Get detailed comparison for a specific execution.

### POST `/api/admin/reset-scores`
Reset leaderboard scores (requires admin authentication).

**Request:**
```json
{
  "period": "daily",
  "confirmCode": "admin123"
}
```

## Adding New Rulesets

1. Create a YAML file in `/config/rulesets/`:

```yaml
name: My Custom Rules
description: Custom validation rules for specific use case
rules:
  - id: custom_check
    name: Custom Check Name
    description: What this rule validates
    type: programmatic  # or 'llm'
    severity: error     # or 'warning' or 'info'
    min_chars: 200      # Custom parameters
```

2. Use in API call:
```json
{
  "directive": "...",
  "rulesetName": "my-custom-rules"
}
```

## Customizing Agent Personalities

Edit markdown files in `/config/agents/team-{alpha|omega}/` to modify agent behavior:
- Change personality traits
- Adjust output format requirements
- Modify competitive mindset
- Update role descriptions

Changes take effect immediately without code deployment.

## Tuning Competition Scoring

Edit `/config/competition/scoring-weights.yaml`:

```yaml
quality_weight: 0.40   # 40% of total score
speed_weight: 0.20     # 20% of total score
collaboration_weight: 0.20
innovation_weight: 0.20
```

Weights must sum to 1.0.

## Environment Variables

- `ADMIN_CODE`: Admin password for score reset (default: "admin123")
- `NODE_ENV`: Environment mode (development/production)

## Future Enhancements

- Real LLM integration (OpenAI, Anthropic, custom models)
- Redis/real database integration
- Web UI for visualizing competitions
- Historical trend analysis
- Team composition changes based on performance
- User voting on controversial judgments
- Seasonal tournaments with special challenges

## Security Considerations

- Input sanitization on all directives
- Rate limiting on API endpoints
- Admin authentication for privileged operations
- Content filtering for malicious inputs
- API keys stored in environment variables

## Testing

The system includes comprehensive mock responses for testing without LLM costs:
- Mock LLM provider generates contextual responses
- In-memory state management for fast testing
- All agents respond with personality-appropriate content

To extend with real LLMs, implement `LLMIntegration` class with actual provider SDKs.
