<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MoofengDashboard from './admin'

export default {
  name: 'Moofeng',
  components: { MoofengDashboard },
  data() {
    return {
      currentRole: 'MoofengDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    console.log(this.roles)
    this.currentRole = 'MoofengDashboard'
  }
}
</script>
