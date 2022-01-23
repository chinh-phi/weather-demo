var searchInput = document.querySelector('.search');
var city = document.querySelector('.city');
var country = document.querySelector('.country');
var value = document.querySelector('.value');
var shortDes = document.querySelector('.short-description');
var visibility = document.querySelector('.visibility span');
var wind = document.querySelector('.wind span');
var sun = document.querySelector('.sun span');
var time = document.querySelector('.time');
var content = document.querySelector('.content');
var body = document.querySelector('body');

async function change() {
    let input = searchInput.value.trim();
    const apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=2ab336a603127cc75fd204396db1001a`;
    let data = await fetch(apiURl).then(response => response.json());
    
    if (data.cod == 200) {
        content.classList.remove('hide');

        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        let temp = Math.round(data.main.temp - 273.15);
        value.innerText = temp;
        shortDes.innerText = data.weather[0].main;
        time.innerText = new Date().toLocaleString('vi');

        body.setAttribute('class', 'warm');

        if(temp < 20) {
            body.setAttribute('class', 'cold');
        } else if(temp < 25) {
            body.setAttribute('class', 'cool');
        } else if(temp < 30) {
            body.setAttribute('class', 'warm');
        } else {
            body.setAttribute('class', 'hot');
        }
    } else {
        content.classList.add('hide');
    }
}


searchInput.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        change();
    }
})

