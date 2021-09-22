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
    todoLists: []
  },
  created () {
    this.todoLists = todoStrage.fetch()
  },
  methods: {
    save () {
      const textToAdd = this.$refs.text
      this.todoLists.push({
        text: textToAdd.value,
        isEditable: false
      })
      todoStrage.save(this.todoLists)
      textToAdd.value = ''
    },
    remove (item) {
      const index = this.todoLists.indexOf(item)
      this.todoLists.splice(index, 1)
      todoStrage.save(this.todoLists)
    },
    edit (item, index) {
      item.isEditable = !item.isEditable
      const ref = 'item' + index
      this.$nextTick(function () {
        app.$refs[ref][0].focus()
      })
    },
    cancelEdit (item) {
      item.isEditable = !item.isEditable
    },
    update (item) {
      const index = this.todoLists.indexOf(item)
      const textToAdd = item.text
      this.todoLists[index] = {
        text: textToAdd,
        isEditable: false
      }
      this.todoLists.splice()
      todoStrage.save(this.todoLists)
    }
  }
})
