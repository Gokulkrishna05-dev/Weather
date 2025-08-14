let Key = "4103fc7b9f2723bd63c827d71721da71";
let search=document.getElementById("search")
let input = document.getElementById("input");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let city = document.getElementById("city");
let country=document.getElementById("country")
let humidity = document.getElementById("humidity")
let speed = document.getElementById("speed");
let long;
let lat;
let bg=document.getElementById("bg")
let text=document.getElementById("text")
let pop1=document.getElementById("pop-up")
let pop2=document.getElementById("pop-up-2")

function temp() {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input.value}&limit=3&appid=${Key}&units=metric`)
        .then((val) => {
            console.log(val)
            if(input.value.trim()==""){
               text.style.display="none"
               bg.style.display="block"
               pop1.classList.add("pop-up")
                setTimeout(()=>{
                    pop1.classList.remove("pop-up")
                 },2000)
               hide()
              
            }
            else{
            return val.json()
            }
        })
        .then((val) => {
            console.log(val)
            if(val.length<=0){
                 text.style.display="none"
                 bg.style.display="block"
                 input.value=""
                 hide()
                 pop2.classList.add("pop-up")
                 setTimeout(()=>{
                    pop2.classList.remove("pop-up")
                 },2000)
            }
            else
             {bg.style.display="none"
             text.style.display="block"
            city.textContent = val[0].name
            country.textContent=" , "+val[0].country
            long = val[0].lon
            lat = val[0].lat
            input.value=""
            result()
            show()
             }
        })
}
function result() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${Key}&units=metric`)
        .then((val) => {
            return val.json()
        })
        .catch((err) => {
            console.log(err)
        })
        .then((val) => {
            console.log(val)
            temperature.textContent = val.main.temp;
            humidity.textContent = val.main.humidity;
            speed.textContent = val.wind.speed;
            let icon_code = val.weather[0].icon;
            let icon_url = `https://openweathermap.org/img/wn/${icon_code}@2x.png`
            icon.src = icon_url
        })
        .catch((err) => {
            console.error(err)
        })
}

document.addEventListener('DOMContentLoaded', function () {window.setTimeout(document.querySelector('svg').classList.add('animated'),1000);})

let cancel=document.createElement("button")
function show(){
            cancel.innerHTML=`<i class="fa-solid fa-xmark"></i>`
            cancel.classList.add("btn")
            cancel.style.display="block"
            cancel.addEventListener("click",(()=>{
                         text.style.display="none"
                         bg.style.display="block"
                         console.log("jjkbhcbc")
                         cancel.style.display="none"
                         input.value=""
            }))
            search.append(cancel)
}
function hide(){
    cancel.style.display="none"
    input.value=""
}