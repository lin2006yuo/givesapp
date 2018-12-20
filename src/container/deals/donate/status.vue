<template>
  <div class="donate-some">
    <x-header :title="title">
    </x-header>
    <div class="box">
      <tab
        :line-width="2"
        prevent-default
        custom-bar-width="24px"
        @on-before-index-change="switchTabItem"
      >
        <tab-item :selected="curIdx === 0">
          禮物（{{giftTotal}}）
        </tab-item>
        <tab-item :selected="curIdx === 1">
          需求（{{needTotal}}）
        </tab-item>
      </tab>
    </div>
    <div class="container">
      <group
        class="content-wrapper g-smooth"
        id="donateStatusPanel"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10">
        <div
          v-if="!items.length && !nextPageUrl"
          class="oops">
          暫無相關資料
        </div>
        <cell-box
          :key="index"
          v-for="(item, index) in items">
          <item-card
            :pool-type="type[curIdx]"
            :card-info="item"
            :item-id="item[type[curIdx]] && item[type[curIdx]].id">
          </item-card>
        </cell-box>
        <inline-loading v-show="curPage !== 0 && isLoading">
        </inline-loading>
        <divider
          v-show="items.length && !nextPageUrl"
          class="g-divider p-divider">
          沒有更多了
        </divider>
      </group>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem, Group, CellBox, Divider } from 'vux'
import ItemCard from '@/components/deals/DonateItemCard'
import {mapActions, mapState, mapMutations} from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'
import InlineLoading from '@/components/InlineLoading'

