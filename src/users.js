class Users {
  async list () {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'list'
      })
    }
  }

  create () {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'create'
      })
    }
  }
}

module.exports = new Users()
