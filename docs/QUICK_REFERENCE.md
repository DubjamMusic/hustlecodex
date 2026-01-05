# Virtual Boardroom - Quick Reference

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  VIRTUAL BOARDROOM SYSTEM                   │
│                 Competitive Multi-Agent AI                  │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐                         ┌──────────────────┐
│   TEAM ALPHA     │                         │   TEAM OMEGA     │
│  (Balanced)      │                         │  (Aggressive)    │
├──────────────────┤                         ├──────────────────┤
│ 1. Cipher        │◄────────┐     ┌────────►│ 1. Quantum       │
│    Data Analyst  │         │     │         │    Data Scientist│
│                  │         │     │         │                  │
│ 2. Specter       │         │     │         │ 2. Shadow        │
│    Risk Assessor │         │     │         │    Risk Analyzer │
│                  │         │     │         │                  │
│ 3. Nexus         │         │     │         │ 3. Apex          │
│    Strategist    │         │     │         │    Optimizer     │
└──────────────────┘         │     │         └──────────────────┘
                             │     │
                        ┌────▼─────▼────┐
                        │   MODERATOR   │
                        │  Judge & Sync │
                        └───────┬───────┘
                                │
                        ┌───────▼───────┐
                        │  LEADERBOARD  │
                        │ Daily/Monthly │
                        │    Yearly     │
                        └───────────────┘
```

## API Endpoints

```
POST   /api/agents/execute       Execute directive with both teams
GET    /api/agents/leaderboard   Get competition standings  
GET    /api/agents/compare       Compare specific execution
POST   /api/admin/reset-scores   Reset leaderboard (admin)
```

## Performance Scoring

```
┌─────────────────────────────────────────┐
│         TEAM PERFORMANCE SCORE          │
├─────────────────────────────────────────┤
│ Quality (40%)      ████████████████████ │
│ Speed (20%)        ██████████           │
│ Collaboration (20%) ██████████          │
│ Innovation (20%)   ██████████           │
└─────────────────────────────────────────┘
```

## Execution Flow

```
1. User submits directive
         ↓
2. Parallel team execution
   • Team Alpha: Cipher → Specter → Nexus
   • Team Omega: Quantum → Shadow → Apex
         ↓
3. Validation against rulesets
         ↓
4. Moderator judgment & synthesis
         ↓
5. Performance recording
         ↓
6. Praise & recognition
         ↓
7. Results returned to user
```

## Configuration Files

```
/config/
  agents/
    team-alpha/              # Team Alpha agent prompts
    team-omega/              # Team Omega agent prompts
  
  rulesets/
    default-rules.yaml       # Basic validation
    strategic-planning.yaml  # Strategy-specific rules
    technical-assessment.yaml # Technical rules
  
  competition/
    scoring-weights.yaml     # Score calculation weights
    praise-templates.yaml    # Recognition messages
```

## Quick Start

```bash
# Install dependencies
npm install

# Start server
npm run dev

# Execute a directive
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{"directive": "Your strategic question here"}'

# Check leaderboard
curl http://localhost:3000/api/agents/leaderboard
```

## Example Response

```json
{
  "success": true,
  "moderatorJudgment": {
    "winningTeam": "omega",
    "praiseMessage": "🏆 Team Omega DOMINATES!",
    "teamAlphaPerformance": {
      "totalScore": 85.2,
      "strengths": ["Strong risk analysis"]
    },
    "teamOmegaPerformance": {
      "totalScore": 91.7,
      "strengths": ["Excellent innovation"]
    },
    "synthesis": "Combined strategic recommendation...",
    "confidence": 87
  }
}
```

## Key Features

✅ Six specialized AI agents
✅ Real-time competitive scoring
✅ Configurable validation rules
✅ Performance tracking & leaderboards
✅ Intelligent synthesis of best ideas
✅ Automated recognition system
✅ RESTful API
✅ Comprehensive documentation

## Tech Stack

- **Runtime**: Node.js + Next.js 15
- **Language**: TypeScript (strict mode)
- **State**: Mock Redis (production-ready interface)
- **Config**: YAML files
- **LLM**: Mock provider (ready for OpenAI/Anthropic)

## Documentation

- 📖 [Architecture](docs/ARCHITECTURE.md)
- 🔧 [API Reference](docs/API.md)
- 🚀 [Deployment](docs/DEPLOYMENT.md)
- 💡 [Usage Guide](docs/USAGE.md)
- 📋 [Implementation Summary](docs/IMPLEMENTATION_SUMMARY.md)

## Project Statistics

| Metric | Count |
|--------|-------|
| TypeScript Files | 23 |
| Config Files | 11 |
| Documentation Files | 5 |
| API Endpoints | 4 |
| Agent Personalities | 6 |
| Validation Rulesets | 3 |
| Lines of Code | ~3,800+ |

## What's Next?

For production deployment:
1. Integrate real LLM provider (OpenAI, Anthropic)
2. Deploy Redis for distributed state
3. Build web UI for visualization
4. Add rate limiting and authentication
5. Set up monitoring and alerting

---

**Status**: ✅ Fully Implemented & Tested
**Build**: ✅ Clean compilation, no errors
**Tests**: ✅ All API endpoints functional
**Docs**: ✅ Comprehensive guides included
