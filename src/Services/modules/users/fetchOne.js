export default build =>
  build.query({
    query: username => `/users/${username}`,
  })
