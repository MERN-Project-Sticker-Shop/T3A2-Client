import AddedProduct from '../src/components/AddedProduct'
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import { vi } from 'vitest'

const item = {product: "product", price: 4, quantity: 1, imageLink: "fake_link"}
const cartId = "asdfw25435sdfgrt"

const setCart = vi.fn()
const setTotal = vi.fn()

// global.fetch = vi.fn(() => 
//     Promise.resolve({
//         json: () => Promise.resolve()
//     }))

// Unit test for AddedProduct Component: testing the validation of user input of the product quantity
describe('AddedProduct Component', () => {
    let container

    beforeEach(function() {
        container = render(<AddedProduct item={item} setCart={setCart} setTotal={setTotal} cartId={cartId}/>).container
    })
    it('render all elements as required', () => {
        const productName = container.querySelector('#product-name-in-cart')
        expect(productName).toBeInTheDocument()

        const productPrice = container.querySelector('#product-price-in-cart')
        expect(productPrice).toBeInTheDocument()

        const quantity = container.querySelector('input')
        expect(quantity).toBeInTheDocument()

        const subtotal = container.querySelector('#cart-subtotal')
        expect(subtotal).toBeInTheDocument()

        const deleteIcon = container.querySelector('button')
        expect(deleteIcon).toBeInTheDocument()
    })
    it('should update quantity when user enter correct input', async () => {
        await userEvent.type(container.querySelector('input'), '4')
        expect(container.querySelector('input')).toHaveValue('14')
        expect(setTotal).toHaveBeenCalled()
    })
    it('should update quantity when user double click input area and enter correct input', async () => {
        await userEvent.dblClick(container.querySelector('input'))
        await userEvent.type(container.querySelector('input'), '4', {skipClick: true})
        expect(container.querySelector('input')).toHaveValue('4')
        expect(setTotal).toHaveBeenCalled()
    })
    it('should render error message when input is invalid', async() => {
        await userEvent.type(container.querySelector('input'), 'r')
        expect(container.querySelector('input')).toHaveValue(' ')
        expect(container.querySelector('#alert')).toBeInTheDocument()
        expect(container.querySelector('#alert')).toHaveTextContent('Quantity can only be a positive integer')
        expect(setTotal).toHaveBeenCalled()
    })
    // it('should update cart when the trash icon is clicked', async() => {
    //     await userEvent.click(container.querySelector('button'))
    //     expect(setCart).toHaveBeenCalled()
    // })
})

