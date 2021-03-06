const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
}
export default getters
