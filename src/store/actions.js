const actions = {
    setFileName: ({ commit, state }, fileName) => {
        return commit('SET_FILENAME', fileName)
      },
      setMenuVisible: ({ commit, state }, menuVisible) => {
         return commit('SET_MENU_VISIBLE', menuVisible)
       },
      setDefaultFontSize: ({ commit }, fontSize) => {
        return commit('SET_DEFAULT_FONT_SIZE', fontSize)
      },
      setSettingVisible: ({ commit }, visible) => {
        return commit('SET_SETTING_VISIBLE', visible)
      },
      setDefaultFontFamily: ({ commit }, font) => {
        return commit('SET_DEFAULT_FONT_FAMILY', font)
      },
      setFontFamilyVisible: ({ commit }, visible) => {
        return commit('SET_FONT_FAMILY_VISIBLE', visible)
      },
      setDefaultTheme: ({ commit }, theme) => {
        return commit('SET_DEFAULT_THEME', theme)
      },
      setBookAvailable: ({ commit }, bookAvailable) => {
        return commit('SET_BOOK_AVAILABLE', bookAvailable)
      },
      setProgress: ({ commit }, progress) => {
        return commit('SET_PROGRESS', progress)
      },
      setSection: ({ commit }, section) => {
        return commit('SET_SECTION', section)
      },
      setIsPaginating: ({ commit }, isPaginating) => {
        return commit('SET_IS_PAGINATING', isPaginating)
      },
      setCurrentBook: ({ commit }, book) => {
        return commit('SET_CURRENT_BOOK', book)
      },
      setNavigation: ({ commit }, navigation) => {
        return commit('SET_NAVIGATION', navigation)
      },
      setCover: ({ commit }, cover) => {
        return commit('SET_COVER', cover)
      },
      setMetadata: ({ commit }, metadata) => {
        return commit('SET_METADATA', metadata)
      },
      setPaginate: ({ commit }, paginate) => {
        return commit('SET_PAGINATE', paginate)
      },
      setPagelist: ({ commit }, pagelist) => {
        return commit('SET_PAGELIST', pagelist)
      },
      setIsBookmark({ commit }, isBookmark) {
        return commit('SET_IS_BOOKMARK', isBookmark)
      },
      setOffsetY({ commit }, offsetY) {
        return commit('SET_OFFSETY', offsetY)
      },
      setHotSearchOffsetY({ commit }, offsetY) {
        return commit('SET_HOT_SEARCH_OFFSETY', offsetY)
      },
      setSpeakingIconBottom({ commit }, speakingIconBottom) {
        commit('SET_SPEAKING_ICON_BOTTOM', speakingIconBottom)
      },
      setFlapCardVisible({ commit }, visible) {
        return commit('SET_FLAP_CARD_VISIBLE', visible)
      },
      setIsEditMode({ commit }, isEditMode) {
        return commit('SET_IS_EDIT_MODE', isEditMode)
      },
      setShelfList({ commit }, list) {
        return commit('SET_SHELF_LIST', list)
      },
      setShelfSelected({ commit }, selected) {
        return commit('SET_SHELF_SELECTED', selected)
      },
      setShelfTitleVisible({ commit }, visible) {
        return commit('SET_SHELF_TITLE_VISIBLE', visible)
      },
      setShelfCategory({ commit }, category) {
        return commit('SET_SHELF_CATEGORY', category)
      },
      setCurrentType({ commit }, type) {
        return commit('SET_CURRENT_TYPE', type)
      }
}

export default actions