  <ul id="mycart">
    
    <li>
      Product Name: Lapis <br/>
      Product Price: R$ 120,00 <br/>
      <button class="cartadd" data-cart='<?php echo json_encode(array('id'=>33, 'name'=>'Lapis', 'price'=>'120,00')) ?>'>Adicionar</button>
    </li>

    <li>
      Product Name: Borracha <br/>
      Product Price: R$ 1,50 <br/>
      <button class="cartadd" data-cart='<?php echo json_encode(array('id'=>57, 'name'=>'Borracha', 'price'=>'1,50')) ?>'>Adicionar</button>
    </li>

    <li>
      Product Name: Caneta <br/>
      Product Price: R$ 20,30 <br/>
      <button class="cartadd" data-cart='<?php echo json_encode(array('id'=>24, 'name'=>'Caneta', 'price'=>'20,30')) ?>'>Adicionar</button>
    </li>

    <li>
      Product Name: Banana <br/>
      Product Price: R$ 1,10 <br/>
      <button class="cartadd" data-cart='<?php echo json_encode(array('frutas'=>array('id'=>12, 'name'=>'Banana', 'price'=>'1,10'))) ?>'>Adicionar</button>
    </li>

    <li>
      Product Name: Maca <br/>
      Product Price: R$ 1,10 <br/>
      <button class="cartadd" data-cart='<?php echo json_encode(array('frutas'=>array('id'=>19, 'name'=>'Maca', 'price'=>'2,50'))) ?>'>Adicionar</button>
    </li>

  </ul>
