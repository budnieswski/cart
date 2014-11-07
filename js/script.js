;(function( $ ){


    /*
    * Methods
    **************************************************************************
    */
    {      


      /*
      * Delete item
      */
      __del = function (element, key) {
        if (element.length <=1 || search==0) {
          // Zera ou Remove o primeiro
          element.shift();
        } else if (element.length == (search+1) ) {
          // Remove o ultimo elemento
          element.pop();
        } else {
          // Remove qualquer que nao seja o extremo
          // Coloca o ultimo elemento no lugar (reindex)
          element[search] = element.pop();          
        }
      }; // end __del


      /*
      * When change
      */
      __amountChange = function (elementToSet, id, qtd) {
        qtd = qtd*1; // Transforma em numero

        search = __search(elementToSet, id); // Item ID (key)
        search = search*1;

        // Ja existe o item, apenas aumenta a quantidade
        if (search !== false && qtd>0) {
          elementToSet[search]['amount'] = qtd;
          
          var total =  cart.checkout.priceTotal;
          total = accounting.unformat(total) + (accounting.unformat(elementToSet[search]['price'])*qtd);
          cart.checkout.priceTotal = accounting.unformat(total);
          cart.checkout.quantItens += qtd; 
        }

        // Remove o item
        if (search !== false && qtd<=0) {
          __del(elementToSet, search);
        }

        __setCookie();
      }; // end __amountChange

    }


    /*
    * Public Methods
    **************************************************************************
    */
    {
      var publicMethods = {
        setAmount: function(category, idItem) {
        },
        getTotalPrice: function() {
          cart = __getCart();
          return cart.checkout.priceTotal;
        },
        delete: function() {
          __delCookie();
        },
        show: function() {
          console.log(cart);
        }
      };
    }


    /*
    * Binds
    **************************************************************************
    */
    {

      // Clicked del (item) to cart
      $(settings['btnDel'], element).bind('click', function(){
        /* Act on the event */
        var o = $(this),
        amount = 0,
        parent = o.parent().parent(),
        category = parent.data('category'),
        idItem = parent.data('id');

        cart = __getCart();

        parent.hide();

        __amountChange(eval('cart.itens.'+category), idItem, amount);
      });

      // Incrementa / Decrementa Item quantidade
      $(settings['btnAmountItem'], element).change(function(event) {
       /* Act on the event */
       var o = $(this),
       amount = o.val(),
       parent = o.parent().parent(),
       category = parent.data('category'),
       idItem = parent.data('id');

       cart = __getCart();

       if (amount <= 0) {
        parent.hide();
       }

       __amountChange(eval('cart.itens.'+category), idItem, amount);
     });
      
    }

    this.each (function() {
      __init($(this));
    });

    return publicMethods;
  }; 
})( jQuery );