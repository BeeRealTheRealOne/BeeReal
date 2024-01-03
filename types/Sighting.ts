import { User } from './User';
import { Species } from './Species';

export type Sighting = {
    id: string;
    longitude: number;
    latitude: number;
    image: string;
    user: string;
    latin_name: string;
    species: string;
    created: string;
    expand: {
        user: User;
        species: Species;
    };
};
