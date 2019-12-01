<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <div v-if="currentCard">
          <Card :card="currentCard" :correct="correct" :incorrect="incorrect">
          </Card>
        </div>
        <div v-else>
          No cards to review
        </div>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row>
        <DrawPad ref="drawpad" />
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from '~/components/Card'
import DrawPad from '~/components/DrawPad'

export default {
  name: 'CardContainer',

  components: {
    Card,
    DrawPad
  },

  computed: {
    question() {
      return 'the question'
    },

    answer() {
      return 'the answer'
    },

    ...mapGetters({
      currentCard: 'cards/current'
    })
  },

  methods: {
    correct() {
      this.markCorrect({ card: this.currentCard })
      this.$refs.drawpad.clear()
    },

    incorrect() {
      this.markIncorrect({ card: this.currentCard })
      this.$refs.drawpad.clear()
    },

    ...mapActions({
      fetch: 'cards/fetch',
      markCorrect: 'cards/correct',
      markIncorrect: 'cards/incorrect'
    })
  },

  mounted() {
    this.fetch()
  }
}
</script>
