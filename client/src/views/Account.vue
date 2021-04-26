<template>
  <div>
   <v-snackbar v-model="message" top> {{ text }} <v-btn color="pink" text  @click="message = false"> Close</v-btn></v-snackbar>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <h1 class="font-weight-light mt-8"> My Account </h1>
                <v-avatar size="150" class="mb-2 mt-5">
                  <v-img :src="user.Image" class="ml-auto mr-auto mt-5 mb-5"></v-img>

                </v-avatar>
                <div class="white--text ma-1"><span class="font-weight-bold headline">Name:</span> <span class="font-weight-light headline ml-1">{{ user.FirstName }} {{user.LastName}}</span> </div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">Phone:</span> <span class="font-weight-light headline ml-1">{{user.Phone}}</span> </div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">Email:</span> <span class="font-weight-light headline ml-1">{{user.Email}}</span> </div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">Address:</span> <span class="font-weight-light headline ml-1">{{user.Address}}</span> </div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">City:</span>  <span class="font-weight-light headline ml-1">{{user.City}}</span></div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">State:</span>  <span class="font-weight-light headline ml-1">{{user.State}}</span></div>
                <div class="white--text ma-1"><span class="font-weight-bold headline">Zip:</span>  <span class="font-weight-light headline ml-1">{{user.Zip}}</span></div>
            </v-flex>
            <v-flex xs12 class="text-center mr-2 ml-2">
              <v-dialog v-model="dialog" max-width="100%">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="mb-2 mt-8 white--text cyan accent-3" v-on="on" v-bind="attrs" @click="show(user)"
                    >
                    <v-icon left>edit</v-icon>
                    Edit Profile</v-btn
                  >
                </template>
                <v-card class="grey darken-4" dark>
                  <v-card-title class="pink">
                    <span class="headline white--text">Editing Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" v-if="user.Role == 'Company'">
                          <v-text-field
                            v-model="newCompanyName"
                            label="Company Name"
                            
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="newFirstName"
                            label="First Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field
                            v-model="newLastName"
                            label="Last Name"
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
                            v-model="newEmail"
                            label="Email"
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
                            label="City"
                            v-model="newCity"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field         
                            label="State"
                            v-model="newState"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                          <v-text-field         
                            label="Zip"
                            v-model="newZip"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="cyan accent-3 white--text" @click="updateProfile()">Update</v-btn
                    >
                    <v-btn text @click="close">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
      text: "",
      message: false,
      dialog: false,
      newCompanyName: "",
      newImage: "",
      newFirstName: "",
      newLastName: "",
      newPhone: "",
      newEmail: "",
      newAddress: "",
      newCity: "",
      newState: "",
      newZip: "",
      newBirthday: "",
      newUsername: "",
      newPassword: "",
      profileId: localStorage.getItem('user'),
      
    }
  }, 

  methods: {
    ...mapActions(['getUser']),
   

    show(user) {
      this.dialog = true;
      this.newCompanyName = user.CompanyName;
      this.newFirstName = user.FirstName;
      this.newLastName = user.LastName;
      this.newPhone = user.Phone;
      this.newEmail = user.Email;
      this.newAddress = user.Address;
      this.newCity = user.City;
      this.newState = user.State;
      this.newZip = user.Zip;
      this.profileId = user._id
    },

    close() {
      this.dialog = false;
    },

    updateProfile() {
      var req_body = {
        CompanyName: this.newCompanyName,
        FirstName: this.newFirstName,
        LastName: this.newLastName,
        Phone: this.newPhone,
        Email: this.newEmail,
        Address: this.newAddress,
        City: this.newCity,
        State: this.newState,
        Zip: this.newZip,
      };
      axios.put(`${url}/Users/${this.profileId}`, req_body)
      .then((response) => {
        this.getUser()
        if (response.status == 400) {
          response.json().then(function(data) {
            alert(data.msg);
          });
        }
        this.newCompanyName= "";
        this.newFirstName = "";
        this.newLastName = "";
        this.newPhone = "";
        this.newEmail = "";
        this.newAddress = "";
        this.newCity = "";
        this.newState = "";
        this.newZip = "";
        this.newState = "";
        this.message =true;
        this.text ="The adjustment has been updated successfully.";
      });
      this.close();

    },

  },
  
  computed: {
      ...mapGetters(['user'])

  },
  
  created() {
      this.getUser()
  }
  
}
</script>