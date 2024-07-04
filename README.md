

#راه اندازی ssl
قبل از هر کاری از پنل ec2 اقدام به باز کردن https و پورت 443 کنید.




سپس دستور زیر را در سرور اجرا کنید. دقت کنید که پورت ۸۰ باز باشد. 
برای بررسی باز بودن پورت ۸۰ از دستور زیر استفاده میکنیم.

```
sudo lsof -i :80

```
عدد آیدی مورد نظر را برداشته و با دستور زیر kill میکنیمن
```
sudo kill -9 <PID>
```

حالا اول کامندلاین certbot رو با دستور زیر نصب میکنیم
```
sudo apt install certbot
```

```agsl
sudo certbot certonly --standalone -d pro.cliconsult.fr
```


سپس در صورتی که کلید های زیر ساخته شده باشند کار ایجاد ssl تمام شده است
/etc/letsencrypt/live/cliconsult.fr/cert.pem
/etc/letsencrypt/live/cliconsult.fr/privkey.pem

حالا تنها کاری که باید انجام بدیم یک فایل کافنیگ pm2 مشابه زیر ایجاد کنیم و فقط دستوری pm2 start app.config.json را اجرا کنیم. 
```agsl

{
  "apps" : [
    {
      "name"      : "cliconsult-pro-ssl",
      "script"    : "npx",
      "interpreter": "none",
      "args": "sudo serve --ssl-cert /etc/letsencrypt/live/cliconsult.fr/cert.pem --ssl-key /etc/letsencrypt/live/cliconsult.fr/privkey.pem -s dist -l 443 --no-clipboard"

    }
  ]
}

```



# نصب پروژه 
```agsl
bash <(curl -Ls https://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@raw.githubusercontent.com/arianabdi/asoo-dashboard/main/scripts/installation.sh --ipv4)
```


# روش استفاده از کامپوننت Form اختصاصی
برای استفاده از این کامپوننت نیاز به یک آرایه به شکل زیر داریم. دقت کنید شما میتونید در هر سطر تا ۴ فیلد را جا بدین. اینجوری برای موبایل هم فرم بهم نمیریزه 
```
[
    [
        {
            title: "فیلد ۱",
            ...
        },
        {
            title: "فیلد ۲",
            ...
        },
    ],
    [
        {
            title: "فیلد ۳",
            ...
        },
    ]
]
```







# تغییر تم 
برای تغییر تم، متغییر های درون فایل زیر را تغییر دهید

```agsl
E:\Desktop\Projects\arian\fouladyar\fouladyar-dashboard\src\layout\provider\Theme.js
```




# روش Build گرفتن از پروژه 
```agsl
npm run build
```

سپس دستور زیر را وارد کنید
```agsl
serve build
```
