<template>
  <v-container>
    <v-card class="col-lg-6" style="height: 75%">
      <v-card-text>
        <b>{{this.config.tag_name}}</b><br />
        <span>{{this.data}}</span>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    props: {
      data: {
        default() {
          return {};
        },
      },
      config: {
        default() {
          return {};
        },
      },
    },
  }


// import Vue from 'vue'
// import VueSocketIO from "vue-socket.io"
// Vue.use(
//     new VueSocketIO({
//         debug: true,
//         connection: "http://127.0.0.1:5000"
//     })
// ) 
// export default {

//   sockets: {
//         connect () {
//           console.log("Connected")
//         },
//         get_data (data) {
//           console.log(data)
//         }
//     },
// }
</script>
