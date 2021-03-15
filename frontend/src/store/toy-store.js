import {toyService} from '../services/toy-service.js'

export default {
    strict: true,
    state: {
        toys: [],
        filterBy: {txt: '', category: 'all'},
        sortBy: 'all',
        toggleSort:-1 
    },
    getters: {
        toysToShow(state){
            let filteredToys = JSON.parse(JSON.stringify(state.toys))
            // if((!state.filterBy || !state.filterBy.txt)) return filteredToys
            filteredToys = filteredToys.filter(toy => toy.name.toLowerCase().includes(state.filterBy.txt.toLowerCase()))
            if(state.filterBy.inStock) {
                filteredToys = filteredToys.filter(toy => toy.inStock)
            }
            if(state.sortBy === 'name') {
                filteredToys = filteredToys.sort((toy1, toy2) => (toy1.name.toLowerCase().localeCompare(toy2.name.toLowerCase())*state.toggleSort ))
            }
            if(state.sortBy === 'price'){
                filteredToys = filteredToys.sort((toy1, toy2) => (toy2.price - toy1.price)*state.toggleSort)
            }
            if(state.filterBy.category !== 'all') {
                filteredToys = filteredToys.filter(toy => toy.type === state.filterBy.category);
            }
            return filteredToys
        },
        allToys(state){
            return state.toys
        }
    },
    mutations: {
        setToys(state, {toys}){
            state.toys = toys;
            console.log(toys[0]);
        },
        updateToy(state, {savedToy}){
            const foundIdx = state.toys.findIndex(toy => {
                return toy._id === savedToy._id
            });
            return state.toys.splice(foundIdx, 1, savedToy)
        },
        addToy(state, {savedToy}){
            return state.toys.push(savedToy)
        },
        removeToy(state, {toyId}){
            const foundIdx = state.toys.findIndex((toy) => toy._id === toyId)
            if(foundIdx === -1) return console.log('wrong index');
            state.toys.splice(foundIdx, 1)
        },
        setFilter(state, {filterBy}){
            state.filterBy = filterBy
        },
        setSort(state, {sortBy}){
            if(state.sortBy !== sortBy) state.toggleSort = -1
            state.sortBy = sortBy;
            state.toggleSort *= -1
        }
    },
    actions: {
        async loadToys({commit}){
            const toys = await toyService.query()
            commit({type: 'setToys', toys})
        },
        async saveToy(context, {newToy}){
            let type = (newToy._id) ? 'updateToy' : 'addToy';
            const savedToy = await toyService.save(newToy)
            context.commit({type, savedToy})
        },
        async removeToy(context, {toyId}){
            await toyService.remove(toyId)
            context.commit({type: 'removeToy', toyId})
        },
    }
}