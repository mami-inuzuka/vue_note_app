/* globals Vue */

const localStorage = window.localStorage

const todoStorage = {
  fetch () {
    return JSON.parse(localStorage.getItem('todoLists') || '[]')
  },
  save (todoLists) {
    localStorage.setItem('todoLists', JSON.stringify(todoLists))
  }
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: [],
    newTodo: '',
    currentEditingId: 0
  },
  created () {
    this.todoLists = todoStorage.fetch()
  },
  methods: {
    addTodo () {
      const id = new Date().getTime().toString()
      if (!this.newTodo) {
        window.alert('1文字以上入力してください')
      } else {
        this.todoLists.push({
          id: id,
          checked: false,
          text: this.newTodo
        })
        todoStorage.save(this.todoLists)
        this.newTodo = ''
      }
    },
    removeTodo (item) {
      const index = this.todoLists.indexOf(item)
      this.todoLists.splice(index, 1)
      todoStorage.save(this.todoLists)
    },
    editTodo (item) {
      this.currentEditingId = item.id
      this.beforeEditTodo = item.text
      this.$nextTick(function () {
        this.$refs[item.id][0].focus()
      })
    },
    cancelEdit (item) {
      this.currentEditingId = 0
      item.text = this.beforeEditTodo
    },
    updateTodo (item) {
      if (!item.text) {
        window.alert('1文字以上入力してください')
      } else {
        const index = this.todoLists.indexOf(item)
        const textToUpdate = item.text
        this.$set(this.todoLists[index], 'text', textToUpdate)
        todoStorage.save(this.todoLists)
      }
    },
    checkTodo (item) {
      todoStorage.save(this.todoLists)
    }
  }
})
