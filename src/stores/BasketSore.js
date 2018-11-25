import { observable, action } from 'mobx';

class BasketStore {
  
  @observable productsInBasket = [];
  
  @action addNewProductToStore (product) {
    this.productsInBasket = [...this.productsInBasket, product];
  }
  
  @action removeProductFromStore (id) {
    const restProducts = this.productsInBasket.filter(item => item.id !== id);
    this.productsInBasket = restProducts;
  }
}

export default new BasketStore;
