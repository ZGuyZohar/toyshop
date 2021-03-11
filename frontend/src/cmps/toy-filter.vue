<template>
<section class="filter-container">
    <h4>Filter toys:</h4>
    <div class="filter">
        <label>
            By name: 
            <el-input-text class="text" @changeFilter="changeFilterBy"> </el-input-text>
        </label>
        <label class="category">By category:
            <el-select @changeFilter="changeFilterBy" />
        </label>
        <el-checkbox class="checkbox" @changeFilter="changeFilterBy" />
    </div>
</section>
</template>

<script>
import elCheckbox from '@/cmps/packages/el-checkbox'
import elSelect from './packages/el-select'
import elInputText from './packages/el-input-text'
export default {
    data(){
        return {
            filterBy: {txt: '', inStock: false, category: 'all'},
        }
    },
    methods: {
        setFilter(){
            const filterCopy = JSON.parse(JSON.stringify(this.filterBy))
            this.$store.commit({type: 'setFilter', filterBy: filterCopy})
        },
        changeFilterBy(valueToChange, filterToChange){
            this.filterBy[filterToChange] = valueToChange
            this.setFilter()
        }

    },
    components: {
        elCheckbox,
        elSelect,
        elInputText
    }
}
</script>

<style>

</style>