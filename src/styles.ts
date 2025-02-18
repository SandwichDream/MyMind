import { Dimensions, StyleSheet } from 'react-native';

const imgSize = Dimensions.get('window').width / 3.5

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLevel: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 35,
    marginVertical: 0
  },
  containerLevelItem: {
    marginBottom: 40,
    marginHorizontal: 20,
    width: imgSize,
    height: imgSize
  },
  homeIcons: {
    width: imgSize,
    height: imgSize
  },
  markUncomplete: {
    position: "absolute",
    borderWidth: 5,
    borderColor: "red",
    borderRadius: 7.5,
    width: imgSize,
    height: imgSize
  },
  markComplete: {
    position: "absolute",
    borderWidth: 5,
    borderColor: "lime",
    borderRadius: 7.5,
    width: imgSize,
    height: imgSize
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Baloo2-Regular',
    marginTop: 20,
    lineHeight: 29
  },
  titleText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Baloo2-Bold',
    fontWeight: 'bold',
    marginTop: 40
  },
  button: {
    backgroundColor: '#6EBCF7',
    padding: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Baloo2-Regular',
    paddingHorizontal: 40
  },
  imageBG: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default styles;