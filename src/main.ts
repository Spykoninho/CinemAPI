import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initValidation } from './setup/init-validation';
import { loggerMiddleware } from './middlewares/logger.middleware';
import * as process from 'node:process';

const port = process.env.PORT || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Cinema API')
        .setDescription('The cinema API openapi documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('openapi', app, documentFactory);

    app.use(loggerMiddleware);
    initValidation(app);

    await app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

bootstrap().catch((err) => {
    console.error(err);
});
