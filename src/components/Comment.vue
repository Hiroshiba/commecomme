<template>
  <transition name="slide" @after-enter="finished">
    <div class="comment">
      <img v-show="comment.iconUrl != null" :src="comment.iconUrl" class="icon">{{ description }}
    </div>
  </transition>
</template>

<script>
import CommentData from '@/data_structs/Comment.js'

export default {
  props: {
    comment: {
      id: Number,
      type: CommentData,
      required: true
    }
  },

  data () {
    return {
      start_time: null
    }
  },

  methods: {
    finished () {
      this.$emit('finished', this.comment)
    }
  },

  computed: {
    description () {
      var handle = this.comment.handle
      if (handle == null) {
        handle = this.comment.no + 'コメ'
      }

      return handle + '「' + this.comment.text + '」'
    }
  }
}
</script>
