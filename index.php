<!DOCTYPE html>
<html lang="en">
<head> 
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="js/jquery.json.js"></script>
  <script src="js/jquery.cookie.js"></script>
  <script src="js/script.js"></script>

  <script>
  jQuery(function($){
   var mycart = $("#mycart").cart();

   // $("input.amountItem").change(function(event) {
   //   /* Act on the event */
   //   var o = $(this),
   //   amount = o.val(),
   //   parent = o.parent().parent(),
   //   category = parent.data('category'),
   //   idItem = parent.data('id');


   //   mycart.setAmount(category, idItem);
   // });

   $("button.removerItem").click(function(event) {
     /* Act on the event */
     console.log('remove');
   });





   $('.show').click(function(event) {
    mycart.show();
   });

   $('.delete').click(function(event) {
    mycart.delete();
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
    <button class="show">Show</button>
    <button class="delete">Delete Cookie</button>
    <button class="showcookie">Show Cookie</button>
    <button class="link" data-link="checkout">CheckOut</button>
  </p>

  <?php
  if (empty($_GET['t'])) require('home.php');
  else require($_GET['t'].'.php');
  ?>
  
</body>
</html>