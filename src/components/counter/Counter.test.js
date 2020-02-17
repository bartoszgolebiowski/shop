import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Counter from './Counter'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
        value: 0,
    }

    const enzymeWrapper = shallow(<Counter {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('components', () => {
    describe('Counter', () => {
        it('should render self', () => {
            const { enzymeWrapper } = setup()
            expect(enzymeWrapper.length).toEqual(1)
        })
    })
})