<template>
  <div>
    <p><strong>Id:</strong> {{ eventData.Id }}</p>
    <p><strong>Type:</strong> {{ eventData.Type }}</p>
    <p><strong>Date:</strong> {{ formattedDate }}</p>
    <p><strong>Description:</strong> {{ eventData.Description }}</p>
    <p><strong>Location:</strong> {{ eventData.Location }}</p>
    <p><strong>Attendance:</strong> {{ formattedAttendance }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventData: {
        Id: 7,
        Type: "Treening",
        Date: new Date(Date.UTC(2030, 11, 22, 12, 42, 0)),
        Description: "Pohlakorjelus",
        Location: "Järvamaa",
        Attendance: true
      }
    };
  },
  computed: {
    formattedDate() {
      return new Date(this.eventData.Date).toUTCString();
    },
    formattedAttendance() {
      return this.eventData.Attendance ? "Jah" : "Ei";
    }
  }
};
</script>

<style scoped>
/* Siin saate määrata stiilid oma komponendile */
</style>
