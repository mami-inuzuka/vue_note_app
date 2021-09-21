function fetch () {
  return JSON.parse(localStorage.getItem('todoLists'))
}

const app = new Vue({
  el: '#app',
  data: {
    todoItem: {
      text: ''
    },
    todoLists: []
  },
  created () {
    this.lists = fetch()
  },
  methods: {
    save () {
      this.todoLists = JSON.parse(localStorage.getItem('todoLists'))
      this.todoLists.push(this.todoItem)
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
      this.todoItem.text = ''
    }
  }
})
