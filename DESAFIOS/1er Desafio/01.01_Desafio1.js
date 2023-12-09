class ProductManager {
  constructor(){
      this.products = []
  }
  getProducts(){
      return this.products
  }
  addProducts(product){
      if( !product.title ||
          !product.description ||
          !product.price ||
          !product.thumbnail ||
          !product.code ||
          !product.stock)
          {
              return 'Faltan llenar campos del producto'
          }
          const result = this.products.find( prod => prod.code === product.code)
          if (result){
              return 'Product already exists'
          }
          if(this.products.length === 0){
              product.id =1
              this.products.push( product)
          }else{
              product.id = this.products.length+1
              this.products.push( product)
          }
          return 'Producto grabado'
  }

  getProductById(pid){
      const result = this.products.find(prod => prod.id === pid)
      if(!result){
          return 'not found'
      }
      return result
  }
}

const products = new ProductManager()
console.log(products.addProduct({title:'producto uno', description: 'esto es un producto', price: 1000, thumbnail: 'imagen', stock: 150, code:'abc123'}))
console.log(products.addProduct({title:'producto dos', description: 'esto es un producto2', price: 2000, thumbnail: 'imagen', stock: 150, code:'abc1234'}))
console.log(products.getProductById(3))