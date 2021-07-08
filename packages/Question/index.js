import Question from './src'

Question.install = Vue => {
  Vue.component(Question.name, Question)
}

export default Question
