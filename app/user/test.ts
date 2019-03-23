import User from './model'
import { expect } from 'chai'
import connection from '../db'

describe('User', () => {

  after(() => connection.db.dropDatabase())

  it('should save a user', async () => {
    const email = 'jean@michel.com'
    const name = 'jean-michel'
    const password_hash = 'asfasdfasdfasf'
    const userData = { name, email, password_hash }
    const user = new User(userData)
    await user.save()
    const foundUser = await User.findOne({ email })
    if (!foundUser) throw new Error('User not found')

    expect(foundUser.name).to.equal(name)
    expect(foundUser.password_hash).to.equal(password_hash)
    expect(foundUser.createdAt).to.not.be.null
    expect(foundUser.updatedAt).to.not.be.null
  })
})
