import { sequelize } from '../database/database';
import { User } from '../models/users';
import { Auth } from '../models/auths';

Auth.sequelize.sync({ force:true }).then((res)=>{
  console.log(res)
})