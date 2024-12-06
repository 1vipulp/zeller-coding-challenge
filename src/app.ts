import { CartItems } from './interface';

const priceMap = new Map<string, number>([
  ['ipd', 549.99],
  ['mbp', 1399.99],
  ['atv', 109.50],
  ['vga', 30.00],
]);

export class EStore {
  hashmap: Map<string, number> = new Map();
  cartItems: CartItems[] = [];

  scan(sku: 'vga' | 'atv' | 'mbp' | 'ipd') {
    this.hashmap.set(sku, Number(this.hashmap.get(sku) || 0) + 1);
  }

  // removeItem(sku: 'vga' | 'atv' | 'mbp' | 'ipd') {
  //   if(!this.hashmap.has(sku)) {
  //     return;
  //   }
  //   const availableQuantity: number = this.hashmap.get(sku) ?? 0;
  //   if (availableQuantity === 1) {
  //     this.hashmap.delete(sku);
  //   } else {
  //     this.hashmap.set(sku, availableQuantity - 1);
  //   }
  // }

  total() {
    let totalPrice = 0;
    this.hashmap.forEach((quantity: number, item: string) => {
      switch(item) {
        case 'atv':
          const eligibleSets = Math.floor(quantity / 3);
          const remaining = quantity % 3;
          totalPrice += eligibleSets * 2 * priceMap.get('atv')! + remaining * priceMap.get('atv')!;
          break;
        case 'ipd':
          if (quantity > 4) {
            totalPrice += quantity * 499.99; // Discounted price
          } else {
            totalPrice += quantity * priceMap.get('ipd')!;
          }
          break;
        case 'mbp':
        case 'vga':
          totalPrice += quantity * priceMap.get(item)!;
          break;
        default:
          console.warn(`Invalid item detected = ${item}`);
      }
    });
    console.info(`Total = $${totalPrice}`);
  }

  printHashMap() {
    console.log(this.hashmap);
  }
};

(() => {
  console.info("\n\nWelcome to Zeller eStore\n");
  const eStore = new EStore();
  eStore.scan('atv');
  eStore.scan('ipd');
  eStore.scan('ipd');
  eStore.scan('atv');
  eStore.scan('ipd');
  eStore.scan('ipd');
  eStore.scan('ipd');
  eStore.total();
  eStore.printHashMap();
})();