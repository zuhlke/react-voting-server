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

    it('puts winner of current vote back to entries', () => {
      const state = {
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 4, 'emacs': 2 }
        },
        entries: ['vim', 'TextMate', 'notepad']
      }
      const nextState = next(state)
      expect(nextState).to.deep.equal({
        vote: { pair: ['vim', 'TextMate'] },
        entries: ['notepad', 'sublime']
      })
    })

    it('puts both from tied vote back to entries', () => {
      const state = {
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 3, 'emacs': 3 }
        },
        entries: ['vim', 'TextMate', 'notepad']
      }
      const nextState = next(state)
      expect(nextState).to.deep.equal({
        vote: { pair: ['vim', 'TextMate'] },
        entries: ['notepad', 'sublime', 'emacs']
      })
    })

    it('marks winner when just one entry left', () => {
      const state = {
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 4, 'emacs': 2 }
        },
        entries: []
      }
      const nextState = next(state)
      expect(nextState).to.deep.equal({
        winner: 'sublime'
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

    it('does not mutate the state', () => {
      const state = {
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 3, 'emacs': 2 }
        },
        entries: []
      }
      const nextState = vote(state, 'sublime')
      expect(state).to.deep.equal({
        vote: {
          pair: ['sublime', 'emacs'],
          tally: { 'sublime': 3, 'emacs': 2 }
        },
        entries: []
      })
    })
  })

})