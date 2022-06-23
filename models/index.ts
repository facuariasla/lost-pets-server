import { User } from "./users";
import { Pet } from "./pets";
import { Auth } from "./auths";

User.hasMany(Pet, {
  foreignKey: "userId",
  sourceKey: "id",
});

Pet.belongsTo(User, {
  foreignKey: "userId",
  // targetId: 'id'
});

User.hasOne(Auth, {
  foreignKey: "userId",
  sourceKey: "id",
});
Auth.belongsTo(User, {
  foreignKey: "userId",
  // targetId: 'id'
});

// Mas info sobre como manejar las asociaciones en sequelize
// https://sequelize.org/docs/v6/core-concepts/assocs/
