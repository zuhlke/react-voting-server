export const setEntries = (state, entries) => ({
  ...state,
  entries: entries
})

export const next = (state) => ({
  ...state,
  vote: {
    pair: state.entries.slice(0, 2)
  },
  entries: state.entries.slice(2)
})

export const vote = (state, entry) => ({
  ...state,
  vote: {
    ...state.vote,
    tally: {
      ...state.vote.tally,
      [entry]: ((state.vote.tally || {})[entry] || 0) + 1
    }
  }
})