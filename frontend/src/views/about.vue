<template>
  <div class="about">
    <h1>Our branches across the country:</h1>
    <g-maps :pos="pos"/>
    <button @click="setPos('tel-aviv')">Tel-Aviv</button>
    <button @click="setPos('jerusalem')">Jerusalem</button>
    <button @click="setPos('ashkelon')">Ashkelon</button>
  <h1>Contact us:</h1>
  <a @click="popupToggle(true)" href="#">By Live Chat</a>
    <pop-up v-if="isPopupOpen" @closePopup="popupToggle"> 
       <template v-slot:header>
        <p>Welcome to the customer support</p>
       </template>
       <chat-box></chat-box>
       <template v-slot:footer>This is the footer</template>
    </pop-up>
  </div>
</template>
<script>
import popUp from '../cmps/popup'
import chatBox from '../cmps/chat-box'
import gMaps from '../cmps/packages/g-maps'
export default {
  name: 'about',
  data() {
    return {
      isPopupOpen: false,
      pos: {lat:32.109333, lng:34.855499}
    }
  },
  methods: {
    popupToggle(boolean) {
      this.isPopupOpen = boolean
    },
    setPos(name) {
      if (name === 'tel-aviv') this.pos = {lat:32.109333, lng:34.855499} 
      if (name === 'ashkelon') this.pos = {lat:31.66926 , lng:34.57149}
      if (name === 'jerusalem') this.pos = {lat:31.771959, lng:35.217018}
}    
  },
    mounted () {
      document.addEventListener('keyup', (e) => {
        if (e.keyCode === 27 && this.isPopupOpen) {
          this.isPopupOpen = false
      }
    })
  },
  components: {
    popUp,
    chatBox,
    gMaps
  }
}
</script>