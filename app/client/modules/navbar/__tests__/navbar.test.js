import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import NavBar from '../'

// We ignore everything about the fakelogin, it's not to be tested

test('NavBar displays a nav bar with a link to home, a navbar toggler, a collapsable list with 4 items', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavBar />
        </MemoryRouter>
    )

    expect(item.find('nav').length).toEqual(1)
    expect(item.find('a.navbar-brand').length).toEqual(1)
    expect(item.find('button.navbar-toggler').length).toEqual(1)
    expect(item.find('div.collapse.navbar-collapse').length).toEqual(1)
    expect(item.find('div.collapse.navbar-collapse').children('ul.navbar-nav').length).toEqual(1)
    expect(item.find('ul.navbar-nav').find('li.nav-item').length).toEqual(4)
})

test('NavBar brand links to "/"', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavBar />
        </MemoryRouter>
    )

    expect(item.find('a.navbar-brand').prop('href')).toEqual('/')
})

test('NavBar has links to "/", "/fav-gifs", "/emojis", "/fav-emojis"', () => {
    const item = mount(
        <MemoryRouter initialEntries={ ['/'] }>
            <NavBar />
        </MemoryRouter>
    )

    expect(item.find('a.nav-link').at(0).prop('href')).toEqual('/')
    expect(item.find('a.nav-link').at(0).text()).toEqual('Gifs')

    expect(item.find('a.nav-link').at(1).prop('href')).toEqual('/fav-gifs')
    expect(item.find('a.nav-link').at(1).text()).toEqual('Favorite gifs')

    expect(item.find('a.nav-link').at(2).prop('href')).toEqual('/emojis')
    expect(item.find('a.nav-link').at(2).text()).toEqual('Emojis')

    expect(item.find('a.nav-link').at(3).prop('href')).toEqual('/fav-emojis')
    expect(item.find('a.nav-link').at(3).text()).toEqual('Favorite emojis')
})
