<template>
  <v-app>
    <v-main>
      <div class="col-lg-6">
          <template v-for="(row, rindex) in $config.row1">
            <v-row :key="rindex">
                <template v-for="(col, cindex) in row.cols"> 
                  <v-col class="wrapper" :key="cindex" :cols="col.cols" :sm="col.sm" :lg="col.lg">
                    <component
                        :is="col.component"
                        :data="result[$bundle.row1[col.datans]]"
                        :config="col.config"
                    > 
                    </component>
                  </v-col>
                </template>
            </v-row>
          </template>
          
          <template v-for="(row, rindex) in $config.row2">
            <v-row :key="rindex">
                <template v-for="(col, cindex) in row.cols"> 
                  <v-col class="wrapper" :key="cindex" :cols="col.cols" :sm="col.sm" :lg="col.lg">
                    <component
                        :is="col.component"
                        :data="result[$bundle.row2[col.datans]]"
                        :config="col.config"
                    > 
                    </component>
                  </v-col>
                </template>
            </v-row>
          </template>
          
          <span>some heading </span><hr />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PatientData from '/src/components/PatientData.vue';

export default {
  components: {
    PatientData,
  },
  data() {
    return {
      result: null,
      id:1
    }
  },
  mounted(){
    this.tinyData();
  },
  methods:{
    async tinyData(){
      try{
        const res = await fetch(`http://127.0.0.1:5000/patient/${this.id}`);
        this.result = await res.json();
        this.result = this.result[0] 
      }
      catch(err){
          console.log("error", err)
      }
    }
    
  }
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
