<!DOCTYPE html>
<html lang="en">
<head> 
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="css/jquery-impromptu.css">
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.json.js"></script>
  <script src="js/jquery.cookie.js"></script>
  <script src="js/jquery-impromptu.js"></script>
  <script src="js/jquery.gbcart.js"></script>

  <script>
  jQuery(function($){

    var gbCart = $("#mycart").gbcart();
  //  var mycart = $("#mycart").cart({
  //   'btnDel': '.removerItem',
  //  });


  //  $("input.amountItem").change(function(event) {
  //    $("#showtotal").html(mycart.getTotalPrice());
  //  });

  //  $("button.removerItem").click(function(event) {
  //    console.log('remove');
  //  });



  //  $("button.precototal").click(function(event) {
  //    console.log( mycart.getTotalPrice() );
  //  });

   $('.show').click(function(event) {
    gbCart.getCart();
   });

   $('.delete').click(function(event) {
    gbCart.reset();
   });






  $('.showcookie').click(function(event) {
    console.log($.cookie('cart'));
   });

   $('.link').click(function(event) {
    window.location.href = '?t='+$(this).data('link');
   });

  });
  </script>
</head>
<body>

  <p>
    <button class="link" data-link="home">home</button>
    <button class="show">Show Cart OBJ</button>
    <button class="delete">Reset</button>
    <button class="showcookie">Show Cookie</button>
    <button class="precototal">Preco total</button>
    <button class="link" data-link="checkout">CheckOut</button>
  </p>

  <?php
  if (empty($_GET['t'])) require('home.php');
  else require($_GET['t'].'.php');
  ?>
  
</body>
</html>