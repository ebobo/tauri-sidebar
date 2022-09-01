<template>
  <v-row class="info-row"><v-label>CCTV Camera strame</v-label></v-row>
  <v-row class="video-row" dense>
    <video muted loop autoplay controls class="video">
      <source
        src="https://www.w3schools.com/html/mov_bbb.mp4 "
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </v-row>
</template>

<!-- <script lang="ts">
import { appDir, join } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
const appDirPath = await appDir();
const filePath = await join(appDirPath, 'assets/autroguard.mp4');
const assetUrl = convertFileSrc(filePath);
export default {
  data(): {
    fileURL: string;
  } {
    return {
      fileURL: assetUrl,
    };
  },
};
</script> -->

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
