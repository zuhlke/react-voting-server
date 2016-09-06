import {expect} from 'chai'

import {setEntries, next} from './core'

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = {}
      const entries = ['tabs', 'spaces']
      const nextState = setEntries(state, entries)
      expect(nextState).to.deep.equal({
        entries: ['tabs', 'spaces']
      })
    })

    it('does not mutate the state', () => {
      const state = {entries: ['sublime', 'emacs']}
      const entries = ['tabs', 'spaces']
      const nextState = setEntries(state, entries)
      expect(state).to.deep.equal({
        entries: ['sublime', 'emacs']
      })
    })

  })

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = {
        entries: ['sublime', 'emacs', 'vim']
      }
      const nextState = next(state)
      expect(nextState).to.deep.equal({
        vote: {
          pair: ['sublime', 'emacs']
        },
        entries: ['vim']
      })
    })

    it('does not mutate the state', () => {
      const state = {entries: ['sublime', 'emacs', 'vim']}
      const nextState = next(state)
      expect(state).to.deep.equal({
        entries: ['sublime', 'emacs', 'vim']
      })
    })

  })

})