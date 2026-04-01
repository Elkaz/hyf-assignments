import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";

class Customer {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    order.status = "confirmed";
    this.orders.push(order);
    return order;
  }

  totalSpent() {
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }

  getOrderHistory() {
    let history = `${this.name} (${this.email}) - ${this.orders.length} orders\n\n`;

    this.orders.forEach((order, index) => {
      history += `Order ${index + 1} (${order.status}) - ${order.items.length} item${order.items.length > 1 ? "s" : ""}\n`;
      order.items.forEach((item) => {
        history += `  ${item.describe()}\n`;
      });
      history += `Total: ${order.getTotal().toFixed(2)} DKK\n\n`;
    });

    history += `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;

    return history;
  }
}

// Export Customer class
export { Customer };

// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

// Order 1
const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // 100g Sencha
customer.placeOrder(order1);

// Order 2
const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // 50g Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
