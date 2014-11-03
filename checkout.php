<h3>CheckOut !</h3>

<?php
$cart = stripcslashes($_COOKIE['cart']);
$cart = json_decode($cart);
?>

<table>
  <tr>
    <th>ID</th>
    <th>Nome</th>
    <th>Preço</th>
    <th>Quantidade</th>
    <th>Remover</th>
  </tr>

  <?php
  foreach ($cart AS $cat => $itens) {
    if (!empty($itens)) {
      foreach ($itens AS $key => $item) {
        echo "<tr data-category=\"{$cat}\" data-id=\"{$item->id}\">";
        echo "  <td>{$item->id}</td>";
        echo "  <td>{$item->name}</td>";
        echo "  <td>{$item->price}</td>";
        echo "  <td><input class=\"amountItem\" type=\"number\" value=\"{$item->amount}\"/></td>";
        echo "  <td><button class=\"removerItem\">Remover</button></td>";
        echo "</tr>\n";
      }
    }
  }
  ?>

  
  
</table>