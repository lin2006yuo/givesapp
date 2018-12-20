<template>
  <div class="use-intro">
    <x-header title="使用引導">
    </x-header>
    <div class="use-intro-container">
      <h1 class="title"><span class="item">GIVE543 贈物網</span><span class="item">使用簡介</span></h1>
      <div class="card">
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">Hello~大家好，我是贈物小兔</span>
            <span class="txt">GIVE543贈物網是一個閒置物資的免費交流平台，幫助大家把閒置物品送給更合用的人，解放空間的同時也收穫滿滿感動~</span>
          </div>
        </div>
        <div class="card-item">
          <div class="desc">
            <span class="txt">那我們第一步該做什麼呢？</span>
          </div>
          <div class="avartar">
            <img :src="UserAvartar" width="72" height="auto" alt="" />
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">首先註冊一個帳號吧，點擊畫面右上角的<br />[登入/註冊]</span>
            <picture>
              <source :srcSet="Desc03M" media="(max-width: 720px)" />
              <img :src="Desc03" width="100%" height="auto" alt="desc-03" />
            </picture>
            <span class="txt">可以使用email註冊，也可以直接使用Facebook或Google+登入哦~</span>
          </div>
        </div>
        <div class="card-item">
          <div class="desc">
            <span class="txt">請問我要如何索取禮物？</span>
          </div>
          <div class="avartar">
            <img :src="UserAvartar" width="72" height="auto" alt="" />
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">索取禮物：</span>
            <span class="txt">你可以免費索取喜歡的禮物並且可以跟贈送者成為朋友哦，請點擊頁面左上角的 <i class="btn">[禮物池]</i> 進入下方畫面：</span>
            <picture>
              <source :srcSet="Desc04ImgM" media="(max-width: 720px)" />
              <img class="pic" :src="Desc04Img" width="100%" height="auto" alt="" />
            </picture>
            <span class="txt">看到喜歡的禮物，點擊進入禮物詳情頁，如果確定想要索取，點擊詳情頁右邊的 <i class="btn">[我要索取]</i> 按鈕，寫下你的索取留言，送出後你就進入候選名單嘍！如果對禮物有疑問，還不確定需不需要，請改用 <i class="btn">[我要留言]</i> 按鈕提問或留言，便於贈送者區分並回覆哦！</span>
            <picture>
              <source :srcSet="Desc04DetailM" media="(max-width: 720px)" />
              <img class="pic" :src="Desc04Detail" width="100%" height="auto" alt="" />
            </picture>
          </div>
        </div>
        <div class="card-item">
          <div class="desc">
            <span class="txt">那如果我有東西要送出呢？</span>
          </div>
          <div class="avartar">
            <img :src="UserAvartar" width="72" height="auto" alt="" />
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">上傳禮物：</span>
            <span class="txt">一樣請先點擊頁面左上角的 <i class="btn">[禮物池]</i> 進入下方畫面：</span>
            <picture>
              <source :srcSet="Desc05M" media="(max-width: 720px)" />
              <img class="pic" :src="Desc05" width="100%" height="auto" alt="" />
            </picture>
            <span class="txt">點擊左邊的 <i class="btn">[上傳禮物]</i> 按鈕就可以開始上傳了！</span>
            <span class="txt">上傳禮物時你可以：</span>
            <span class="txt">1.自由選擇運送方式：全家店到店、新竹物流、面交、賀盟物流、其他物流，以及設定運費是由索取者還是贈送者來負擔  <router-link to='/story/16884'>點擊查看完整寄件攻略</router-link></span>
            <span class="txt">
              2.你還可以將禮物設定為公益團體優先索取哦~<br />
              <img :src="Desc04R" width="177" height="99" alt="" />
            </span>
            <span class="txt">發佈完成後，你的禮物就會出現在禮物池了</span>
          </div>
        </div>
        <div class="card-item">
          <div class="desc">
            <span class="txt">我想要的，禮物池現在正好沒有，怎樣讓有閒置物品的人知道我的需求並送給我呢？</span>
          </div>
          <div class="avartar">
            <img :src="UserAvartar" width="72" height="auto" alt="" />
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">發佈需求：</span>
            <span class="txt">1.想要的東西一時找不到，也可以直接刊登你的需求哦！點擊頁面左上角的 <i class="btn">[需求池]</i> 進入下方畫面：</span>
            <picture>
              <source :srcSet="Desc06M" media="(max-width: 720px)" />
              <img class="pic" :src="Desc06" width="100%" height="auto" alt="" />
            </picture>
            <span class="txt">點擊左邊的 <i class="btn">[發佈需求]</i> 按鈕就可以進行刊登了！刊登成功後你的需求會公開展示在需求池，有閒置物資的贈友看到就可以直接送你啦～同樣地，當你看到其他贈友發佈的需求，如果你手上正好有對方需要的物品，也請踴躍贈出哦～</span>
          </div>
        </div>
        <div class="card-item">
          <div class="desc">
            <span class="txt">贈送和索取的過程中我要如何與對方溝通呢？</span>
          </div>
          <div class="avartar">
            <img :src="UserAvartar" width="72" height="auto" alt="" />
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="title">信封、地球、互動卡</span>
            <span class="txt">網頁右上角的 <img :src="iconEnvelop" width="29" height="25" alt="" /> 顯示的是帶有留言的訊息，而 <img :src="iconEarth" width="29" height="25" alt="" /> 則是系統通知，讓你即時掌握站內動態。一旦你上傳的禮物或是你正在索取的禮物有更新，地球和信封就會出現小紅點提示，點擊即可展開閱讀</span>
            <img class="pic" :src="Desc07Img" width="100%" height="auto" alt="" />
            <span class="txt">你也可以在禮物的詳情頁面，給贈送者留言，在聊天中進行禮物的贈送，更能加深彼此的友誼呢~</span>
          </div>
        </div>
        <div class="card-item">
          <div class="avartar">
            <img :src="CustomAvartar" width="72" height="auto" alt="" />
          </div>
          <div class="desc">
            <span class="txt">
              歡迎大家來索取自己合用的禮物，也踴躍分享家中閒置的好物！<br />
              有人說：提高生活品質最好的方法就是定期扔東西，但是我們覺得還有更好的方法～<br />
              定期把已經用不著的東西送給更需要的人，不是更加兩全其美嗎？<br />
              不論你想透過贈物來解放空間，還是想經由索取來補充家中物資，加入贈物網後<br />
              一定能享受更高品質的生活
            </span>
            <!-- <router-link target="_blank" style="display: 'inline-block', marginTop: '10px'" to="/guide">常見問題Q&A</router-link> -->
          </div>
        </div>
      </div>
      <div class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/gifts">禮物池</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/needs">需求池</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/">首頁探索更多</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CustomAvartar from '@/assets/icon/intro/avartar-custom.png'
