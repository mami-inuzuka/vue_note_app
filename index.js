function fetch () {
  return JSON.parse(localStorage.getItem('todoLists'))
}

const app = new Vue({
  el: '#app',
  data: {
    todoLists: [],
  },
  created () {
    this.todoLists = fetch()
  },
  methods: {
    save () {
      const textToAdd = this.$refs.text
      this.todoLists.push({
        text: textToAdd.value
      })
      localStorage.setItem('todoLists', JSON.stringify(this.todoLists))
      textToAdd.value = ''
    }
  }
})
