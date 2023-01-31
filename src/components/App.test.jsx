import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import App from './App' 

describe('App Component', () => {
    let container

    beforeEach(function() {
        container = render(<BrowserRouter><App /></BrowserRouter>).container
    })
    it('Shows the Sticker Shop Brand heading', () => {
        expect(container.querySelector('h1')).toBeDefined()
        expect(container.querySelector('h1')).toHaveTextContent('The Sticker Brand')
    })
    it('Show shop intro', () => {
        expect(container.querySelector("#intro")).toBeDefined()
        expect(container.querySelector("#intro").innerHTML).toMatch(new RegExp('Introduction'))
    })
    it('Show Products heading', () => {
        expect(container.querySelector('h2')).toBeDefined()
        expect(container.querySelector('h2')).toHaveTextContent('Products')
    })
    it('Should render a list of product snapshots each with an image, name, price, and view detail button', () => {
        const images = container.querySelectorAll('.card-img-top')
        const names = container.querySelectorAll('.product-name')
        const prices = container.querySelectorAll('.product-price')
        const buttons = screen.getAllByText('View Details')

        expect(images.length).toBeGreaterThanOrEqual(1)
        expect(names.length).toBeGreaterThanOrEqual(1)
        expect(prices.length).toBeGreaterThanOrEqual(1)
        expect(buttons.length).toBeGreaterThanOrEqual(1)

        expect(container.querySelectorAll('.product-snapshot')).toBeDefined()
        expect(container.querySelectorAll('.product-snapshot').length).toBeGreaterThanOrEqual(1)

        container.querySelectorAll('.product-snapshot').forEach((album, index) => {
            expect(album).toContainElement(images[index])
            expect(album).toContainElement(names[index])
            expect(album).toContainElement(prices[index])
            expect(album).toContainElement(buttons[index])
        })
    })
    it('Show detail page of first product when a corresponding "View Details" is clicked', async () => {
        const toDetails = screen.getAllByText('View Details')
        const toFirstProduct = toDetails[0]
        await userEvent.click(toFirstProduct)
        const carousel = container.querySelector('.carousel-inner')
        expect(carousel).toBeDefined()
    })
})