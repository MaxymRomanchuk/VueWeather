<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <CityForm @submitted="handleSubmit"/>
    <WeatherWidget v-if="keyProp" :cityname="city" :switcher="keyProp"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CityForm from '@/components/CityForm.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';

export default {
  name: 'Home',
  components: {
    CityForm,
    WeatherWidget,
  },
  data() {
    return {
      city: 'Lviv',
      keyProp: 0,
    };
  },
  methods: {
    handleSubmit(newCity) {
      this.city = newCity;
      this.keyProp += 1;
    },
  },
};
</script>
