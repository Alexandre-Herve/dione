import {
  Request,
  Response,
  default as express
} from 'express'

import bodyParser from 'body-parser'

const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

import { IUser } from './types'
import User from './user'

// CREATES A NEW USER
router.post('/', function (req: Request, res: Response) {
  User.create(
    {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    },
    function (err: Error, user: IUser) {
      if (err) res.status(500).send("There was a problem adding the information to the database.")
      else res.status(200).send(user)
    })
})

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (_req: Request, res: Response) {
  User.find({}, function (err: Error, users) {
    if (err) res.status(500).send("There was a problem finding the users.")
    else res.status(200).send(users)
  })
})

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function (req: express.Request, res: express.Response) {
  User.findById(req.params.id, function (err: Error, user: IUser) {
    if (err) res.status(500).send("There was a problem finding the user.")
    else if (!user) res.status(404).send("No user found.")
    else res.status(200).send(user)
  })
})

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function (req: express.Request, res: express.Response) {
  User.findByIdAndRemove(req.params.id, function (err: Error, user) {
    if (err) res.status(500).send("There was a problem deleting the user.")
    else if (user && user.model) res.status(200).send("User: "+ user.model.name +" was deleted.")
    else res.status(404).send("Not found.")
  })
})

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function (req: express.Request, res: express.Response) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err: Error, user) {
    if (err) res.status(500).send("There was a problem updating the user.")
    else res.status(200).send(user)
  })
})


module.exports = router
