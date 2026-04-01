import { teas } from "./teas.js";

// Build a complete Tea class with validation and a static factory method.

class Tea {
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name || name === "") {
      throw new Error("Name is required");
    }

    if (pricePerGram < 0) {
      throw new Error("Price must be positive");
    }

    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }

    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    // Return price for given weight
    return this.pricePerGram * grams;
  }

  describe() {
    // Return "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
    // Only include "[organic]" if the tea is organic
    const priceFor100g = (this.pricePerGram * 100).toFixed(2);
    const organicLabel = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${priceFor100g} DKK/100g${organicLabel}`;
  }

  static fromObject(obj) {
    // Create a Tea from a plain object (like from the data file)
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
    );
  }
}

// Export the Tea class
export { Tea };

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Name is required"

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Invalid type: purple"

// Test factory method:
const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length); // 20
console.log(teaInstances[0].describe());
// "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
console.log(teaInstances[1].describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"
