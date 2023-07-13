import { useNavigation } from '@react-navigation/native';

// usamos essa função para gerar uma lista de filmes com o tamanho pré definido
export function getListMovies(size, movies){
    let popularMovies = [];

    let l = size
    for(let i = 0; i < l; i++){
        popularMovies.push(movies[i]);
    }
    return popularMovies
}
// Gerar um numero com base na lista de filmes
export function radomBanner(movies){
    return Math.floor(Math.random() * movies.length);
}