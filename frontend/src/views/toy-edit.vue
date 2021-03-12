<template>
  <section class="edit-container">
      <form class="edit-form" @submit.prevent="saveToy">
      <h1>{{msgToShow}} a toy</h1>
      <validation-provider rules="required" v-slot="{ errors }">
          <label>
          Toy Name:    
          <input name="text" type="text" placeholder="Toy name" v-model="newToy.name" /> 
          <span class="error">{{ errors[0] }}</span>
          </label>
      </validation-provider>
      <validation-provider rules="required" v-slot="{ errors }">
          <label>
          Toy Price:   
          <input type="number" placeholder="Toy price" v-model.number="newToy.price"/>
          <span class="error">{{ errors[0] }}</span>
          </label>
      </validation-provider>
      <validation-provider rules="required">
          <label>Type of toy:
              <select v-model="newToy.type">
                  <option value="girl">Girl</option>
                  <option value="boy">Boy</option>
                  <option value="tcg">TCG</option>
                  <option value="action">Action</option>
                  <option value="funny">Funny</option>
              </select>
          </label>
      </validation-provider>
      <validation-provider rules="required" v-slot="{ errors }">
          <label class="checkbox">In stock?
              <input type="checkbox" v-model="newToy.inStock">
              <span class="error">{{ errors[0] }}</span>
          </label>
      </validation-provider>
          <button>Submit toy</button>
      </form>
  </section>
</template>


<script>
import {toyService} from '../services/toy-service.js'
import {showMsg} from '../services/eventBus.service.js' 
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
    name: 'toy-edit',
    data(){
        return {
            newToy: toyService.getEmptyToy()
        }
    },
    methods: {
        saveToy(){
            let toy = this.newToy
            if(toy.name.length < 5) return
            if(toy._id) toy = JSON.parse(JSON.stringify(toy))
            this.$store.dispatch({type: 'saveToy', newToy: toy})
                .then(() => {
                    showMsg('Toy saved')
                    this.newTodo = toyService.getEmptyToy()
                    this.$router.push('/toy')
                })
                .catch(err => {
                    showMsg(err.message, 'danger')
                })
        },
    },
    computed: {
        toyId() {
            return this.$route.params.toyId
        },
        msgToShow(){
            return this.toyId ? 'Edit' : 'Add'
        }
    },
    created(){
        if(this.toyId) {
            toyService.getById(this.toyId)
                .then(toy => this.newToy = toy)
        }
    },
  components: {
    ValidationProvider
  },
}
</script>
