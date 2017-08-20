import React from 'react'
import { shallow } from 'enzyme'

import EmojiItem from '../'

test('EmojiItem displays emoji in a card img', () => {
    const item = shallow(<EmojiItem item={ { char: 'testchar' } } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-img-top').length).toEqual(1)
    expect(card.children('.card-img-top').text()).toEqual('testchar')
})

test('EmojiItem displays emoji code in a card body', () => {
    const item = shallow(<EmojiItem item={ { id: 'testid' } } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('div').length).toEqual(1)
    expect(card.children('.card-body').children('div').text()).toEqual(':testid:')
})

test('EmojiItem do not display favorite button in card body without auth', () => {
    const item = shallow(<EmojiItem item={ {} } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('button').length).toEqual(0)
})

test('EmojiItem displays favorite button in card body with auth', () => {
    const item = shallow(<EmojiItem item={ {} } auth={ 'test' } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('button').length).toEqual(1)
    expect(card.children('.card-body').children('button').text()).toEqual('Favorite')
})

test('EmojiItem displays favorite status regarding item.favorite', () => {
    const notFavorite = shallow(<EmojiItem item={ { favorite: false } } auth={ 'test' } />)

    expect(notFavorite.find('button').hasClass('btn-warning')).toBe(false)
    expect(notFavorite.find('button').hasClass('btn-outline-warning')).toBe(true)

    const favorite = shallow(<EmojiItem item={ { favorite: true } } auth={ 'test' } />)

    expect(favorite.find('button').hasClass('btn-warning')).toBe(true)
    expect(favorite.find('button').hasClass('btn-outline-warning')).toBe(false)
})

test('EmojiItem calls callback with the item if favorite button is clicked', () => {
    const mockFavoriteClick = jest.fn((data) => expect(data.id).toEqual('testid'))
    const item = shallow(<EmojiItem item={ { id: 'testid' } } auth={ 'test' } onFavoriteClick={ mockFavoriteClick } />)

    item.find('button').simulate('click')
    expect(mockFavoriteClick).toBeCalled()
})
