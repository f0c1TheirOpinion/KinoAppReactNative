import React, {Component} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, Dimensions, FlatList, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../utils/animations';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {BarIndicator} from 'react-native-indicators';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.8 );

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}



let countLoadingScreen = 0;
seasonList = [];
export class Home extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      isLoading: 0,
      refreshing: false,
      filmsList: [],
      filmListNT: [],
      serialsList: [],
      multList: [],
      countSeries:[],
    }
    this._renderItem = this._renderItem.bind(this)
    this._renderFilmsItem = this._renderFilmsItem.bind(this)
    this._renderSerialsItem = this._renderSerialsItem.bind(this)
    this._renderMultItem = this._renderMultItem.bind(this)

  }
  
 componentDidMount(){
  this.getRandomListFilms()
  this.getListFilmsNT()
  this.getSerialList()
  this.getMultList()

   };

   _onRefresh() {
    this.setState({isLoading: 0});
    this.componentDidMount()
    wait(500).then(() => this.setState({refreshing: false}));
  }





  
  getRandomListFilms() {
    let RandomFilms = [];
    let optionFilm;
    let randomInt = Math.floor(Math.random() * 19) + 1;
  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${randomInt}`,
             {headers: {
               'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
             }} )

      .then((response) => {
      
        for(let i = 0; i <= 19; i++){
          let forGenres = JSON.stringify(response.data.films[i].genres);
          let replaceMode = forGenres.replace(/genre/g, ',');
          let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
          let getName = JSON.stringify(response.data.films[i].nameRu).replace(/['"]+/g, '')
          let getFilmsId = JSON.stringify(response.data.films[i].filmId);
          let getYear = JSON.stringify(response.data.films[i].year).replace(/['"]+/g, '')
          let getRating = JSON.stringify(response.data.films[i].rating).replace(/['"]+/g, '')
          let getPosterURL = JSON.stringify(response.data.films[i].posterUrlPreview).replace(/['"]+/g, '')
          let getGenres = replaceModeX2.slice(2,-2);
          

         if(getGenres.indexOf('мультфильм,') >= 0 && getGenres.indexOf('аниме') <= -1 ) {
          optionFilm = "Мультфильм"
         }else if(getGenres.indexOf('аниме') >= 0){
          optionFilm = "Аниме"
         }
         else if(getName.indexOf('(сериал)') >= 0 || getName.indexOf('(мини-сериал)') >=0 ){
          optionFilm = "Сериал"
         }
         else{
          optionFilm = "Фильм"
         }
          console.log(getGenres.indexOf('мультфильм,'));
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, optionFilm, getFilmsId];
          
        }
        countLoadingScreen++;
        this.setState({
          filmsList: RandomFilms,
          isLoading: countLoadingScreen
        })
        

      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  }

  getListFilmsNT() {
    let RandomFilms = [];
    let randomInt = Math.floor(Math.random() * 20) + 1;
  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=NUM_VOTE&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=2015&yearTo=2021&page=${randomInt}`,
             {headers: {
               'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
             }} )

      .then((response) => {
      
        for(let i = 0; i <= 19; i++){
          let getFilmsId = JSON.stringify(response.data.films[i].filmId);
          let forGenres = JSON.stringify(response.data.films[i].genres);
          let replaceMode = forGenres.replace(/genre/g, ',');
          let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
          let getName = JSON.stringify(response.data.films[i].nameRu).replace(/['"]+/g, '')
          let getYear = JSON.stringify(response.data.films[i].year).replace(/['"]+/g, '')
          let getRating = JSON.stringify(response.data.films[i].rating).replace(/['"]+/g, '')
          let getPosterURL = JSON.stringify(response.data.films[i].posterUrlPreview).replace(/['"]+/g, '')
          let getGenres = replaceModeX2.slice(2,-2);
          
          if(getGenres.indexOf('мультфильм,') >= 0 ){
            continue;
          }
          
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, getFilmsId];
          
          
        }
        let filtered = RandomFilms.filter(function (el) {
          return el != null;
        });
        countLoadingScreen++;
        this.setState({
          filmListNT: filtered,
          isLoading: countLoadingScreen
        })
        

      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  }

  getSerialList() {
    let RandomFilms = [];
    let randomInt = Math.floor(Math.random() * 20) + 1;
  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=NUM_VOTE&type=TV_SHOW&ratingFrom=0&ratingTo=10&yearFrom=1888&yearTo=2020&page=${randomInt}`,
             {headers: {
               'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
             }} )

      .then((response) => {
      
        for(let i = 0; i <= 19; i++){
          let forGenres = JSON.stringify(response.data.films[i].genres);
          let replaceMode = forGenres.replace(/genre/g, ',');
          let getFilmsId = JSON.stringify(response.data.films[i].filmId);
          let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
          let getName = JSON.stringify(response.data.films[i].nameRu).replace(/['"]+/g, '')
          let getYear = JSON.stringify(response.data.films[i].year).replace(/['"]+/g, '')
          let getRating = JSON.stringify(response.data.films[i].rating).replace(/['"]+/g, '')
          let getPosterURL = JSON.stringify(response.data.films[i].posterUrlPreview).replace(/['"]+/g, '')
          let getGenres = replaceModeX2.slice(2,-2);

          if(getGenres.indexOf('мультфильм,') >= 0 ){
            continue;
          }


         


          
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, getFilmsId ];
         
          
        }
       
        let filtered = RandomFilms.filter(function (el) {
          return el != null;
        });
        countLoadingScreen++;
        this.setState({
          serialsList: filtered,
          isLoading: countLoadingScreen
        })
        

      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  }





  getMultList() {
    let RandomFilms = [];
    let option = [];
    let randomInt = Math.floor(Math.random() * 20) + 1;

  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?genre=14&order=NUM_VOTE&&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=2018&yearTo=2021&page=${randomInt}`,
             {headers: {
               'X-API-KEY': '28205e94-58cc-4655-96df-b2b5d0e377b8'
             }} )

      .then((response) => {
      
        for(let i = 0; i <= 19; i++){
          let forGenres = JSON.stringify(response.data.films[i].genres);
          let replaceMode = forGenres.replace(/genre/g, ',');
          let replaceModeX2 =  replaceMode.replace (/[^a-zа-я0-9]+/g, ', ');
          let getFilmsId = JSON.stringify(response.data.films[i].filmId);
          let getName = JSON.stringify(response.data.films[i].nameRu).replace(/['"]+/g, '')
          let getYear = JSON.stringify(response.data.films[i].year).replace(/['"]+/g, '')
          let getRating = JSON.stringify(response.data.films[i].rating).replace(/['"]+/g, '')
          let getPosterURL = JSON.stringify(response.data.films[i].posterUrlPreview).replace(/['"]+/g, '')
          let getTypeFilm = JSON.stringify(response.data.films[i].type).replace(/['"]+/g, '')
          let getGenres = replaceModeX2.slice(2,-2);

          if(getTypeFilm.indexOf("FILM") >= 0 ){
            option = "Мульфильм"
          }else{
            option = "Мультсериал"
          }


         


          
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, option, getFilmsId ];
         
          
        }
       
        let filtered = RandomFilms.filter(function (el) {
          return el != null;
        });
        countLoadingScreen++;
        this.setState({
          multList: filtered,
          isLoading: countLoadingScreen
        })
        

      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .finally(function () {
        // always executed
        console.log('Finally called');
      });
  }





/* Для карусели (GetRandomFilms) */
 
  _renderItem({item}) {
    const {filmsList} = this.state;
    return(
      <Pressable onPress={() => this.props.navigation.navigate('Pleers', {
        screen: 'Pleer',
        params: { filmId: item[6] }
})}>
      <View style={{backgroundColor:'black',}}>
       <Image 
       style={styles.itemContainer}
       opacity={0.35}
       source={{
          uri:item[3]
        }} />
        <View style={styles.itemRating}>
        {item[2].indexOf('%') >= 0  ? (
            <Text style={{color:'#fff', top:2, right: 9, backgroundColor:'#008fcc', 
                        padding:2, borderRadius:1, fontWeight:'bold',  }}>{item[2]}</Text>
          ) : (null)
                             }
          {item[2] > 7 ? (
            <Text style={{color:'#fff', top:2, right: 9, backgroundColor:'#2d9141', 
                        padding:2, borderRadius:1, fontWeight:'bold',  }}>{item[2]}</Text>
          ) : (null)}
          {item[2] < 7 ? (<Text style={{color:'#fff', top:2, backgroundColor:'orange', 
                              padding:2, borderRadius:1, right: 9, fontWeight:'bold',}}>{item[2]}</Text>) : (null)}
          
          <Text style={{color:'#fff',  backgroundColor:'#008fcc', right:13, fontSize: 14.5, fontWeight:'bold', padding: 1 }}>{item[5]}</Text>
        </View>
        
        <View style={styles.itemLabel}>
         <Text style={{color:'#fff', fontWeight:'700', width:300, fontSize:17}}>{item[0]}</Text>
         <Text style={{color:'#fff', fontWeight:'400', fontSize:15, marginTop:5}}>{item[1]} ○ {item[4]}</Text>
         </View>
          </View> 
          </Pressable>
    );
       
  }

/* Для фильмов (GetFilms) */
_renderFilmsItem({item}) {
  
  const {filmListNT} = this.state;
  return(
    <Pressable onPress={() => this.props.navigation.navigate('Pleers', {
      screen: 'Pleer',
      params: { filmId: item[5] }
})}>
    <View style={styles.containFilms}>
   <Image 
   style={styles.itemFilmsImage}
   source={{
     uri: item[3]
   }}
   />
   <View style={styles.itemRating}>
 
          {item[2] > 7 ? (
            <Text style={ styles.goodRating}>{item[2]}</Text>
            
          ) : (<Text style={ styles.fallRating}>{item[2]}</Text>)}
        </View>
        <View style={styles.typeKino}>
            <Text style={styles.nameTypeKino}>Фильм</Text>
        </View>
                    <Text numberOfLines={1} style={styles.nameFilm}>{item[0]}</Text>
                    <Text numberOfLines={1} style={styles.GenrsFilm}>{item[1]} ○ {item[4]}</Text>
                  
    </View>
    </Pressable>
    
  );
     
}





_renderSerialsItem({item}) {
  

  return(
    <Pressable onPress={() => this.props.navigation.navigate('Pleers', {
      screen: 'Pleer',
      params: { filmId: item[5] }
})}>
    <View style={styles.containFilms}>
   <Image 
   style={styles.itemFilmsImage}
   source={{
     uri: item[3]
   }}
   />
   <View style={styles.itemRating}>
          {item[2] > 7 ? (
            <Text style={ styles.goodRating}>{item[2]}</Text>
          ) : (<Text style={ styles.fallRating}>{item[2]}</Text>)}
          
        </View>
        <View style={styles.typeKino}>
            <Text style={styles.nameTypeKino}>Сериал</Text>
        </View>
                    <Text numberOfLines={1} style={styles.nameFilm}>{item[0]}</Text>
                    <Text numberOfLines={1} style={styles.GenrsFilm}>{item[1]} ○ {item[4]}</Text>
                  
    </View>
    </Pressable>
  );
     
}

_renderMultItem({item}) {
  return(
    <Pressable onPress={() => this.props.navigation.navigate('Pleers', {
      screen: 'Pleer',
      params: { filmId: item[6] }
})}>
    <View style={styles.containFilms}>
   <Image 
   style={styles.itemFilmsImage}
   source={{
     uri: item[3]
   }}
   />
   <View style={styles.itemRating}>
          {item[2] > 7 ? (
            <Text style={ styles.goodRating}>{item[2]}</Text>
          ) : (<Text style={ styles.fallRating}>{item[2]}</Text>)}
          
        </View>
        <View style={styles.typeKino}>
            <Text style={styles.nameTypeKino}>{item[5]}</Text>
        </View>
                    <Text numberOfLines={1} style={styles.nameFilm}>{item[0]}</Text>
                    <Text numberOfLines={1} style={styles.GenrsFilm}>{item[1]} ○ {item[4]}</Text>
                  
    </View>
    </Pressable>
  );
     
}



  

   render(){
    const { navigation } = this.props;
     const {isLoading, filmsList, filmListNT, serialsList, multList} = this.state;
     if(isLoading <= 2){
       return <View style={{backgroundColor:'#040114', height:'100%', flex:1,}}>
         <BarIndicator color='#e91e63' size={50} /> 
         </View>
     }
  
    return (
        <SafeAreaView style={{backgroundColor:'#040114'} }>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
        <View>
     
        <Carousel
          ref={(c) => this.carousel = c}
          data={filmsList}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
        </View>






      <View style={{marginTop: 15}}>
        <View style={{flexDirection: 'row', margin:10,}}>
        <Text style={styles.nameCater}>Фильмы</Text>
        <Pressable style={{flexDirection:'row'}}
                    onPress={() => this.props.navigation.navigate('Фильмы')}>
          <Text style={styles.buttonAll}>Смотреть все</Text>
          <MaterialCommunityIcons name="chevron-right" color={"#635b8c"} size={23} />
        </Pressable>
        </View>
        <FlatList 
          data={filmListNT}
          keyExtractor={(item, index) => 'key'+index}
          horizontal
          renderItem={this._renderFilmsItem}
        />
        </View>


        <View style={{marginTop: 15}}>
        <View style={{flexDirection: 'row', margin:10,}}>
        <Text style={styles.nameCater}>Сериалы</Text>
        <Pressable style={{flexDirection:'row'}}
                    onPress={() => this.props.navigation.navigate('Сериалы')}>
          <Text style={styles.buttonAll}>Смотреть все</Text>
          <MaterialCommunityIcons name="chevron-right" color={"#635b8c"} size={23} />
        </Pressable>
        </View>
        <FlatList
          data={serialsList}
          keyExtractor={(item, index) => 'key'+index}
          horizontal
          renderItem={this._renderSerialsItem}
        />
        </View>


        <View style={{marginTop: 15}}>
        <View style={{flexDirection: 'row', margin:10,}}>
        <Text style={styles.nameCater}>Мульфильмы</Text>
        <Pressable style={{flexDirection:'row'}}
                    onPress={() => this.props.navigation.navigate('Мультфильмы')}>
          <Text style={styles.buttonAll}>Смотреть все</Text>
          <MaterialCommunityIcons name="chevron-right" color={"#635b8c"} size={23} />
        </Pressable>
        </View>
        <FlatList
          data={multList}
          keyExtractor={(item, index) => 'key'+index}
          horizontal
          renderItem={this._renderMultItem}
        />
        </View>




        </ScrollView>
        

        </SafeAreaView>
    )

}
}
const styles = StyleSheet.create({
  carouselContainer: {
    
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
    
  },
  itemLabel: {
    position: 'absolute',
    flexDirection: 'column',
    bottom: '5%',
    left:'2%',


  },
 itemRating:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '100%',
 },
typeKino:{
position: 'absolute',

},
nameTypeKino:{
  right: 2,
  top:29,
color:'#fff',
fontSize: 13.3,
fontWeight: 'bold',
backgroundColor: '#008fcc',
letterSpacing:0.5,
padding: 1.5,
borderRadius: 1,
},
 itemGenre: {
  color:'#fff', 
  top:2,  
  backgroundColor:'#2769c4', 
  right: 10, 
  padding: 1,
  borderRadius: 1,
 },

 containFilms:{
marginLeft: 7,
},
itemFilmsImage:{
  marginRight: 7,
  width: 180,
  height: 250,
  opacity: 0.7,
},
nameCater:{
fontSize: 18,
color:'#fff',
fontWeight:'bold',
textTransform:'uppercase',
letterSpacing:1,
},
buttonAll:{
  marginTop: 1,
  marginLeft: 10,
  color:'#635b8c',
  fontSize: 14,

}, 
goodRating:{
  right: 2,
  color:'#fff',
   backgroundColor:'#2d9141', 
  padding:2, 
  borderRadius:1, 
  fontWeight:'700', 
 },
 fallRating:{
  right: 2,
  color:'#fff',
  backgroundColor:'orange', 
 padding:2, 
 borderRadius:1, 
 fontWeight:'700',
 },
 nameFilm:{
   width: 160,
  color:'#fff',
  fontSize: 13,
   fontWeight:'700'    
  
},
GenrsFilm:{
  width: 160,
color:'#fff',
fontSize: 13,
 
},
});

export default Home