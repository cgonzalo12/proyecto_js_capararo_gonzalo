window.addEventListener("load",()=>{
        let lat;
        let lon;
        //elementos del html
        let tempperaturaValor=document.getElementById("tem-valor");
        let  temperaturaDescripcion=document.getElementById("tem-desc")
        let ubicacion=document.getElementById("ubicacion");
        let iconoAnimado=document.getElementById("iconoAnimado");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion=>{
            lon=posicion.coords.longitude;
            lat=posicion.coords.latitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=Arg&lang=es&units=metric&appid=00c0b625c481e6595966db84f42f3273`

            //pido los datos a la api
            fetch(url)
                .then(response =>{return response.json() })
                .then(data => {
                    let temp=(data.main.temp);
                    tempperaturaValor.textContent=`${temp} ºC` ;
                    let desc = data.weather[0].description;
                    temperaturaDescripcion.textContent = desc.toUpperCase();
                    ubicacion.textContent = data.name
                    //iconos dinamicos 
                    switch (data.weather[0].main) {
                        case 'Thunderstorm':
                        iconoAnimado.src='../assets/icons/animated/thunder.svg'
                        console.log('TORMENTA');
                        break;
                    case 'Drizzle':
                        iconoAnimado.src='../assets/icons/animated/rainy-2.svg'
                        console.log('LLOVIZNA');
                        break;
                    case 'Rain':
                        iconoAnimado.src='../assets/icons/animated/rainy-7.svg'
                        console.log('LLUVIA');
                        break;
                    case 'Snow':
                        iconoAnimado.src='../assets/icons/animated/snowy-6.svg'
                        console.log('NIEVE');
                        break;                        
                    case 'Clear':
                        iconoAnimado.src='../assets/icons/animated/day.svg'
                        console.log('LIMPIO');
                        break;
                    case 'Atmosphere':
                        iconoAnimado.src='../assets/icons/animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='../assets/icons/animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                        iconoAnimado.src='../assets/icons/animated/cloudy-day-1.svg'
                        console.log('por defecto');
                    }

                })
                .catch(error=>{
                    console.log(error)
                })
        })  
    }
})