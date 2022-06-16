const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time =document.querySelector("img.time");
const icon = document.querySelector(".icon img");


// update Ui wit new function gathere from prevsiou function values

const updateUI  = (data) =>{
    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;

    // update above details in HTML 

    details.innerHTML = `
            <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weatherDetails.WeatherText}</div>
            <div class="display-4 my-4">
              <span>${weatherDetails.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
    `;

    //update day, night and icon images

    const iconSource = `images/${weatherDetails.WeatherIcon}.svg`;
     //setattribute takes in two parameters one is the attribute which we need to change and the next parameter is the one which the attributes needs to be changed in
    icon.setAttribute("src", iconSource);

    let timeSource = weatherDetails.IsDayTime ? "images/day.svg" : "images/night.svg";
    // if (weatherDetails.IsDayTime){
    //     timeSource = "images/day.svg"
    // }
    // else {
    //     timeSource= "images/night.svg"
    // }
    time.setAttribute("src", timeSource);

    // removing d-none classand display the card if present

    if (card.classList.contains("d-none")){
        card.classList.remove("d-none");    
    }
};

cityForm.addEventListener("submit", event =>{
    event.preventDefault();

    //get city value from html where the user types in

    const city = cityForm.city.value.trim().toLowerCase();
    // reset the form
    cityForm.reset();

    finalCityWeatherDetails(city)
    .then(data => updateUI(data))
    .catch(error => console.log(error));

    //storing user's input in browser console with localstorage

    localStorage.setItem("inputCity", city);
}   );




// to call both functions from the forecast javascript after the input is typed in by the user

const finalCityWeatherDetails = async (city) => {
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return{
        cityDetails : cityDetails,
        weatherDetails : weatherDetails
    };
};

//Checking if we have any input from theuser which is stored in local storage and displaying the result

if(localStorage.getItem("inputCity")){
     finalCityWeatherDetails(localStorage.getItem("inputCity"))
     .then(data => updateUI(data))
     .catch(error => console.log(error));
};

