<template>
  <div class="container">
    <h2>Lets Chat About {{toy.name}}</h2>
    <ul>
      <li v-for="chat in chatHistory" :key="chat._id">
        {{chat.txt}}
      </li>
      <li v-for="(msg, idx) in msgs" :key="idx">
        {{msg.from}}: {{msg.txt}}
      </li>
      <span v-if="typingInfo.isTyping">{{typingInfo.from}} is typing...</span>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" @input="setTyping" v-model="msg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import {socketService} from '@/services/socket-service';
import {chatService} from '@/services/chat-service'

export default {
  props: ['toy'],
  data() {
    return {
      msgs: [],
      topic : this.toy._id,
      msg: {from: '', txt: ''},
      from: '',
      typingInfo: false,
      chatHistory: []
    }
  },
  computed: {
    currUser(){
      return this.$store.getters.currUser
    }
  },
  created() {
    this.loadChatHistory()
    this.from = this.currUser ? this.currUser.username : 'guest'
    this.clearTyping = this.debounce(this.clearTyping, 500)
    socketService.setup();
    socketService.emit('chat topic', this.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('chat typingRes', this.typingRes)
  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      console.log(msg, 'from addmsg');
      this.msgs.push(msg)
    },
    typingRes(isTyping){
      this.typingInfo = isTyping

    },
    setTyping(){
      const typeInfo = {isTyping: true, from: this.from}
      socketService.emit('chat isTyping', typeInfo)
      this.clearTyping()
    },
    clearTyping(){
      const typeInfo = {isTyping: false, from: this.from}
      socketService.emit('chat isTyping', typeInfo)      
    },
    debounce(callback, wait) {
      let timeout;
      return (...args) => {
          const context = this;
          clearTimeout(timeout);
          timeout = setTimeout(() => callback.apply(context, args), wait);
      };
    },
    async loadChatHistory(){
      const chatHistory = await chatService.query(this.toy._id)
      this.chatHistory = chatHistory
      console.log(chatHistory);
    },
    sendMsg() {
      this.from = this.currUser ? this.currUser.username : 'guest'
      this.msg.from = this.from
      this.msg.toyId = this.toy._id
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      this.msg = {from: '', txt: ''};
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    }
  }
}
</script>
