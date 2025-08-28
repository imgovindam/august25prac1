
import { Drawer } from "antd";

function Cart({ cartItems, removeFromCart }) {

  console.log(cartItems);
  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <div>
              <p>{item.name}</p>
              <img src={item.thumbnail} />
            </div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>

        
        ))
      )}
    </div>
  );
}

export default Cart;
