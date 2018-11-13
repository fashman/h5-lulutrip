export default {
  // banner 模块
	banner (state, getters) {
    let bannerData = state.data.find(val => (
      val.id === 33
    ));

    if (bannerData) {
      return {
        status: bannerData.status,
        data: bannerData.itemBOList[0].picItemChildBOList
      }
    } else {
      return {}
    }
  },

  // 探索路路行
  explore (state, getters) {
    let exploreData = state.data.find(val => (
      val.id === 34
    ));
    if (exploreData) {
      return {
        status: exploreData.status,
        data: exploreData.itemBOList[0].picItemChildBOList,
        name: exploreData.name
      }
    } 
    return {};
  },

  // B区 模块
  Bmodule (state, getters) {
    let BmoduleData = state.data.find(val => (
      val.id === 35
    ));
    if (BmoduleData) {
      return {
        status: BmoduleData.status,
        data: BmoduleData.itemBOList[0].picItemChildBOList[0],
      }
    }
    return {};
  },

  // 纽约日游／周边
  newYork (state, getters) {
    let newYorkData = state.data.find(val => (
      val.id === 36
    ));

    if (newYorkData) {
      return {
        status: newYorkData.status,
        data: newYorkData.itemBOList[0].tabItemChildBOList,
        name: newYorkData.name
      }
    } 
    return {
      data: []
    }
  },

  // 路路行 Plus
  Plus (state, getters) {
    let PlusData = state.data.find(val => (
      val.id === 38
    ));

    if (PlusData) {
      return {
        status: PlusData.status,
        data: PlusData.itemBOList[0].picItemChildBOList,
        name: PlusData.name,
      }
    }
    return {};
  },

  // C区 模块
  Cmodule (state, getters) {
    let CmoduleData = state.data.find(val => (
      val.id === 39
    ));
    if (CmoduleData) {
      return {
        status: CmoduleData.status,
        data: CmoduleData.itemBOList[0].picItemChildBOList[0],
      }
    }
    return {};
  },

  // 留学生假期旅游
  holiday (state, getters) {
    let holidayData = state.data.find(val => (
      val.id === 40
    ));
    if (holidayData) {
      let list = holidayData.itemBOList[0].tabItemChildBOList.map(val => (
        {
          productItem: val.itemBO[0].productItemChildBOList,
          urlItem: val.itemBO[1].urlItemChildBOList[0]
        }
      ));

      return {
        status: holidayData.status,
        data: holidayData.itemBOList[0].tabItemChildBOList,
        list: list,
        name: holidayData.name,
      }
    }
    return {};
  },

  // 华人当街热推
  hot (state, getters) {
    let hotData = state.data.find(val => (
      val.id === 41
    ));
    if (hotData) {
      let list = hotData.itemBOList[0].tabItemChildBOList.map(val => (
        {
          productItem: val.itemBO[0].productItemChildBOList,
          urlItem: val.itemBO[1].urlItemChildBOList[0]
        }
      ));
      return {
        status: hotData.status,
        data: hotData.itemBOList[0].tabItemChildBOList,
        list: list,
        name: hotData.name
      }
    }
    return {};
    
  },

  //为爸妈的经典
  classic (state, getters) {
    let classicData = state.data.find(val => (
      val.id === 42
    ));

    if (classicData) {
      let list = classicData.itemBOList[1].tabItemChildBOList.map(val => (
        {
          productItem: val.itemBO[0].productItemChildBOList,
          urlItem: val.itemBO[1].urlItemChildBOList[0]
        }
      ));

      return {
        status: classicData.status,
        data: classicData.itemBOList[1].tabItemChildBOList,
        list: list,
        name: classicData.name,
        link: classicData.itemBOList[0].urlItemChildBOList[0],
      }
    }
    return {};
  },
}