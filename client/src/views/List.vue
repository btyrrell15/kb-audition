<template>
  <div>
    <v-container>
        <v-flex xs12>
                <v-img src="../assets/tuacahn.png" height="120" width="200" class="mt-4 ml-auto mr-auto"></v-img>
      </v-flex>
      <v-flex xs12 class="white--text text-center">
        <h3>{{auditionName}}</h3>
        
        </v-flex>
      <v-layout row wrap>
        <v-flex xs12 class="ma-5 pt-8 text-center" v-if="none">
          <h3 class="white--text">Sorry, There aren't any people registered for this audition
          </h3>
        </v-flex>
        <v-flex xs12 class="ma-4">
          <!-- <router-link to="/scores">
            <v-btn>View Audition Scores</v-btn>
          </router-link> -->
        </v-flex>
        <v-flex xs12>
          <v-card
            class="grey darken-4 ma-4"
            dark
            height="auto"
            v-for="perform in performers"
            :key="perform._id"
            :disabled="perform.Scored && judgeId == perform.JudgeID"
          >
            <v-layout>
              <v-flex xs4
              >
                <v-avatar size="90px" class="ml-3 mt-4">
                  <v-img :src="perform.Image"></v-img>
                </v-avatar>
              </v-flex>
              <v-flex xs8>
                <v-card-title class="mb-0 pb-0 ml-auto mr-auto">{{perform.Name}} <span class="ml-4"></span></v-card-title>
                <v-divider class="cyan accent-3 mr-10 ml-4 mt-2"></v-divider>
                <v-card-text v-if="judgeId != perform.JudgeID">
                    <router-link to="/Performer">
                        <v-btn @click="setPerformer(perform)" >Score Audition</v-btn>
                    </router-link>
                    
                </v-card-text>
                <v-card-text v-if="judgeId == perform.JudgeID">
                    <h3>{{perform.Overall}}/30</h3>
                    
                </v-card-text>
                
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

const url = require("../client_config/config").url;


export default {
  data: function() {
    return {
     performers: [],
     tempData: [],
     auditionId: localStorage.getItem('AuditionID'),
     judgeId: localStorage.getItem('user'),
     performerId: '',
     auditionName: '',
     temp: [],
     none: false,
     tempScores: [],
    }
  }, 

  methods: {
    ...mapActions(['getUser']),


    getPerformers: function() {
        axios.get(`${url}/performer`).then(res => {
            this.performers = [],
            this.tempData = res.data.performers;
            for (var i = 0; i < this.tempData.length; i++){
              if (this.auditionId == this.tempData[i].AuditionID) {
                this.performers.push(this.tempData[i])
              } else if (this.performers == []){
                this.none = true;

              }
            }
            
          })
    },

    setPerformer(performer) {
      this.performerId = performer._id
      console.log(this.performerId + "test")
      localStorage.setItem('PerformerID', this.performerId)
    },

    checkAudition() {
      axios.get(`${url}/audition`).then(res => {
        this.temp = res.data.auditions
        for (var i = 0; i < this.temp.length; i++) {
          if (this.auditionId == this.temp[i]._id){
            this.auditionName = this.temp[i].AuditionName
          }
        }
        console.log(this.audition)
      })
    },

    

  },
  
  computed: {
      ...mapGetters(['user'])

  },
  
  created() {
      this.getUser()
      this.getPerformers()
      this.checkAudition()
  }
  
}
</script>