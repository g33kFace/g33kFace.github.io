app.controller("tweetCtrl", function ($scope) {
    $scope.tweets;
    $scope.oauthResult;

    $scope.addMarker = function (coords) {
        var lat = coords[1];
        var lng = coords[0];
    }

    $scope.connectTwitter = function () {
        OAuth.initialize("Svzx0g3xblJUmKzRzloYBIqNduI");
        OAuth.popup("twitter").done(function (result) {
            console.log(result);
            $scope.oauthResult = result;
            document.getElementById("connectBtn").style.display = "none";
            document.getElementById("placesBtn").style.display = "inline-block";
            document.getElementById("qString").style.display = "inline-block";
            document.getElementById("signOutBtn").style.display = "inline-block";
        })
        .fail(function (err) {
            console.log(err);
        });
    }

    $scope.getPlaces = function () {
        var query = document.getElementById("qString").value;
        var lat = document.getElementById("lat").innerHTML;
        var lng = document.getElementById("lng").innerHTML;
        //$scope.oauthResult.get("/1.1/search/tweets.json?q=" + query + "&geocode=" + lat + "," + lng + "250mi").done(function (response) {
        $scope.oauthResult.get("/1.1/statuses/home_timeline.json").done(function (response) {
        //$scope.oauthResult.get("https://api.twitter.com/1.1/geo/reverse_geocode.json?lat=" + lat + "&long=" + lng).done(function (response) {
            console.log(response);
            $scope.tweets = response;
            document.getElementById("mapCoords").className = "alert alert-success";
        })
        .fail(function (err) {
            console.log(err);
            document.getElementById("mapCoords").className = "alert alert-danger";
        });
    }

    $scope.signOut = function () {
        OAuth.clearCache('twitter');
        document.getElementById("connectBtn").style.display = "inline-block";
        document.getElementById("placesBtn").style.display = "none";
        document.getElementById("qString").style.display = "none";
        document.getElementById("signOutBtn").style.display = "none";
    }
});