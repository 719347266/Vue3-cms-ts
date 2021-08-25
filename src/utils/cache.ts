class LocalCache {
  setCache(name: string, value: any) {
    window.localStorage.setItem(name, JSON.stringify(value))
  }
  getCache(name: string) {
    const value = window.localStorage.getItem(name)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(name: string) {
    window.localStorage.removeItem(name)
  }
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
