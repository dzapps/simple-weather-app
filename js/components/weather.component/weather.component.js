angular.module('weatherapp')
.component('ngWeather', {
    templateUrl: "js/components/weather.component/weather.component.html",
    controller: ['$http', function ($http) {
        var vm = this;

        // INIT SELECT2
        //$('select').select2({width: 'true'});

        vm.getWeather =  function(city) {
          $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + city + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
            .then(onSuccess, onError);

          function onSuccess(data) {
            vm.city = data.data.query.results.channel.location.city;
            vm.condition = data.data.query.results.channel.item.condition;
            vm.forecast = data.data.query.results.channel.item.forecast;
          }

          function onError() {
            throw new Error('no data');
          }
        };

        // DEFAULT
        vm.selectedCity = 'moscow';
        vm.getWeather(vm.selectedCity);
    } ]
})
