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
      const id = new Date().getTime().toString()
      if (!textToAdd) {
        window.alert('1文字以上入力してください')
      } else {
        this.todoLists.push({
          id: id,
          text: textToAdd,
          isEditable: false
        })
        this.newTodo = ''
      }
    },
    removeTodo (item) {
      const index = this.todoLists.indexOf(item)
      this.todoLists.splice(index, 1)
    },
    editTodo (item) {
      item.isEditable = !item.isEditable
      this.beforeEditTodo = item.text
      this.$nextTick(function () {
        app.$refs[item.id][0].focus()
      })
    },
    cancelEdit (item) {
      item.isEditable = !item.isEditable
      item.text = this.beforeEditTodo
    },
    updateTodo (item) {
      if (!item.text) {
        window.alert('1文字以上入力してください')
      } else {
        const index = this.todoLists.indexOf(item)
        const textToUpdate = item.text
        this.todoLists[index] = {
          text: textToUpdate,
          isEditable: false
        }
        this.todoLists.splice()
      }
    }
  }
})
