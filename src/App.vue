<template>
  <div id="app">
    <comment v-for="comment in comments" :comment="comment" :key="comment.id" @finished="finished"></comment>
  </div>
</template>

<script>
import Comment from '@/components/Comment'
import CommentData from '@/data_structs/Comment.js'

export default {
  components: {
    Comment
  },

  mounted () {
    window.setInterval(this.crawlComment, 1000)
  },

  data () {
    return {
      numComments: 0,
      comments: [],
      commentHistory: []
    }
  },

  methods: {
    add (event) {
      const comment = new CommentData({ text: 'test comment ' + this.numComments })
      this.addComment(comment)
    },

    crawlComment () {
      const xhr = new XMLHttpRequest()
      // const path = 'http://localhost:8888/comment.xml'
      const path = 'comment.xml'
      xhr.open('GET', path, true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const commentXmlList = xhr.responseXML.getElementsByTagName('comment')
          for (var i = 0; i < commentXmlList.length; i++) {
            const commentXml = commentXmlList[i]
            const no = commentXml.getAttributeNode('no') ? commentXml.getAttributeNode('no').value : null
            const text = commentXml.firstChild.nodeValue
            const handle = commentXml.getAttributeNode('handle') ? commentXml.getAttributeNode('handle').value : null
            const iconUrl = commentXml.getAttributeNode('icon_url') ? commentXml.getAttributeNode('icon_url').value : null
            const comment = new CommentData({ no, text, handle, iconUrl })
            if (this.commentHistory.some((v) => { return v.equals(comment) })) {
              continue
            }
            this.addComment(comment)
          }
        }
      }
      xhr.send()
    },

    addComment (comment) {
      comment.id = this.numComments
      this.numComments++
      this.comments.push(comment)
      this.commentHistory.push(comment)
    },

    finished (comment) {
      this.comments.splice(this.comments.indexOf(comment), 1)
    }
  }
}
</script>
