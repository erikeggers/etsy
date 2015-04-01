(function(){
  'use strict';

  var api_key = "cdwxq4soa7q4zuavbtynj8wx";
  var apiBaseUrl = "https://openapi.etsy.com/v2/listings/active.js?&limit=12&includes=Images,Shop:1&api_key="+api_key;
  var etsyURL = apiBaseUrl;

  $(document).ready(function(){
    $( "#etsy-search" ).on("submit", function(event) {
        event.preventDefault();
        var terms =  $(this).find('#etsy-terms').val().replace(/ /g, '+');
        etsyURL = apiBaseUrl + '&keywords=' + terms;
        // console.log(etsyURL);

      $.ajax({
        url: etsyURL,
        type: 'GET',
        dataType: 'jsonp',
      }).done(renderData);


    });

    var $output = $('.data');
    function renderData(data){
      // console.log(data);
      var results = data.results;
      $output.empty();
      results.forEach(function(item) {
        var itemInfo = renderTemplate('display-items', {
          image: item.Images[0].url_170x135,
          title: item.title,
          titleURL: item.url,
          shopName: item.Shop.shop_name,
          price: item.price,
          currency: item.currency_code
        });
        $output.append(itemInfo);
      });
    }


    $('.sort-dropdown').on('change', function(event){
      var sortBy = $(this).val();
      var sortOn = null;
      var sortOrder = 'down';
      switch (sortBy){
        case "relevancy":
          sortOn = 'score';
          break;
        case 'recent':
          sortOn = 'created';
          break;
        case 'highest':
          sortOn = 'price';
          sortOrder = 'down';
          break;
        case 'lowest':
          sortOn = 'price';
          sortOrder = 'up';
          break;
      }
      var sortingParams = '&sort_on=' + sortOn + '&sort_order=' + sortOrder;
      console.log(etsyURL + sortingParams);
      $.ajax({
        url: etsyURL + sortingParams,
        type: 'GET',
        dataType: 'jsonp',
      }).done(renderData);
    });
  });

/*
  Templete function
*/
  function renderTemplate(name, data) {
    var $template = $('[data-template-name=' + name + ']').text();
    $.each(data, function(prop, value) {
      $template = $template.replace('<% ' + prop + ' %>', value);
    });
    return $template;
  }

})();
