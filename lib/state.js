const initialState = {
  elo: {
    somethingStatic: '!',
    count: 0
  }
}

let state = { ...initialState }
const actions = []

const getCurrentState = () => state

const reducer = (state, action) => {
  return {
    ...state,
    elo: {
      ...state.elo,
      count: action + state.elo.count
    }
  }
}

const update = (action) => {
  actions.push(action)
  state = reducer(state, action)
  return state
}

module.exports = {
  getCurrentState,
  update,
}
