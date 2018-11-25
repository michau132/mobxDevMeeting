import {observable, action, computed, runInAction} from 'mobx';
import products from '../../products';

class ProductStore {
  @observable products = []
  @observable searchInputVal = ''
  @observable direction = {
    price: 1,
    name: 1,
  }
  
  sortData(a, b, param) {
    if (a[param] > b[param]) {
      return  (-1 * this.direction[param]);
    }
    if (a[param] < b[param]) {
      return this.direction[param];
    }
    return 0;
  }
  
   fetchData() {
     //fake reqest to api delayed after 1 second
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products)
        reject('errror')
      }, 1000)
    })
    return promise;
  }
  
  @action getData = () => {
    const response = this.fetchData();
    response.then(data =>
      runInAction('update products after fetching', () => {
        this.products = data
      })
    )
  }
  
  @action removeProductFromBasketStore(id) {
    const products = this.products.map(p => p.id === id
      ? { ...p, isSold: false }
      : p
    )
    this.products = products;
  }
  
  @action sortByPrice() {
    const sortedProducts = this.products.sort((a,b) => this.sortData(a, b, 'price'));
    this.direction = {...this.direction, price: this.direction.price * -1}
    this.products = sortedProducts
  }
  
  @action sortByName() {
    const sortedProducts = this.products.sort((a,b) => this.sortData(a, b, 'name'));
    this.direction = {...this.direction, name: this.direction.name * -1};
    this.products = sortedProducts;
  }
  
  @action onBuyClick(id) {
    const products = this.products.map(p => p.id === id
      ? { ...p, isSold: true }
      : p
    )
    this.products = products;
  }
  
  @action onSearchName(val) {
    const products = this.products.map(item => ((val.length > 0 && item.name.includes(val)) ? {...item, isFounded: true} : {...item, isFounded:false}))
    this.products = products;
    this.searchInputVal = val;
  }
  
  @computed get soldProductsNumber() {
    return this.products.filter(prod => prod.isSold).length;
  }
}

export default new ProductStore();
