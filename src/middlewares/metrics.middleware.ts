import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../modules/metrics/services/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
    constructor(private readonly metricsService: MetricsService) {}

    use(req: Request, res: Response, next: NextFunction) {
        if (req.path === '/metrics') {
            return next();
        }

        const startTime = Date.now();
        const method = req.method;
        const route = this.normalizeRoute(req.originalUrl);

        this.metricsService.trackHttpRequestStarted(method, route);

        res.on('finish', () => {
            const statusCode = res.statusCode;
            const duration = Date.now() - startTime;

            this.metricsService.recordHttpRequest(
                method,
                route,
                statusCode,
                duration,
            );

            this.metricsService.trackHttpRequestFinished(method, route);
        });

        next();
    }

    private normalizeRoute(url: string): string {
        const routePath = url.split('?')[0];

        return routePath.replace(/\/\d+/g, '/:id');
    }
}
