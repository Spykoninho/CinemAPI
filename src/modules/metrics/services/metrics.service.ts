import { Injectable } from '@nestjs/common';
import {
    Registry,
    collectDefaultMetrics,
    Counter,
    Histogram,
    Gauge,
    register,
} from 'prom-client';

@Injectable()
export class MetricsService {
    private readonly registry: Registry;
    private readonly httpRequestsTotal: Counter<string>;
    private readonly httpRequestDuration: Histogram<string>;
    private readonly httpRequestsInProgress: Gauge<string>;

    constructor() {
        this.registry = register;

        this.registry.clear();

        collectDefaultMetrics({ register: this.registry });

        this.httpRequestsTotal = new Counter({
            name: 'http_requests_total',
            help: 'Total number of HTTP requests',
            labelNames: ['method', 'route', 'status_code'],
        });

        this.httpRequestDuration = new Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in seconds',
            labelNames: ['method', 'route', 'status_code'],
            buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
        });

        this.httpRequestsInProgress = new Gauge({
            name: 'http_requests_in_progress',
            help: 'Number of HTTP requests in progress',
            labelNames: ['method', 'route'],
        });
    }

    async getMetrics(): Promise<string> {
        return this.registry.metrics();
    }

    recordHttpRequest(
        method: string,
        route: string,
        statusCode: number,
        duration: number,
    ): void {
        this.httpRequestsTotal.inc({
            method,
            route,
            status_code: statusCode.toString(),
        });
        this.httpRequestDuration.observe(
            { method, route, status_code: statusCode.toString() },
            duration / 1000,
        );
    }

    trackHttpRequestStarted(method: string, route: string): void {
        this.httpRequestsInProgress.inc({ method, route });
    }

    trackHttpRequestFinished(method: string, route: string): void {
        this.httpRequestsInProgress.dec({ method, route });
    }

    getRegistry(): Registry {
        return this.registry;
    }
}
