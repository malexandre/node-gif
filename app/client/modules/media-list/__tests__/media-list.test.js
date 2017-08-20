/* eslint react/prop-types: 0 */
import { mount, shallow } from 'enzyme'
import React from 'react'

import MediaList from '../'

const formatResolve = jest.fn((data) => {
    return { status: 200, json: () => data }
})

const formatStatus = jest.fn((status, text) => {
    return { status: status, statusText: text }
})

const FakeItem = (props) => {
    return (
        <button onClick={ () => props.onFavoriteClick(props.item) } className={ props.item.favorite ? 'favorite' : '' }>
            { props.item.id }
        </button>
    )
}

const timeout = (fct, done, isFinal = true) => {
    setTimeout(() => {
        try {
            fct()
            if (isFinal) {
                done()
            }
        }
        catch (err) {
            done.fail(err)
        }
    }, 5) // Need 5 to make sure component's setTimeout & promises have time to resolve
}

beforeEach(() => {
    const localData = {}
    global.localStorage = {
        getItem: (key) => localData[key],
        setItem: (key, value) => (localData[key] = value)
    }

    formatResolve.mockClear()
    formatStatus.mockClear()
})

beforeAll(() => {
    global.fetch = (url) =>
        new Promise((resolve) => {
            if (url === '/api/test/favorite') {
                resolve(formatStatus(200))
            }
            else if (url === '/api/error/favorite') {
                resolve(formatStatus(401, 'Test error 401'))
            }
            else if (url === 'nextpage') {
                resolve(
                    formatResolve({
                        items: [
                            { id: 5, type: 'test' },
                            { id: 6, type: 'test' },
                            { id: 7, type: 'test' },
                            { id: 8, type: 'test' },
                            { id: 9, type: 'test' }
                        ],
                        nextPage: undefined
                    })
                )
            }
            else if (url === 'error') {
                resolve(formatStatus(404, 'Test error 404'))
            }
            else {
                resolve(
                    formatResolve({
                        items: [
                            { id: 0, type: 'test' },
                            { id: 1, type: 'test' },
                            { id: 2, type: 'test' },
                            { id: 3, type: 'test' },
                            { id: 4, type: 'test' }
                        ],
                        nextPage: 'nextpage'
                    })
                )
            }
        })
})

test('MediaList should init by calling mocked fetch', (done) => {
    const item = shallow(<MediaList item={ FakeItem } url="test" />)
    timeout(() => {
        expect(formatResolve.mock.calls.length).toBe(1)
        expect(item.type()).toEqual('div')
        expect(item.hasClass('media-list')).toEqual(true)
        expect(item.children('.row').length).toEqual(1)
        expect(item.children('.row').children(FakeItem).length).toEqual(5)
        expect(item.find('button.btn-secondary').length).toEqual(1)
    }, done)
})

test('MediaList should fetch nextpage on nextpage click', (done) => {
    const item = shallow(<MediaList item={ FakeItem } url="test" />)

    timeout(
        () => {
            expect(item.find('button.btn-secondary').length).toEqual(1)
            item.find('button.btn-secondary').simulate('click')

            timeout(() => {
                expect(formatResolve.mock.calls.length).toBe(2)
                expect(item.children('.row').children(FakeItem).length).toEqual(10)
                expect(item.find('button.btn-secondary').length).toEqual(0)
            }, done)
        },
        done,
        false
    )
})

test('MediaList should manage favorite click', (done) => {
    const item = mount(<MediaList item={ FakeItem } url="test" auth="test" />)

    timeout(
        () => {
            expect(formatResolve.mock.calls.length).toBe(1)
            expect(formatStatus.mock.calls.length).toBe(0)
            expect(item.find(FakeItem).first().hasClass('favorite')).toEqual(false)
            item.find(FakeItem).first().simulate('click')

            timeout(() => {
                expect(formatResolve.mock.calls.length).toBe(1)
                expect(formatStatus.mock.calls.length).toBe(1)
                expect(item.find(FakeItem).first().hasClass('favorite')).toEqual(true)
            }, done)
        },
        done,
        false
    )
})

test('MediaList should manage props updates for auth', (done) => {
    const item = mount(<MediaList item={ FakeItem } url="test" auth="test" />)

    timeout(
        () => {
            expect(formatResolve.mock.calls.length).toBe(1)
            item.setProps({ auth: 'second-test' })

            timeout(() => {
                expect(formatResolve.mock.calls.length).toBe(2)

                item.setProps({ auth: null })

                timeout(() => {
                    expect(formatResolve.mock.calls.length).toBe(3)
                }, done)
            }, done, false)
        },
        done,
        false
    )
})

test('MediaList should manage props updates for url', (done) => {
    const item = mount(<MediaList item={ FakeItem } url="test" />)

    timeout(
        () => {
            expect(formatResolve.mock.calls.length).toBe(1)
            item.setProps({ url: 'second-test' })

            timeout(() => {
                expect(formatResolve.mock.calls.length).toBe(2)

                item.setProps({ url: '' })

                timeout(() => {
                    expect(formatResolve.mock.calls.length).toBe(2)
                }, done)
            }, done, false)
        },
        done,
        false
    )
})
