import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import  userEvent  from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import Checkout from "../src/components/Checkout"

const order = {cart: [{}, {}, {}]}
const total = 123
const address = {}
const setAddress = vi.fn()
const addAddressToOrder = vi.fn()
const addTotalToOrder = vi.fn()
const addOrderToOrders = vi.fn()

// Unit test for the Checkout Component: test that the input validation works
describe('Checkout Component', () => {
    let container

    beforeEach(function() {
        container = render(<BrowserRouter><Checkout address={address} setAddress={setAddress} addAddressToOrder={addAddressToOrder} total={total} addTotalToOrder={addTotalToOrder} order={order} addOrderToOrders={addOrderToOrders}/></BrowserRouter>).container
    })
    it('Should render all the fields', () => {
        expect(container.querySelector('#email')).toBeInTheDocument()
        expect(container.querySelector('#confirm-email')).toBeInTheDocument()
        expect(container.querySelector('#firstName')).toBeInTheDocument()
        expect(container.querySelector('#lastName')).toBeInTheDocument()
        expect(container.querySelector('#phone')).toBeInTheDocument()
        expect(container.querySelector('#address')).toBeInTheDocument()
        expect(container.querySelector('#address2')).toBeInTheDocument()
        expect(container.querySelector('#suburb')).toBeInTheDocument()
        expect(container.querySelector('#state')).toBeInTheDocument()
        expect(container.querySelector('#postcode')).toBeInTheDocument()
    })
    it('Should validate form fields and render an error message', async () => {
        await userEvent.type(container.querySelector('#email'), "Lorem ipsum dolor sit amet,")

        await userEvent.type(container.querySelector('#confirm-email'), "asdfawerasdf,")
        
        await userEvent.type(container.querySelector('#firstName'), "L,")

        await userEvent.type(container.querySelector('#lastName'), "2R")

        await userEvent.type(container.querySelector('#phone'), "2Rsd234")

        await userEvent.type(container.querySelector('#address'), "@#")

        await userEvent.type(container.querySelector('#address2'), "%!")

        await userEvent.type(container.querySelector('#suburb'), "23Se")

        await userEvent.selectOptions(container.querySelector('#state'), "Please select...")

        await userEvent.type(container.querySelector('#postcode'), "23Se")

        await userEvent.click(container.querySelector('#submit'))

        expect(await container.querySelectorAll('p')).toHaveLength(10)
        expect(addOrderToOrders).not.toHaveBeenCalled()
    })
    it('should submit correct form data', async () => {
        await userEvent.type(container.querySelector('#email'), "email@gmail.com")

        await userEvent.type(container.querySelector('#confirm-email'), "email@gmail.com")
        
        await userEvent.type(container.querySelector('#firstName'), "Jane")

        await userEvent.type(container.querySelector('#lastName'), "Hopper")

        await userEvent.type(container.querySelector('#phone'), "0430000000")

        await userEvent.type(container.querySelector('#address'), "123 Main St")

        await userEvent.type(container.querySelector('#address2'), "Aurora")

        await userEvent.type(container.querySelector('#suburb'), "Melbourne")

        await userEvent.selectOptions(container.querySelector('#state'), "VIC")

        await userEvent.type(container.querySelector('#postcode'), "3000")

        await userEvent.click(container.querySelector('#submit'))

        expect(addOrderToOrders).toHaveBeenCalled()
    })
})