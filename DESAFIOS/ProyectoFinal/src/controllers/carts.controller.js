import cartService  from '../servicios'


export class CartsController {
    getCarts =  async (req, res) => {
        try {
            const carts = await cartService.getCarts()
            res.status(200).json({
                status: 'success',
                payload: carts
            })        
        } catch (error) {
            console.log(error)
        }
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params
            const cart = await cartService.getCart(cid)
            if (!cart) {
                return res.status(401).render({
                    status: 'error',
                    message: 'Cart not found'
                })
                
            }
            res.status(200).json({
                cart
            })            
        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (req, res) => {
        try {
            const resp = await cartService.createCart()
            if (!resp) {
                return res.status(404).json(resp)
            }        
            res.status(200).json(resp) 
        } catch (error) {
            console.log(err)
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const product = { id: pid, quantity }
            const resp = await cartService.addProductToCart(cid, product)
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json({
                status: 'success', 
                message: 'Product added to cart'
            })        
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductFromCart  = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const resp = await cartService.deleteProductFromCart(cid, pid)
            if (!resp) return cartService.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json({
                status: 'success',
                message: 'Product deleted from cart'
            })        
        } catch (error) {
            console.log(error)
        }
    }

    deleteCart = async (req, res) => {
        try {
            const { cid } = req.params
            const resp = await cartService.deleteCart(cid) 
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json(resp)
        } catch (error) {
            console.log(error)
        }
    }

    checkoutCart = async (req, res) => {
        const {cid} = req.params
        console.log(cid)
        res.json({
            status: 'success',
            message: 'Purchase completed',
        })
    }
    

    
}