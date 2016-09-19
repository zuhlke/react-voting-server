import {setEntries, next, vote, INITIAL_STATE} from './core'

const reducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'SET_ENTRIES': return setEntries(state, payload.entries)
    case 'NEXT': return next(state)
    case 'VOTE': return {
      ...state,
      vote: vote(state.vote, payload.entry)
    }
  }
  return state
}

export default reducer