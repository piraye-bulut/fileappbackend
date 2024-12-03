import rateLimit from 'express-rate-limit';

// Rate limiter middleware, uygulama başlatıldığında oluşturulur.
// Girişleri rateLimit middleware ile sınırlıyor
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika içinde
  max: 100, // her IP adresi için 100 istek
  message: 'Too many requests from this IP, please try again after a minute.',
});