import UserAvartar from '@/assets/icon/intro/avartar-user.png'
import Desc03 from '@/assets/icon/intro/desc-03.png'
import Desc03M from '@/assets/icon/intro/desc-03-m.jpg'
import Desc05 from '@/assets/icon/intro/desc-05.png'
import Desc05M from '@/assets/icon/intro/desc-05-m.png'
import Desc04Img from '@/assets/icon/intro/desc-04-img.png'
import Desc04ImgM from '@/assets/icon/intro/desc-04-img-m.png'
import Desc04Detail from '@/assets/icon/intro/desc-04-detail.png'
import Desc04DetailM from '@/assets/icon/intro/desc-04-detail-m.png'
import Desc04R from '@/assets/icon/intro/desc-04-R.jpg'
import Desc06 from '@/assets/icon/intro/desc-06.png'
import Desc06M from '@/assets/icon/intro/desc-06-m.png'
import iconEnvelop from '@/assets/icon/intro/icon-envelop.png'
import iconEarth from '@/assets/icon/intro/icon-earth.png'
import Desc07Img from '@/assets/icon/intro/desc-07-img.png'

export default {
  data () {
    return {
      CustomAvartar,
      UserAvartar,
      Desc03,
      Desc03M,
      Desc05,
      Desc05M,
      Desc04Img,
      Desc04ImgM,
      Desc04Detail,
      Desc04DetailM,
      Desc04R,
      Desc06,
      Desc06M,
      iconEnvelop,
      iconEarth,
      Desc07Img
    }
  }
}
</script>

