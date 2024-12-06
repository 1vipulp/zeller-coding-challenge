import { EStore } from '../app';

describe('EStore', () => {
  let eStore: EStore;

  beforeEach(() => {
    eStore = new EStore();
  });

  describe('scan', () => {
    it('should add an item to the hashmap/cart', () => {
      eStore.scan('atv');
      expect(eStore.hashmap.get('atv')).toBe(1);
    });

    it('should increment quantity for existing items', () => {
      eStore.scan('atv');
      eStore.scan('atv');
      expect(eStore.hashmap.get('atv')).toBe(2);
    });
  });

  describe('total', () => {
    describe('atv deals', () => {
      it('should apply 3-for-2 deal on Apple TV', () => {
        // Buy 3 Apple TVs, pay for 2
        eStore.scan('atv');
        eStore.scan('atv');
        eStore.scan('atv');
        
        const consoleSpy = jest.spyOn(console, 'info');
        eStore.total();
        
        expect(consoleSpy).toHaveBeenCalledWith('Total = $219');
      });
    });

    describe('ipd deals', () => {
      it('should apply bulk discount when buying more than 4 iPads', () => {
        // Price drops to $499.99 each when buying more than 4
        eStore.scan('ipd');
        eStore.scan('ipd');
        eStore.scan('ipd');
        eStore.scan('ipd');
        eStore.scan('ipd');
        
        const consoleSpy = jest.spyOn(console, 'info');
        eStore.total();
        
        expect(consoleSpy).toHaveBeenCalledWith('Total = $2499.95');
      });

      it('should use regular price when buying 4 or fewer iPads', () => {
        eStore.scan('ipd');
        eStore.scan('ipd');
        
        const consoleSpy = jest.spyOn(console, 'info');
        eStore.total();
        
        expect(consoleSpy).toHaveBeenCalledWith('Total = $1099.98');
      });
    });

    describe('Mixed items', () => {
      it('should calculate total correctly for mixed items', () => {
        eStore.scan('atv');
        eStore.scan('ipd');
        eStore.scan('ipd');
        eStore.scan('atv');
        eStore.scan('ipd');
        eStore.scan('ipd');
        eStore.scan('ipd');
        
        const consoleSpy = jest.spyOn(console, 'info');
        eStore.total();
        
        // 2 ATVs ($219) + 5 iPads at bulk discount ($2499.95)
        expect(consoleSpy).toHaveBeenCalledWith('Total = $2718.95');
      });
    });
  });
});
