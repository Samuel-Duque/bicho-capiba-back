declare module '@adonisjs/core/http' {
  interface HttpContext {
    currentUser?: import('#models/user').default | import('#models/ong').default
  }
}