<template>
  <v-container>
    <v-card class="col-lg-6" style="height: 75%">
      <v-card-text>
        <b>Scores</b><br />
        <span>10%</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueSocketIO from "vue-socket.io"
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: "http://127.0.0.1:5000"
    })
) 
export default {

  sockets: {
        connect () {
          console.log("Connected")
        },
        get_data (data) {
          console.log(data)
        }
    },
}
</script>
