import React, { PropTypes } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class MapCallout extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>
            {this.props.children}
          </View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
    );
  }
}

MapCallout.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    backgroundColor: '#fa8072',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 0.5,
    zIndex: 2,
    position: 'relative'
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#fa8072',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#000000',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});

module.exports = MapCallout;

// <Image
//   source={{uri: `https://www.nycgovparks.org${this.props.imageSourcePath.thumb_path}`}}
//   style={{height: 75, width: 75}}
//     />
// <Button
//     style={{color: 'blue'}}
//     title="Learn More"
//     onPress={() => navigation.navigate('Details', { name: this.props.detailsLink})}
// />