import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpFilterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Beyaz liste, belirlenmiş IP adreslerini içerir
    const whitelist = ['127.0.0.1', '192.168.0.1', '10.0.0.1', '192.168.56.1']; // Whitelisted IP addresses
    // Kara liste, belirlenmiş IP adreslerini içerir
    const blacklist = ['203.0.113.1', '203.0.113.2']; // Blacklisted IP addresses

    // İstemci IP adresini al
    const clientIp = (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string;
    console.log(`Client IP Address: ${clientIp}`); // Hata ayıklama için IP adresini yazdır

    if (blacklist.includes(clientIp)) {
      return res.status(403).json({ message: 'Access forbidden: Your IP is blacklisted' });
    }

    if (!whitelist.includes(clientIp)) {
      return res.status(403).json({ message: 'Access forbidden: Your IP is not whitelisted' });
    }

    next();
  }
}