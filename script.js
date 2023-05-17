const apiKey= "ecfb293f84ea035af9b7711c65fa6e5c";
const input = document.querySelector('input');
const button = document.querySelector("button");
const img = document.querySelector("img");

const city = document.querySelector("#city");
const degree = document.querySelector("#degree");
const umidade = document.querySelector("#umidade");
const vento = document.querySelector("#vento");

const content = document.querySelector(".content");

button.addEventListener("click", () => {
    if(!input.value) return;
    getWeatherData();
});

async function getWeatherData() {
    let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}&lang=pt_br`;

    try{
        await fetch(urlApi)
        .then((res)=> res.json())
        .then((data)=>{
            
            if(data?.cod && data.cod === "494"){
                return alert("Cidade não Encontrada.");
            }
            loadWheaterInfo(data);
        })

    } catch(error){
        alert(error);
    }
}

function loadWheaterInfo(data){
    city.innerHTML = `${input.value}`;

    degree.innerHTML = `${Math.floor(data.main.temp)}°C`;

    umidade.innerHTML = `Umidade: ${Math.floor(data.main.humidity)} km/h`;

    vento.innerHTML = `Vento: ${Math.floor(data.wind.speed)} km/h`;
    
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    content.classList.remove('hide');
}