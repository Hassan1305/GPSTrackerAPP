# GPSTrackerAPP

#### What is GPS Tracker?
The purpose of the application is that often we just have to call and inform some friend, colleague, or relative about our location. This application will solve that headache for us and upon receiving the message with secret code, it will automatically sends the location.

##### How app works
This application is a just an implementation to test the idea of GPS tracking, the application is created in react native. The application works in a way that it reads out the incoming messages, if the message contains a secret code, it then automatically reply to sender with current location of user. The message is the link of google maps containing the GPS coords of the person.

##### Requirements
- [Mobile Network] - Mobile phone has a sim network to send or receive messages
- [Permissions] - Make sure you give the application permission to read and write messages as well as access to location
- [Location] - Make sure you have location turned on and also the application is opened


The application can be further extended to functionalities like to generate secret code of your choice, user authentication, running the application in background even if application is not opened.


##### Further Extensions
The react native bridge concept is used to communicate between the native code and the javascript code.
###### DirectSMS module is created and have explanation at
https://aboutreact.com/react-native-bridge-send-direct-sms-from-react-native-app/
