
<script>
import { Bar } from 'vue-chartjs'
export default {
    extends: Bar,
    data(){
        return {
            mappedPrices: null
        }
    },
    props: {
        toys: {
            required: true
        }
    },
    computed: {
    },
    methods: {
        toyPricePerType(){
            const labels = ['girl', 'boy', 'tcg', 'action', 'funny']
            const mappedObj = {};
            this.toys.forEach(toy => {
                mappedObj[toy.type] = (mappedObj[toy.type] + toy.price) || toy.price
            })
            this.mappedPrices = mappedObj
            // this.mappedPrices = Object.keys(mappedObj).map(key => {
            //     return {
            //         [key]: mappedObj[key]
            //     }
            // })
            this.getData(labels, mappedObj)
        },
        getData(labels, mappedObj){
            let currObj;
            const keys = Object.keys(mappedObj)
            const array = labels.map((label, i) => {
                for(let i = 0; i<keys.length; i++){
                    if(label === keys[i])  return currObj = mappedObj[keys[i]]
                    if(i === keys.length-1) return currObj = 0

                }
                return currObj
            })
            return this.mappedPrices = array
        }
    },
    created(){
        this.toyPricePerType()
    },
    mounted () {
      // Overwriting base render method with actual data.
      this.renderChart({
        labels: ['Girl', 'Boy', 'TCG', 'Action', 'Funny'],
        datasets: [
          {
            label: 'Price per toy type',
            backgroundColor: '#2C3E50',
            data: this.mappedPrices
          }
        ]
      })
    }
}
</script>

