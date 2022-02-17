let env = 'test'
env = 'production'

const baseUrl = {
  test: {
    wanBeiApi: 'https://bayajk.com/api', // api
  },
  production: {
    wanBeiApi: 'https://bayajk.com/api',
  }
}

module.exports = {
  baseUrl: baseUrl[env]
}