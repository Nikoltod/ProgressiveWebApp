(function() {
    import "initial.js";
    var app = {
        visibleCards: {},
        selectedCities: [],
        daysOfWeek: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
        isLoading: true,
        spinner: document.querySelector('.loader'),
        addDialog: document.querySelector('.dialog-container'),
        container: document.querySelector('.main'),
        cardTemplate: document.querySelector('.cardTemplate')
    };

    /**
    *
    * Event listeners
    *
    **/
    //Event handler for updating all forecasts;
    document.getElementById('butRefresh').addEventListener('click', function() {
        app.updateForecasts();
    });

    
    document.getElementById('butAddCity').addEventListener('click', function() {
        //add city
        var selectDomRef = document.getElementById('.selectCityToAdd');

        //retrieve the selected option within the options of the selectedCityToAdd
        var selectedCity = selectDomRef.options[select.selectedIndex];

        var key = selectedCity.value;
        var label = selectedCity.textContent;

        //get the forecast for the selected city...
        app.getForecast(key, label);
    });
    
    document.getElementById('butAdd').addEventListener('click', function() {
        //open add dialog
    });

    document.getElementById('butAddCancel').addEventListener('click', function() {
        //close add dialog
    });

    //Update the DOM

    /*
    *
    * Update the model
    *
    */
    app.getForecast = function(key, label) {

        /* Values map to Yahoo Weather API Where On Earth Identifiers (WOEIDs).
        https://developer.yahoo.com/weather/documentation.html#req */
        //building the request URL for the yahoo api
        ////example weather API call
        ////https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys
        var url = `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid=${key}`;

        var oRequest = new XMLHttpRequest();

        oRequest.onreadystatechange = function() {
            if (oRequest.readyState === XMLHttpRequest.DONE) {
                if (oRequest.status === 200) {
                    var response = JSON.parse(oRequest.response);
                    var results = response.query.results;

                    results.key = key;
                    results.label = label;
                    results.query.created = response.query.created;

                    //update forecast
                } else {
                    //update the forecast with the initial dummy data which is below...
                }
            };
            oRequest.open('GET', url);
            oRequest.send();
        };
    };

    //Update the forecast of all visible cities...
    app.updateForecasts = function() {
        var keys = Object.keys(app.visibleCards);
        keys.forEach(function(key) {
            app.updateForecast(key);
        });
    };
});