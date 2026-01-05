# HustleCodex V3 - Virtual Boardroom

A competitive multi-agent AI system featuring two rival teams (Alpha and Omega) that compete to provide superior strategic analysis and recommendations.

## Features

- **Dual Competing Teams**: Team Alpha (balanced & strategic) vs Team Omega (aggressive & innovative)
- **Six Specialized AI Agents**: Each with unique personalities and expertise
- **Real-time Performance Tracking**: Comprehensive leaderboards and metrics
- **Intelligent Moderation**: AI moderator judges and synthesizes team outputs
- **Configurable Rules**: Externalized prompts, rulesets, and scoring weights
- **Competition Framework**: Automatic praise, recognition, and performance tracking

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Execute a directive
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{"directive": "Analyze market entry strategy for Product X"}'

# View leaderboard
curl http://localhost:3000/api/agents/leaderboard
```

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Team Profiles

### Team Alpha: Balanced & Strategic
- **Cipher**: Methodical data analyst, pattern recognizer
- **Specter**: Cautious risk assessor, contrarian thinker
- **Nexus**: Visionary strategist, integration expert

### Team Omega: Aggressive & Innovative
- **Quantum**: Cutting-edge data scientist, predictive modeler
- **Shadow**: Paranoid risk analyzer, devil's advocate
- **Apex**: Ruthless optimizer, results-driven orchestrator

## Project Structure

```
/config/
  /agents/          # Agent system prompts
  /rulesets/        # Validation rules
  /competition/     # Scoring and praise configs
/lib/
  /agents/          # Agent implementations
  /orchestration/   # Coordination logic
  /feedback/        # Validation and comparison
  /llm/            # LLM integration layer
  /state/          # State management
  /telemetry/      # Logging and metrics
/pages/api/
  /agents/         # Main API endpoints
  /admin/          # Admin endpoints
/types/            # TypeScript definitions
/docs/             # Documentation
```

## API Endpoints

- `POST /api/agents/execute` - Execute directive with both teams
- `GET /api/agents/leaderboard` - Get competition standings
- `GET /api/agents/compare` - Compare specific execution
- `POST /api/admin/reset-scores` - Reset leaderboard (admin only)

## Configuration

All agent behaviors, validation rules, and competition parameters are externalized in `/config/` for easy customization without code changes.

## License

MIT

## Contributing

Contributions welcome! Please read the architecture documentation before submitting PRs.

