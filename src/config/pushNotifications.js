import PushNotification, { Importance } from "react-native-push-notification";
// import notifications from "../data/notifications";

const configure = () => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log("TOKEN:", token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            // console.log("NOTIFICATION:", notification);

            // process the notification

            // (required) Called when a remote is received or opened, or local notification is opened
            // notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log("ACTION:", notification.action);
            console.log("NOTIFICATION:", notification);

            // process the action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: Platform.OS === 'ios',
    });
}

// It will create a channel when the app opens for the first time. It helps in grouping and setting custom sound.
// Make sure to pass the same channel id (android_channel_id) from the server when sending notification.

const createChannel = () => {
    PushNotification.createChannel({
        channelId: 'CHANNEL_ID',
        channelName: 'CHANNEL_NAME',
        channelDescription: 'CHANNEL_DESCRIPTION',
        importance: Importance.HIGH,
        playSound: true,
        soundName: 'default',
        vibrate: true,
    },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
}

const dummyNotification = {
    title: 'notification title',
    message: 'notification message',
    subText: 'notification subtext'
}

let count = 0;

const localNotification = (messageId, notification = dummyNotification, data = {}) => {
    // PARAM 1 => this is a dummy id, pass the messageId that will be received via firebase notification
    // PARAM 2 => notification object that will be received via firebase notification
    // PARAM 3 => data object that will be received via firebase notification

    if (count === 10) count = 0;
    else count++;

    const isGroup = !!notification.group;

    let localNotificationObject = {
        data,

        // (optional) default: true
        showWhen: true,

        // (optional) default: true
        autoCancel: true,

        // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        smallIcon: 'ic_notification',

        // (optional) default: none
        // subText: notification.subText,

        // (optional) default: system default
        color: '#8000ff',

        // (optional) default: true
        vibrate: true,

        // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        vibration: 300,

        // (optional) add group to message
        group: 'CHANNEL_ID',

        // (optional) set whether this is an "ongoing" notification
        ongoing: false,

        // (optional) set notification priority, default: high
        priority: "high",

        // (optional) set notification visibility, default: private
        visibility: "private",

        // (optional) set notification importance, default: high
        importance: "high",

        // (optional) set notification to work while on doze, default: false
        allowWhileIdle: false,

        // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
        ignoreInForeground: false,

        // (optional) custom channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        channelId: 'CHANNEL_ID',

        //(optional) alert will open only once with sound and notify, default: false
        onlyAlertOnce: false,
        id: messageId,
        messageId: messageId,

        // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
        invokeApp: true,

        // (optional) default: view
        alertAction: "view",

        // (optional) default: empty string
        category: "",

        // (optional)
        title: notification.title,

        // (required)
        message: notification.message + count,

        // (optional) default: {} (using null throws a JSON value '<null>' error)
        userInfo: {},

        // (optional) default: true
        playSound: true,

        // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource:
        soundName: "default",
        //com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)

        // for grouping of notifications like whatsApp. If you do not want grouping of notifications do not pass this key 
        // "messaging", "inbox"
        style: 'messaging',
    }

    if (isGroup) {
        localNotificationObject = {
            ...localNotificationObject,
            isGroup,
            groupPersonKey: notification.title + count,
            groupId: notification?.group?.groupId,
            groupName: notification?.group?.groupName,
        }
    }

    // POP UP NOTIFICATION
    PushNotification.localNotification(localNotificationObject);
    console.log('file: pushNotifications.js => line 186 => localNotification => localNotificationObject', localNotificationObject);


    // GROUP SUMMARY 
    PushNotification.localNotification({
        channelId: 'CHANNEL_ID',
        smallIcon: 'ic_notification',
        group: 'CHANNEL_ID',
        groupSummary: true,
        id: 0,
        message: notification.message,
    })
};

export {
    configure,
    createChannel,
    localNotification,
}
