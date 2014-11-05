var cart = {};
cart.checkout = {
  'priceTotal': 0,
  'quantItens': 0,
};
cart.itens = {};
cart.itens.default = [];
;(function( $ ){
  $.fn.cart = function(options) {

    var defaults = {
      'btnAdd' : '.cartadd',
      'btnRem' : '.cartrem',
      'btnDel' : '.cartdel',
      'btnAmountItem' : '.amountItem',
    },
    settings      = $.extend( {}, defaults, options ),
    cartCookie    = null, // Cookie
    element       = null; // Cart "wrap"
    

    /*
    * Methods
    **************************************************************************
    */
    {      
      /*
      * Init
      */
      __init = function (obj) {
        element = obj;
        __checkCookie();
      }; // end __init


      /*
      * Decode JSON and set a Cookie
      */
      __proccessJSON = function (json) {
        __checkCookie();

        var data = JSON.parse(json);

        var firstKey = Object.keys(data)[0],
            firstVal = data[firstKey];

        // "NODO"
        if (typeof(firstVal)=='object') {
          __add(firstVal, firstKey);
        } else {
          // UNIQUE (without 'category')
          __add(data);
        }

        __setCookie();

      };// end __proccessJSON


      /*
      * Add at cart Object or increment amount
      */
      __add = function (data, key) {
        if (key!="" && key!='undefined' && key!=null) {
          // nao existe esse "NODO"
          if (!cart.itens[key]) {
            cart.itens[key] = []; // Create "NODO"
            __amountAdd(cart.itens[key], data); // First ITEM
            console.log(cart);
          } else {
            __amountAdd(cart.itens[key], data);
          }
        } else {
          __amountAdd(cart.itens.default, data);
        }  
      }; // end __add


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
      * Find an element, if exists amount is incremented
      * Else create a element
      */
      __amountAdd = function (elementToSet, obj) {
        search = __search(elementToSet, obj.id); // Item ID

        // Ja existe o item, apenas aumenta a quantidade
        if (search !== false) {

          amount = elementToSet[search]['amount'];
          amount = (amount)?amount+1:1;

          elementToSet[search]['amount'] = amount;

        } else {
          // Item ainda nao existente
          obj['amount'] = 1;
          elementToSet.push( obj );
        }
      }; // end __amountAdd


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
        }

        // Remove o item
        if (search !== false && qtd<=0) {
          __del(elementToSet, search);
        }

        __setCookie();
      }; // end __amountChange


      /*
      * Search Item, passing needle and object to loop
      * return Item ID if found
      * return false if not found
      */
      __search = function (obj, idSearch) {
        for (key in obj) {
          item = obj[key];
          if(item.id == idSearch) {
            return key;
          }
        }
        return false;
      }; // end __search


      /*
      * Verifica a existencia do cookie, cria se nao existir
      * Carrega para um array Javascrip se existir
      */
      __checkCookie = function () {
        cartCookie = $.cookie('cart');

        if (cartCookie=='' || cartCookie=='undefined' || cartCookie==null) {
          $.cookie('cart', "VAZIO");
          cartCookie = $.cookie('cart');

          console.log("Cookie Criado !");
        } else {
          if (cartCookie!="VAZIO") {
            cart = JSON.parse(cartCookie);
          }
          console.log("Cookie Carregado");
        }
      }; // end __checkCookie


      __getCart = function () {
        __checkCookie();
        return cart;
      };


      /*
      * Apos cada processo de adicao/remocao de item
      * O Cookie e atualizado
      */
      __setCookie = function () {
        $.cookie('cart', JSON.stringify(cart));
      }; // end __setCookie


      /*
      * Reseta todo o sistema
      */
      __delCookie = function () {
        $.removeCookie('cart');
        cartCookie    = null; // Cookie
        var cart = {};
        cart.checkout = {
          'priceTotal': 0,
          'quantItens': 0,
        };
        cart.itens = {};
        cart.itens.default = [];
      };

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
      // Clicked add to cart
      $(settings['btnAdd'], element).bind('click', function(){
        __proccessJSON($(this).attr('data-cart'));
        // console.log(cart);
      });

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