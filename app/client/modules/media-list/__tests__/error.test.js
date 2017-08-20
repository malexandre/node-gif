import React from 'react'
import { shallow } from 'enzyme'

import Error from '../error'

test('Error does not display an alert if props.error is falsy', () => {
    const item = shallow(<Error />)

    expect(item.type()).toEqual(null)
})

test('Error displays alert if props.error is truthy', () => {
    const item = shallow(<Error error="Test" />)

    expect(item.type()).toEqual('div')
    expect(item.hasClass('alert')).toEqual(true)
    expect(item.hasClass('alert-danger')).toEqual(true)
    expect(item.hasClass('text-center')).toEqual(true)
    expect(item.text()).toEqual('Test')
})
