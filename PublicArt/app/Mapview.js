import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Image
} from 'react-native';
import MapView from 'react-native-maps';
import MapCallout from './MapCallout';

class Mapview extends Component {
  constructor(props){
    super(props)
    var userLocation = this.props.navigation.state.params.userLocation.coords
    this.state = {
      region: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0122,
        longitudeDelta: 0.0021,
       },
      markers: this.props.navigation.state.params.markers,
      selectedMarker: false
    };
  }


  render() {
    const navigation = this.props.navigation
    return (
      <View style={styles.container}>
      <MapView
      style={ styles.map }
        initialRegion={this.state.region}>
          <MapView.Marker
            style={ styles.personMarker }
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
            image={require('../PersonIcon.png')}
          />
          {this.state.markers.map((marker, index) => (
            marker.lat > 0 ?
               <MapView.Marker
                  key={marker.unique_id}
                  coordinate={{
                    latitude: +marker.lat,
                    longitude: +marker.lng}}>
                    <MapView.Callout tooltip style={styles.customView}
                      onPress={() => navigation.navigate('Details', { name: marker.link})}>
                      <MapCallout>
                        <Text
                          style={ styles.titleText }
                          >{marker.name}</Text>
                        <Image
                          source={{uri: `https://www.nycgovparks.org${marker.thumb_path}`}}
                          style={styles.placeImage}
                            />
                          <Text
                            style={ styles.tapText }>Tap to learn more</Text>
                      </MapCallout>
                    </MapView.Callout>
              </MapView.Marker>
              : null
          ))}
        </MapView>
      </View>
    );
  }
  }

const styles = StyleSheet.create({
  customView: {
    width: 200,
    height: 100,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  personMarker: {
    zIndex: 1,
    position: 'relative'
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tapText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: '#0000ff'
  },
  placeImage: {
    height: 75,
    width: 75,
    alignSelf: 'center'
  }
});

export default Mapview;
