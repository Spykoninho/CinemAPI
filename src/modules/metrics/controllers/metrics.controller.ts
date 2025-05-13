import { Controller, Get, Header, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { MetricsService } from '../services/metrics.service';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) {}

    @Get()
    @ApiOperation({ summary: 'Get Prometheus metrics' })
    @ApiResponse({
        status: 200,
        description: 'Returns metrics in Prometheus format',
    })
    @Header('Content-Type', 'text/plain')
    async getMetrics(@Res() response: Response): Promise<void> {
        const metrics = await this.metricsService.getMetrics();
        response.send(metrics);
    }
}
