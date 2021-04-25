<template>
  <div>
    <v-divider class="pink ml-4 mr-4 mb-2"></v-divider>
    <v-container>
        <v-layout row wrap class="text-center">
          <v-flex xs12 class="text-center">
            <h2 class="white--text font-weight-light">Welcome {{user.FirstName}}</h2>
            </v-flex>
          <v-flex xs12>
            <v-avatar size="150" class="mb-2 mt-8 grey darken-4">
            <v-img 
              :src="user.Image"
              
              ></v-img>
          </v-avatar>
          </v-flex>
          
          <v-flex xs12 class="ma-4 pt-4">
            <v-card class="grey darken-4 pb-2">
            <h2 class="white--text font-weight-light">Available Auditions</h2>
                <v-divider class="cyan accent-3 ml-14 mr-14 mb-2 mt-2"></v-divider>

                <v-expansion-panels focusable dark>
                    <v-expansion-panel
                    v-for="audition in upcoming"
                    :key="audition._id"
                    
                    >
                    <v-expansion-panel-header class="grey darken-4 white--text">{{audition.AuditionName}}</v-expansion-panel-header>
                    <v-expansion-panel-content class="grey darken-4 white--text">
                        
                       <div class="ma-1"><h4>Date of Audition:</h4> {{ audition.AuditionDate }}</div>
                       <div class="ma-1"><h4>Audition Location</h4> {{ audition.CompanyName }}</div>
                       <v-dialog v-model="dialog" max-width="100%">
                    <template v-slot:activator="{ on }">
                    <v-btn class="cyan accent-3 mt-3" v-on="on" @click="showAdd()"
                        >Register</v-btn
                    >
                    </template>
                    <v-card>
                    <v-card-title class="purple">
                        <span class="headline white--text">{{ titleForm  }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="newName"
                                label="Full Name"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="newEmail"
                                label="Email"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">   
                                <v-text-field
                                v-model="newPhone"
                                label="Phone"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                v-model="newAddress"
                                label="Address"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                v-model="newCity"
                                label="City"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                v-model="newState"
                                label="State"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                v-model="newZip"
                                label="Zip"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-text-field
                                v-model="newSpecialties"
                                label="Specialties"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                              <v-file-input label="Upload Resume"></v-file-input>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="teal accent-3" text @click="addPerformer(audition)" v-if="newAudition">Register</v-btn
                        >
                        <v-btn color="purple" text @click="updatePerformer()" v-if="editAudition">Update</v-btn
                        >
                        <v-btn color="purple" text @click="close">Cancel</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
              </v-card>
          </v-flex>

        </v-layout>

         
    </v-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'

const url = require("../client_config/config").url;

export default {
  data: function() {
    return {
      dialog: false,
      modal: false,
      message: "",
      text: "",
      titleForm: "New Audition",
      msg: false,
      newAuditionName: "",
      newRoles: "",
      newRoleNames: "",
      newAuditionDate: "",  
      auditionId: "",
      auditions: [],
      newAudition: false,
      editAudition: false,
      today: new Date(),
      previous: [],
      upcoming: [],
      item: {},
      role: "",
      newName: "",
      newEmail: "",
      newPhone: "",
      newAddress: "",
      newCity: "",
      newState: "",
      newZip: "",
      newResume: "",
      newSpecialties: "",      
      performers: [],
      performerId: '',
      userID: '',
    }
  }, 

  methods: {
    ...mapActions(['getUser']),

    getAuditions: function() {
        axios.get(`${url}/audition`).then(res => {
            this.upcoming = []
            this.auditions = res.data.auditions;
            this.today = moment(this.today).format("YYYY-MM-DD")
            for (var i = 0; i < this.auditions.length; i++){
              if (this.today < this.auditions[i].AuditionDate && this.performers.AuditionID != this.auditions[i]._id) {
                this.upcoming.push(this.auditions[i])
              } 
            }
        });
    },

    getPerformer: function() {
      axios.get(`${url}/performer`).then(res => {
        this.performerId = this.user._id;
        this.performers = [],
        this.temp = res.data.performers
        for (var i = 0; i < this.temp.length; i++){
              if (this.performerId == this.temp[i].UserID) {
                this.performers.push(this.temp[i])
              } 
            }
      })
    },

    addPerformer: function(audition) {
      var req_body = {
        
        Name: this.newName,
        Email: this.newEmail,
        Phone: this.newPhone,
        Address: this.newAddress,
        City: this.newCity,
        State: this.newState,
        Zip: this.newZip,
        Resume: this.newResume,
        AuditionID: audition._id,
        UserID: this.user._id
        
      };

      axios.post(`${url}/performer`, req_body ).then(res => {
        if (res.status == 400) {
          res.json().then(function(data) {
            this.text = data.message;
          });
        }
        this.newName = "";
        this.newPhone = "";
        this.newEmail = "";
        this.newAddress = "";
        this.newCity = "";
        this.newState = "";
        this.newZip = "";
        this.newResume = "";
        this.message =true;
        this.text ="You've Successfully Registered for " + audition.Name;
      });
      this.close();
    },

    viewAudition(audition) {
      this.titleForm = "Viewing " + audition.AuditionName;
      this.dialog = true;
      this.newAuditionName = audition.AuditionName;
      this.newRoles = audition.Roles;
      this.newRoleNames = audition.RoleNames;
      this.newAuditionDate = audition.AuditionDate;
      this.auditionId = audition._id;
    },
    showAdd() {
      this.titleForm= "New Audition";
      this.newAudition = true;
      this.editAudition  = false;
      this.newName = this.user.FirstName + " " + this.user.LastName;
      this.newEmail = this.user.Email;
      this.newPhone = this.user.Phone;
      this.newResume = this.user.Resume;
      this.newAddress = this.user.Address;
      this.newCity = this.user.City;
      this.newState = this.user.State;
      this.newZip = this.user.Zip;
    },
    updateAudition() {
      var req_body = {
        AuditionName: this.newAuditionName,
        Roles: this.newRoles,
        RoleNames: this.newRoleNames,
        AuditionDate: this.newAuditionDate,
      };
      axios.put(`${url}/audition/${this.auditionID}`, req_body)
        .then((response) => {
          this.getAuditions();
          if (response.status == 400) {
            response.json().then(function(data) {
              alert(data.msg);
            });
          }
          this.newAuditionName = "";
          this.newRoles = "";
          this.newRoleNames = "";
          this.newAuditionDate = "";
          this.msg = true;
          this.text = "The audition has been updated successfully.";
        });
      this.close();
    },
    close() {
      this.dialog = false;
      
    },
   
  },

  computed: {
      ...mapGetters(['user'])
  },

  created() {
      this.getAuditions();
      
      this.getUser();
  }
  
}
</script>