export default [
  // user login
  {
    url: '/lego/user/login',
    type: 'post',
    response: config => {
      const {account ,password, token} = config.body
      const userInfo = {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin',
        token:"qoiwjeoiqejnqe"
      }
      if (token != null){
        return {
          code: 0,
          data: userInfo
        }
      }else{
        if (account != null && password != null){
          return {
            code: 0,
            data: userInfo
          }
        }else{
          return {
            code: 60204,
            message: 'Account and password are incorrect.'
          }
        }
      }
    }
  },

  // user logout
  {
    url: '/lego/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
