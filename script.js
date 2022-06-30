//Dichiaro le variabili 
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const panelSuggestion = document.querySelector('.suggestion');

//Prendo anche l'intero documento html per la classe js-loading
const rootElement = document.documentElement;

//Recupero della posizione - geolocalizzazione
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);


//Funzione da eseguire in caso di errore
function onError(error) {
    console.error(error);
    weatherLocation.innerText = 'In che senso non hai acceso la localizzazione?';
}

//Funzione da eseguire in caso di successo
function onSuccess(position) {
    console.log(position);

//Preparazione dati per l'API
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
const apiKey ='54ffb972812cb162e3e15b5464ec4286';
const language = 'it';
const units = 'metric';
const endpoint = 'https://api.openweathermap.org/data/2.5/weather'; 

//Costruiamo l'indirizzo, comprensivo di query string
const apiUrl = `${endpoint}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${language}&appid=${apiKey}`;

//Chiamiamo il nostro servizio esterno e attendiamo la risposta
fetch(apiUrl).then(function (response) {
    //trasformo la risposta in un formato più snello e leggibile
    const data = response.json();
    return data;
    })
    .then(function(data){
    console.log(data);

    //Prendo le variabili che mi servono dall'array
    const locationName = data.name;
    const temperature = Math.floor(data.main.temp);  //serve per arrotondare i gradi per difetto senza avere la virgola
    const iconCode = data.weather[0].icon;
    const imgAlt = data.weather[0].description;

    //Preparo il consiglio giusto da dare all'utente
    const suggestion = getSuggestion(iconCode);
    
    //Inserimento dati dove vanno mostrati
    weatherLocation.innerText = locationName;
    weatherTemperature.innerText = `${temperature}°`;
    weatherIcon.alt = imgAlt;
    weatherIcon.src = `images/${iconCode}.png`;
    panelSuggestion.innerText = suggestion;
    });

    //Bisogna togliere la js-loading per mostrare img e pannello
    rootElement.classList.remove('js-loading');
}

function getSuggestion(iconCode){
    const suggestions = {
    '01d' : 'Con questo sole non ti va di prenotare un nuovo viaggio?',
    '01n' : 'Togliti le scarpe, accendi Netflix e goditi la serata',
    '02d' : 'Qualche nuvoletta, ottima giornata per andare al Lago!',
    '02n' : 'Tempo perfetto per andare a ballare!',
    '03d' : 'Nuvoletta del cazz',
    '03n' : 'Una nuvoletta poco simpatica',
    '04d' : 'Affrontiamo queste nuvole con una birretta!',
    '04n' : 'Nuvole everywhere (che gioia)',
    '09d' : 'Il tempo perfetto per ascoltare la pioggia e rilassarsi a casa',
    '09n' : 'Ascolta la pioggia, non è bellissima?',
    '10d' : 'Sole, piove, sole, piove, oggi è indeciso anche il meteo!',
    '10n' : 'Almeno possiamo dormire al fresco dai',
    '11d' : 'Temporale = Cenetta con gli amici di sempre!',
    '11n' : 'Hai la scusa per non uscire stasera e guardare la nuova serie su Netflix!',
    '13d' : 'Da dove arriva tutto questo freddo scusa?',
    '13n' : 'Valuta di trasferirti alle Canarie!',
    '50d' : 'Ma sei per caso a Rovigo che hai trovato questa nebbia?',
    '50n' : 'Nebbia nebbiolina la birra è sempre più vicina'
    }
    return suggestions[iconCode];
}

