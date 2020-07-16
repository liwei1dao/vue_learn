export default [
  // user login
  {
    url: '/lego/cluster/baseinfo',
    type: 'post',
    response: _ => {
      const baseinfo = {
        tag:"lego",
      }
      return {
        code: 0,
        data: baseinfo
      }
    }
  },
]
