<template>
  <v-app>
    <v-main>
      <template v-for="(row, rindex) in $config.rows">
        <v-row :key="rindex">
            <template v-for="(col, cindex) in row.cols"> 
              <v-col class="wrapper" :key="cindex" :cols="col.cols" :sm="col.sm" :lg="col.lg">
                <component
                    :is="col.component"
                    :data="$bundle[col.datans]"
                    :config="col.config"
                > 
                </component>
              </v-col>
            </template>
        </v-row>
      </template>
    </v-main>
  </v-app>
</template>

<script>
import PatientData from '/src/components/PatientData.vue';
export default {
  components: {
    PatientData,
  },
}
</script>
<style>
  .wrapper{
    padding: unset;
    padding: 5px;
  }
  .wrapper .col-lg-6{
    padding: unset;
  }
</style>
