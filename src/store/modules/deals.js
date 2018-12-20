import dealApi from '../apis/deal'

const state = {
  category: {
    gift_request: {
      requesting_total: '',
      remitting_total: '',
      remitted_total: '',
      sent_total: '',
      finished_total: ''
    },
    need_donate: {
      init_total: '',
      remitting_total: '',
      remitted_total: '',
      sent_total: ''
    }
  },
  demands: {
    curIdx: 0,
    gift: {
      total: 0,
      curPage: 0,
      data: [],
      nextPageUrl: '//'
    },
    need: {
      total: 0,
      curPage: 0,
      data: [],
      nextPageUrl: '//'
    },
    requesting: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    remitting: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    remitted: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    sent: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    finished: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    }
  },
  donates: {
    curIdx: 0,
    gift: {
      total: 0,
      curPage: 0,
      data: [],
      nextPageUrl: '//'
    },
    need: {
      total: 0,
      curPage: 0,
      data: [],
      nextPageUrl: '//'
    },
    init: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    remitting: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    remitted: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    },
    sent: {
      curIdx: 0,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      }
    }
  }
}

const actions = {
  getShipsnPic ({commit, state}, {id, cb = null} = {}) {
    dealApi.getShipsnPic(
      id,
      (data) => {
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getDealsCategory ({commit, state}, {cb = null} = {}) {
    dealApi.getDealsCategory(
      (data) => {
        commit('setDealsCategory', {data})
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getMyDemands ({commit, state}, {page, type, status, cb = null} = {}) {
    dealApi.getMyDemands(
      page,
      type,
      status,
      (data) => {
        commit('setMyDemands', {type, status, data})
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getMyDonates ({commit, state}, {page, type, status, cb = null} = {}) {
    dealApi.getMyDonates(
      page,
      type,
      status,
      (data) => {
        commit('setMyDonates', {type, status, data})
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getConversationId ({commit, state}, {id, tab, type, dirUserId, cb = null} = {}) {
    dealApi.getConversationId(
      id,
      tab,
      type,
      dirUserId,
      (data) => {
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getDemandTotal ({commit, state}, {type, status, cb = null} = {}) {
    dealApi.getDemandTotal(
      type,
      status,
      (data) => {
        if (cb) {
          cb(data)
        }
      }
    )
  },
  getDonateTotal ({commit, state}, {type, status, cb = null} = {}) {
    dealApi.getDonateTotal(
      type,
      status,
      (data) => {
        if (cb) {
          cb(data)
        }
      }
    )
  }
}

const mutations = {
  setDealsCategory (state, {data}) {
    if (!data.error && data.gift_request && data.need_donate) {
      state.category = data
    }
  },
  setMyDemands (state, {type, status, data}) {
    if (type) {
      if (status) {
        state.demands[status].need = {
          ...state.demands[status].need,
          total: data.total,
          data: [...state.demands[status].need.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      } else {
        state.demands.need = {
          ...state.demands.need,
          total: data.total,
          data: [...state.demands.need.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      }
    } else {
      if (status) {
        state.demands[status].gift = {
          ...state.demands[status].gift,
          total: data.total,
          data: [...state.demands[status].gift.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      } else {
        state.demands.gift = {
          ...state.demands.gift,
          total: data.total,
          data: [...state.demands.gift.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      }
    }
  },
  setDemandsCurIdx (state, {status, index}) {
    if (status) {
      state.demands[status].curIdx = index
    } else {
      state.demands.curIdx = index
    }
  },
  setMyDonates (state, {type, status, data}) {
    if (type) {
      if (status) {
        state.donates[status].need = {
          ...state.donates[status].need,
          total: data.total,
          data: [...state.donates[status].need.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      } else {
        state.donates.need = {
          ...state.donates.need,
          total: data.total,
          data: [...state.donates.need.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      }
    } else {
      if (status) {
        state.donates[status].gift = {
          ...state.donates[status].gift,
          total: data.total,
          data: [...state.donates[status].gift.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      } else {
        state.donates.gift = {
          ...state.donates.gift,
          total: data.total,
          data: [...state.donates.gift.data, ...data.data],
          curPage: data.current_page,
          nextPageUrl: data.next_page_url
        }
      }
    }
  },
  setDonatesCurIdx (state, {status, index}) {
    if (status) {
      state.donates[status].curIdx = index
    } else {
      state.donates.curIdx = index
    }
  },
  resetDeals (state) {
    state.demands = {
      ...state.demands,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      requesting: {
        ...state.demands.requesting,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      remitting: {
        ...state.demands.remitting,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      remitted: {
        ...state.demands.remitted,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      sent: {
        ...state.demands.sent,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      finished: {
        ...state.demands.finished,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      }
    }
    state.donates = {
      ...state.donates,
      gift: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      need: {
        total: 0,
        curPage: 0,
        data: [],
        nextPageUrl: '//'
      },
      init: {
        ...state.donates.init,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      remitting: {
        ...state.donates.remitting,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      remitted: {
        ...state.donates.remitted,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      },
      sent: {
        ...state.donates.sent,
        gift: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        },
        need: {
          total: 0,
          curPage: 0,
          data: [],
          nextPageUrl: '//'
        }
      }
    }
  }
}

export default{
  state,
  actions,
  mutations
}
