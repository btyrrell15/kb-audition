<template>
    <div>
        <v-footer
            v-if="isLoggedIn"
            class="grey darken-4"
            app   
        >
            <v-col
                class="text-center white--text"
                cols="12"
                >
                <!-- {{ new Date().getFullYear() }} — <strong>Kb Audition</strong> -->
                </v-col>
        
        </v-footer>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(["isLoggedIn"])
    }

}
</script>