const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
    let text = action.content
    switch (action.type) {
      case 'SET_TEXT':
      return state
      case 'VOTED':
        state = `you voted '${text}'`
        setTimeout(() => {
            state = null
        }, 10)
        return state
      case 'ADD':
        state = `you added '${text}'`
        return `you added '${text}'`
      default:
        return state
    }
}

export const notificationChange = text => {
    return {
      type: 'SET_TEXT',
      text,
    }
}

export const notificationForVote = content => {
    return {
        type: 'VOTED',
        content,
    }
}

export const notificationForAdd = content => {
    return {
        type: 'ADD',
        content,
    }
}

export default notificationReducer