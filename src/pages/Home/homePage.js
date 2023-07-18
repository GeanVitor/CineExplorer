import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../../components/Header/headerComp';
import SliderItem from '../../components/SliderItem/slider';
import api from '../../services/api';
import { getListMovies, radomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  SearchButton,
  Input,
  SearchContainer,
  Title,
  Banner,
  BannerButton,
  SliderMovie
} from './styles';

function Home() {

  const [isWeb, setIsWeb] = useState(false)
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();
    setIsWeb(typeof window !== 'undefined');

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('https://api.themoviedb.org/3/movie/now_playing', {
          params: {
            api_key: '5c80d453e79e7d5e565f04a910c09b13',
            language: 'pt-BR',
            page: 1,
          }
        }),
        api.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: '5c80d453e79e7d5e565f04a910c09b13',
            language: 'pt-BR',
            page: 1,
          }
        }),
        api.get('https://api.themoviedb.org/3/movie/top_rated', {
          params: {
            api_key: '5c80d453e79e7d5e565f04a910c09b13',
            language: 'pt-BR',
            page: 1,
          }
        })
      ]);

      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popular = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);

        setBannerMovie(nowData.data.results[radomBanner(nowData.data.results)]);
        setNowMovies(nowList);
        setPopularMovies(popular);
        setTopMovies(topList);
        setLoading(false);
      }
    }
    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    }
  }, []);

  function navigationDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id });
  }

  function handleSearchMovie() {
    if (input === '') return;
    navigation.navigate('Search', { name: input });
    setInput('');
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size='large' color='#FFF' />
      </Container>
    );
  }
  return(
      <Container>
      <Header title="Cine Explorer" />

      <SearchContainer>
        <Input
          placeholder="Buscar"
          placeholderTextColor="#DDD"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Indicação</Title>
        <BannerButton
          activeOpacity={0.8}
          onPress={() => navigationDetailsPage(bannerMovie)}>
          <Banner
            resizeMethod='resize'
            source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
          />
        </BannerButton>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Populares</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

        <Title>Mais Votados</Title>

        <SliderMovie
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={item} navigatePage={() => navigationDetailsPage(item)} />}
          keyExtractor={(item) => String(item.id)}
        />

      </ScrollView>
    </Container>
  )
}

export default Home;