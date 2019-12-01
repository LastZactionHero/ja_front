<template>
  <canvas ref="canvas" width="400" height="400"></canvas>
</template>

<script>
export default {
  name: 'DrawPad',

  data() {
    return {
      prevCoord: null,
      stepCount: 0
    }
  },

  methods: {
    clear() {
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
  },

  mounted() {
    const eventToPoint = event => {
      const boundingRect = this.$refs.canvas.getBoundingClientRect()
      const scaleX = this.$refs.canvas.width / boundingRect.width
      const scaleY = this.$refs.canvas.height / boundingRect.height
      return {
        x: (event.clientX - boundingRect.left) * scaleX,
        y: (event.clientY - boundingRect.top) * scaleY
      }
    }

    this.$refs.canvas.addEventListener(
      'touchstart',
      event => {
        this.prevCoord = eventToPoint(event)
      },
      false
    )

    this.$refs.canvas.addEventListener(
      'touchend',
      event => {
        this.prevCoord = null
      },
      false
    )

    this.$refs.canvas.addEventListener(
      'touchmove',
      event => {
        if (!this.prevCoord) return

        this.stepCount += 1
        if (this.stepCount % 5 !== 0) return

        const newCoord = eventToPoint(event)
        const ctx = this.$refs.canvas.getContext('2d')
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(this.prevCoord.x, this.prevCoord.y)
        ctx.lineTo(newCoord.x, newCoord.y)
        ctx.stroke()
        this.prevCoord = newCoord
      },
      false
    )
  }
}
</script>
