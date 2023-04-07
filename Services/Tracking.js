import {PermissionsAndroid, NativeModules} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

async function requestPermissions() {
  try {
    // Requesting permissions for SMS and Location
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ];
    return await PermissionsAndroid.requestMultiple(permissions).then(
      results => {
        if (
          results[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          results[PermissionsAndroid.PERMISSIONS.SEND_SMS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          results[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          results[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          results[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All message permissions granted');
          return true;
        } else {
          console.log('Some permissions were not granted');
          return false;
        }
      },
    );
  } catch (err) {
    console.warn(err);
  }
  return false;
}

// function to send the SMS Note DirectSMS is the module using concept react native bridge
function sendSms(phoneNumber, message) {
  let DirectSms = NativeModules.DirectSms;
  DirectSms.sendDirectSms(phoneNumber, message);
}

/*
The react native bridge concept is used to communicate between the native code and the javascript code.
more at page
 https://aboutreact.com/react-native-bridge-send-direct-sms-from-react-native-app/
*/

// Utility function to convert the message to the appropriate location format
function generateGoogleMapsLink(latitude, longitude) {
  const baseUrl = 'https://www.google.com/maps?q=';
  return baseUrl + latitude + ',' + longitude;
}

// function to get the current location
function getCurrentLocation() {
  // Start watching the device's location
  // It returns the Promis to make the function asynchronous
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        //console.log('latitude', latitude);
        //console.log('longitude', longitude);
        const googleMapsLink = generateGoogleMapsLink(latitude, longitude);
        resolve(googleMapsLink);
      },
      error => {
        console.log(error);
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  });
}

export {sendSms, getCurrentLocation, requestPermissions};
