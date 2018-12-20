<template>
  <div class="thanks-wall-item">
    <span class="to-user"><i>To:</i> {{info.to_user.nickname || '無暱稱'}}</span>
    <span class="content">{{info.content}}</span>
    <span class="item">
      <img src="../assets/icon/thanks/thanks_pic_gift@2x.png" alt="" v-if="isGift">
      <img src="../assets/icon/thanks/thanks_pic_demand@2x.png" alt="" v-else>
      {{title}}
    </span>
    <span class="from-user ta-right"><i>FROM:</i> {{info.from_user.nickname || '無暱稱'}}</span>
    <span class="date ta-right">{{info.created_at | smartDate}}</span>
    <i class="heart-icon"></i>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  computed: {
    isGift () {
      return this.info.type === 'gift'
    },
    title () {
      if (this.info.type === 'love') {
        return this.info.love_provision && this.info.love_provision.goods_name
      } else {
        return this.info[this.info.type] && this.info[this.info.type].title
      }
    }
  }
}
</script>

<style lang="less" scoped>
  @light-black: rgba(40, 41, 43, .7);
  .text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .thanks-wall-item{
    display: flex;
    flex-direction: column;
    padding: @pm-md;
    width: 100%;
    > span{
      // flex: 0 0 100%;
      &.ta-right{
        text-align: right;
      }
      &.content{
        word-break: break-all;
      }
    }

    i{
      font-family: Times;
    }

    .to-user{
      position: relative;
      padding-bottom: 10px;
      border-bottom: 1px dashed #E5E5E5;
      font-weight: bold;
      white-space: nowrap;
      .text-overflow;
      &::after{
        content: ' ';
        width: 0;
        height: 0;
        border-radius: 50%;
        border: 3px solid #f3e5e3;
        position: absolute;
        top: 8px;
        right: 0;
      }

      i{
        font-weight: normal;
      }
    }
    .content{
      padding-top: 10px;
      color: @light-black;
    }

    .item{
      max-width: 150px;
      background: lighten(@color-CO, 45%);
      color: @color-CO;
      border-radius: 12px;
      display: block;
      padding: 3px 10px 0;
      margin: 10px 0;
      font-size: @font-S4;
      .text-overflow;
      img{
        width: 12px;
        height: 12px;
      }
    }
    .from-user{
      font-size: @font-S3;
      font-weight: bold;
      i{
        font-size: @font-S4;
        font-weight: normal;
      }
    }

    .date{
      color: @light-black;
      font-size: @font-S4;
    }

    .heart-icon{
      background-image: url('../assets/icon/thanks/thanks_pic_heart@2x.png');
      background-size: contain;
      background-repeat: no-repeat;
      width: 30px;
      height: 30px;
      margin-top: -30px;
    }
  }
</style>
