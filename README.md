# Hemis_topshiriqlar
moodle dagi hususiyat ya'ni mavjud bo'lgan topshiriqlarni asosiy oynada ko'rsatib turuvchi script.

# zarur
brawseringizga Violentmonkey pluginini o'rnatishingiz kerek va uning kod qismiga kiritilgan kodni tashlashingiz kerek.
bu plugin script manager bo'lib foydalanuvchi tamonidan turlihil scriptlarni bajarilishini taminlab beradi.

so'ngi versiyasida ballarni aniqlash qo'shilgan

![33](https://github.com/adxamjon97/Hemis_topshiriqlar/assets/33910784/a590532f-f4da-4eef-883a-c60a262adc5a)

# video qo'llanma

https://www.youtube.com/watch?v=kqfDIt-hvk4

# code

```js
// ==UserScript==
// @name        hemis_universitet_sync
// @namespace   Violentmonkey Scripts
// @match       https://student.*.uz/
// @grant       none
// @version     2.0
// @author      Adxamjon Nizametdinov
// @description 31.05.2023, 09:59:44
// ==/UserScript==

fetch("https://raw.githubusercontent.com/adxamjon97/Hemis_topshiriqlar/main/script_sync.js")
  .then(r => r.text())
  .then(d => eval(d+"; main()"))
```

```
Dastur versiyasi 0.8.19.1 / Yadro 2.0.41.1 / Sana 30.12.2023 16:55:45 
```

hemisdagi o'zgarishdan sung yangilandi
