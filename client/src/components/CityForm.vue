<template>
    <form @submit.prevent="loadWeatherByCity">
        <p>Будь ласка, введіть назву міста:</p>
        <div class="padder">
            <input  type="text"
                id="cityname"
                v-model="city"
                placeholder="Назва міста (Lviv, Kyiv...)"
                required>
        </div>
        <button type="submit">Завантажити погоду</button>
    </form>
</template>

<script>
export default {
  name: 'CityForm',
  data() {
    return {
      city: '',
    };
  },
  methods: {
    loadWeatherByCity() {
      this.$emit('submitted', this.city);
    },
  },
};
</script>

<style scoped>
.padder {
    padding: 10px;
}
</style>
