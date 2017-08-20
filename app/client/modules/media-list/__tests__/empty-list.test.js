import React from 'react'
import { shallow } from 'enzyme'

import EmptyList from '../empty-list'

test('EmptyList displays alert if props.items is empty and props.loading is false', () => {
    const item = shallow(<EmptyList />)

    expect(item.type()).toEqual('div')
    expect(item.hasClass('alert')).toEqual(true)
    expect(item.hasClass('alert-secondary')).toEqual(true)
    expect(item.hasClass('text-center')).toEqual(true)
    expect(item.text()).toEqual('No items to display')
})

test('EmptyList does not display an alert if props.loading is true', () => {
    const item = shallow(<EmptyList loading={ true } />)

    expect(item.type()).toEqual(null)
})

test('EmptyList does not display an alert if props.items is not empty', () => {
    const item = shallow(<EmptyList items={ [0] } />)

    expect(item.type()).toEqual(null)
})
