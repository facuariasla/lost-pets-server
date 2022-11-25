// ELIMINA/MODIFICA LA TABLA PETS
import { sequelize } from '../database/database';
import { Pet } from '../models/pets'
Pet.sequelize.sync({ force: true }).then((res)=>{
    console.log(res);
})
