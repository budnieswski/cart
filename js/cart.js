;(function( $ ){
  $.fn.gbcart = function(options) {

    var defaultsAtts = {
      'btnAdd' : '.cartadd',
      'btnRem' : '.cartrem',
      'btnDel' : '.cartdel',
      'btnChg' : '.cartchg',
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
        amount = amount*1;
        var searchID = null;

        searchID = obj.id;

        search = __search(elementToSet, searchID); // Search Item into Cart Object

        // Ja existe o item
        if (search !== false) {

          newAmount = elementToSet[search]['amount'];
          newAmount = (newAmount)?newAmount+amount:amount;

          elementToSet[search]['amount'] = newAmount;

        } else {
          // Item ainda nao existente
          obj['amount'] = amount; // Default is 1
          elementToSet.push( obj );
        }
      }; // end __add


      /**/
      __del = function(element, key) {
        if (element.length <=1 ) {
          // Zera E Remove o primeiro
          element.shift();

          console.log(Object.keys(element));
          console.log(element);
        } else if (element.length <=1 && key==0) {
          // Remove o primeiro
          element.shift();
        } else if (element.length == (key+1) ) {
          // Remove o ultimo elemento
          element.pop();
        } else {
          // Remove qualquer que nao seja o extremo
          // Coloca o ultimo elemento no lugar (reindex)
          element[key] = element.pop();          
        }
      }; // end __del


      /**/
      __change = function (info, amount) {
        amount = amount*1;

        search = __search(cart.itens[info.category], info.id); // Search Item into Cart Object

        // Ja existe o item, apenas aumenta a quantidade
        if (search !== false && amount>0) {
          console.log('existe, att');
          cart.itens[info.category][search]['amount'] = amount;
        }

        // Remove o item
        if (search !== false && amount<=0) {
          __del(cart.itens[info.category], search);
        }

      }; // end __change


      /*
      * Remove o Item inteiro do cart
      */
      __remove = function (info) {        
        search = __search(cart.itens[info.category], info.id); // Search Item into Cart Object

        if (search !== false) {
          __del(cart.itens[info.category], search);
        }

      }; // end __change


      /*
      * Search Item, passing needle and object to loop
      * return Item ID if found (number)
      * return false if not found
      */
      __search = function (obj, idSearch) {
        for (key in obj) {
          item = obj[key];
          if(item.id == idSearch) {
            return key*1; // to number
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
      /*
      * CORE
      * Responsavel por identificar a acao e executala (incremento, decremento)
      * Todas as acoes devem passar por aqui
      */
      _core = function(type, args, amount) {

        if (type=='change') {

          __change(args, amount);

        } else if (type=='add') {
          var json = JSON.parse(args),
            key = Object.keys(json)[0], // Maybe a category name
            data = json[key]; // Object (category->json)

             if (!amount) {
              amount = 1;
            }        

            // IS "NODO" (category)
            if (key!="" && key!='undefined' && key!=null && (typeof(data)=='object' || type=='change') ) {
              // Nao existe esse "NODO"
              if (!cart.itens[key]) {
                cart.itens[key] = []; // Create "NODO"
                __add(cart.itens[key], data, amount); // First ITEM
              } else {
                __add(cart.itens[key], data, amount);
              }
            } else {
              // UNIQUE (without 'category') - Commom Item
              __add(cart.itens.default, json, amount);
            }

        } else if (type=='remove') {
          //
          __remove(args);
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
      // Clicked add to cart ONE ITEM (amount)
      $(settings['btnAdd'], element).bind('click', function(){
        _core('add', $(this).attr('data-cart'));
      });

      // Clicked Remove (Remove Item)
      $(settings['btnRem'], element).bind('click', function(){
        var o = $(this),
        parent = o.parent().parent(),
        category = parent.data('category'),
        idItem = parent.data('id');

        var args = {
          'category': category,
          'id': idItem,
        };

        parent.hide();

        _core('remove', args, 0);
      });

      // When Change
      $(settings['btnChg'], element).bind('change', function(){
        var o = $(this),
        amount = o.val(),
        parent = o.parent().parent(),
        category = parent.data('category'),
        idItem = parent.data('id');

        var args = {
          'category': category,
          'id': idItem,
        };

        if (amount <= 0) {
         alert('nao e possivel zerar');
         o.val(1);
         return false;
        }

        _core('change', args, amount);
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