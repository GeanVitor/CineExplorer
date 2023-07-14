import AsyncStorage from "@react-native-async-storage/async-storage";

export const key = 'save';
//Buscando os filmes salvos
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key);
    let moviesSave = JSON.parse(myMovies) || [];
    return moviesSave;
}

//Salvando novos filmes
export async function saveMovie(key, newMovie){
    let moviesStored = await getMoviesSave(key);
    const hasMovie = moviesStored.some(item => item.id === newMovie.id);
    if(hasMovie){
        alert("O filme ja existe na sua lista!!");
    }
    moviesStored.push(newMovie);
    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

//Deletar filmes salvos
export async function deleteMovie(id){
    let moviesStored = await getMoviesSave(key);
    let myMovies = moviesStored.filter(item => {
        return (item.id !== id)
    });
    await AsyncStorage.setItem(key, JSON.stringify(myMovies));
    return myMovies;
}

//Filtrar filme ja esta na lista
export async function hasMovie(movie){
    let moviesStored = await getMoviesSave(key);
    const hasMovie = moviesStored.find(item => item.id === movie.id);
    if(hasMovie){
        return true;
    }
    return false;
}