import React from 'react'
import { shallow } from 'enzyme'

import LoaderList from '../loader'

test('LoaderList does not display an alert if props.loading is false', () => {
    const item = shallow(<LoaderList />)

    expect(item.type()).toEqual(null)
})

test('LoaderList displays alert if props.loading is true', () => {
    const item = shallow(<LoaderList loading={ true } />)

    expect(item.type()).toEqual('div')
    expect(item.hasClass('alert')).toEqual(true)
    expect(item.hasClass('alert-secondary')).toEqual(true)
    expect(item.hasClass('text-center')).toEqual(true)
    expect(item.text()).toEqual('Loading in progress')
})
