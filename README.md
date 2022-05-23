# Hemis_topshiriqlar
moodle dagi hususiyat ya'ni mavjud bo'lgan topshiriqlarni asosiy oynada ko'rsatib turuvchi script.

# zarur
brawseringizga Violentmonkey pluginini o'rnatishingiz kerek va uning kod qismiga kiritilgan kodni tashlashingiz kerek.
bu plugin script manager bo'lib foydalanuvchi tamonidan turlihil scriptlarni bajarilishini taminlab beradi.

![photo_2022-05-23_18-50-35](https://user-images.githubusercontent.com/33910784/169835283-4b1f384a-83ca-435b-8633-dd71e3647429.jpg)

# video qo'llanma

https://www.youtube.com/watch?v=kqfDIt-hvk4

# code
kodni faylda hamda shu yerda qistirib o'taman

``` js
// ==UserScript==
// @name hemis_universitet
// @namespace AceScript Scripts
// @match https://student.jbnuu.uz/*
// @grant none
// ==/UserScript==

// author: Adxamjon Nizametdinov
// email: adxamjon97@umail.uz
// tg: @Great_Master0

var myCounter = 0

function myOpen(obj){
  function surov(url){    
    let result=0
    
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      let doc = new DOMParser().parseFromString(html, "text/html")
      
      let cont = doc.body.querySelector('#attendance-grid').children[1].children
  
      //console.log(cont)
      let cc=0
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
                let check = sub_list[j+1].children[0]
                
                if(sana.className=="bg-green" && !check.className.includes("fa-check")) {
                  let fan = sub_list[j+1].querySelector('.timeline-body').innerText.split('\n')[1]
                  //console.log(sub_list[j+1].querySelector('.timeline-body').innerText.split('\n')[1])
                  let nomi = sub_list[j+1].querySelector('.timeline-body').children[0].innerText
                  let href = sub_list[j+1].querySelector('.text-right').children[0].href

                  //let ful_info = sana.innerText + ' ' + fan + ' ' + nomi
                  //ful_info=ful_info.split('\n').join(' ')
                  //console.log(ful_info)
                  
                  //let a = document.createElement('a')
                  
                  //a.href = href
                  //a.innerText = ful_info

                  //let br = document.createElement('br')
                  
                  //console.log(a)
                  //obj.appendChild(a)
                  //obj.appendChild(br)
                  
                  let tr = document.createElement('tr')
                  tr.innerHTML = `<td>`+(myCounter++)+`</td><td>`+sana.innerText+`</td><td>`+fan+`</td><td><a href="`+href+`">`+nomi+`</a></td>`
                  obj.appendChild(tr)
                  /*<!-- 
                   * <tr>
                      <td>1</td>
                      <td>31.03.2013 06:12</td>
                      <td>gold</td>
                      <td>A</td>
                    </tr> 
                  -->
                  */
                  
                  //mySortFunc(document.querySelector("#my-date1"))
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
            <table id="my-table" border="1">
            <thead >
              <tr>
                <th data-key="id" data-column="0" data-order="asc"><p align="center">id</p></th>
                <th id="my-date1" data-key="date" data-column="1" data-order="asc">
                  <p align="center">date</p>
                </th>
                <th data-key="fan" data-column="2" data-order="asc"><p align="center">fan</p></th>
                <th data-key="modul" data-column="3" data-order="asc"><p align="center">topshiriq</p></th>
              </tr>
            </thead>
            <tbody id="my-tbody">
              <!-- satirlar shu yerdan qo'shiladi -->
              <!-- <tr>
                <td>1</td>
                <td>31.03.2013 06:12</td>
                <td>gold</td>
                <td>A</td>
              </tr> -->
            </table>
          </div>
        </div>
      </div>

<!--       <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
    `
    myJq()
    
    let myHtml = new DOMParser().parseFromString(html, "text/html")
  
    let mydiv = myHtml.querySelector('div')

    cont.appendChild(mydiv)
    
    myOpen(document.querySelector('#my-tbody'))
  }
}

function myJq(){
  console.log('saralash qisim yuklandi')
  function getDate(str) {
    var ar = /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/.exec(str);

    return new Date(
      +ar[3],
      +ar[2] - 1, // Careful, month starts at 0!
      +ar[1],
      +ar[4],
      +ar[5]
    );
  }

  $(function () {
    var sorter = {
      order: [1, -1],
      column: 0,
      key: "id",

      setOrder: function (k) {
        this.order =
          {
            asc: [1, -1],
            desc: [-1, 1]
          }[k] || this.order;

        return this;
      },
      setColumn: function (c) {
        this.column = c || this.column;
        return this;
      },

      setKey: function (k) {
        this.key = k || this.key;
        return this;
      },

      sort: function (els) {
        var sortFunc = this.key;
        return els.sort(this[sortFunc]);
      },

      getValue: function (a, b) {
        return {
          a: $(a)
            .find("td:eq(" + sorter.column + ")")
            .text(),
          b: $(b)
            .find("td:eq(" + sorter.column + ")")
            .text()
        };
      },
      comp: function (val) {
        if (val.a == val.b) return 0;

        return val.a > val.b ? sorter.order[0] : sorter.order[1];
      },
      id: function (a, b) {
        var val = sorter.getValue(a, b);

        val.a = parseInt(val.a, 10);
        val.b = parseInt(val.b, 10);

        return sorter.comp(val);
      },

      fan: function (a, b) {
        var val = sorter.getValue(a, b);
        return sorter.comp(val);
      },
      modul: function (a, b) {
        var val = sorter.getValue(a, b);
        return sorter.comp(val);
      },
      date: function (a, b) {
        var val = sorter.getValue(a, b);

        val.a = getDate(val.a);
        val.b = getDate(val.b);

        return sorter.comp(val);
      }
    };
    
    function mySortFunc(elem) {
      console.log(elem);
      var sorted = sorter
        .setOrder($(elem).attr("data-order"))
        .setColumn($(elem).attr("data-column"))
        .setKey($(elem).attr("data-key"))
        .sort($("table#my-table tbody tr"));

      $("table#my-table tbody").empty().append(sorted);
      $("table#my-table thead th").not(elem).attr("data-order", "asc");

      $(elem).attr(
        "data-order",
        $(elem).attr("data-order") == "asc" ? "desc" : "asc"
      );
    }

    $("table#my-table thead").on("click", "th", function () {
      mySortFunc(this);
    });

    setTimeout(()=>{
      mySortFunc(document.querySelector("#my-date1"));
    },4000)
    //alert();
  });
}



window.onload = ()=>{
  console.log('boshlandi')
  
  view()
  
  console.log('tayyor')
}



```
