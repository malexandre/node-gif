import React from 'react'
import { shallow } from 'enzyme'

import GifItem from '../'

test('GifItem displays gif in a card img', () => {
    const options = {
        images: {
            fixed_height: { // eslint-disable-line camelcase
                mp4: 'test-src'
            }
        }
    }
    const item = shallow(<GifItem item={ options } />)

    const card = item.children('.card')
    expect(card.length).toEqual(1)
    expect(card.children('.card-img-top').length).toEqual(1)

    const imgtop = card.children('.card-img-top')
    expect(imgtop.type()).toEqual('video')
    expect(imgtop.hasClass('gif-item_video')).toEqual(true)
    expect(imgtop.children('source').length).toEqual(1)
    expect(imgtop.children('source').prop('src')).toEqual('test-src')
})

test('GifItem selects mp4 or webp or gif, in that orer', () => {
    const options = {
        images: {
            fixed_height: { // eslint-disable-line camelcase
                mp4: 'mp4-src',
                webp: 'webp-src',
                gif: 'gif-src'
            }
        }
    }
    let item = shallow(<GifItem item={ options } />)
    let source = item.children('.card').children('.card-img-top').children('source')
    expect(source.prop('src')).toEqual('mp4-src')

    delete options.images.fixed_height.mp4
    item = shallow(<GifItem item={ options } />)
    source = item.children('.card').children('.card-img-top').children('source')
    expect(source.prop('src')).toEqual('webp-src')

    delete options.images.fixed_height.webp
    item = shallow(<GifItem item={ options } />)
    source = item.children('.card').children('.card-img-top').children('source')
    expect(source.prop('src')).toEqual('gif-src')
})

test('GifItem displays "Open in Giphy" link in card body without auth', () => {
    const item = shallow(<GifItem item={ {} } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('a').length).toEqual(1)
    expect(card.children('.card-body').children('a').text()).toEqual('Open in Giphy')
})

test('GifItem displays "Open in Giphy" link in card body with auth', () => {
    const item = shallow(<GifItem item={ {} } auth={ 'test' } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('a').length).toEqual(1)
    expect(card.children('.card-body').children('a').text()).toEqual('Open in Giphy')
})

test('GifItem does not display favorite button in card body without auth', () => {
    const item = shallow(<GifItem item={ {} } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('button').length).toEqual(0)
})

test('GifItem displays favorite button in card body with auth', () => {
    const item = shallow(<GifItem item={ {} } auth={ 'test' } />)
    const card = item.children('.card')

    expect(card.length).toEqual(1)
    expect(card.children('.card-body').children('button').length).toEqual(1)
    expect(card.children('.card-body').children('button').text()).toEqual('Favorite')
})

test('GifItem displays favorite status regarding item.favorite', () => {
    const notFavorite = shallow(<GifItem item={ { favorite: false } } auth={ 'test' } />)

    expect(notFavorite.find('button').hasClass('btn-warning')).toBe(false)
    expect(notFavorite.find('button').hasClass('btn-outline-warning')).toBe(true)

    const favorite = shallow(<GifItem item={ { favorite: true } } auth={ 'test' } />)

    expect(favorite.find('button').hasClass('btn-warning')).toBe(true)
    expect(favorite.find('button').hasClass('btn-outline-warning')).toBe(false)
})

test('GifItem calls callback with the item if favorite button is clicked', () => {
    const mockFavoriteClick = jest.fn((data) => expect(data.id).toEqual('testid'))
    const item = shallow(<GifItem item={ { id: 'testid' } } auth={ 'test' } onFavoriteClick={ mockFavoriteClick } />)

    item.find('button').simulate('click')
    expect(mockFavoriteClick).toBeCalled()
})
