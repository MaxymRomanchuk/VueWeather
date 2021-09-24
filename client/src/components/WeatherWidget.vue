<template>
    <div>
        <table v-if="!error" class="centered">
            <tr>
                <th>Місто</th>
                <th>Стан погоди</th>
                <th>Вдень</th>
                <th>Вночі</th>
                <th>Повідчуттях</th>
            </tr>
            <tr>
                <th>{{forecast.city}}</th>
                <th>{{forecast.description}}</th>
                <th>{{forecast.temperature[0]}}</th>
                <th>{{forecast.temperature[1]}}</th>
                <th>{{forecast.temperature[2]}}</th>
            </tr>
        </table>
        <div v-else class="centered">
            <h3>Неправильно вказане місто! (спробуйте ще раз, латиницею)</h3>
        </div>
    </div>
</template>

<script>
export default {
  name: 'WeatherWidget',
  props: {
    cityname: String,
    switcher: Number,
  },

  data() {
    return {
      error: false,
      forecast: {
        city: '',
        description: '',
        temperature: [0, 0, 0],
      },
    };
  },

  methods: {
    setTableData(response) {
      if (!response.description) {
        this.error = true;
        throw new Error('No forecast in response!');
      }
      this.forecast.city = this.cityname;
      this.forecast.description = response.description;
      this.forecast.temperature = response.temperature;
      this.error = false;
    },

    loadData() {
      const API_URL = 'http://localhost:4000/forecast';
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ city: this.cityname }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          try {
            this.setTableData(result);
          } catch (err) {
            this.error = true;
          }
        });
    },
  },

  mounted() {
    this.loadData();
  },

  watch: {
    switcher() {
      this.loadData();
    },
  },
};
</script>

<style scoped>
.centered {
  margin-left: auto;
  margin-right: auto;
}

th {
  text-align: center;
  border: 1px solid black;
}

table {
  padding: 10px;
}
</style>
