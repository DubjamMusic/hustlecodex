export interface MetricData {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  tags?: Record<string, string>;
}

export class MetricsEmitter {
  private static instance: MetricsEmitter;
  private metrics: MetricData[] = [];
  private maxMetrics: number = 5000;

  private constructor() {}

  static getInstance(): MetricsEmitter {
    if (!MetricsEmitter.instance) {
      MetricsEmitter.instance = new MetricsEmitter();
    }
    return MetricsEmitter.instance;
  }

  emit(name: string, value: number, unit: string = 'count', tags?: Record<string, string>): void {
    const metric: MetricData = {
      name,
      value,
      unit,
      timestamp: Date.now(),
      tags
    };

    this.metrics.push(metric);

    // Trim metrics if too many
    if (this.metrics.length > this.maxMetrics) {
      this.metrics.shift();
    }

    // Log in development
    if (process.env.NODE_ENV !== 'production') {
      const tagsStr = tags ? ` (${JSON.stringify(tags)})` : '';
      console.log(`[METRIC] ${name}: ${value} ${unit}${tagsStr}`);
    }
  }

  getMetrics(name?: string, limit: number = 100): MetricData[] {
    let filteredMetrics = this.metrics;
    
    if (name) {
      filteredMetrics = this.metrics.filter(m => m.name === name);
    }

    return filteredMetrics.slice(-limit);
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  // Helper methods for common metrics
  recordExecutionTime(operation: string, timeMs: number, tags?: Record<string, string>): void {
    this.emit(`execution_time.${operation}`, timeMs, 'ms', tags);
  }

  recordAPICall(provider: string, cost: number, tokens: number): void {
    this.emit('api_call', 1, 'count', { provider });
    this.emit('api_cost', cost, 'usd', { provider });
    this.emit('api_tokens', tokens, 'tokens', { provider });
  }

  recordWin(team: string): void {
    this.emit('team_win', 1, 'count', { team });
  }

  recordScore(team: string, score: number): void {
    this.emit('team_score', score, 'points', { team });
  }
}

export const metricsEmitter = MetricsEmitter.getInstance();
