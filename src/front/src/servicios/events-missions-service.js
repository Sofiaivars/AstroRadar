const mainURL = 'http://localhost:3001'

const getEventsFromAPI = async () => {
  const response = await fetch(`${mainURL}/events`, {
    method: 'GET'
  });
  const data = await response.json();
  return data;
}

const getCategories = (list) => {
  if (Array.isArray(list) && list.length > 0) {
    const data = {}
    for (const register of list) {
      if (register.category in data) {
        data[register.category]++
      } else {
        data[register.category] = 1
      }
    }
    return data
  }
  return
}

export { getEventsFromAPI, getCategories }