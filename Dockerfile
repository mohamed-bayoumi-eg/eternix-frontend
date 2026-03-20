# Stage 1: Build
FROM node:20.20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# حذف الإعدادات الافتراضية لـ Nginx أولاً
RUN rm /etc/nginx/conf.d/default.conf

# نسخ ملفات الأنجيولار (المسار المعتمد لـ Angular 21)
COPY --from=build /app/dist/eternix-frontend/browser /usr/share/nginx/html

# نسخ إعدادات Nginx الخاصة بك
COPY nginx.conf /etc/nginx/conf.d/default.conf

# التأكد من الصلاحيات
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]