import {expect} from 'chai'

import { setEntries, next, vote } from './core'

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

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = {
        vote: { pair: ['sublime', 'emacs'] },
        entries: []
      }
      const nextState = vote(state, 'sublime')
      expect(nextState).to.deep.equal({
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 1 }
        },
        entries: []
      })
    })
    
    it('adds to existing tally for the voted entry', () => {
      const state = {
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 3, 'emacs': 2 }
        },
        entries: []
      }
      const nextState = vote(state, 'sublime')
      expect(nextState).to.deep.equal({
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 4, 'emacs': 2 }
        },
        entries: []
      })
    })
  })

})