import {setEntries, next, vote} from './core'

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'SET_ENTRIES': return setEntries(state, payload.entries)
    case 'NEXT': return next(state)
    case 'VOTE': return vote(state, payload.entry)
  }
  return state
}

export default reducer