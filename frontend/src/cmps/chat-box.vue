<template>
  <section class="chat-box">
      <ul>
          <li v-for="txt in txts" :key="txt">
              {{txt}}
          </li>
      </ul>
      <div class="form">
        <form @submit.prevent="submitTxt">
            <input type="text" v-model="txt" />
        </form>
      </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            txt: '',
            txts: [],
            supportTxt: 'Sure thing, honey'
        }
    },
    methods: {
        submitTxt(){
            this.txts.push(this.txt);
            this.txt = '';
            setTimeout(() => {
                this.txts.push(this.supportTxt)
            }, 1000);
        }
    }
}
</script>

<style>

</style>