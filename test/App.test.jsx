import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import App from '../src/components/App'
import { unmountComponentAtNode } from 'react-dom'
import { act } from "react-dom/test-utils"
import { vi } from "vitest"

const fakeProducts = [
    {
        _id: "asdfawertq345adasd",
        name: "product1",
        price: 4,
        description: "This is the description for product 1",
        imageLinks: [
            "https://imagelink1.com",
            "https://imagelink2.com",
            "https://imagelink3.com"
        ]
    },
    {
        _id: "asdfawertqasdf5adasd",
        name: "product2",
        price: 5,
        description: "This is the description for product 2",
        imageLinks: [
            "https://imagelink4.com",
            "https://imagelink5.com",
            "https://imagelink6.com"
        ]
    }
]

global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve(fakeProducts)
}))

// Integration Test: Users can view a list of product in Home page and view product details in Detail page for each product
describe('View products', () => {
    
    let container

    beforeEach(async function() {
        // container = document.createElement("div")
        // document.body.appendChild(container)

        // await act(async () => {
        //     render(<BrowserRouter><App /></BrowserRouter>, container)
        // })
        container = render(<BrowserRouter><App /></BrowserRouter>).container
    })

    // afterEach(() => {
    //     unmountComponentAtNode(container)
    //     container.remove()
    //     container = null
    // })

    // In Home Page:
    it('Shows the Sticker Shop Brand heading', () => {
        expect(container.querySelector('h1')).toBeDefined()
        expect(container.querySelector('h1')).toHaveTextContent('Smoonypaws')
    })
    it('Show shop intro', () => {
        expect(container.querySelector("#intro")).toBeDefined()
        expect(container.querySelector("#intro").innerHTML).toMatch(new RegExp('stickers'))
    })
    it('Show Products heading', () => {
        expect(container.querySelector('h2')).toBeDefined()
        expect(container.querySelector('h2')).toHaveTextContent('Products')
    })
    it('Should render a list of (at least 2) product snapshots each with an image, name, price, and view detail button', async () => {

        // vi.spyOn(global, "fetch").mockImplementation(() => 
        //     Promise.resolve({
        //         json: () => Promise.resolve(fakeProducts)
        //     }))

        const images = container.querySelectorAll('.card-img-top')
        const names = container.querySelectorAll('.product-name')
        const prices = container.querySelectorAll('.product-price')
        const buttons = screen.getAllByText('View Details')

        // await waitFor(() => expect(images).toBeInTheDocument())

        expect(images.length).toBeGreaterThanOrEqual(2)
        expect(names.length).toBeGreaterThanOrEqual(2)
        expect(prices.length).toBeGreaterThanOrEqual(2)
        expect(buttons.length).toBeGreaterThanOrEqual(2)

        expect(container.querySelectorAll('.product-snapshot')).toBeDefined()
        expect(container.querySelectorAll('.product-snapshot').length).toBeGreaterThanOrEqual(2)

        container.querySelectorAll('.product-snapshot').forEach((album, index) => {
            expect(album).toContainElement(images[index])
            expect(album).toContainElement(names[index])
            expect(album).toContainElement(prices[index])
            expect(album).toContainElement(buttons[index])
        })
    })
    // In Detail page:
    it('Show detail page of first product when a corresponding "View Details" is clicked', async () => {
        const toDetails = screen.getAllByText('View Details')
        const toFirstProduct = toDetails[0]
        await userEvent.click(toFirstProduct)

        const detailImages = screen.getAllByAltText('product-detail-image')
        const productName = container.querySelector('.product-detail-name')
        const productPrice = container.querySelector('.product-detail-price')
        const description = container.querySelector('.detail-description')
        const button = container.querySelector('#add-product')

        expect(detailImages).toBeDefined()
        expect(detailImages).toHaveLength(3)

        expect(productName).toBeDefined() 
        expect(productName.innerHTML.length).toBeGreaterThanOrEqual(2)

        expect(productPrice).toBeDefined()
        expect(productPrice.innerHTML.length).toBeGreaterThanOrEqual(9)

        expect(description).toBeDefined()
        expect(description.innerHTML.length).toBeGreaterThanOrEqual(15)
        expect(button).toBeDefined()
        expect(button).toHaveTextContent('Add to Cart')
    })
})

// Integration test: User can add product to cart by clicking the 'Add to Cart' button and manipulate the selected product
describe('Add the first product to cart', () => {
    let container

    beforeEach(async function() {
        container = render(<BrowserRouter><App /></BrowserRouter>).container
        const button = container.querySelector('#add-product')
        await userEvent.click(button)
    })
    // in Navbar:
    it('Click "Add to Cart" and cart notification in Navbar will be updated', () => {

        const notification = container.querySelector('#cart-notification')
        expect(notification.innerHTML).toBe('1')
    })
    // in Cart:
    it('Added product will show up in cart', async () => {
        const cart = container.querySelector('#to-cart')
        await userEvent.click(cart)
        
        const title = container.querySelector('h2')
        expect(title).toHaveTextContent('Cart')

        const productName = container.querySelector('#product-name-in-cart')
        expect(productName).toBeDefined()
        expect(productName.innerHTML.length).toBeGreaterThanOrEqual(2)

        const productPrice = container.querySelector('#product-price-in-cart')
        expect(productPrice).toBeDefined()
        expect(productPrice.innerHTML.length).toBeGreaterThanOrEqual(9)
        expect(productPrice.innerHTML).toMatch(new RegExp('Price: $'))

        const quantity = container.querySelector('input')
        expect(quantity).toBeDefined()
        expect(quantity).toHaveValue('1')

        await userEvent.type(quantity, '3')
        expect(quantity).toHaveValue('13')

        const subtotal = container.querySelector('#cart-subtotal')
        expect(subtotal).toBeDefined()
        expect(subtotal.innerHTML.length).toBeGreaterThanOrEqual(12)
        expect(subtotal.innerHTML).toMatch(new RegExp('Subtotal: $'))

        const total = container.querySelector('#cart-total')
        expect(total).toBeDefined()
        expect(total.innerHTML.length).toBeGreaterThanOrEqual(17)
        expect(total.innerHTML).toMatch(new RegExp('Total Payable: $'))
    })
})