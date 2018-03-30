
define(["jquery", "bootstrap", "corsanywhere", "ko", "koDebug"], function ($, bootstrap, cors, ko, kob) {

    var animation = {
        suggestionArr: [
            // The first 5 items CAN'T be changed but feel free to add more items if you wish ^^
            'pizza', // DONT CHANGE ME
            'rib-eye steak', // DONT CHANGE ME
            'ice cream', // DONT CHANGE ME
            'fried chicken', // DONT CHANGE ME
            'texas bbq', // DONT CHANGE ME
            'pasta', // CHANGE ME AND BELOW IDGAF
            'hambugers',
            'cajun food',
            'korean bbq',
            'lobster',
        ],

        loopSuggestions() {
            var firstIndex = animation.suggestionArr.shift();
            animation.suggestionArr.push(firstIndex);
            animation.drawSuggestions();
        },

        drawSuggestions() {
            $(".suggestion").finish();
            $("#suggestions-1").animate({ opacity: '0' }, 500);
            $("#suggestions-2").animate({ top: "+0em", opacity: '1' }, 1000);
            $("#suggestions-3").animate({ top: "+1em", opacity: '.75' }, 1000);
            $("#suggestions-4").animate({ top: "+2em", opacity: '.50' }, 1000);
            $("#suggestions-5").animate({ top: "+3em", opacity: '.25' }, 1000, function () {
                $("#suggestions-1").text(animation.suggestionArr[0] + '?');
                $("#suggestions-2").text(animation.suggestionArr[1] + '?');
                $("#suggestions-3").text(animation.suggestionArr[2] + '?');
                $("#suggestions-4").text(animation.suggestionArr[3] + '?');
                $("#suggestions-5").text(animation.suggestionArr[4] + '?');
                $(".suggestion").removeAttr('style');
            });

        },

        headerFlyOut() {
            $("header").animate({ opacity: '0', top: '-=100vh', height: '0px' }, 2000, 'easeInBack', function () {                
                clearInterval(suggestionLoop);
            });
            $("#main-content").removeAttr('style');            
        },

        headerFlyIn() {            
            $("header").animate({ opacity: '0', top: '-100vh', display: 'inline' }, 0, function () {
                $("header").animate({ opacity: '1', top: '-20vh', height: '100vh' }, 2000, 'easeOutBack', function () {
                    suggestionLoop = setInterval(function () {
                        animation.loopSuggestions()
                    }, 3000);
                    $("#main-content").css({ display: 'none' });
                });
            });
        },

        errorMessageLanding(errText) {
            $("#landingErrMsg").finish();
            $("#landingErrMsg").text(errText);
            $("#landingErrMsg").animate({ opacity: '1' }, 0, function () {
                $("#landingErrMsg").animate({ opacity: '0' }, 2000, 'easeInExpo')
            });
        }
    }

    var suggestionLoop = setInterval(function () {
        animation.loopSuggestions()
    }, 3000);


    function searchValidation() {

        var error = [];
        if (!/^[a-zA-Z0-9\s._\-]+$/.test($("#searchTerm").val())) {
            error.push('search')
        }

        if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test($("#zipCode").val())) {
            error.push("zipcode")
        }

        return error;
    }


    $("#submitSearch").on("click", function (e) {
        if (searchValidation().length > 0) {
            if (searchValidation().indexOf("zipcode") >= 0) animation.errorMessageLanding("Invalid Zip Code");
            else if (searchValidation().indexOf("search") >= 0) animation.errorMessageLanding("Please enter a search term");
            return;
        }
        animation.headerFlyOut();
    });

    $("#back-to-search").on("click", function (e) {
        animation.headerFlyIn();
    });

});