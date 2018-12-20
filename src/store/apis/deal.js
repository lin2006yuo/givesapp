import fetch from '../../tools/axios'

export default {
  getShipsnPic (id, cb) {
    return fetch('get', `/ship/printFami?shipsn=${id}`, {}, cb)
  },
  getDealsCategory (cb) {
    return fetch('get', '/my/category', {}, cb)
  },
  getMyDemands (page, type, status, cb) {
    const query = (type ? `&type=${type}` : '') +
      (status ? `&status=${status}` : '')
    const url = `/my/myDemands?perPage=15&page=${page}${query}`
    return fetch('get', url, {}, cb)
  },
  getDemandTotal (type, status, cb) {
    const query = (type ? `type=${type}` : '') +
      (status ? `&status=${status}` : '')
    return fetch('get', `/my/demandTotal?${query}`, {}, cb)
  },
  getMyDonates (page, type, status, cb) {
    const query = (type ? `&type=${type}` : '') +
      (status ? `&status=${status}` : '')
    const url = `/my/myPresent?perPage=15&page=${page}${query}`
    return fetch('get', url, {}, cb)
  },
  getDonateTotal (type, status, cb) {
    const query = (type ? `type=${type}` : '') +
      (status ? `&status=${status}` : '')
    return fetch('get', `/my/presentTotal?${query}`, {}, cb)
  },
  getConversationId (id, tab, type, dirUserId, cb) {
    const url = `/conversations?id=${id}&tab=${tab}&type=${type}&direct_user_id=${dirUserId}`
    return fetch('get', url, {}, cb)
  }
}
