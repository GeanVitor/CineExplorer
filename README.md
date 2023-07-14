# CineExplorer
Aplicativo simples feito com react-native para mostrar filmes 
Pacotes necessarios para utilizar o aplicativo:
OBS: tenha o Expo e o Node devidamente instalados na maquina 
npm install styled-components
npm install styled-components
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/drawer
npm install react-native-gesture-handler react-native-reanimated
npm install react-native-stars
npm install axios
npm install react-native-webview

Após instalar todos os pacotes , instale o aplicativo Expo go no seu smartphone para visualizar o projeto

OBS n°2: Em caso de erro com a inicialização do react-native-reanimated os sequintes passos podem resolver o problema:
1 - alterar o arquivo babel.config.js para a sequinte forma:
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
2 - Rodar no terminal dentro do diretorio do seu projeto os comandos:
npm cache clean --force 
npm install react-native-pager-view@6.1.2 react-native-reanimated@~2.14.4
