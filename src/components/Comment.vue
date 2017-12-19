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

<style scoped>
@keyframes slide {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0px);
  }
}

.slide-enter-active {
  animation: slide 0.5s, slide 0.5s ease 8s reverse;
}

.comment {
  margin: 10px 0px;
  font-size: 18px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  text-shadow: -1px -1px #000, 1px -1px #000, -1px 1px #000, 1px 1px #000;
}

.icon {
  height: 24px;
  border-radius: 4px;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
