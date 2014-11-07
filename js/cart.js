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
          // cartCookie = $.cookie('cart');
        } else {
          // Ja existe entao carrega do cookie para o objeto
          cart = JSON.parse(cartCookie);
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


      /**/
      __identify = function(elementToSet, obj, amount) {

        amount = amount*1;
        var searchID = null;

        if (typeof(obj)=='object') {
          searchID = obj.id; // Receivied by JSON (item ID)
        } else {
          searchID = obj; // When event is change receive just item ID
        }

        search = __search(elementToSet, searchID); // Search Item into Cart Object

        // Ja existe o item
        if (search !== false) {

          newAmount = elementToSet[search]['amount'];
          newAmount = (newAmount)?newAmount+1:1;

          elementToSet[search]['amount'] = newAmount;

        } else {
          // Item ainda nao existente
          obj['amount'] = amount; // or amount
          elementToSet.push( obj );
        }

      }; // end __identify

    }


    /*
    * Methods "Private"
    **************************************************************************
    */
    {
      /*
      * CORE
      * Responsavel por identificar a acao e executala (incremento, decremento)
      * Todas as acoes devem passar por aqui
      */
      _core = function(json, amount) {
        
        if (!amount) {
          amount = 1;
        }

        var json = JSON.parse(json),
            key = Object.keys(json)[0], // Maybe a category name
            data = json[key]; // Object (category->json)

        // IS "NODO" (category)
        if (key!="" && key!='undefined' && key!=null && typeof(data)=='object') {
          // Nao existe esse "NODO"
          if (!cart.itens[key]) {
            cart.itens[key] = []; // Create "NODO"
            __identify(cart.itens[key], data, amount); // First ITEM
          } else {
            __identify(cart.itens[key], data, amount);
          }
        } else {
          // UNIQUE (without 'category') - Commom Item
          __identify(cart.itens.default, json, amount);
        }

        $.cookie('cart', JSON.stringify(cart));
      }; // end _core


      /*
      * Reseta todo o sistema
      */
      _reset = function() {
        $.removeCookie('cart');
        __init();
      };
    }


    /*
    * Public Methods
    **************************************************************************
    */
    {
      var publicMethods = {
        getCart: function() {
          console.log(cart);
        },
        reset: function() {
          _reset();
        }
      };
    }


    /*
    * Binds
    **************************************************************************
    */
    {
      // Clicked add to cart ONE ITEM
      $(settings['btnAdd'], element).bind('click', function(){
        _core($(this).attr('data-cart'));
      });
    }


    // Start the plugin
    this.each (function() {
      __init($(this));
    });

    // Making it usable
    return publicMethods;
  }; 
})( jQuery );