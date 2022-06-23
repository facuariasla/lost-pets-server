// ELIMINA/MODIFICA LA TABLA USERS
import { sequelize } from '../database/database';
import { User } from '../models/users';
import { Auth } from '../models/auths';

User.sequelize.sync({ force: true }).then((res)=>{
    console.log(res);
})

// sequelize.sync({force: true}).then((res)=> console.log(res))