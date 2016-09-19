
export const INITIAL_STATE = {}

export const setEntries = (state, entries) => ({
  ...state,
  entries: entries
})

const getWinners = (vote) => {
  if (!vote) return []

  const [a, b] = vote.pair
  const aVotes = vote.tally[a] || 0
  const bVotes = vote.tally[b] || 0

  if (aVotes > bVotes) return [a]
  else if (aVotes < bVotes)  return [b]
  else return [a, b]
}

export const next = (state) => {
  const entries = state.entries.concat(getWinners(state.vote))

  if (entries.length === 1) {
    let nextState = { ...state }
    delete nextState.vote
    delete nextState.entries

    return {
      ...nextState,
      winner: entries[0]
    }
  }

  return {
    ...state,
    vote: { pair: entries.slice(0, 2) },
    entries: entries.slice(2)
  }
}

export const vote = (voteState, entry) => ({
  ...voteState,
  tally: {
    ...voteState.tally,
    [entry]: ((voteState.tally || {})[entry] || 0) + 1
  }
})