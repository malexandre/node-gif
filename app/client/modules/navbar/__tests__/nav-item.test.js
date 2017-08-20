import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import NavItem from '../nav-item'

test('NavItem displays a link inside a li', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavItem to="" label="" />
        </MemoryRouter>
    )

    expect(item.find('li').length).toEqual(1)
    expect(item.find('a').length).toEqual(1)
})

test('NavItem use "to" props as href to the link, and "label" as text', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavItem to={ '/test-route' } label={ 'Test Link' } />
        </MemoryRouter>
    )

    expect(item.find('a').prop('href')).toEqual('/test-route')
    expect(item.find('a').text()).toEqual('Test Link')
})

test('NavItem has "nav-item" class for li and "nav-link" for a if the current location is not "props.to"', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavItem to={ '/test-route' } label={ 'Test Link' } />
        </MemoryRouter>
    )

    expect(item.find('li').hasClass('nav-item')).toEqual(true)
    expect(item.find('li').hasClass('active')).toEqual(false)

    expect(item.find('a').hasClass('nav-link')).toEqual(true)
})

test('NavItem has "nav-item actuve" classes for li and "nav-link" for a if the current location is "props.to"', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/test-route'] }>
            <NavItem to={ '/test-route' } label={ 'Test Link' } />
        </MemoryRouter>
    )

    expect(item.find('li').hasClass('nav-item')).toEqual(true)
    expect(item.find('li').hasClass('active')).toEqual(true)

    expect(item.find('a').hasClass('nav-link')).toEqual(true)
})
