/* globals Vue */

const localStorage = window.localStorage

const todoStrage = {
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
    newTodo: ''
  },
  watch: {
    todoLists: {
      handler: function (todoLists) {
        todoStrage.save(todoLists)
      },
      deep: true
    }
  },
  created () {
    this.todoLists = todoStrage.fetch()
  },
  methods: {
    addTodo () {
      const textToAdd = this.newTodo
      if (!textToAdd) {
        return
      }
      this.todoLists.push({
        text: textToAdd,
        isEditable: false
      })
      this.newTodo = ''
    },
    removeTodo (item) {
      const index = this.todoLists.indexOf(item)
      this.todoLists.splice(index, 1)
    },
    editTodo (item, index) {
      item.isEditable = !item.isEditable
      this.beforeEditTodo = item.text
      const ref = 'item' + index
      this.$nextTick(function () {
        app.$refs[ref][0].focus()
      })
    },
    cancelEdit (item) {
      item.isEditable = !item.isEditable
      item.text = this.beforeEditTodo
    },
    updateTodo (item) {
      const index = this.todoLists.indexOf(item)
      const textToUpdate = item.text
      this.todoLists[index] = {
        text: textToUpdate,
        isEditable: false
      }
      this.todoLists.splice()
    }
  }
})
