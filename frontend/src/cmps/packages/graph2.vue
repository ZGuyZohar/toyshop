
<script>
import { Pie } from 'vue-chartjs'
export default {
    extends: Pie,
    data(){
      return {
        mappedToys: null,
        newLabels: null,
        newData: null,
      }
    },
    computed: {
        toys(){
            return this.$store.getters.allToys.filter(toy => toy.inStock)
        }
    },
    methods: {
        toyPercentageOfType(){
            const mappedToys = this.toys.reduce((objMap, toy) => {
               if(!objMap[toy.type]) objMap[toy.type] = 1 
               else objMap[toy.type] += 1 
               return objMap
            },{})
            this.mappedToys = mappedToys;
        },
        turnMapToData(){
          const newData = Object.keys(this.mappedToys).map(key => {
            return this.mappedToys[key]
          })
          this.newData = newData
        },
        getLabels(){
          const newLabels = Object.keys(this.mappedToys).map(key => {
            return key
          })
          console.log(newLabels);
          this.newLabels = newLabels
        }

    },
    created(){
        this.toyPercentageOfType()
        this.getLabels()
        this.turnMapToData()
    },
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: this.newLabels,
        datasets: [
          {
            label: 'Price per toy type',
            backgroundColor: '#42B983',
            data: this.newData
          }
        ]
      })
    }
}
</script>

