//ALGOLIA TYPES:
// El id en Sequelize es autogenerado, por eso no es el mismo que algolia
export interface PetALG {
  objectID?: string;
  petname: string,
  description: string,
  petPhoto: string,
  location: string,
  _geoloc: {
    lat:number,
    lng:number
  },
  lat: number;
  lng: number;
  userId?: number;
  id?: number;
  lost?: boolean; 
}

export interface UserALG {
  id: number;
  firstname: string;
}
