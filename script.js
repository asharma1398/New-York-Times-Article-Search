// SETUP VARIABLES 
// =============================================================================================================
var authKey = "dWNNw8NcYB7EV9bYPGxLMR008j4agnVQ";    


// Search Parameters 
var queryTerm   = "";
var numResults  = 0;
var startYear   = 0;
var endYear     = 0; 

// URL Base 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to track the number of articles 
var articleCounter = 0;

// FUNCTIONS 
// =============================================================================================================
function runQuery(numArticles, queryURL) {
    
    // AJAX Function 
    $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(NYTData) {

        // Clear the wells from the previous run 
        $('#wellSection').empty();

        for (var i = 0; i < numArticles; i++) {

            // Start sending to HTML here 
            var wellSection = $('<div>');
            wellSection.addClass("well");
            wellSection.attr('id', 'articleWell-' + i);
            $('#wellSection').append(wellSection);

            
            // Attach the content to the appropriate well 
            $('#articleWell-' + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
            $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
            $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");

            // Check if byline exists 
            if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
            }
            
            $('#articleWell-' + i).append("<a target='_blank' href=" + NYTData.response.docs[i].web_url + " >" + NYTData.response.docs[i].web_url + "</a>");
        }
        
      })

}
// MAIN PROCESSES
// =============================================================================================================

$('#searchBtn').on('click', function () {
    
    // Get Search Terms 
    queryTerm = $('#search').val().trim();
    
    // Add in the Search Term 
    var newURL = queryURLBase + "&q=" + queryTerm;

    // Get the Number of Records 
    numResults = $("#numRecords").val();

    // Get the Start Year and End Year 
    startYear = $('#startYear').val().trim();
    endYear = $('#endYear').val().trim(); 

    if (parseInt(startYear)) {
        
        // Add the necessary fields 
        startYear = startYear + "0101";
        // Add the date information to the URL 
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
        
        // Add the necessary fields 
        endYear = endYear + "0101";
        // Add the date information to the URL 
        newURL = newURL + "&end_date=" + endYear;
    }

    // Send the Ajax Call the newly assembled URL 
    runQuery(numResults, newURL)
    return false;
})
