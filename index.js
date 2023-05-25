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
    Totalcard.setAttribute('class','row')
    document.getElementById('root').appendChild(Totalcard)

    country.forEach((e) => {
        
        let subcard = document.createElement('div')
        subcard.setAttribute('id','card')
        subcard.setAttribute('class','col')
        subcard.setAttribute('class','col col-lg-4 col-sm-12')


        let cardhead = document.createElement('div')

        cardhead.setAttribute('id','cardHeader')
        cardhead.innerHTML=e.name.common
        subcard.appendChild(cardhead)

        let image = document.createElement('img')
        image.setAttribute('id','Cimg')
        image.setAttribute('src',e.flags.svg)
        subcard.appendChild(image)

        let card_Body = document.createElement('div')
        card_Body.setAttribute('id','cardBody')
        subcard.appendChild(card_Body)

        let capital = document.createElement('div')
        capital.setAttribute('id','Cap')
        capital.innerHTML= `Capital : `+ e.capital
        card_Body.appendChild(capital)

        let region = document.createElement('div')
        region.setAttribute('id','reg')
        region.innerHTML= `Region : ` + e.region
        card_Body.appendChild(region)


        let concode = document.createElement('div')
        concode.setAttribute('id','conCode')
        concode.innerHTML= `Country code : ` + e.cca3
        card_Body.appendChild(concode)


        let latlng = document.createElement('div')
        latlng.setAttribute('id','lag')
        latlng.innerHTML= `LatLng : ` + e.capitalInfo.latlng
        card_Body.appendChild(latlng)


        let btn = document.createElement('button')
        btn.setAttribute('id','Wbtn')
        btn.setAttribute('class','btn btn-primary')
        btn.innerHTML = 'Click for Weather'
        btn.addEventListener('click', async ()=>{
            
            let Cwt = await feWeather(e.latlng)
            // console.log(Cwt)
            let Temp = document.createElement('div')
            Temp.setAttribute('id','Cwet')
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



