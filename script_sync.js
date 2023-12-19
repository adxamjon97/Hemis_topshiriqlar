// author: Adxamjon Nizametdinov
// email: adxamjon97@umail.uz
// tg: @Great_Master0


console.log('hello')


function prep(){
  if('https://student.jbnuu.uz/'==document.URL){
    console.log('ishladi')

    $('#attendance-grid > :nth-child(2) .col').prepend(`
      <div class="box box-default">
        <div class="box-header bg-gray">
          <h3 class="box-title">Script manager</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-box-tool" data-widget="collapse">
              <i class="fa fa-minus"></i>
            </button>
          </div>
        </div>
        <div id="forscript" class="box-body homelinks">
          <div></div>
          <h6>
            Takliflar uchun muharir Telegrami:
            <a href="https://t.me/Great_Master0" target="_blank">
              Adxamjon Nizametdinov
            </a>
          </h6>
        </div>
      </div>
    `)
  }
}


var myCounter = 0

// yopladigan fanlar parseri
function myOpen(obj){
  function surov(url){
    let result=0

    // fanlarni ichiga kirish
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      let doc = new DOMParser().parseFromString(html, "text/html")
      let cont = doc.querySelectorAll('body #attendance-grid > :nth-child(2) > *')

      let cc=0
      for(let i of cont){
        let sub_url = i.querySelector('.nav > :nth-child(2) > :first-child').href

        // topshiriqlar ichiga kirish
        fetch(sub_url).then(function (response) {
            return response.text();
        }).then(function (html) {
            let sub_doc = new DOMParser().parseFromString(html, "text/html")
            let sub_cont = sub_doc.body.querySelector('#attendance-grid').children[1]

            let list = sub_cont.querySelector('.col-md-8').children[0].querySelectorAll('.panel')

            for(let i of list){
              let sub_list = i.querySelector('.timeline').children

              for(let j=0; j<sub_list.length-1; j+=2){
                let sana  = sub_list[j  ].children[0] // sanasi
                let check = sub_list[j+1].children[0] // yoplganligi

                // 1 || ni olib tashlasa faqat ochiqlari ko'rinadi
                if(sana.className=="bg-green" && !check.className.includes("fa-check")) {
                  // fan nomi
                  let fan  = sub_list[j+1].querySelector('.timeline-body').innerText.split('\n')[1]
                  fan = fan.trim().split(" ")
                  fan.shift()
                  fan = fan.join(" ")

                  // topshiriq nomi
                  let nomi = sub_list[j+1].querySelector('.timeline-body > :first-child')
                  let nomi_text = nomi.innerText

                  // topshiriqga kirish havolasi
                  let href_text = ""
                  try{
                    let href = sub_list[j+1].querySelector('.text-right > :first-child')
                    href_text = href.href
                  }catch{}

                  let fayl_href = ""
                  let fayl_text = ""
                  try{
                    let fayl = sub_list[j+1].querySelector(".download-item")
                    fayl_href = fayl.href
                    fayl_text = fayl.innerText
                  }catch{}

                  // har bir topshiriqning jadvalga joylash uchun satri
                  let tr = document.createElement('tr')

                  tr.innerHTML = `
                    <td>${(myCounter++)}</td>
                    <td align="center">${sana.innerText}</td>
                    <td style="max-width: 250px;">${fan}</td>
                    <td style="max-width: 200px;"><a href="${href_text}">${nomi_text}</a></td>
                    <td style="max-width: 200px;"><a href="${fayl_href}">${fayl_text}</a></td>
                  `
                  obj.appendChild(tr)
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

function topshriqlar(){
  if('https://student.jbnuu.uz/'==document.URL){
    console.log("ishladi topshiriqlar")

    $('#Eslatma > div').prepend(`
      <!-- <hr/> -->
      <table
         id="my-table"
         class="table table-striped" style="display: inline-block; vertical-align: top;">
        <thead>
          <tr>
            <th               data-key="id"    data-column="0" data-order="asc"><p align="center">id</p></th>
            <th id="my-date1" data-key="date"  data-column="1" data-order="asc"><p align="center">date</p></th>
            <th               data-key="fan"   data-column="2" data-order="asc"><p align="center">fan</p></th>
            <th               data-key="modul" data-column="3" data-order="asc"><p align="center">topshiriq</p></th>
            <th               data-key="file"  data-column="4" data-order="asc"><p align="center">fayl</p></th>
          </tr>
        </thead>

        <tbody id="my-tbody"></tbody>

        <style>
          #my-table tr td{
            padding: 0 6px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
          }
        </style>
      </table>
    `)


    myOpen(document.querySelector("#my-table").querySelector('#my-tbody'))
  }
}


// ===============================================================================
// ballarni kurish
// ===============================================================================

function myOpen2(obj){
  function surov(url){
    let result=0

    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      let doc = new DOMParser().parseFromString(html, "text/html")
      //widget-user-username
      let cont = doc.body.querySelector('#attendance-grid').children[1].children

      let cc=0
      for(let i of cont){
        let sub_url = i.querySelector('.nav').children[1].children[0].href
        let fan_nomi = i.querySelector(".widget-user-username").innerText

        let tr = document.createElement('tr')

        tr.innerHTML = `
          <td>${(cc++)}</td>
          <td>${fan_nomi}</td>
          <td align="center">0/0</td>
          <td align="center">0/0</td>
          <td align="center">0/0</td>
          <td align="center">0%</td>
        `
        // 2, 3, 4
        obj.appendChild(tr)

        // continue
        fetch(sub_url).then(function (response) {
            return response.text();
        }).then(function (html) {

            let sub_doc = new DOMParser().parseFromString(html, "text/html")
            let sub_cont = sub_doc.body.querySelector('#attendance-grid').children[1]

            let list = sub_cont.querySelectorAll('.col-md-8 > :first-child .panel')

            for(let i of list){
              let sub_list = i.querySelector('.timeline').children

              for(let j=0; j<sub_list.length-1; j+=2){

                // sarlovha
                let title = sub_list[j+1].querySelector(".timeline-header")
                let title_text = title.innerText

                // ballar
                let ball = sub_list[j+1].querySelector(".timeline-item .time")
                let ball_text = ball.innerText
                ball_text = ball_text.replace(/\s/gm, '')
                ball_text = ball_text.split("/")

                // to'plangan
                let tuplagan = ball_text[0]
                tuplagan = parseFloat(tuplagan)

                // to'planishi kerek
                let kerek = ball_text[1]
                kerek = kerek.replace("/","")
                kerek = kerek.replace(" ","")
                kerek = parseInt(kerek)

                // fan nomi
                let fan_nomi_ = sub_list[j+1].querySelector('.timeline-body')
                fan_nomi_ = fan_nomi_.innerText
                fan_nomi_ = fan_nomi_.split('\n')[1]
                fan_nomi_ = fan_nomi_.trim().split(" ")
                fan_nomi_.shift()
                fan_nomi_ = fan_nomi_.join(" ")

                let jadval_satrlari = document.querySelectorAll("#my-table2 tr")

                for(let trs of jadval_satrlari){
                  if(trs.children[1].innerText == fan_nomi_){
                    let tds = tr.children

                    // amaliy va seminarlarni husoblaydi
                    if(title_text.includes("Amaliy") || title_text.includes("Seminar")){
                      let amaliy = tds[2].innerText.split("/")

                      let yigindi = parseFloat(amaliy[0])+tuplagan
                      yigindi = yigindi.toFixed(1).toString().replace(".0","")

                      let jami = parseInt(amaliy[1]) + kerek

                      tds[2].innerText = yigindi+"/"+jami

                    // maruzalarni husoblaydi
                    }else if(title_text.includes("Ma’ruza")){
                      let maruza = tds[3].innerText.split("/")

                      let yigindi = parseFloat(maruza[0])+tuplagan
                      yigindi = yigindi.toFixed(1).toString().replace(".0","")

                      let jami = parseInt(maruza[1]) + kerek

                      tds[3].innerText = yigindi + "/" + jami
                    }

                    let jami_list = tds[4].innerText.split("/")

                    // jami to'plagan ball
                    let yigindi = parseFloat(jami_list[0]) + tuplagan
                    yigindi = yigindi.toFixed(1).toString().replace(".0","")

                    // jami
                    let jami = parseInt(jami_list[1]) + kerek
                    tds[4].innerText = yigindi + "/" + jami

                    // foizda husoblaydi
                    let proc = parseFloat(jami_list[0])+tuplagan
                    proc = proc*100/jami

                    tds[5].innerText = proc+"%"

                    // rang beradi foizga qarab
                    let color = ""
                    if(proc<60)      color = "danger"
                    else if(proc<70) color = "warning"
                    else if(proc<90) color = "info"
                    else             color = "success"

                    trs.setAttribute("class", color)
                  }
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

function ballar(){
  if('https://student.jbnuu.uz/'==document.URL){
    console.log('ishladi')

    let cont = document.querySelector('#forscript')

    $('#forscript').prepend(`
      <div id="Eslatma">
        <div style="margin-left: 10px;">
          <table class="table table-striped" id="my-table2" style="display: inline-block; vertical-align: top;">
            <thead >
              <tr>
                <th data-key="id"     data-column="0" data-order="asc"><p align="center">id</p></th>
                <th data-key="fan"    data-column="1" data-order="asc"><p align="center">fan</p></th>
                <th data-key="amaliy" data-column="2" data-order="asc"><p align="center">amaliy</p></th>
                <th data-key="maruza" data-column="3" data-order="asc"><p align="center">maruza</p></th>
                <th data-key="Jami"   data-column="4" data-order="asc"><p align="center">jami</p></th>

                <th data-key="foiz"   data-column="5" data-order="asc"><p align="center">foiz</p></th>
              </tr>
            </thead>
            <tbody id="my-tbody"></tbody>
          </table>
          <style>
            #my-table2 tr td{
              padding: 0 6px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          </style>
        </div>
      </div>
    `);

    myOpen2(document.querySelector("#my-table2").querySelector('#my-tbody'))
  }
}

// vaqt bo'yicha saralash funksiyasi
function myJq($){
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
  // console.log(getDate("22.04.2022 22:22"))

  console.log("jquery bormi tekshirish")
  console.log(jQuery)

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
  });
}


  console.log('boshlandi')

  prep()


  ballar()
  topshriqlar()

  myJq(jQuery)

  console.log('tayyor')

