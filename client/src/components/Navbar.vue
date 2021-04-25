<template>
    <div>
        <v-app-bar
            v-if="isLoggedIn"
            color="black"
            app   
            class="bar"
        >
            
            <v-btn class="black" fab depressed small @click="$router.go(-1)">
                <v-icon class="white--text">keyboard_backspace</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <!-- <v-img src="../assets/q3.png" ></v-img> -->
            <v-app-bar-title class="white--text">KB Audition</v-app-bar-title>
            <v-spacer></v-spacer>
            
            <v-app-bar-nav-icon @click="drawer = true" class="white--text"></v-app-bar-nav-icon>
        
        </v-app-bar>
        
        <v-navigation-drawer
            temporary
            right
            height="200"
            app
            v-model="drawer"
            dark
            >
            <template v-slot:prepend>
                <v-list-item two-line>
                <!-- <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                </v-list-item-avatar> -->

                <v-list-item-content>
                    <v-list-item-title>{{ user.FirstName }} {{user.LastName}}
                        <v-btn x-small right absolute depressed class="pink" @click="logoutUser()">
                            logout
                            <v-icon x-small class="ml-2">logout</v-icon>

                        </v-btn>
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ user.Role }}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                router :to="item.link"
                >
                <v-list-item-icon>
                    <v-icon class="cyan--text">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
       
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data () {
        return {
            items: [
                { title: 'Home', icon: 'mdi-home-city', link: "/" },
                { title: 'My Account', icon: 'mdi-account', link: "/Account" },
                { title: 'Auditions', icon: 'mdi-account-group-outline', link: "/Audition" },
                { title: 'Past Auditions', icon: 'mdi-account-group-outline', link: "/Audition" },
                { title: 'View Scores', icon: 'mdi-account-group-outline', link: "/Audition" },
            ],
            drawer: false,
        }
    },
    computed: {
        ...mapGetters(["isLoggedIn", 'user'])
    },
    methods: {
        ...mapActions(['logout', 'getUser']),
        logoutUser(){
            this.logout();
            this.drawer = false;

        },
        
    },
    created() {
        this.getUser()
    }

}
</script>
<style>
.bar {
    border-bottom: pink;
}
</style>