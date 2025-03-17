  GNU nano 4.8                       /etc/nginx/sites-available/app.fouladyargroup.com
server {
    listen 80;
    listen 443 ssl;
    server_name app.fouladyargroup.com ;


    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/app.fouladyargroup.com/app.fouladyargroup.com-cert.pem;
    ssl_certificate_key /etc/nginx/ssl/app.fouladyargroup.com/private.key;
    ssl_trusted_certificate /etc/nginx/ssl/app.fouladyargroup.com/ca_bundle.crt;

    # SSL options (adjust as necessary)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers "ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384";

    # Forward requests to the Next.js app running on a specific port
    location / {
        proxy_pass http://localhost:3002; # Adjust this port to where your app runs
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name app.fouladyargroup.com;
    return 301 https://$host$request_uri; # Redirect HTTP to HTTPS
}

