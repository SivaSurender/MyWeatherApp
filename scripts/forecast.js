const weatherApiKey = "ArPsslsqIG0U0ziQ0Crbdu9yFARJNMns";

// beginning of async java script for weather information of the fetched city location
const getWeather = async (key)=>{
    const baseUrl1 = "http://dataservice.accuweather.com/currentconditions/v1/";
    const baseUrl2 = `${key}?apikey=${weatherApiKey}`;

    const finalUrl = await fetch (baseUrl1 + baseUrl2);
    const data = await finalUrl.json();
    return data [0];
    

};

// beginning of async java script for fetching city location
const getCity  = async (city) =>{
    
    //baseurl1 defines the first url from the main website which fetches the location , ? indicates that additional querying can be done to end url
    const baseUrl1 = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const baseUrl2 = `?apikey=${weatherApiKey}&q=${city}`;

    const finalUrl = await fetch(baseUrl1 + baseUrl2);
    const data = await finalUrl.json();
    return data [0];

};



