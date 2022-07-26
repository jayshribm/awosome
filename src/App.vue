<template>
    <patient-detail />
</template>

<script>
// import config from "./assets/config.json"
// import data from "./assets/data.json"
import PatientDetail from './components/PatientDetail';

export default {
  name: 'App',

  components: {
    PatientDetail,
  },

  data: () => ({
    //
  }),
};
</script>

<style>

</style>