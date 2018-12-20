<template>
  <div class="home-modules">
    <swiper
      dots-class="home-module-dots"
      :show-desc-mask="false"
      height="102px"
    >
      <swiper-item
        :key="item"
        v-for="(item, i) in swiperItem">
        <grid
          :show-lr-borders="false"
          :show-vertical-dividers="false">
          <grid-item
            :key="index"
            @click.native="toModules(module.link)"
            :label="wishActivity && index === 0 && i === 0 ? wishModule.label : (item === 0 ? module.label : '')"
            :class="item === 1 ? 'icon': ''"
            v-for="(module, index) in modules[item]"
          >
            <img
              width="50"
              height="auto"
              slot="icon"
              :src="module.icon"
              :alt="module.label">
          </grid-item>
        </grid>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Grid, GridItem, Swiper, SwiperItem } from 'vux'
import icActivity from '@/assets/icon/home_ic_activity_normal@2x.png'
import icLove from '@/assets/icon/home_ic_love_normal@2x.png'
import icRank from '@/assets/icon/home_ic_ranking_normal@2x.png'
import icStory from '@/assets/icon/home_ic_story_normal@2x.png'
import icThanks from '@/assets/icon/home_ic_thanks_normal@2x.png'
import icFami from '@/assets/icon/home_ic_family_normal@2x.png'
import icShiwu from '@/assets/icon/home_ic_shiwu_normal@2x.png'
import icHct from '@/assets/icon/home_ic_xinzhu_normal@2x.png'
import icPalmBox from '@/assets/icon/home_ic_palmbox_normal.png'

// import icFatherLove from '@/assets/img/father/home_ic_faday01_normal@2x.png'
// import icFatherStory from '@/assets/img/father/home_ic_faday02_normal@2x.png'
// import icFatherRank from '@/assets/img/father/home_ic_faday03_normal@2x.png'
// import icFatherThanks from '@/assets/img/father/home_ic_faday04_normal@2x.png'
// import icFatherActive from '@/assets/img/father/home_ic_faday05_normal@2x.png'
// import icSportsLove from '@/assets/img/festival/home_ic_sports01_normal@2x.png'
// import icSportsStory from '@/assets/img/festival/home_ic_sports02_normal@2x.png'
// import icSportsRank from '@/assets/img/festival/home_ic_sports03_normal@2x.png'
// import icSportsThanks from '@/assets/img/festival/home_ic_sports04_normal@2x.png'
// import icSportsActive from '@/assets/img/festival/home_ic_sports05_normal@2x.png'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'

export default {
  components: {
    Grid,
    GridItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      swiperItem: [0, 1],
      wishModule: {
        link: '/wishes',
        label: '心願認養',
        icon: icActivity
      },
      modules: [
        [{
          link: '/activitynotice',
          label: '活動',
          icon: icActivity
        }, {
          link: '/lovebox',
          label: '愛箱送',
          icon: icLove
        }, {
          link: '/bonusRanking',
          label: '好人榜',
          icon: icRank
        }, {
          link: '/story',
          label: '讀故事',
          icon: icStory
        }, {
          link: '/thanks',
          label: '感謝牆',
          icon: icThanks
        }],
        [{
          link: 'fami',
          label: '全家物流',
          icon: icFami
        }, {
          link: '/city/taipei',
          label: '社會局',
          icon: icShiwu
        }, {
          link: 'hct',
          label: '新竹物流',
          icon: icHct
        }, {
          link: 'palmboxusage',
          label: '掌櫃',
          icon: icPalmBox
        }]
      ]
    }
  },
  computed: {
    wishActivity () {
      let today = new Date()
      let begin = new Date(2018, 10, 9, 12)
      let finish = new Date(2018, 11, 31)
      return isAfter(today, begin) && isBefore(today, finish)
    }
  },
  methods: {
    toModules (url) {
      if (this.wishActivity) {
        url = url === '/activitynotice' ? this.wishModule.link : url
      }
      if (url === 'fami') {
        window.open('https://www.give543.com/static/famiport/index.html')
      } else if (url === 'hct') {
        window.open('https://www.give543.com/static/hct/543hct.html')
      }
      this.$router.push(url)
    }
  }
}
</script>
<style lang="less">
  .home-modules{
    .weui-grids{
      &:before, &:after{
        display: none;
      }
      .weui-grid{
        padding: @pm-lg 0 26px;
        &:before, &:after{
          display: none;
        }
        .weui-grid__label{
          margin-top: 8px;
          color: @color-font-C1;
          font-size: @font-S4;
        }
        .weui-grid__icon{
          position: relative;
          img{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: auto;
            display: block;
            transform: none;
          }
        }
        &.icon{
          padding: 26px 0;
          .weui-grid__icon{
            width: 80% !important;
          }
        }
      }
    }
    .home-module-dots {
      right: 50% !important;
      bottom: @pm-md !important;
      transform: translateX(50%);
      a {
        margin: 0;
        height: 3px;
        vertical-align: top;
      }
      .vux-icon-dot {
        width: 15px;
        height: 3px;
        float: left;
        background-color: @color-CBG !important;
        transition: background-color .3s;
        &.active {
          background-color: @color-CR !important;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .home-modules{
    background: #FFF;
  }
</style>
