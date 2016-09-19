import { expect } from 'chai'

import reducer from '../src/reducer'

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = {}
    const action = {
      type: 'SET_ENTRIES', 
      payload: {
        entries: ['sublime']
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({
      entries: ['sublime']
    })
  })

  it('handles NEXT', () => {
    const initialState = {
      entries: ['sublime', 'emacs']
    }
    const action = {type: 'NEXT'}
    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({
      vote: { pair: ['sublime', 'emacs'] },
      entries: []
    })
  })

  it('handles VOTE', () => {
    const initialState = {
      vote: { pair: ['sublime', 'emacs'] },
      entries: []
    }
    const action = {
      type: 'VOTE',
      payload: {
        entry: 'sublime'
      }
    }
    const nextState = reducer(initialState, action)

    expect(nextState).to.deep.equal({
      vote: { pair: ['sublime', 'emacs'], tally: {sublime: 1} },
      entries: []
    })
  })

  it('has an initial state', () => {
    const action = {
      type: 'SET_ENTRIES', 
      payload: { entries: ['sublime'] }
    }
    const nextState = reducer(undefined, action)
    expect(nextState).to.deep.equal({
      entries: ['sublime']
    })
  })

  it('can be used with reduce', () => {
  const actions = [
    {type: 'SET_ENTRIES', payload: {entries: ['sublime', 'emacs']}},
    {type: 'NEXT'},
    {type: 'VOTE', payload: {entry: 'sublime'}},
    {type: 'VOTE', payload: {entry: 'emacs'}},
    {type: 'VOTE', payload: {entry: 'sublime'}},
    {type: 'NEXT'}
  ]
  const finalState = actions.reduce(reducer, {})

  expect(finalState).to.deep.equal({
    winner: 'sublime'
  })
})

})