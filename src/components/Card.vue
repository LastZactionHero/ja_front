<template>
  <div>
    <div class="question">{{ question }}</div>
    <el-divider></el-divider>
    <div v-if="flipped">
      <div class="answer">{{ answer }}</div>
      <div class="kana">{{ kana }}</div>
      <div class="sentence">{{ sentence }}</div>
      <div class="sentence-meaning">{{ sentenceMeaning }}</div>
      <audio controls>
        <source :src="audioUrl" type="audio/mp3" />
      </audio>
    </div>

    <el-divider></el-divider>

    <div v-if="flipped">
      <el-button type="success" @click="response(true)">Correct</el-button>
      <el-button type="danger" @click="response(false)">Incorrect</el-button>
    </div>
    <div v-else>
      <el-button type="primary" @click="flip">Flip</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    card: {
      type: Object,
      required: true
    },
    correct: {
      type: Function,
      required: true
    },
    incorrect: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      flipped: false
    }
  },

  computed: {
    question() {
      return this.card.term_a
    },

    answer() {
      return this.card.term_b
    },

    kana() {
      return this.card.meta.vocab_expression
    },

    sentence() {
      const sentence = this.card.meta.sentence_expression
      return sentence.replace(/<[/]?b>/g, '')
    },

    sentenceMeaning() {
      return this.card.meta.sentence_meaning
    },

    audioUrl() {
      const idx = this.card.meta.core_index
      return `https://s3.amazonaws.com/japaneseaudio/ja_${idx}.mp3`
    }
  },

  methods: {
    flip() {
      this.flipped = true
    },

    response(correct) {
      this.flipped = false
      if (correct) {
        this.correct()
      } else {
        this.incorrect()
      }
    }
  }
}
</script>

<style>
.question {
  font-size: 2rem;
}

.answer {
  font-size: 4rem;
  margin-bottom: 12px;
}

.kana {
  font-size: 2rem;
  margin-bottom: 64px;
}

.sentence {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.sentence-meaning {
  font-size: 1.5rem;
  margin-bottom: 12px;
  font-style: italic;
}
</style>
