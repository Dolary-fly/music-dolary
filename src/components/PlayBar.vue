<template>
  <div class="footdiv">
    <!-- 按钮 -->
    <div class="btns">
      <a class="previous"></a>
      <!-- 播放的时候 -->
      <a class="playstop1" v-if="isplay" @click="pauseSong"></a>
      <!-- 暂停的时候 -->
      <a class="playstop" v-if="!isplay" @click="playSong"></a>
      <a class="nextsong"></a>
    </div>
    <!-- <div class="myaudio"></div> -->
    <!-- 播放进度条 -->
    <span>{{musictime|timeFormat}}/{{totalduration|timeFormat}}</span>
    <div style="width:700px;height:60px;margin-left:30px;">
      <el-slider
        v-model="musictime"
        @change="changeDuration"
        style="margin-top:10px;"
        :max="totalduration"
        :show-tooltip="false"
      ></el-slider>
    </div>
    <!-- 音量 -->
    <div class="volume">
      <!-- <img src="../../static/img/star.png" /> -->
      <a class="star"></a>
      <el-slider style="width:120px;" v-model="currentVolume" @change="changeVolume"></el-slider>
    </div>
    <audio :src="musicUrl" autoplay id="playMusicAudio" controls="controls"></audio>
  </div>
</template>

<script>
export default {
  props: ["songid", "songsIds"],
  data() {
    return {
      musictime: 0,
      totalduration: 0,
      currentVolume: 0,
      maxVolume: 1,
      //是否正在播放歌曲
      isplay: false,
      themusicurl: this.songid
    };
  },
  //当前播放的id

  computed: {
    musicUrl: {
      get: function() {
        console.log("songid", this.songid);
        return (
          "https://music.163.com/song/media/outer/url?id=" +
          this.songid +
          ".mp3"
        );
      },
      set: function(newvalue) {
        return newvalue;
      }
    }
  },
  watch: {
    musicUrl: function() {
      this.isplay = true;
      //console.log("PlayBar中接受到的ids", this.songsIds);
      this.setAudioInfo();
    }
  },

  methods: {
    //设置audio的信息
    setAudioInfo() {
      var audio = document.getElementById("playMusicAudio");

      console.log(this.totalduration);
      audio.addEventListener("timeupdate", () => {
        // 歌曲的总时长
        this.totalduration = audio.duration;
        //从播放到现在过去的时间
        this.musictime = audio.currentTime;
        // 播放完毕自动切换至下一首
        if (audio.currentTime >= audio.duration) {
          this.nextSong();
        }
      });
    },
    // 变化进度条
    changeDuration() {
      var audio = document.getElementById("playMusicAudio");
      if (this.totalduration == 0) {
        return;
      }
      audio.currentTime = this.musictime;
    },
    //设置音量
    changeVolume() {
      var audio = document.getElementById("playMusicAudio");
      audio.volume = this.currentVolume / 100;
    },
    //暂停
    pauseSong() {
      var audio = document.getElementById("playMusicAudio");
      this.isplay = false;
      audio.pause();
    },
    //播放
    playSong() {
      var audio = document.getElementById("playMusicAudio");
      this.isplay = true;
      audio.play();
    },
    //下一曲
    nextSong() {
      var nextIndex =
        this.songsIds.findIndex(target => {
          return target === this.songid;
        }) + 1;
      console.log(nextIndex);
      console.log(this.songsIds[nextIndex]);
      this.songid = this.songsIds[nextIndex];
      // this.musicUrl =
      //   "https://music.163.com/song/media/outer/url?id=" +
      //   this.themusicurl[nextIndex] +
      //   ".mp3";
      // console.log(this.musicUrl);
    }
    //上一曲
  }
};
</script>
<style>
/* 底部auto */
.footdiv {
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  bottom: 0; */
}
.btns {
  display: flex;
  width: 160px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}
.previous,
.playstop,
.playstop1,
.nextsong,
.star {
  width: 30px;
  height: 30px;
  display: block;
  /* background: hotpink; */
}
.previous {
  background-image: url(../../static/img/previous.png);
  background-size: 100%;
}
.playstop {
  background-image: url(../../static/img/stop.png);
  background-size: 100%;
}
.playstop1 {
  background-image: url(../../static/img/playing.png);
  background-size: 100%;
}
.nextsong {
  background-image: url(../../static/img/next.png);
  background-size: 100%;
}
.star {
  background-image: url(../../static/img/star.png);
  background-size: 100%;
}
.volume {
  width: 250px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>