export default {
  props: {
    status: {
      type: String,
      default: ''
    }
  },
  directives: {
    infiniteScroll
  },
  components: {
    Tab,
    TabItem,
    ItemCard,
    Group,
    CellBox,
    InlineLoading,
    Divider
  },
  data () {
    return {
      type: ['gift', 'need'],
      needTotal: 0,
      giftTotal: 0,
      gift: {
        busy: false,
        isLoading: false
      },
      need: {
        busy: false,
        isLoading: false
      }
    }
  },
  created () {
    // 获取私人笔记
    const status = this.status
    if (status === 'init') {
      if (!this.marks['WHITE'].curPage) {
        this.getUserMarks({type: 'WHITE'})
      }
      if (!this.marks['BLACK'].curPage) {
        this.getUserMarks({type: 'BLACK'})
      }
    }
    this.getDonateTotal({
      status,
      type: 'present',
      cb: (data) => {
        this.giftTotal = data
      }
    })
    this.getDonateTotal({
      status,
      cb: (data) => {
        this.needTotal = data
      }
    })
  },
  beforeDestroy () {
    this.resetDeals()
  },
  methods: {
    ...mapActions({
      getDonateTotal: 'getDonateTotal',
      getMyDonates: 'getMyDonates',
      getDealsCategory: 'getDealsCategory',
      getUserMarks: 'getUserMarks'
    }),
    ...mapMutations({
      resetDeals: 'resetDeals',
      setDonatesCurIdx: 'setDonatesCurIdx'
    }),
    switchTabItem (index) {
      if (index !== this.curIdx) {
        const div = document.getElementById('donateStatusPanel')
        div.scrollTo(0, 0)
        const status = this.status
        this.setDonatesCurIdx({status, index})
      }
      if (this.curPage === 0 && this.nextPageUrl) {
        const isToGet = (this.type[this.curIdx] === 'need' && !this.needTotal) ||
          (this.type[this.curIdx] === 'gift' && !this.giftTotal)
        if (isToGet) {
          return
        }
        this.loadMore()
      }
    },
    loadMore () {
      if (!this.isNotGetCategory) {
        return this.toLoad()
      }
      this.getDealsCategory({cb: this.toLoad})
    },
    toLoad () {
      const status = this.status
      if (this.nextPageUrl && this.needDonate[`${status}_total`]) {
        this[this.type[this.curIdx]].busy = true
        this[this.type[this.curIdx]].isLoading = true
        if (this.curPage === 0) {
          this.$Loading.show()
        }
        if (this.type[this.curIdx] === 'gift') {
          this.getMyDonates({
            status,
            page: this.curPage + 1,
            cb: this.loadMoreCb
          })
        } else {
          this.getMyDonates({
            status,
            page: this.curPage + 1,
            type: 'present',
            cb: this.loadMoreCb
          })
        }
      }
    },
    loadMoreCb () {
      if (this.curPage === 1) {
        this.$Loading.hide()
      }
      this[this.type[this.curIdx]].isLoading = false
      if (this.nextPageUrl) {
        this[this.type[this.curIdx]].busy = false
      }
    }
  },
  computed: {
    ...mapState({
      donatesAll: state => state.deals.donates,
      needDonate: state => state.deals.category.need_donate,
      marks: state => state.user.marks
    }),
    donates () {
      const status = this.status
      return this.donatesAll[status]
    },
    isNotGetCategory () {
      return Object.entries(this.needDonate).every(([, val]) => val === '')
    },
    curIdx () {
      return this.donates.curIdx
    },
    curPage () {
      return this.donates[this.type[this.curIdx]].curPage
    },
    nextPageUrl () {
      return this.donates[this.type[this.curIdx]].nextPageUrl
    },
    gifts () {
      const status = this.status
      const gifts = this.donates.gift.data.map((item) => {
        let receivers = this.donates.gift.data.filter((itm) => (item.gift_id === itm.gift_id) && (item.status === 'requesting'))
        receivers = receivers.map((item) => {
          return {
            receiver_name: item.receiver_name,
            receiver_nickname: item.receiver_nickname,
            request_quantity: item.request_quantity,
            recity: item.receiver_city,
            readdress: item.receiver_address,
            redistrict: item.receiver_district,
            status: item.status,
            shipway: item.shipway,
            shipsn: item.shipsn,
            shipopts: item.shipopts,
            shipfee: item.shipfee,
            pics: item.pics,
            left: item.gift.left,
            state: item.gift.status,
            id: item.id,
            dirUserId: item.user_id,
            createdAt: item.created_at,
            isBindWhite: this.marks['WHITE'].data.some((itm) => itm.mark_user_id === item.user_id),
            isBindBlack: this.marks['BLACK'].data.some((itm) => itm.mark_user_id === item.user_id),
            edcode: item.gift_ec_order && item.gift_ec_order.cabinet_info && JSON.parse(item.gift_ec_order.cabinet_info).EDCODE
          }
        })
        return {
          ...item,
          receivers: status === 'init' ? receivers : []
        }
      })
      if (status === 'init') {
        const bundle = []
        gifts.forEach((item) => {
          if (bundle.length) {
            const isHas = bundle.some((itm) => item.gift_id === itm.gift_id)
            if (!isHas) {
              bundle.push(item)
            }
          } else {
            bundle.push(item)
          }
        })
        return bundle
      }
      return gifts
    },
    needs () {
      const needs = this.donates.need.data.map((item) => {
        return {
          ...item,
          receivers: []
        }
      })
      return needs
    },
    items () {
      return this.type[this.curIdx] === 'gift' ? this.gifts : this.needs
    },
    title () {
      let title = ''
      switch (this.status) {
        case 'init': title = '待決定'; break
        case 'remitting': title = '待收款'; break
        case 'remitted': title = '待寄出'; break
        case 'sent': title = '待對方收件'; break
      }
      return title
    },
    busy () {
      return this[this.type[this.curIdx]].busy
    },
    isLoading () {
      return this[this.type[this.curIdx]].isLoading
    }
  }
}
</script>

<style lang="less">
  .donate-some{
    .box{
      .vux-tab{
        .vux-tab-bar-inner{
          background: linear-gradient(to right, @color-font-CR 50%, @color-CO 50%)
        }
        .vux-tab-item{
          background: none;
          font-size: @font-S1;
          &.vux-tab-selected{
            color: @color-font-CR;
          }
        }
      }
    }
    .container{
      .weui-cells{
        padding: 0;
        margin: 0;
        &:before, &:after{
          display: none;
        }
        .weui-cell{
          padding: 0;
          &:before, &:after{
            display: none;
          }
          &:nth-last-child(3){
            .req-item-card{
              &:after{
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="less" scoped>
  .donate-some{
    height: 100%;
    .container{
      padding: 0 @pm-bg;
      margin-top: @pm-md;
      height: calc(~"100% - 98px");
      .content-wrapper{
        height: 100%;
        overflow: scroll;
        .oops{
          margin-top: 100px;
          color: @color-font-C2;
          font-size: @font-S3;
          text-align: center;
        }
        .p-divider{
          padding: @pm-bg 0 !important;
        }
      }
    }
  }
</style>
