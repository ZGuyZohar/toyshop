<template>
  <div class="about">
    <h1>Our branches across the country:</h1>
    <GmapMap  ref="mapRef" @click="test"
  :center="center"
  :zoom="7"
  map-type-id="terrain"
  style="width: 500px; height: 300px"
  @center_changed="updateCenter"
>

  <!-- <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  /> -->
</GmapMap>
  </div>
</template>
<script>

export default {
  name: 'about',
  data() {
    return {
      currentLocation : { lat : 32.074979, lng : 34.775880},
      searchAddressInput: ''
    }
  },
  methods: {
    test(){
      console.log(this.$refs);
      this.$refs.mapRef.$mapPromise.then((map) => {
        map.panTo({lat: this.currentLocation.lat, lng: this.currentLocation.lng})
      })
    },
      updateCenter(center) {
    this.center = {
      lat: center.lat(),
      lng: center.lng()
    }
  },
    geolocation : function() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }    
  },
    mounted () {
      this.geolocation();
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
 
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat: 1.38, lng: 103.80})
    })
  }
}
</script>