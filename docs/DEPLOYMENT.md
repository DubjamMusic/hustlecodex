# Deployment Guide - Virtual Boardroom

## Prerequisites

- Node.js 18+ and npm
- Redis (optional, mock implementation included)
- Environment variables configured

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/DubjamMusic/hustlecodex.git
cd hustlecodex
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Create a `.env.local` file:
```env
# Admin authentication
ADMIN_CODE=your-secure-admin-code

# Environment
NODE_ENV=development

# Optional: LLM Provider Keys (when implementing real LLM integration)
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=...
```

4. **Verify configuration:**

Check that all config files are present:
- `/config/agents/team-alpha/*.md`
- `/config/agents/team-omega/*.md`
- `/config/rulesets/*.yaml`
- `/config/competition/*.yaml`

## Development

**Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

**Test the API:**
```bash
# Execute a directive
curl -X POST http://localhost:3000/api/agents/execute \
  -H "Content-Type: application/json" \
  -d '{"directive": "Analyze market opportunity for AI productivity tools"}'

# Get leaderboard
curl http://localhost:3000/api/agents/leaderboard
```

## Building for Production

1. **Build the application:**
```bash
npm run build
```

2. **Start production server:**
```bash
npm start
```

The production server runs on port 3000 by default.

## Production Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Configure environment variables in Vercel dashboard:**
   - `ADMIN_CODE`
   - Any LLM provider API keys

### Docker

1. **Create Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build and run:**
```bash
docker build -t virtual-boardroom .
docker run -p 3000:3000 -e ADMIN_CODE=secure123 virtual-boardroom
```

### Traditional Server

1. **Install Node.js on server**

2. **Clone and build:**
```bash
git clone https://github.com/DubjamMusic/hustlecodex.git
cd hustlecodex
npm install
npm run build
```

3. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start npm --name "virtual-boardroom" -- start
pm2 save
pm2 startup
```

4. **Configure reverse proxy (Nginx):**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Redis Setup (Optional)

The system includes a mock Redis implementation for testing. For production with real Redis:

1. **Install Redis:**
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis
```

2. **Update `lib/state/redis-manager.ts`:**

Replace the mock implementation with real ioredis:
```typescript
import Redis from 'ioredis';

export function getRedisInstance(): Redis {
  if (!redisInstance) {
    redisInstance = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD
    });
  }
  return redisInstance;
}
```

3. **Add Redis environment variables:**
```env
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-password
```

## LLM Provider Integration

The system currently uses mock responses. To integrate real LLM providers:

### OpenAI

1. **Install SDK:**
```bash
npm install openai
```

2. **Update `lib/llm/integration-layer.ts`:**
```typescript
import OpenAI from 'openai';

export class LLMIntegration {
  private openai: OpenAI;
  
  constructor(config: LLMConfig) {
    if (config.provider === 'openai') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }
  
  async generateCompletion(messages: LLMMessage[]): Promise<LLMResponse> {
    const response = await this.openai.chat.completions.create({
      model: this.config.model || 'gpt-4',
      messages: messages,
      temperature: this.config.temperature || 0.7,
      max_tokens: this.config.maxTokens || 2000
    });
    
    // Parse and return response
  }
}
```

## Monitoring

### Logs

Development logs are written to console. For production:

```typescript
// Access via API (add endpoint)
GET /api/admin/logs?level=ERROR&limit=100
```

### Metrics

```typescript
// Access via API (add endpoint)
GET /api/admin/metrics?name=team_win&limit=100
```

### Health Check

```typescript
// Add health check endpoint
GET /api/health
```

## Troubleshooting

### Build Errors

**Issue:** TypeScript compilation errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Issue:** Missing dependencies
```bash
npm install js-yaml ioredis
npm install --save-dev @types/js-yaml
```

### Runtime Errors

**Issue:** Config files not loading
- Verify files exist in `/config/` directories
- Check file permissions
- Review logs for file path errors

**Issue:** API endpoints returning 404
- Ensure `/pages/api/` structure is correct
- Verify Next.js routing
- Check build output

### Performance Issues

**Issue:** Slow API responses
- Review LLM provider latency
- Implement caching for repeated directives
- Optimize validation rules

## Scaling Considerations

### Horizontal Scaling

- Deploy multiple instances behind load balancer
- Use shared Redis for state synchronization
- Implement session affinity if needed

### Database

- Replace mock Redis with production Redis cluster
- Consider PostgreSQL for long-term history storage
- Implement data archival strategy

### Caching

- Cache common directives and responses
- Cache leaderboard data (refresh every 30s)
- Use CDN for static assets

## Security Checklist

- [ ] Change default `ADMIN_CODE`
- [ ] Enable HTTPS/SSL
- [ ] Implement rate limiting
- [ ] Add input sanitization
- [ ] Set up CORS policies
- [ ] Use environment variables for secrets
- [ ] Regular security audits
- [ ] Update dependencies regularly

## Backup and Recovery

### Data Backup

```bash
# Redis backup (if using real Redis)
redis-cli SAVE
cp /var/lib/redis/dump.rdb /backup/

# Config backup
tar -czf config-backup.tar.gz config/
```

### Disaster Recovery

1. Restore Redis data
2. Restore configuration files
3. Redeploy application
4. Verify functionality

## Support

For issues and questions:
- GitHub Issues: https://github.com/DubjamMusic/hustlecodex/issues
- Documentation: `/docs/`
