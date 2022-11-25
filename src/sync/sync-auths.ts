import { Auth } from '../models/auths';

Auth.sequelize.sync({ force:true }).then((res)=>{
  console.log(res)
})