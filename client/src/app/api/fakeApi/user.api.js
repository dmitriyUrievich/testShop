const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Джон Дориан',
    email: 'Jony7351@tw.com',
    sex: 'male',
    admin: true
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Кокс',
    email: 'white4571@twipet.com',
    sex: 'male',
    admin: true
  },
  {
    _id: '67rdca3eeb7f6fgeed471817',
    name: 'Боб Келсо',
    email: 'bob007@tw.com',
    sex: 'male',
    admin: true
  },
  {
    _id: '67rdca3eeb7f6fgeed471818',
    name: 'Рэйчел Грин',
    email: 'green7311@fam.biz',
    sex: 'female',
    admin: true
  }
]

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users))
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function() {
      resolve(JSON.parse(localStorage.getItem('users')))
    }, 2000)
  })
const update = (id, data) =>
  new Promise((resolve) => {
    const users = JSON.parse(localStorage.getItem('users'))
    const userIndex = users.findIndex((u) => u._id === id)
    users[userIndex] = { ...users[userIndex], ...data }
    localStorage.setItem('users', JSON.stringify(users))
    resolve(users[userIndex])
  })

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function() {
      resolve(
        JSON.parse(localStorage.getItem('users')).find(
          (user) => user._id === id
        )
      )
    }, 1000)
  })
export default {
  fetchAll,
  getById,
  update
}
