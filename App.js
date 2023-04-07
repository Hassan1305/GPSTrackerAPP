import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  sendSms,
  getCurrentLocation,
  requestPermissions,
} from './Services/Tracking';
import SmsListener from 'react-native-android-sms-listener';

export default function App() {
  //to save the permissions state (granted or denied)
  const [permissions, setpermissions] = useState(false);
  //to state to manage whether the message contains the secret key or not
  const [messageAlert, setmessageAlert] = useState(false);
  //to save the phone number of the sender
  const [phoneNumber, setphoneNumber] = useState('+923149303586');
  //to save the secret key
  const [secretKey] = useState('123456');

  const handleSMSListener = message => {
    let body = message?.body;
    //console.log('new message received', message);

    //verifying if message contain the secret key
    if (body.includes(secretKey)) {
      //console.log('message contains secret key');

      //setting the phone number of the sender
      setphoneNumber(message.originatingAddress);
      //setting the messageAlert to true in order to inititae the message sending process
      setmessageAlert(true);
    }
  };

  useEffect(() => {
    //requesting permissions on the start of the application
    requestPermissions().then(result => {
      setpermissions(result);
      //console.log(permissions);
    });
  }, []);

  useEffect(() => {
    //console.log(permissions);

    //if permissions are granted then add the listener
    if (permissions) {
      //adding the listener for the sms ( listen to new incoming messages)
      let subscription = SmsListener.addListener(handleSMSListener);

      //unmounting the subscription on exit of application
      return () => {
        subscription?.remove();
      };
    }
  }, [permissions]);

  useEffect(() => {
    //async function to handle the location and message sending process
    async function handleLocationAndMessage() {
      if (messageAlert && phoneNumber) {
        let location = await getCurrentLocation();
        console.log('URL', location);
        sendSms(phoneNumber, location);
        setphoneNumber('');
        setmessageAlert(false);
      }
    }
    handleLocationAndMessage();
  }, [messageAlert]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Welcome to GPS Tracker APP</Text>
      <Text style={styles.body}>
        Send a text message with secret key '123456' in it and it will
        automatically reply with an google maps URL containing your current
        location.
      </Text>
      {/* <Button
        title="Send SMS"
        onPress={() => sendSms('+923149303586', String(getCurrentLocation()))}
      />
      <Button title="get location" onPress={() => setmessageAlert(true)} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 26,
    borderColor: 'black',
    borderWidth: 1,
    padding: 2,
  },
  body: {
    fontSize: 20,
    padding: 10,
    lineHeight: 30,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
  },
});
