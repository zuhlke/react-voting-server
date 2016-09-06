export const setEntries = (state, entries) => ({
  ...state,
  entries: entries
})

export const next = (state) => ({
  ...state,
  vote: {pair: state.entries.slice(0, 2)},
  entries: state.entries.slice(2)
})