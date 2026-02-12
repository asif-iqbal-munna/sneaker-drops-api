import { User } from "./user.model"


export const findAllUsers = () => {
  return User.findAll()
}