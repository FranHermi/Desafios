import { 
    UserDao, 
    ProductDao, 
    OrderDao, 
    CartDao 
} from '../Dao/factory.js'

import ProductRepositories from '../repositories/product.repositories.js'
import UserRpositories from '../repositories/user.repositories.js'
import OrderRepositories from '../repositories/orders.repository.js'
import CartRepositories from '../repositories/cart.repositories.js'


export const userService = new UserRpositories(new UserDao())
export const productService = new ProductRepositories(new ProductDao())
export const cartService = new CartRepositories(new CartDao())
export const orderService = new OrderRepositories(new OrderDao())
