<template>
  <div>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </div>
</template>
<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import BaseCard from '../../components/UI/BaseCard.vue';
export default {
  components: {
    CoachForm,
    BaseCard,
  },

  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.replace('/coaches');
    },
  },
};
</script>
