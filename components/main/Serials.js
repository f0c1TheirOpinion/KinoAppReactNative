import React, {Component} from 'react'
import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, FlatList, Button, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {BarIndicator} from 'react-native-indicators';




let RandomFilms = [];
let listViewRef;
export class Serials extends Component {

  constructor(props){
    super(props);
    
    this.state = {
      isLoading: true,
      filmsList: [],
      filerYears: 2020
    }
    this._updateFilmList = this._updateFilmList.bind(this);

  }
  
  _updateFilmList() {
    listViewRef.scrollToOffset({offset:0, animated: true})
    this.setState({
        isLoading: true
       
      })
    const {filerYears} = this.state;
    
    let updateYears = filerYears - 1;
    let arrRandomOrder = [6,7,8,9,10 ];
    let randomOrder = Math.floor(Math.random() * arrRandomOrder.length);
        console.log(updateYears)

       let arrRandomYear = [];
        for( let i = 1999; i <= 2021; i++){
            arrRandomYear.push(i)
        }
        let randomForYear = Math.floor(Math.random() * arrRandomYear.length);
        
        console.log(arrRandomYear);


    let randomInt = Math.floor(Math.random() * 20) + 1;
    
  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=NUM_VOTE&type=TV_SHOW&ratingFrom=4&ratingTo=${arrRandomOrder[randomOrder]}&yearFrom=1964&yearTo=${arrRandomYear[randomForYear]}&page=${randomInt}`,
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
          let getGenres = replaceModeX2.slice(2,-2);

          if(getGenres.indexOf('мультфильм,') >= 0){
            continue;
          }
         
       
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, getFilmsId];
          
        }
      
        let filtered = RandomFilms.filter(function (el) {
            return el != null;
          });

      this.setState({
        filmsList: filtered,
        filerYears: updateYears,
        isLoading:false
       
      })
      

      })
      .catch(function (error) {
        // handle error
        console.log(error.message);
      })
      .finally(function () {
        
      });
    
  };
  


componentDidMount(){
   

  
    let randomInt = Math.floor(Math.random() * 20) + 1;
    let arrRandomOrder = ['NUM_VOTE', 'RATING', 'YEAR' ];
    let randomOrder = Math.floor(Math.random() * arrRandomOrder.length);
    console.log(randomOrder);
  axios
      .get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-filters?order=${arrRandomOrder[randomOrder]}&type=TV_SHOW&ratingFrom=6&ratingTo=10&yearFrom=2010&yearTo=2021&page=${randomInt}`,
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
          let getGenres = replaceModeX2.slice(2,-2);

          if(getGenres.indexOf('мультфильм,') >= 0){
            continue;
          }

       
          RandomFilms[i] = [getName, getYear, getRating, getPosterURL, getGenres, getFilmsId];
          
        }
        let filtered = RandomFilms.filter(function (el) {
            return el != null;
          });
      

      this.setState({
        filmsList: filtered,
        isLoading: false,
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
    
  };
 
  

  

   render(){
     const {isLoading, filmsList} = this.state;
     if(isLoading){
       return (<View style={{backgroundColor:'#040114', height:'100%', flex:1,}}>
       <BarIndicator color='#e91e63' size={50} /> 
       </View>)
     }
  
    return (
        <SafeAreaView style={ {backgroundColor:'#040114', flex:1,} }>
        <View style={styles.containerGallery}>
        <FlatList 
               ref={(ref) => {
                   listViewRef = ref;
               }}
               keyExtractor={(item, index) => 'key'+index}

                numColumns={2}
                horizontal={false}
                data={filmsList}
                renderItem={({item}) => (
                  <TouchableOpacity style = {styles.containerFilms}  onPress={() => this.props.navigation.navigate('Pleers', {
                    screen: 'Pleer',
                    params: { filmId: item[5] }
            })}>
                    <View style = {styles.containerFilms}>
                        <View style={styles.contFilms}></View>
                    <Image 
                    style = {styles.image}
                    source={{uri: item[3]}}
                    />
                    <View style={styles.itemRating}>
          {item[2] > 7 ? (
            <Text style={ styles.goodRating}>{item[2]}</Text>
          ) : (<Text style={ styles.fallRating}>{item[2]}</Text>)}
          
        </View>
                    <Text numberOfLines={1} style={styles.nameFilm}>{item[0]}</Text>
                    <Text numberOfLines={1} style={styles.GenrsFilm}>{item[1]} ○ {item[4]}</Text>
                    </View>
                    </TouchableOpacity>
                    
                )
                
                
            }
            
            />
             
               
        </View>

        <Pressable style={
    {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 2,
    elevation: 3,
    backgroundColor: '#60568f',}}  onPress={this._updateFilmList}>
      <Text style={{fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',}}>Дальше</Text>
              <MaterialCommunityIcons name="chevron-right" color={"#fff"} size={29} />


    </Pressable>
  
       
        </SafeAreaView>
    )

}
}
const styles = StyleSheet.create({
    containerGallery:{
        flex: 1,
        },
        containerFilms: {
        flex: 1/2,
        marginLeft: 5,
       },
       contFilms: {
           marginTop: '6%',
       },
       image: {
        marginRight: 5,
        opacity: 0.8,
       flex: 1,
       aspectRatio: 3/4,
       },
       nameFilm:{
           color:'#fff',
           fontSize: 13,
            fontWeight:'700'    
           
       },
       GenrsFilm:{
        color:'#fff',
        fontSize: 13,
          
       },
       itemRating:{
position: 'absolute',
       },
       goodRating:{
        color:'#fff',
         top:"10%",
         backgroundColor:'#2d9141', 
        padding:2, 
        borderRadius:1, 
        fontWeight:'700', 
       },
       fallRating:{
        color:'#fff',
        top:'10%',
        backgroundColor:'orange', 
       padding:2, 
       borderRadius:1, 
       fontWeight:'700',
       },
       buttonUpdate:{
        borderRadius: 4,
        paddingVertical: 7,
        paddingHorizontal: 32,
        borderColor: "#8a9fff",
        borderWidth: 2,
    },
    buttonTextUpdate:{
    fontSize: 14,
    fontWeight: '500',
    },
});

export default Serials