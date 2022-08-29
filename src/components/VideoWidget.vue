<template>
  <v-row class="info-row"><v-label>CCTV Camera 1-2</v-label></v-row>
  <v-row class="video-row" dense>
    <video muted loop autoplay controls class="video">
      <source src="../assets/autroguard.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </v-row>
</template>

<style lang="scss" scoped>
.info-row {
  margin-top: 0;

  justify-content: center;
  max-height: 5px;
}
.video-row {
  align-content: center;
  justify-content: center;
  min-height: 320px;
  max-height: 320px;
}
.video {
  height: 320px;
  width: 450px;
}
</style>
