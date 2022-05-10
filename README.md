# Hemis_topshiriqlar
moodle dagi hususiyat ya'ni mavjud bo'lgan topshiriqlarni asosiy oynada ko'rsatib turuvchi script.

# zarur
brawseringizga Violentmonkey pluginini o'rnatishingiz kerek va uning kod qismiga kiritilgan kodni tashlashingiz kerek.
bu plugin script manager bo'lib foydalanuvchi tamonidan turlihil scriptlarni bajarilishini taminlab beradi.

![image](https://user-images.githubusercontent.com/33910784/167647160-2f62e83e-aa06-4ff4-8a80-ff789edbcb40.png)

# code
kodni faylda hamda shu yerda qistirib o'taman

``` js
// ==UserScript==
// @name hemis_universitet
// @namespace AceScript Scripts
// @match https://student.jbnuu.uz/*
// @grant none
// ==/UserScript==



function myOpen(obj){
  function surov(url){    
    let result=0
    
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      let doc = new DOMParser().parseFromString(html, "text/html")
      
      let cont = doc.body.querySelector('#attendance-grid').children[1].children
  
      //console.log(cont)
      
      for(let i of cont){
        let sub_url = i.querySelector('.nav').children[1].children[0].href
        
        //console.log(sub_url)
        
        
        fetch(sub_url).then(function (response) {
            return response.text();
        }).then(function (html) {
            
            let sub_doc = new DOMParser().parseFromString(html, "text/html")
            //console.log(sub_doc)
            let sub_cont = sub_doc.body.querySelector('#attendance-grid').children[1]
            //console.log(sub_cont.querySelector('.col-md-8').children[0].querySelectorAll('.panel'))
            let list = sub_cont.querySelector('.col-md-8').children[0].querySelectorAll('.panel')
            //console.log(list)
          
            for(let i of list){
              let sub_list = i.querySelector('.timeline').children
              
              //console.log(sub_list)
              
              for(let j=0; j<sub_list.length-1; j+=2){
                let sana = sub_list[j].children[0]
                
                if(sana.className=="bg-green") {
                  let fan = sub_list[j+1].querySelector('.timeline-body').innerText.split('\n')[1]
                  //console.log(sub_list[j+1].querySelector('.timeline-body').innerText.split('\n')[1])
                  let nomi = sub_list[j+1].querySelector('.timeline-body').children[0].innerText
                  let href = sub_list[j+1].querySelector('.text-right').children[0].href

                  let ful_info = sana.innerText + ' ' + fan + ' ' + nomi
                  ful_info=ful_info.split('\n').join(' ')
                  console.log(ful_info)
                  
                  let a = document.createElement('a')
                  
                  a.href = href
                  a.innerText = ful_info

                  let br = document.createElement('br')
                  
                  //console.log(a)
                  obj.appendChild(a)
                  obj.appendChild(br)
                }
              }
            }
            
        }).catch(function (err) {
          console.warn('Something went wrong.', err);
        })
      }            
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    })
  }

  let url = 'https://student.jbnuu.uz/education/subjects'
  
  
  surov(url)
}

function view(){
  if('https://student.jbnuu.uz/'==document.URL){
    console.log('ishladi')
    
    let cont = document.querySelector('#attendance-grid').children[1].querySelector('.col-md-12').querySelector('.row').querySelector('.col-md-5')
    
    let html = `
      <div class="box box-widget">
        <div class="box-header with-border">
          <h3 class="box-title">Topshiriqlar</h3>
        </div>

        <div class="box-footer box-comments">
          <div class="box-comment" id="Eslatma">
          </div>
        </div>
      </div>
    `

    let myHtml = new DOMParser().parseFromString(html, "text/html")
  
    let mydiv = myHtml.querySelector('div')

    cont.appendChild(mydiv)
    
    myOpen(document.querySelector('#Eslatma'))
  }
}


window.onload = ()=>{
  console.log('boshlandi')
  
  view()
  
  console.log('tayyor')
}
```
