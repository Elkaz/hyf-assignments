import { teas } from "./teas.js";
import { Tea } from "./exercise1.js";
import { Order, OrderItem } from "./exercise2.js";
import { Inventory } from "./exercise3.js";
import { Customer } from "./exercise4.js";

class TeaShop {
  constructor(teaData) {
    // Create a TeaCatalog from the data
    this.teas = teaData.map(Tea.fromObject);
    this.teaMap = new Map();

    this.teas.forEach((tea) => {
      this.teaMap.set(tea.name, tea);
    });

    // Create an Inventory from the data
    this.inventory = new Inventory();

    teaData.forEach((teaObj) => {
      const tea = Tea.fromObject(teaObj);
      this.inventory.add(tea, teaObj.stockCount || 0);
    });

    // Store customers as an empty array
    this.customers = [];
  }

  registerCustomer(name, email) {
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    const order = new Order();

    for (const item of items) {
      const { teaName, grams } = item;

      // 1. Find each tea in the catalog

      const tea = this.teaMap.get(teaName);
      if (!tea) {
        throw new Error(`Tea not found: ${teaName}`);
      }

      // 2. Check stock in inventory
      const currentStock = this.inventory.getStock(teaName);
      if (currentStock < grams) {
        throw new Error(
          `Not enough stock for ${teaName}. Only ${currentStock}g available`,
        );
      }

      // 3. Create OrderItems and an Order
      const orderItem = new OrderItem(tea, grams);
      order.addItem(orderItem);

      // 4. Sell from inventory
      this.inventory.sell(teaName, grams);
    }

    // 5. Place order on the customer
    customer.placeOrder(order);

    // 6. Return the order
    return order;
  }

  getReport() {
    // Return a shop report:
    // - Total customers
    const totalCustomers = this.customers.length;

    // - Total orders
    const totalOrders = this.customers.reduce((total, customer) => {
      return total + customer.orders.length;
    }, 0);

    // - Total revenue
    const totalRevenue = this.customers.reduce((total, customer) => {
      return total + customer.totalSpent();
    }, 0);

    // - Low stock items
    const lowStockItems = this.inventory.getLowStock(50);

    // Build report string
    const lines = [
      ``,
      `=== TEA SHOP REPORT ===`,
      `Total customers: ${totalCustomers}`,
      `Total orders: ${totalOrders}`,
      `Total revenue: ${totalRevenue.toFixed(2)} DKK`,
      ``,
      `Low stock items (Less than 50g):`,
    ];

    if (lowStockItems.length === 0) {
      lines.push(`None`);
    } else {
      lowStockItems.forEach((item) => {
        lines.push(`  - ${item.tea.name}: ${item.stockCount}g`);
      });
    }

    return lines.join("\n");
  }
}

// Test:
const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Matcha", grams: 50 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());
