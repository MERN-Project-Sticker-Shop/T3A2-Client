import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import App from '../src/components/App'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const productsResponse = rest.get("https://t3a2-server-production.up.railway.app/products", async (req, res, ctx) => {
    const originalResponse = await ctx.fetch(req)
    const originalResponseData = await originalResponse.json()
    return res(ctx.json(originalResponseData))
})

const handlers = [productsResponse]

const server = setupServer(...handlers)


// Integration Test: Users can view a list of product in Home page and view product details in Detail page for each product
describe('View products', () => {

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    
    let container

    beforeEach(async function() {

        container = render(<BrowserRouter><App /></BrowserRouter>).container
    })

    // In Home Page:
    it('Shows the Sticker Shop Banner', () => {
        expect(container.querySelector('#banner')).toBeDefined()
        expect(container.querySelector('h3')).toHaveTextContent('Smoonypaws Banner')
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

        // wait until the image of the first product is rendered
        await waitFor(() => {
            expect(container.querySelector('.card-img-top')).toBeInTheDocument()
        })

        const images = container.querySelectorAll('.card-img-top')
        const names = container.querySelectorAll('.product-name')
        const prices = container.querySelectorAll('.product-price')
        const buttons = container.querySelectorAll('button')

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
        await waitFor(() => {
            expect(container.querySelector('button')).toBeVisible()
        })

        await userEvent.click(container.querySelector('button'))

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

