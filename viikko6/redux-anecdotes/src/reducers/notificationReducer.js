const notificationAtStart = ''

const notificationReducer = (state = notificationAtStart, action) => {
    let text = action.content
    switch (action.type) {
      case 'SET_TEXT':
      return state
      case 'VOTED':
        state = `you voted '${text}'`
        return state
      case 'ADD':
        state = `you added '${text}'`
        return state
      case 'REMOVE':
        state = null
        return state
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

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default notificationReducer