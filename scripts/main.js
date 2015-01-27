(function(){
  'use strict';

  $(document).ready(function(){
    $( "#etsy-search" ).on("submit", function(event) {
        event.preventDefault();
        var terms =  $(this).find('#etsy-terms').val().replace(/ /g, '+');
        var api_key = "cdwxq4soa7q4zuavbtynj8wx";
        var etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+
        terms+"&limit=12&includes=Images,Shop:1&api_key="+api_key;
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



// $(".sort-dropdown").change(function(sort) {
//       if ($(".sort-dropdown option:selected").text() == "Lowest Price") {
//         legos = _.sortBy(legos, function(data) {
//           return +lego.price;
//           });
//       } else if ($(".sort-dropdown option:selected").text() == "Highest Price") {
//         legos = _.sortBy(legos, function(data) {
//           return +lego.price;
//           }).reverse();
//       }
//       changeOrder(legos);
//     });

    // function changeOrder(data) {
    //   $output.empty();
    //   data.forEach(function(lego) {
    //     var legoInfo = renderTemplate('lego-item', {
    //       image: lego.Images[0].url_170x135,
    //       title: lego.title,
    //       titleURL: lego.url,
    //       shopName: lego.Shop.shop_name,
    //       price: lego.price,
    //       currency: lego.currency_code
    //     });
    //     $output.append(legoInfo);
    //   });
    // }

    //
    // legos.forEach(function(lego){
    //   var legoInfo = renderTemplate('lego-item', {
    //     image: lego.Images[0].url_170x135,
    //     title: lego.title,
    //     titleURL: lego.url,
    //     shopName: lego.Shop.shop_name,
    //     price: lego.price,
    //     currency: lego.currency_code
    //   });
    //   $output.append(legoInfo);
    // });

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
