async function Restcountries(){
   try {
        let con = await fetch("https://restcountries.com/v3.1/all")
        let data = await con.json()
        // console.log(data)
        return data
        
   } catch (error) {
        console.log("Error")
   }
}

async function feWeather(latlng){
    try {
        let Cwet = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latlng[0]}&lon=${latlng[1]}&appid=7601565f4e6e9c282f81ab843910324f`)
        let data = await Cwet.json()
        return data
        
    } catch (error) {
        console.log("Error")
    }
}


async function mycountries(){

    let country = await Restcountries()

    let Totalcard =document.createElement('div')
    Totalcard.setAttribute('id','Tcard')
    document.getElementById('root').appendChild(Totalcard)

    country.forEach((e) => {
        
        let subcard = document.createElement('div')
        subcard.setAttribute('id','Scard')


        let cardhead = document.createElement('h1')
        cardhead.setAttribute('id','Chead')
        cardhead.innerHTML=e.name.common
        subcard.appendChild(cardhead)

        let image = document.createElement('img')
        image.setAttribute('id','Cimg')
        image.setAttribute('src',e.flags.svg)
        subcard.appendChild(image)

        let capital = document.createElement('h3')
        capital.setAttribute('id','Cap')
        capital.innerHTML= `Capital : `+ e.capital
        subcard.appendChild(capital)

        let region = document.createElement('h4')
        region.setAttribute('id','reg')
        region.innerHTML= `Region : ` + e.region
        subcard.appendChild(region)


        let concode = document.createElement('h4')
        concode.setAttribute('id','conCode')
        concode.innerHTML= `Country code : ` + e.cca3
        subcard.appendChild(concode)


        let latlng = document.createElement('h4')
        latlng.setAttribute('id','lag')
        latlng.innerHTML= `LatLng : ` + e.capitalInfo.latlng
        subcard.appendChild(latlng)


        let btn = document.createElement('button')
        btn.setAttribute('id','Wbtn')
        btn.innerHTML = 'Click for Weather'
        btn.addEventListener('click', async ()=>{
            
            let Cwt = await feWeather(e.latlng)
            // console.log(Cwt)
            let Temp = document.createElement('h6')
            Temp.setAttribute('id','lag')
            Temp.innerHTML= `Temp : ${Cwt.main.temp} ℃ <br>
            Humidity : ${Cwt.main.humidity} %rh <br>
            Wind Speed : ${Cwt.wind.speed} K/hr <br>
            Description : ${Cwt.weather[0].description} 
            `
            subcard.appendChild(Temp)  
        })
        
        subcard.appendChild(btn) 

        Totalcard.appendChild(subcard)
    
    });
}

mycountries()



