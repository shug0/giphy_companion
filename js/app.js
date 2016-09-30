var searchInput = document.getElementById('search');
var resultDiv = document.getElementById('result');
var clearCross = document.getElementById('cross');

function toggleClass(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
        else
            classes.push(className);

        el.className = classes.join(' ');
    }
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function searchGif(e) {

    removeClass(clearCross, 'hide');

    // IF KEY PRESSED IS ENTER
    if (e.keyCode === 13 ) {
        var url = 'http://api.giphy.com/v1/gifs/search?q=' + searchInput.value + '&api_key=dc6zaTOxFJmzC';
        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var result = JSON.parse(request.responseText);
                displayResult(result);

            } else {
                console.log('We reached our target server, but it returned an error');
            }
        };
        request.send();
    }
}


function displayResult(json) {
    var gifList = json.data;

    if (gifList.length !== 0) {
        var formatedGifList = '';

        gifList.map(function(item, index){
            formatedGifList += '<img style="opacity: 1; transition-delay: ' + index*100 +'ms;" src=\'' + item.images.downsized.url + '\'>';
        });

        resultDiv.innerHTML = formatedGifList;
    }
    else {
        resultDiv.innerHTML = '<h3 class="error">Votre recherche n\'a renvoyé aucun résultat</h3>';
    }
}

function clearSearch() {
    searchInput.value ='';
    resultDiv.innerHTML = '';
    toggleClass(clearCross, 'hide');
}