export default {
  // 全部
	all (state, getters) {
    let allData = state.data.find(val => (
      val.id === 51
    ));

    if (allData) {
      return {
        status: allData.status,
        data: allData.itemBOList[0].tabItemChildBOList
      }
    } else {
      return {}
    }
  },

  // 美洲
  americas (state, getters) {
    let americasData = state.data.find(val => (
      val.id === 47
    ));

    if (americasData) {
      return {
        status: americasData.status,
        data: americasData.itemBOList[0].tabItemChildBOList
      }
    } else {
      return {}
    }
  },

  // 欧洲
  european (state, getters) {
    let europeanData = state.data.find(val => (
      val.id === 48
    ));

    if (europeanData) {
      return {
        status: europeanData.status,
        data: europeanData.itemBOList[0].tabItemChildBOList
      }
    } else {
      return {}
    }
  },

  // 澳新
  australia (state, getters) {
    let europeanData = state.data.find(val => (
      val.id === 49
    ));

    if (europeanData) {
      return {
        status: europeanData.status,
        data: europeanData.itemBOList[0].tabItemChildBOList
      }
    } else {
      return {}
    }
  },

  // 新奇地
  novel (state, getters) {
    let europeanData = state.data.find(val => (
      val.id === 50
    ));

    if (europeanData) {
      return {
        status: europeanData.status,
        data: europeanData.itemBOList[0].tabItemChildBOList
      }
    } else {
      return {}
    }
  },

  // navBar
  navBar (state, getters) {
    let navBar = state.data.map(val => (
      val.name
    ))

   return navBar || [];
  },
}
