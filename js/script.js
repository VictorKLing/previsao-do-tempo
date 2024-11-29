const sup = document.querySelectorAll('sup')
document.querySelector('#search').addEventListener('click', async (event) => {
    event.preventDefault()

    const valueSearch = document.querySelector('#city_name').value    
    if(!valueSearch){
        document.querySelector('#alert').classList.remove('hidden')
    } else{
        document.querySelector('#alert').classList.add('hidden')
    }
    const apiKey = 'ad0c4f722bda3abc5bbb8f204e94b4a9'
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(valueSearch)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json()
    
    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,

        })
    } else{
        alert('Não foi possível localizar')
    }
})

function showInfo (json) {
    document.querySelector('#infos-city').classList.remove('hidden')

    document.querySelector('#tittle').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`
    document.querySelector('#temp-img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)


    document.querySelector('#description').innerHTML = `${json.description}`
    document.querySelector('#temp-max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`
    document.querySelector('#temp-min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>Cº</sup>`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#windSpeed').innerHTML = `${json.windSpeed.toFixed(1)} km/h`

    sup.forEach((element) => {
        element.textContent = 'Cº';
    })
    
    
}