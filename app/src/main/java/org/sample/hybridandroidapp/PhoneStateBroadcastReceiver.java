package org.sample.hybridandroidapp;

/**
 * Created by rajeendra on 5/19/18.
 */

import android.content.BroadcastReceiver;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.CallLog;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


public class PhoneStateBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "PhoneStateBroadcastRece";
    Context mContext;
    String incoming_number;
    private int prev_state;
    ContentResolver cr;

    @Override
    public void onReceive(Context context, Intent intent) {
        TelephonyManager telephony = (TelephonyManager)context.getSystemService(Context.TELEPHONY_SERVICE); //TelephonyManager object
        CustomPhoneStateListener customPhoneListener = new CustomPhoneStateListener();
        telephony.listen(customPhoneListener, PhoneStateListener.LISTEN_CALL_STATE); //Register our listener with TelephonyManager

        Bundle bundle = intent.getExtras();
        String phoneNr = bundle.getString("incoming_number");
        Log.v(TAG, "phoneNr: "+phoneNr);
        mContext = context;
        cr=mContext.getContentResolver();
    }

    /* Custom PhoneStateListener */
    public class CustomPhoneStateListener extends PhoneStateListener {

        private static final String TAG = "CustomPhoneStateListene";

        @Override
        public void onCallStateChanged(int state, String incomingNumber){

            //getAllCallLogs(cr);

            if( incomingNumber != null && incomingNumber.length() > 0 )
                incoming_number = incomingNumber; //Ex: 112581338

            switch(state){
                case TelephonyManager.CALL_STATE_RINGING:
                    Log.d(TAG, "CALL_STATE_RINGING");
                    prev_state=state;
                    Toast.makeText(mContext.getApplicationContext(),"CALL_STATE_RINGING: "+incoming_number, Toast.LENGTH_LONG).show();
                    break;

                case TelephonyManager.CALL_STATE_OFFHOOK:
                    Log.d(TAG, "CALL_STATE_OFFHOOK");
                    prev_state=state;
                    Toast.makeText(mContext.getApplicationContext(),"CALL_STATE_OFFHOOK: "+incoming_number, Toast.LENGTH_LONG).show();
                    break;

                case TelephonyManager.CALL_STATE_IDLE:

                    Log.d(TAG, "CALL_STATE_IDLE==>"+incoming_number);

                    if((prev_state == TelephonyManager.CALL_STATE_OFFHOOK)){
                        prev_state=state;
                        Toast.makeText(mContext.getApplicationContext(),"Answered Call which is ended: "+incoming_number, Toast.LENGTH_LONG).show();
                        //getLastCallDetails(mContext);
                        //getAllCallLogs(cr);
                        //upateLastLog(mContext);

                        //Answered Call which is ended
                    }
                    if((prev_state == TelephonyManager.CALL_STATE_RINGING)){
                        prev_state=state;
                        //Rejected or Missed call ended
                        Toast.makeText(mContext.getApplicationContext(),"Rejected or Missed call ended: "+incoming_number, Toast.LENGTH_LONG).show();

                    }
                    break;
            }
        }
    }

    private Cursor getAllCallLogs(ContentResolver cr) {
        // reading all data in descending order according to DATE
        String strOrder = android.provider.CallLog.Calls.DATE + " DESC";
        Uri callUri = Uri.parse("content://call_log/calls");
        Cursor cur = cr.query(callUri, null, null, null, strOrder);
        // loop through cursor

        JSONArray jsonArray = new JSONArray();
        ArrayList<String> callLogs = new ArrayList<String>();

        while (cur.moveToNext()) {
            String callNumber = cur.getString(cur
                    .getColumnIndex(android.provider.CallLog.Calls.NUMBER));
            String callName = cur
                    .getString(cur
                            .getColumnIndex(android.provider.CallLog.Calls.CACHED_NAME));
            String callDate = cur.getString(cur
                    .getColumnIndex(android.provider.CallLog.Calls.DATE));
            SimpleDateFormat formatter = new SimpleDateFormat(
                    "dd-MMM-yyyy HH:mm");
            String dateString = formatter.format(new Date(Long
                    .parseLong(callDate)));
            String callType = cur.getString(cur
                    .getColumnIndex(android.provider.CallLog.Calls.TYPE));
            String isCallNew = cur.getString(cur
                    .getColumnIndex(android.provider.CallLog.Calls.NEW));
            String duration = cur.getString(cur
                    .getColumnIndex(android.provider.CallLog.Calls.DURATION));
            // process log data...
            String jsonStr = "{\"callNumber\":\""+callNumber+"\", \"callName\":\""+callName+"\", \"dateString\":\"" + dateString + "\"}";
            callLogs.add(jsonStr);
            try {
                JSONObject jsonObj = new JSONObject(jsonStr);
                jsonArray.put(jsonObj);
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

        Toast.makeText(mContext.getApplicationContext(),"CALL_LOGS_SIZE: "+jsonArray.length(), Toast.LENGTH_LONG).show();

        return cur;
    }

    public static String getLastCallDetails(Context context) {

//        CallDetails callDetails = new CallDetails();
        String callDetails = null;

        Uri contacts = CallLog.Calls.CONTENT_URI;
        try {

            Cursor managedCursor = context.getContentResolver().query(contacts, null, null, null, android.provider.CallLog.Calls.DATE + " DESC limit 1;");

            int id = managedCursor.getColumnIndex(CallLog.Calls._ID);
            int number = managedCursor.getColumnIndex(CallLog.Calls.NUMBER);
            int duration = managedCursor.getColumnIndex(CallLog.Calls.DURATION);
            int date = managedCursor.getColumnIndex(CallLog.Calls.DATE);
            int incomingtype = managedCursor.getColumnIndex(String.valueOf(CallLog.Calls.INCOMING_TYPE));

            if(managedCursor.moveToFirst()){ // added line

                while (managedCursor.moveToNext()) {
                    String callType;
                    String phNumber = managedCursor.getString(number);
                    //String callerName = getContactName(context, phNumber);

                    String callerName = managedCursor
                            .getString(managedCursor
                                    .getColumnIndex(android.provider.CallLog.Calls.CACHED_NAME));
                    if(incomingtype == -1){
                        callType = "incoming";
                    }
                    else {
                        callType = "outgoing";
                    }
                    String callDate = managedCursor.getString(date);
                    String callDayTime = new      Date(Long.valueOf(callDate)).toString();

                    String callDuration = managedCursor.getString(duration);

                    callDetails = "{" +
                            "\"callerName\":\""+callerName+"\", " +
                            "\"phNumber\":\""+phNumber+"\", " +
                            "\"callDuration\":\""+callDuration+"\", " +
                            "\"callType\":\""+callType+"\", " +
                            "\"callDayTime\":\"" + callDayTime + "\"}";

                }
            }
            managedCursor.close();

        } catch (SecurityException e) {
            Log.e("Security Exception", "User denied call log permission");

        }

        return callDetails;

    }



}
