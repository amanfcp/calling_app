package com.calling_app

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.*

const val GROUP = "group"
const val CHANNEL_ID = "CHANNEL_ID"
const val SUMMARY_ID = 0

class GroupNotifications (reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "GroupNotification"
    }

    private var count = 0

    private val personsArray = ArrayList<Person>()

    @ReactMethod
    fun getChannelName () : String {
        return CHANNEL_ID
    }

    @ReactMethod
    fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "Channel name"
            val descriptionText = "Channel description"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description = descriptionText
            }
            val notificationManager: NotificationManager =
                reactApplicationContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    @RequiresApi(Build.VERSION_CODES.M)
    @ReactMethod
    private  fun groupNotification (id: Int, message: String) {
        val newPerson = Person(id, "Person $id", NotificationCompat.InboxStyle())
        sendNotification(getPerson((newPerson)))
    }

    @ReactMethod
    private fun getPerson (person: Person): Person {

        val index = personsArray.indexOfFirst { it.id == person.id }

        val updatedPerson: Person

        if (index != -1) {
            updatedPerson = personsArray[index]
        } else {
            updatedPerson = person
            personsArray.add(updatedPerson)
        }
        return updatedPerson
    }


    @ReactMethod
    @RequiresApi(Build.VERSION_CODES.M)
    private fun sendNotification(person: Person) {
        count++

        val newLine = "This is message number $count"

        val newNotification = NotificationCompat.Builder(reactApplicationContext, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setGroup(GROUP)
            .setContentTitle(person.name)
            .setContentText(newLine)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .setAutoCancel(true)
            .setStyle(person.inboxStyle.addLine(newLine))
            .build()

        val summaryNotification = NotificationCompat.Builder(reactApplicationContext, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setGroup(GROUP)
            .setGroupSummary(true)
            .build()


        with(NotificationManagerCompat.from(reactApplicationContext)) {
            // notificationId is a unique int for each notification that you must define
            notify(person.id, newNotification)
            notify(SUMMARY_ID, summaryNotification)
        }


    }
}