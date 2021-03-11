<template>
<section class="dashboard">
  <div>
  <h1>Toys information:</h1>
  </div>
  <section>
    <div>
      <h2>Toy prices per toy type</h2>  
      <graph1 v-if="toys" :toys="toys" class="graph" />
    </div>
    <div>
      <h2>Inventory by type</h2>
      <graph2 v-if="toys" class="graph" />
    </div>
  </section>
</section>
</template>

<script>
import graph1 from '@/cmps/packages/graph1';
import graph2 from '@/cmps/packages/graph2';
export default {
  computed: {
    toys(){
      return this.$store.getters.allToys
    }
  },
    components: {
        graph1,
        graph2
    }
}
</script>