<style lang="less" scoped>
.use-intro{
  height: 100%;
  .use-intro-container{
    max-width: 920px;
    margin: 0 auto;
    padding: 0 15px;
    text-align: center;
    height: calc(~"100% - 44px");
    overflow-y: scroll;
    scroll-behavior: smooth;
    -webkit-scroll-behavior: smooth;
    overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
    background: #fffdfa url('../../assets/icon/intro/bg.png') no-repeat fixed top;
    > .title{
      margin: 64px 0 64px;
      color: #f3a83c;
      font-size: 28px;
      line-height: 1.15;
      background: url('../../assets/icon/intro/dot.png') center 110px no-repeat;
    }
    .card{
      padding-top:60px;
      border-top: dashed 1px #d8a05f;
      .card-item{
        text-align:left;
        display:flex;
        .btn{
          display: inline-block;
          vertical-align: top;
          color: #f3a83c;
          font-style: normal;
        }
        .avartar{
          /*display: inline-block;*/
          /*vertical-align: top;*/
          flex: 0 0 auto;
        }
        .desc{
          margin: 20px 0 0 20px;
          padding: 10px;
          position: relative;
          /*display: inline-block;*/
          /*vertical-align: top;*/
          flex: 0 1 auto;
          height: auto;
          background: #FFF;
          border-radius: 0px 10px 30px 10px;
          box-shadow: 1px 2px 21px 0px rgba(121, 124, 128, 0.11);
          &:after{
             position: absolute;
             top: 0;
             left: -20px;
             content: '';
             width: 0;
             height: 0;
             border-top: 20px solid #FFF;
             border-left: 20px solid transparent;
           }
          span{
            display: block;
            max-width: 737px;
            text-align: left;
            &.title{
               color: #f3a83c;
               font-size: 16px;
             }
            &.txt{
               font-size: 14px;
             }
          }
        }

        &:nth-of-type(3){
          .desc{
            span{
              max-width: 337px;
            }
            img{
              margin: 10px 0;
            }
          }
        }

&:nth-of-type(5){
  .desc{
    max-width: 757px;
    span{
      max-width: 100%;
    }
    .pic{
      margin: 10px 0;
      &:last-child{
         margin-bottom: 0;
       }
    }
  }
}

&:nth-of-type(7){
  .desc{
    max-width: 757px;
    span{
      width: 100%;
      &.txt{
        img{
          margin: 10px 0;
          vertical-align: middle;
          box-shadow: 1px 2px 21px 0px rgba(121, 124, 128, 0.11);
        }
        &:nth-of-type(4){
           margin-top: 10px;
           color: #F5AA38;
         }
      }
    }
    .pic{
      margin: 20px 0;
    }
  }
}

        &:nth-of-type(8){
          .desc{
            span{
              max-width: 570px;
            }
          }
        }
&:nth-of-type(9){
  .desc{
    max-width: 757px;
    .pic{
      margin: 20px 0;
    }
  }
}

        &:nth-of-type(11){
          .desc{
            max-width: 757px;
            span{
              max-width: 100%;
            }
            .pic{
              margin: 20px auto;
            }
          }
        }

&:nth-of-type(12){
   text-align: left;
   margin-bottom: 40px;
   justify-content: flex-start;
.desc{
  padding:10px 20px;
  margin: 20px 0 0 20px;
  border-radius: 0 10px 30px 10px;
  height: auto;
  &:after{
   position: absolute;
   top: 0;
   left: -20px;
   right: auto;
   transform: rotate(0deg);
  }
  span{
    display: block;
    text-align: left;
    &.txt{
     font-size: 14px;
    }
  }
}
}

        &:nth-of-type(2n){
           margin: 20px 0;
           text-align:right;
             justify-content:flex-end;
            .desc{
              padding:10px;
              margin: 20px 20px 0 0;
              // height: 40px;
              border-radius: 10px 0px 10px 20px;
              &:after{
                 position: absolute;
                 top: 0;
                 left: auto;
                 right: -20px;
                 transform: rotate(-90deg);
               }
               span{
                 display: inline-block;
               }
            }
        }

      }
    }
    .nav{
      margin:0 0 0 0;
      padding-bottom: 120px;
      .nav-list{
        margin:0 auto;
        display:flex;
        justify-content:center;
        max-width:736px;
        .nav-item{
          flex: 1;
          margin-right: 20px;
          border-radius: 4px;
          a{
            display: block;
            width: 100%;
            max-width: 220px;
            height: 40px;
            line-height: 40px;
            color: #FFF;
            font-size: 14px;
            background-color: #f3a83c;
          }
          &:last-child{
             margin-right: 0;
              a{
                background-color: #d06646;
              }
           }
        }
      }
    }
  }
}
</style>
