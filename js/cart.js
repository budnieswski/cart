;(function( $ ){
  $.fn.gbcart = function(options) {

    var defaultsAtts = {
      'btnAdd' : '.cartadd',
      'btnRem' : '.cartrem',
      'btnDel' : '.cartdel',
      'btnAmountItem' : '.amountItem',
    },
    settings      = $.extend( {}, defaultsAtts, options ),
    element       = null, // Cart "wrap"
    cart          = null, // Cart Object
    cartCookie    = $.cookie('cart'); // Cart Cookie

    

    /*
    * Methods "Protected"
    **************************************************************************
    */
    {
      __init = function(obj) {

        element = obj;

        // Nao existe ainda cria o Cart Object e Seta no Cookie
        if (cartCookie=='' || cartCookie=='undefined' || cartCookie==null) {
          // Setting up cart
          cart = {
            'checkout': {
              'totalPrice' : 0,
              'totalAmount' : 0,
            },
            'itens' : {
              'default' : [],
            },
          };

          $.cookie('cart', JSON.stringify(cart));
          cartCookie = $.cookie('cart');

          console.log('Cookie Criado');
        } else {
          // Ja existe entao carrega do cookie para o objeto
          cart = JSON.parse(cartCookie);
          console.log('Cookie Carregado');
        }

        console.log('Run one time # __init');
      }; // end __init


      /**/
      __add = function(elementToSet, obj, amount) {

      }; // end __add


      /**/
      __del = function(elementToSet, obj, amount) {

      }; // end __del
      

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

    }


    /*
    * Methods "Private"
    **************************************************************************
    */
    {

    }


    /*
    * Public Methods
    **************************************************************************
    */
    {
      var publicMethods = {
        getCart: function() {
          console.log(cart);
        }
      };
    }


    /*
    * Binds
    **************************************************************************
    */
    {
      
    }


    // Start the plugin
    this.each (function() {
      __init($(this));
    });

    // Making it usable
    return publicMethods;
  }; 
})( jQuery );