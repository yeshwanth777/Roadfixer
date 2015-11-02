angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state, $cordovaGeolocation, $ionicLoading, $cordovaVibration, $cordovaNativeAudio ) {
    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      /*google.maps.event.addListenerOnce($scope.map, 'idle', function () {

        var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
        });

        var infoWindow = new google.maps.InfoWindow({
          content: "Here I am!"
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      }); */

    }, function (error) {
      console.log("Could not get location");
    });

    //shake
    var myShakeEvent = new Shake({
      threshold: 10, // optional shake strength threshold
      timeout: 1000 // optional, determines the frequency of event generation
    });
    myShakeEvent.start();
    window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
    function shakeEventDidOccur () {
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
          $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          //$scope.mylanglat = {lat: pos.coords.latitude, lng: pos.coords.longitude};
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          $scope.map.center.zoom = 20;
          var reportlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var reportcoords = position.coords.latitude + " " + position.coords.longitude;
          console.log(reportcoords);

          //Wait until the map is loaded
          //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 7,
              strokeColor: "#FF0000",
              fillOpacity: 0,
              rotation: 0
            },
            animation: google.maps.Animation.BOUNCE,
            position: latLng

          });
          var infoWindow = new google.maps.InfoWindow({
            content: reportcoords
          });

          google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open($scope.map, marker);
          });
          $cordovaVibration.vibrate(400).then(function() {
            console.log("Phone vibrating");
          });

        })
    }
    //shake
//vibration
    $scope.justVibrate = function() {
        $cordovaVibration.vibrate(400).then(function() {
          console.log("Phone vibrating");
        })
    };
    //vibration
    //center function
    $scope.centerOnMe = function () {
      console.log("Centering");
      if (!$scope.map) {
        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        template: '<ion-spinner class="spinner-energized"></ion-spinner>',
        showBackdrop: false
      });

      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var mapOptions = {
          center: latLng,
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP

        };
        $scope.loading.hide();

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
          map: $scope.map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            strokeColor: "#0000FF",
            fillOpacity: 0,
            rotation: 0
          },
          animation: google.maps.Animation.DROP,
          position: latLng
        });
        setTimeout(function(){
          $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        }, 2000);
      });
    };
    //alert
    $scope.alert = function () {
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
        $scope.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        //$scope.mylanglat = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.map.center.zoom = 20;
        var reportlatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var reportcoords = position.coords.latitude + " " + position.coords.longitude;
        console.log(reportcoords);

        //Wait until the map is loaded
        //var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: {
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 7,
              strokeColor: "#FF0000",
              fillOpacity: 0,
              rotation: 0
            },
            animation: google.maps.Animation.BOUNCE,
            position: latLng

          });
        var infoWindow = new google.maps.InfoWindow({
          content: reportcoords
        });

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
        });

      })
    }
  })


.controller('ChatsCtrl', function($scope, $cordovaCamera, $cordovaFile) {
    $scope.submitTheForm = function() {
      //this.customQuote = null;
      this.txtUserName = null;
      this.txtEmail = null;
      this.txtNotes = null;
    };
    //cleartext

    $scope.images = [];

    $scope.addImage = function() {
      // 2
      var options = {
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
      };

      // 3
      $cordovaCamera.getPicture(options).then(function(imageData) {

        // 4
        onImageSuccess(imageData);

        function onImageSuccess(fileURI) {
          createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        // 5
        function copyFile(fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
              fileEntry.copyTo(
                fileSystem2,
                newName,
                onCopySuccess,
                fail
              );
            },
            fail);
        }

        // 6
        function onCopySuccess(entry) {
          $scope.$apply(function () {
            $scope.images.push(entry.nativeURL);
          });
        }

        function fail(error) {
          console.log("fail: " + error.code);
        }

        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i=0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }

      }, function(err) {
        console.log(err);
      });
    };

    $scope.urlForImage = function(imageName) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    }


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableHandsFree: true
  };
    $scope.settingsone = {
      vibration: true
    };
    $scope.settingstwo = {
      sound: true
    };
});

