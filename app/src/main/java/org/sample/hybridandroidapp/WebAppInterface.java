package org.sample.hybridandroidapp;

import android.Manifest;
import android.app.AlertDialog;
import android.content.ContentProviderOperation;
import android.content.ContentResolver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.OperationApplicationException;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Point;
import android.net.Uri;
import android.os.Build;
import android.os.RemoteException;
import android.provider.ContactsContract;
import android.support.v4.app.ActivityCompat;
import android.support.v7.widget.Toolbar;
import android.text.Html;
import android.view.Display;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.ArrayList;

/**
 * Created by rajeendra on 12/22/17.
 */

public class WebAppInterface {
    Context mContext;
    MongodbService mongodbService;

    public static final String Userpreference = "upref";
    public static final String User = "userKey";
    public static final String Password = "passwordKey";
    public static final String Signin = "signinKey";
    public static final String Email = "emailKey";

    /** Instantiate the interface and set the context */
    WebAppInterface(Context c) {
        mContext = c;
        mongodbService=new MongodbService(c);
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public String readFile(String file) {
        String path = "www/";
        String s = "";
        try {
            InputStream is = mContext.getAssets().open(path+file);
            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();
            s=new String(buffer);
        }
        catch (Exception e){

        }

        return s;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void saveMongodbAPIKey(String apiKey) {
        mongodbService.saveApiKey(apiKey);
    }

    @JavascriptInterface
    public String getAllContacts() {
        String jsonResponse;
        jsonResponse = mongodbService.getContacts("data");
        return jsonResponse;
    }

    @JavascriptInterface
    public String getOneContact(String _id)  {
        String jsonResponse;
        jsonResponse = mongodbService.getOneContact(_id);
        return jsonResponse;
    }

    @JavascriptInterface
    public String updateOneContact(String _id, String contact)  {
        String jsonResponse;
        jsonResponse = mongodbService.updateOneContact(_id, contact);
        return jsonResponse;
    }

    @JavascriptInterface
    public String insertOneContact(String contact)  {
        String jsonResponse;
        jsonResponse = mongodbService.insertOneContact(contact);
        return jsonResponse;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public String preLogin() {
        String jsonStr = "";

        SharedPreferences sharedpreferences=null;
        sharedpreferences = mContext.getSharedPreferences(Userpreference, Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedpreferences.edit();
        editor.putString(Signin, "no");
        editor.commit();

        String cuser="";
        String cpwd="";

        if (sharedpreferences.contains(User)) {
            cuser = sharedpreferences.getString(User, "");
        }
        if (sharedpreferences.contains(Password)) {
            cpwd = sharedpreferences.getString(Password, "");
        }

        //TextView textView = (TextView) ((Activity) mContext).findViewById(R.id.link_home);
        //textView.setVisibility(View.INVISIBLE);
        //MenuItem item = (MenuItem) ((AppCompatActivity) mContext).findViewById(R.id.action_favorite);
        //MenuItem mi = menu.findItem(R.id.action_favorite);
        //item.setVisible(false);
        //MenuItem item = R.menu.findItem(R.id.addAction);
        //MenuItem item = menu.findItem(R.id.addAction);

        //Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);

        //Toolbar myToolbar = (Toolbar) ((AppCompatActivity) mContext).findViewById(R.id.my_toolbar);
        //myToolbar.setVisibility(View.INVISIBLE);

        jsonStr = "{\"cuser\":\""+cuser+"\", \"cpwd\":\""+cpwd+"\"}";

        return jsonStr;
    }


    /** Show a toast from the web page */
    @JavascriptInterface
    public String postLogin(String obj) {
        String jsonStr = "";

        String user = null;
        String pwd = null;
        Boolean rm = null;
        String sin = "yes";

        try {
            JSONObject jsonObject = new JSONObject(obj);

            JSONArray jsonArray = (JSONArray)jsonObject.get("data");
            JSONObject userData = (JSONObject)jsonArray.get(0);
            user = (String)userData.get("user");
            pwd = (String)userData.get("pwd");
            rm = (Boolean)userData.get("rm");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        SharedPreferences sharedpreferences;
        sharedpreferences = mContext.getSharedPreferences(Userpreference, Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedpreferences.edit();
        if(rm){
            editor.putString(User, user);
            editor.putString(Password, pwd);
            editor.putString(Signin, sin);
        }
        else
            editor.clear();
        editor.commit();

        //TextView textView = (TextView) ((Activity) mContext).findViewById(R.id.link_home);
        //textView.setVisibility(View.VISIBLE);
        //mContext.getMenuInflater().inflate(R.menu.actionbar_icons, menu);
        //Toolbar myToolbar = (Toolbar) ((AppCompatActivity) mContext).findViewById(R.id.my_toolbar);
        //myToolbar.setVisibility(View.VISIBLE);

        AndroidWebviewActivity apc = (AndroidWebviewActivity) mContext;
        apc.setDashboardView("home");

        jsonStr = "{\"cuser\":\""+user+"\", \"cpwd\":\""+pwd+"\", \"csin\":\"" + sin + "\"}";

        return jsonStr;
    }


    /** Show a toast from the web page */
    @JavascriptInterface
    public String sendEmail(String obj) {
        String jsonStr = "";

        String customerAccount = null;
        String appVersion = null;
        String device = null;
        String os = null;
        String subject = null;
        String emailTo = null;
        String replyTo = null;

        try {
            JSONObject jsonObject = new JSONObject(obj);

            JSONArray jsonArray = (JSONArray)jsonObject.get("data");
            JSONObject userData = (JSONObject)jsonArray.get(0);
            subject = (String)userData.get("subject");
            emailTo = (String)userData.get("emailTo");
            replyTo = (String)userData.get("replyTo");
            customerAccount = (String)userData.get("customerAccount");

            PackageInfo pInfo = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
            appVersion = pInfo.versionName;
            device = Build.MANUFACTURER + " " + Build.MODEL + " " + Build.DEVICE;
            os = "Android " + Build.VERSION.RELEASE;

        } catch (JSONException e) {
            e.printStackTrace();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        //String horizontalLine = "&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;&#95;";


        WindowManager wm = (WindowManager) mContext.getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;

        //String link = "<https://readyandroid.wordpress.com/>";
        String body = "<html><head></head><body><br /><hr> Customer: <p> <b>Account:</b> "+ customerAccount +"<br /> App Version: "+ appVersion +" <br /> Device: "+ device +" <br /> "+ os +" <br /></p><br /></body></html>";
        //String body = "<html><head></head><body><![CDATA[<a href=\"https://readyandroid.wordpress.com/\">readyandroid</a>]]></body></html>";
        //String body = "<html><head></head><body><p>Test mail...</p><https://readyandroid.wordpress.com/></body></html>";

        final Intent emailIntent = new Intent(android.content.Intent.ACTION_SEND);
        //emailIntent.setType("message/rfc822");
        //emailIntent.setType(Intent.normalizeMimeType("text/html"));
        StringBuilder sb = new StringBuilder();
        sb.append(body);
        //emailIntent.setType(Intent.normalizeMimeType("multipart/alternative"));
        emailIntent.setType("text/htm");
        emailIntent.putExtra(android.content.Intent.EXTRA_EMAIL,new String[] { emailTo });
        emailIntent.putExtra(android.content.Intent.EXTRA_SUBJECT, subject);
        emailIntent.putExtra(android.content.Intent.EXTRA_TEXT, Html.fromHtml(sb.toString()));
        //emailIntent.putExtra(android.content.Intent.EXTRA_TEXT, body);
        mContext.startActivity(Intent.createChooser(emailIntent, "Email:"));

        String responseCode = "001";
        String response = "success";

        jsonStr = "{\"responseCode\":\""+responseCode+"\", \"response\":\""+response+"\"}";

        return jsonStr;
    }

    /** test function */
    @JavascriptInterface
    public String testFunc(String jsonStr) {
        String jsonResponse = null;
        String _id = "6319799d8201e9f325c821bd";
        String contact = "{\n" +
                "              \"fname\": \"fnameF\",\n" +
                "              \"lname\": \"lnameF\",\n" +
                "              \"cpse\": \"Company F\",        \n" +
                "              \"active\": \"Y\",\n" +
                "              \"city\": \"London\",\n" +
                "              \"numbers\": [\n" +
                "                {\"id\" : \"0\", \"number\" : \"1778218212\", \"type\" : \"1omx\" }, \n" +
                "                {\"id\" : \"1\", \"number\" : \"1779454985\", \"type\" : \"0omx\" }\n" +
                "              ]\n" +
                "          }";
        //jsonResponse = mongodbService.getOneContact("63197901b5e39c9ed0da01e1");
        //jsonResponse = mongodbService.updateOneContact(_id,contact);
        jsonResponse = mongodbService.insertOneContact(contact);

        return jsonResponse;
    }

    /** test function */
    @JavascriptInterface
    public String testFuncX(String jsonStr) {

        String str1 = null;
        String str2 = null;
        String str3 = null;
        String str4 = null;

        try {
            JSONArray jsonArray = new JSONArray(jsonStr);

            JSONObject data = (JSONObject)jsonArray.get(0);

            str1 = (String)data.get("str1");
            str2 = (String)data.get("str2");
            str3 = (String)data.get("str3");
            str4 = (String)data.get("str4");

            Toast.makeText(mContext, str1, Toast.LENGTH_SHORT).show();



            //displayDialog("Remove", "Do you want to remove?", "rmNum");
            //displayAndroidUI();
            getContactList();

        } catch (JSONException e) {
            e.printStackTrace();
        }

        //String responseCode = "001";
        //String response = "success";

        //jsonStr = "{\"responseCode\":\""+responseCode+"\", \"response\":\""+response+"\"}";

        return jsonStr;
    }

    private void displayAndroidUI(){
        Intent testActivityIntent = new Intent(mContext, TestActivity.class);
        testActivityIntent.putExtra("com.rkd.testapp.testActivityIntent.param.1","value 1");
        mContext.startActivity(testActivityIntent);
    }

    /** test function */
    @JavascriptInterface
    public void displayDialog(String title, String message, String posFunc){

        AlertDialog alertDialog = new AlertDialog.Builder(mContext).create();

        LayoutInflater inflater = (LayoutInflater) mContext.getSystemService( Context.LAYOUT_INFLATER_SERVICE );
        View dialogView = inflater.inflate(R.layout.activity_dialog, null);
        alertDialog.setView(dialogView);

        TextView textViewTitle = (TextView)dialogView.findViewById(R.id.dialog_head);
        textViewTitle.setText(title);

        TextView textViewMessage = (TextView)dialogView.findViewById(R.id.dialog_msg);
        textViewMessage.setText(message);

        //alertDialog.setTitle("Alert");
        //alertDialog.setMessage("Alert message to be shown");
        alertDialog.setButton(AlertDialog.BUTTON_NEUTRAL, "NO",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "YES",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {

                        if(posFunc.equalsIgnoreCase("rmNum")){
                            //Toast.makeText(mContext, posFunc, Toast.LENGTH_SHORT).show();
                            String dataType="response";
                            String responseCode="009";
                            String response = "no";
                            String jsonResponse = "[{\"dataType\":\"" + dataType + "\",\"responseCode\":\""+responseCode+"\", \"response\":\""+response+"\"}]";

                            AndroidWebviewActivity mainActivity = (AndroidWebviewActivity) mContext;
                            WebView webView = (WebView)mainActivity.findViewById(R.id.webview);
                            //MenuItem menuItem = (MenuItem)mainActivity.findViewById(R.id.action_logout);
                            Toolbar myToolbar = (Toolbar)mainActivity.findViewById(R.id.my_toolbar);
                            //MenuItem menuItem = (MenuItem)myToolbar.findViewById(R.id.action_logout);
                            //Menu menu = (Menu)myToolbar.findViewById(R.menu.actionbar_icons);
                            //MenuBuilder actionMenuView = (MenuBuilder)myToolbar.findViewById(R.id.action_logout);
                            //smainActivity.onOptionsItemSelected(menuItem);
                            dialog.dismiss();
                            //mainActivity.logoutJs();
                            //webView.getSettings().setJavaScriptEnabled(true);
                            //webView.loadUrl("javascript:testMsg();");
                            //webView.loadUrl("http://demos.jquerymobile.com/1.4.2/popup/#ui-page-top");

                            //dataType="response";

                        }
                        else{
                            dialog.dismiss();
                        }
                    }
                });

        alertDialog.show();

        //String response = "{\"responseCode\":\""+responseCode+"\", \"response\":\""+response+"\"}";

        return;
    }

    private void xx(String posFunc){
        Toast.makeText(mContext, posFunc, Toast.LENGTH_SHORT).show();
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public String getUser() {
        String jsonStr = "";

        SharedPreferences sharedpreferences=null;
        sharedpreferences = mContext.getSharedPreferences(Userpreference, Context.MODE_PRIVATE);

        String cuser="";
        String cpwd="";
        String csin="no";

        if (sharedpreferences.contains(User)) {
            cuser = sharedpreferences.getString(User, "");
        }
        if (sharedpreferences.contains(Password)) {
            cpwd = sharedpreferences.getString(Password, "");
        }
        if (sharedpreferences.contains(Signin)) {
            csin = sharedpreferences.getString(Signin, "");
        }

        jsonStr = "{\"cuser\":\""+cuser+"\", \"cpwd\":\""+cpwd+"\", \"csin\":\"" + csin + "\"}";

        return jsonStr;
    }

    @JavascriptInterface
    public void preLogout() {
        AndroidWebviewActivity apc = (AndroidWebviewActivity) mContext;
        apc.setDashboardView("login");
    }

    @JavascriptInterface
    public void showLocation() {
        //AndroidWebviewActivity apc = (AndroidWebviewActivity) mContext;
        //apc.setDashboardView("login");

        Intent secActIntent = new Intent(mContext, MapsActivity.class);
        secActIntent.putExtra("com.rkd.testapp.multipage.HM","HELLO WORLD!");
        mContext.startActivity(secActIntent);
    }

    @JavascriptInterface
    public void showMap() {
        //AndroidWebviewActivity apc = (AndroidWebviewActivity) mContext;
        //apc.setDashboardView("login");

        Intent secActIntent = new Intent(mContext, MarkerDemoActivity.class);
        secActIntent.putExtra("com.rkd.testapp.multipage.HM","HELLO WORLD!");
        mContext.startActivity(secActIntent);
    }



    @JavascriptInterface
    public void openDialer(String obj) {
        //Uri number = Uri.parse("tel:0094112581338");
        Uri number = Uri.parse("tel:+"+obj.substring(1));
        Intent callIntent = new Intent(Intent.ACTION_DIAL, number);
        mContext.startActivity(callIntent);

    }

    //showWebview
    /** Show a toast from the web page */
    @JavascriptInterface
    public void showWebview(JSONArray args) {

    }

    @JavascriptInterface
    public void getContactList() {

        ArrayList<DataDTO> contacts = new ArrayList<DataDTO>();

        int c = 0;
        ContentResolver cr = mContext.getContentResolver();
        Cursor cur = cr.query(ContactsContract.Contacts.CONTENT_URI,
                null, null, null, null);

        if ((cur != null ? cur.getCount() : 0) > 0) {
            while (cur != null && cur.moveToNext()) {
                c++;
                DataDTO dataDTO = new DataDTO();
                String id = cur.getString(
                        cur.getColumnIndex(ContactsContract.Contacts._ID));
                String name = cur.getString(cur.getColumnIndex(
                        ContactsContract.Contacts.DISPLAY_NAME));
                String namePrimary = cur.getString(cur.getColumnIndex(
                        ContactsContract.Contacts.DISPLAY_NAME_PRIMARY));
                dataDTO.setStrData01(id);
                dataDTO.setStrData02(name);
                dataDTO.setStrData03(namePrimary);
                //Toast.makeText(mContext.getApplicationContext(),name+": "+id, Toast.LENGTH_LONG).show();

                if (cur.getInt(cur.getColumnIndex(
                        ContactsContract.Contacts.HAS_PHONE_NUMBER)) > 0) {
                    Cursor pCur = cr.query(
                            ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                            null,
                            ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                            new String[]{id}, null);

                    ArrayList<DataDTO> phoneNumbers = new ArrayList<DataDTO>();
                    while (pCur.moveToNext()) {
                        String phoneNo = pCur.getString(pCur.getColumnIndex(
                                ContactsContract.CommonDataKinds.Phone.NUMBER));
                        //Log.i(TAG, "Name: " + name);
                        //Log.i(TAG, "Phone Number: " + phoneNo);
                        //Toast.makeText(mContext.getApplicationContext(),name+": "+phoneNo, Toast.LENGTH_LONG).show();
                        DataDTO pDataDTO = new DataDTO();
                        pDataDTO.setStrData01(phoneNo);
                        phoneNumbers.add(pDataDTO);
                    }
                    pCur.close();

                    dataDTO.setDataDTOS01(phoneNumbers.toArray(new DataDTO[0]));
                    contacts.add(dataDTO);
                }
                //JSONObject jsonObj = new JSONObject("{\"phoneNo\":\"N95\",\"cat\":\"WP\"}");
            }
        }
        if(cur!=null){
            cur.close();
        }

        Gson gson = new Gson();
        String jsonInString = gson.toJson(contacts);

        Toast.makeText(mContext.getApplicationContext(),"Total contacts: "+c, Toast.LENGTH_LONG).show();

    }

    @JavascriptInterface
    public String getContactGroops() {
        Cursor dataCursor = mContext.getContentResolver().query(
                ContactsContract.Data.CONTENT_URI,
                new String[]{
                        ContactsContract.Data.CONTACT_ID,
                        ContactsContract.Data.DATA1
                },
                ContactsContract.Data.MIMETYPE + "=?",
                new String[]{ContactsContract.CommonDataKinds.GroupMembership.CONTENT_ITEM_TYPE}, null
        );

        ArrayList<DataDTO> dtos = new ArrayList<DataDTO>();

        if(dataCursor!=null){
            while(dataCursor.moveToNext()){
                String group_title = dataCursor.getString(1);
                String id = dataCursor.getString(0);

                DataDTO dto = new DataDTO();
                dto.setStrData01(id);
                dto.setStrData02(group_title);

                dtos.add(dto);
                //groups.put(id, group_title);
            }
        }

        Gson gson = new Gson();
        String jsonStr = gson.toJson(dtos);

        return jsonStr;
    }

    @JavascriptInterface
    public void moveWebview(){
        AndroidWebviewActivity mainActivity = (AndroidWebviewActivity) mContext;
        //WebView webView = (WebView)mainActivity.findViewById(R.id.webview);
        ScrollView scrollView = (ScrollView)mainActivity.findViewById(R.id.scrollView);
        //webView.scrollTo(0,0);
        scrollView.scrollTo(0, 0);
        //scrollView.getLayoutParams().height=100;
    }

    public static void addNumberToContact(Context context, Long contactRawId, String number) throws RemoteException, OperationApplicationException {
        addInfoToAddressBookContact(
                context,
                contactRawId,
                ContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE,
                ContactsContract.CommonDataKinds.Phone.NUMBER,
                ContactsContract.CommonDataKinds.Phone.TYPE,
                ContactsContract.CommonDataKinds.Phone.TYPE_OTHER,
                number
        );
    }

    private static void addInfoToAddressBookContact(Context context, Long contactRawId, String mimeType, String whatToAdd, String typeKey, int type, String data) throws RemoteException, OperationApplicationException {
        if(ActivityCompat.checkSelfPermission(context, Manifest.permission.WRITE_CONTACTS) == PackageManager.PERMISSION_DENIED) {
            return;
        }
        ArrayList<ContentProviderOperation> ops = new ArrayList<>();
        ops.add(ContentProviderOperation.newInsert(ContactsContract.Data.CONTENT_URI)
                .withValue(ContactsContract.Data.RAW_CONTACT_ID, contactRawId)
                .withValue(ContactsContract.Data.MIMETYPE, mimeType)
                .withValue(whatToAdd, data)
                .withValue(typeKey, type)
                .build());
        context.getContentResolver().applyBatch(ContactsContract.AUTHORITY, ops);
    }

}
