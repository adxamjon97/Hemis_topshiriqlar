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