<template>
  <div class="mainDiv">
    <!-- <div>这是新碟详情页面，和歌单详情类似</div> -->
    <!-- <p>{{currentSonglistId}}</p> -->
    <!-- 歌单头 -->
    <div class="playlisthead">
      <div class="playlistcov">
        <img :src="albumListDetail.picUrl" />
      </div>
      <div class="playlistright">
        <div class="playdetail">
          <span>专辑</span>
          <h2>{{albumListDetail.name}}</h2>
        </div>
        <!-- <div class="userinfo">
          <a>
            <img :src="playlistDetail.creator.avatarUrl" class="headportrait" v-if="!loading" />
          </a>
          <span v-if="!loading">{{playlistDetail.creator.nickname}}</span>
          <span>{{playlistDetail.createTime|dateFormat}}</span>
        </div>-->
        <div>
          <!-- <p>歌手：{{albumListDetail.artists[0].name}}</p> -->
          <div class="albumTAC">发行时间：{{albumListDetail.publishTime|dateFormat}}</div>
          <div class="albumTAC">发行公司：{{albumListDetail.company}}</div>
        </div>
        <div class="headbtn">
          <a class="headbutton">播放</a>
          <a class="headbutton">收藏</a>
          <a class="headbutton">分享</a>
          <a class="headbutton">下载</a>
          <a class="headbutton">评论</a>
        </div>
      </div>
    </div>
    <div class="albumIntro">
      <div>
        <b>专辑介绍</b>
      </div>
      <p class="albumDescription">{{albumListDetail.description}}</p>
    </div>
    <!-- 歌曲内容列表 -->
    <div class="listdetailhead">
      <div class="songdetailinfo">
        <h3>播放歌曲列表</h3>
        <span>{{albumListDetail.size}}首歌</span>
      </div>

      <!-- <span>播放：{{playlistDetail.playCount}}次</span> -->
    </div>
    <!-- 点击播放歌曲 -->
    <el-table :data="songsListDetail" stripe style="width: 100%">
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column prop="name" label="标题" width="400"></el-table-column>
      <el-table-column prop="dt" label="时长" width="180"></el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="180"></el-table-column>
      <!-- <el-table-column prop="al.name" label="专辑"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentAlbumId: this.$route.params.id
        ? this.$route.params.id
        : window.localStorage.getItem("currentId"),
      // playlistDetail: {},
      albumListDetail: {}, //专辑详细数据
      songsListDetail: [], //专辑歌曲详细数据
      //loading: false,
      queryIds: "",

      //传给父组件的具体的行
      rowid: "",
      //歌单中所有歌曲的id
      songsIds: []
    };
  },
  watch: {
    // 监听路由跳转
    $route(newRoute, oldRoute) {
      // console.log("watch", newRoute, oldRoute);
      this.currentAlbumId = this.$route.params.id;
      // this.getSongList();
      this.getAlbumDetail(); //获取专辑详细信息
    }
  },
  created() {
    // this.getSongList(); //获取歌单详细信息
    // this.getSongsDetail(); //获取完整的歌曲信息
    console.log("专辑id create阶段", this.currentAlbumId);
    this.getAlbumDetail();
    console.log("create阶段", this.albumListDetail);
  },
  mounted() {
    console.log("组件挂载阶段", this.albumListDetail);
  },
  methods: {
    getAlbumDetail() {
      this.$axios
        .get("http://musicapi.leanapp.cn/album", {
          params: {
            id: this.currentAlbumId
          }
        })
        .then(res => {
          // console.log("专辑详细信息", res.data.album);
          this.albumListDetail = res.data.album;
          this.songsListDetail = res.data.songs;
          this.songsListDetail.forEach(item => {
            let dt = new Date(item.dt);
            let mm = (dt.getMinutes() + "").padStart(2, "0");
            let ss = (dt.getSeconds() + "").padStart(2, "0");
            item.dt = mm + ":" + ss;
            if (item.alia.length != 0) {
              item.name = item.name + "-" + item.alia[0];
            }
          });
          // console.log("图片url", this.albumListDetail.picUrl);
          //this.loading = true;
        })
        .catch(err => {
          console.log(err);
        });
    }
    // getSongList() {
    //   this.loading = true;
    //   this.$axios
    //     .get("http://musicapi.leanapp.cn/playlist/detail", {
    //       params: {
    //         id: this.currentSonglistId
    //       }
    //     })
    //     .then(res => {
    //       // console.log(res);
    //       this.queryIds = "";
    //       this.playlistDetail = res.data.playlist;
    //       this.playlistDetail.trackIds.forEach(item => {
    //         this.queryIds += item.id + ",";
    //         this.songsIds.push(item.id);
    //       });
    //       //去掉结尾的逗号
    //       this.queryIds = this.queryIds.substr(0, this.queryIds.length - 1);
    //       console.log(this.queryIds);
    //       this.getSongsDetail();
    //       this.loading = false;
    //       //将所有的歌曲id传递给Main组件
    //       // this.$emit("setSongsId",this.SongsIds);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // getSongsDetail() {
    //   this.$axios
    //     .get("https://autumnfish.cn/song/detail", {
    //       params: {
    //         ids: this.queryIds
    //       }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       this.songslist = res.data.songs;
    //       this.songslist.forEach(item => {
    //         let dt = new Date(item.dt);
    //         let mm = (dt.getMinutes() + "").padStart(2, "0");
    //         let ss = (dt.getSeconds() + "").padStart(2, "0");
    //         item.dt = mm + ":" + ss;
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    // 点击播放歌曲
    // clickToPlay(row) {
    //   console.log("点击成功");
    //   //传递所点击歌曲的id
    //   var songsIds = this.songsIds;
    //   this.$emit("setSongListInfo", songsIds, row.id);
    // }
  }
};
</script>
<style>
.mainDiv {
  width: 1000px;
  margin: 0 auto;
}
.playlisthead {
  width: 1000px;
  height: 200px;
  /* background: lightcoral; */
  padding: 20px;
}
/* 歌单封面图片 */
.playlistcov {
  width: 210px;
  height: 210px;
  padding: 5px;
  border: 1px solid rgb(146, 143, 143);
  float: left;
}
.playlistright {
  float: left;
}
.playlistcov img {
  width: 210px;
  height: 210px;
}
/* 右边的一些内容 */
.playdetail,
.userinfo,
.headbtn {
  display: flex;
  align-items: flex-start;
  margin-left: 40px;
}
.playdetail span {
  display: block;
  width: 60px;
  height: 30px;
  background: rgb(194, 12, 12);
  border-radius: 5px;
  padding: 5px;
  line-height: 30px;
  font-size: 20px;
  color: white;
}
.playdetail h2 {
  margin: 0px;
  padding: 5px;
}
.headportrait {
  width: 40px;
}
/* .user-info {
  display: flex;
  text-align: left;
  margin-left: 40px;
} */
.userinfo {
  margin-top: 10px;
  align-items: center;
}
.userinfo a {
  display: block;
  margin-left: 10px;
}
.userinfo span {
  display: block;
  margin-left: 10px;
}
.headbtn {
  margin-top: 10px;
}
.headbutton {
  display: block;
  width: 70px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #7d7d7d;
  border-radius: 5px;
  margin-left: 10px;
}
.listdetailhead {
  display: flex;
  justify-content: space-between;
}
.listdetailhead span {
  display: block;
  padding: 4px;
  font-size: 14px;
}
.songdetailinfo {
  display: flex;
  width: 300px;
}
.songdetailinfo h3 {
  padding: 0px;
  margin: 0px;
  margin-left: 20px;
}
.songdetailinfo span {
  margin-left: 40px;
}
/* 专辑介绍 */
.albumIntro {
  padding: 20px;
  text-align: left;
}
.albumTAC {
  text-align: left;
  margin-left: 50px;
  padding: 5px;
}
/* .albumDescription {
  overflow: hidden;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
} */
</style>