package org.sample.hybrid;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import static android.app.Activity.RESULT_OK;

/**
 * Created by hschinsk on 6/18/15.
 */
public class HybridBridge extends CordovaPlugin {

    public static final String Userpreference = "upref";
    public static final String User = "userKey";
    public static final String Password = "passwordKey";
    public static final String Email = "emailKey";

    public ArrayList itemsList = new ArrayList();
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        try {
            if (action.equals("addItem")) {
                //String item = args.getString(0);
                //String className = args.getString(1);
                JSONObject data = (JSONObject)args.get(0);
                String item = data.getString("item");
                String className = data.getString("myclass");

                Context context = cordova.getActivity().getApplicationContext();
                Intent intent = new Intent(context,Class.forName(className));
                itemsList.add(item);
                intent.putStringArrayListExtra("items", itemsList);
                cordova.startActivityForResult(this,intent,1);
                int statusCode = 102;
                String status = "Success";
                String result = "{\"statusCode\":"+statusCode+", \"status\":\""+status+"\"}";
                callbackContext.success(result);
                //callbackContext.success();
                return true;
            }
            if (action.equals("preLogin")) {

                //JSONObject data = (JSONObject)args.get(0);
                //String user = data.getString("user");
                //String pwd = data.getString("pwd");

                SharedPreferences sharedpreferences;
                Context context = cordova.getActivity().getApplicationContext();
                sharedpreferences = context.getSharedPreferences(Userpreference, Context.MODE_PRIVATE);

                String cuser="";
                String cpwd="";

                if (sharedpreferences.contains(User)) {
                    cuser = sharedpreferences.getString(User, "");
                }
                if (sharedpreferences.contains(Password)) {
                    cpwd = sharedpreferences.getString(Password, "");
                }

                //SharedPreferences.Editor editor = sharedpreferences.edit();
                //editor.putString(User, n);
                //editor.putString(Password, ph);
                //editor.commit();

                String result = "{\"cuser\":\""+cuser+"\", \"cpwd\":\""+cpwd+"\"}";
                callbackContext.success(result);

                return true;
            }
            if (action.equals("postLogin")) {
                JSONObject data = (JSONObject)args.get(0);
                String user = data.getString("user");
                String pwd = data.getString("pwd");
                String rm = data.getString("rm");

                SharedPreferences sharedpreferences;
                Context context = cordova.getActivity().getApplicationContext();
                sharedpreferences = context.getSharedPreferences(Userpreference, Context.MODE_PRIVATE);

                SharedPreferences.Editor editor = sharedpreferences.edit();
                if(rm.equals("true")){
                    editor.putString(User, user);
                    editor.putString(Password, pwd);
                }
                else
                    editor.clear();
                editor.commit();

                String result = "{\"cuser\":\""+user+"\", \"cpwd\":\""+pwd+"\"}";
                callbackContext.success(result);

                return true;
            }
            if (action.equals("showWebview")) {
                JSONObject data = (JSONObject)args.get(0);
                String className = data.getString("className");
                String url = data.getString("url");

                Context context = cordova.getActivity().getApplicationContext();
                Intent intent = new Intent(context,Class.forName(className));
                intent.putExtra("url",url);

                cordova.startActivityForResult(this,intent,1);

                callbackContext.success();

                return true;
            }
            callbackContext.error("Invalid action");
            return false;
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
            callbackContext.error(e.getMessage());
            return false;
        }
    }
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // Handle a result here if one set in the Activity class started
        System.out.println("Activity Result: " + resultCode); //-1 is RESULT_OK
        if (resultCode== RESULT_OK) {
            System.out.println("All good!");
        }
    }

}
