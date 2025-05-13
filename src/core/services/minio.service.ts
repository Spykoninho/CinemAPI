import { Injectable, Logger } from '@nestjs/common';
import { MinioService as NestMinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioService {
    private readonly bucketName: string;
    private readonly logger = new Logger(MinioService.name);

    constructor(private readonly minio: NestMinioService) {
        this.bucketName = process.env.MINIO_BUCKET_NAME || 'cinemapi';
    }

    private sanitizeFileName(fileName: string): string {
        return fileName
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-_.]/g, '')
            .toLowerCase();
    }

    async uploadFile(
        file: Express.Multer.File,
        roomId: number,
    ): Promise<[string, string]> {
        try {
            const sanitizedName = this.sanitizeFileName(file.originalname);
            const fileName = `${roomId}/${Date.now()}-${sanitizedName}`;
            
            this.logger.debug(`Uploading file ${fileName} to bucket ${this.bucketName}`);
            
            await this.minio.client.putObject(
                this.bucketName,
                fileName,
                file.buffer,
                file.size,
                { 'Content-Type': file.mimetype },
            );

            const url = await this.getPublicUrlByFilename(fileName);
            return [url, fileName];
        } catch (error) {
            this.logger.error(`Error uploading file: ${error.message}`, error.stack);
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async getPublicUrlByFilename(filename: string): Promise<string> {
        try {
            return await this.minio.client.presignedGetObject(
                this.bucketName,
                filename,
                60 * 60,
            );
        } catch (error) {
            this.logger.error(`Error getting public URL: ${error.message}`, error.stack);
            throw new Error(`Failed to get public URL: ${error.message}`);
        }
    }

    async deleteFile(url: string): Promise<void> {
        try {
            const filePath = url.split('/').slice(-2).join('/');
            await this.minio.client.removeObject(this.bucketName, filePath);
        } catch (error) {
            this.logger.error(`Error deleting file: ${error.message}`, error.stack);
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }
}
