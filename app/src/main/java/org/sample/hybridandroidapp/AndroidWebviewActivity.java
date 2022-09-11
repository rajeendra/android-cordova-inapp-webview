package org.sample.hybridandroidapp;

/**
 * Created by rajeendra on 12/19/17.
 */

import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.model.LatLng;

public class AndroidWebviewActivity extends AppCompatActivity {

    private static final String TAG = "AndroidWebviewActivity";

    public final static String DASHBOARD_LOGIN= "login";
    public final static String DASHBOARD_HOME= "home";

    public final static int WEBVIEW_DASHBOARD_KEY= 1;
    public final static String WEBVIEW_DASHBOARD_URL= "file:///android_asset/www/dashboard.html";

    public final static int WEBVIEW_EXTERNAL_KEY= 2;
    public final static String WEBVIEW_EXTERNAL_URL= "https://2017.cssconf.eu/";
    //public final static String WEBVIEW_EXTERNAL_URL= "https://mobile.twitter.com/billgates/";

    private GoogleMap mMap;
    private GoogleApiClient googleApiClient;
    private static final int LOCATION_REQUEST_CODE = 101;
    private double lat = 0;
    private double lng = 0;

    private WebView webView = null;
    private String selectedUrl=null;
    private int selectedWebviewKey=1;
    private String dashboardView=DASHBOARD_LOGIN;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar myToolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(myToolbar);

        getCurrentLocation();

        selectedUrl = WEBVIEW_DASHBOARD_URL;
        dashboardView=DASHBOARD_LOGIN;

        loadView();
    }

    private void loadView(){
        Intent intent = this.getIntent();

        this.webView = (WebView) findViewById(R.id.webview);

        //WebSettings webSettings = webView.getSettings();
        //webSettings.setJavaScriptEnabled(true);
        //webSettings.setBuiltInZoomControls(true);
        //webSettings.setDisplayZoomControls(false);
        //webView.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
        //webView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);
        //webView.getSettings().setAppCacheEnabled(true);
        //webSettings.setDomStorageEnabled(true);

        WebViewClientImpl webViewClient = new WebViewClientImpl(this);
        webView.setWebViewClient(webViewClient);
//
        if (selectedUrl==null && intent.hasExtra("url")) {
            selectedUrl = intent.getExtras().getString("url");
        }

        // Add js interfaces
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
        webView.addJavascriptInterface(new StringGetter(), "StringGetter");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);

        //selectedUrl = WEBVIEW_EXTERNAL_URL;
        webView.loadUrl(selectedUrl);
        selectedUrl=null;

        setResult(RESULT_OK, intent);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && this.webView.canGoBack()) {
            this.webView.goBack();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

    public class StringGetter {

        @JavascriptInterface
        public String getDashboardView() {
            return dashboardView;
        }

        @JavascriptInterface
        public double getLat() {
            return lat;
        }

        @JavascriptInterface
        public double getLng() {
            return lng;
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        // Checks the orientation of the screen
        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
            //Toast.makeText(this, "landscape", Toast.LENGTH_SHORT).show();
        } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT){
            //Toast.makeText(this, "portrait", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.actionbar_icons, menu);
        return true;
    }

    public void logoutJs(){
        webView.loadUrl("javascript:signout(); showLogin();");
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_logout:
                // User chose the "Settings" item, show the app settings UI...
                //Toast.makeText(getApplicationContext(), "action_settings",
                //        Toast.LENGTH_LONG).show();
                if(selectedWebviewKey==WEBVIEW_EXTERNAL_KEY){
                    Toast.makeText(getApplicationContext(), "Please switch to dashboard befour you signout",
                            Toast.LENGTH_LONG).show();
                }
                else if (dashboardView!=DASHBOARD_LOGIN){
                    webView.loadUrl("javascript:signout(); showLogin();");
                }
                else{
                    //Toast.makeText(getApplicationContext(), "Access denied!",
                    //        Toast.LENGTH_LONG).show();
                }
                return true;

            case R.id.action_favorite:
                // User chose the "Favorite" action, mark the current item
                // as a favorite...

                //Toast.makeText(getApplicationContext(), "action_favorite",
                //        Toast.LENGTH_LONG).show();

                if (!dashboardView.equals(DASHBOARD_LOGIN)){
                    if(selectedWebviewKey==WEBVIEW_DASHBOARD_KEY){
                        selectedUrl = WEBVIEW_EXTERNAL_URL;
                        selectedWebviewKey=WEBVIEW_EXTERNAL_KEY;
                    }
                    else{
                        selectedUrl = WEBVIEW_DASHBOARD_URL;
                        selectedWebviewKey=WEBVIEW_DASHBOARD_KEY;
                    }
                    loadView();
                }
                else{
                    Toast.makeText(getApplicationContext(), "Access denied!",
                            Toast.LENGTH_LONG).show();
                }

                return true;

            case R.id.action_send:
                if(selectedWebviewKey==WEBVIEW_EXTERNAL_KEY){
                    Toast.makeText(getApplicationContext(), "Please switch to dashboard befour send",
                            Toast.LENGTH_LONG).show();
                }
                else {
                    webView.loadUrl("javascript:showAndroidToast('Message sent')");

                    return true;
                }

            default:
                // If we got here, the user's action was not recognized.
                // Invoke the superclass to handle it.
                return super.onOptionsItemSelected(item);

        }
    }

    public void setDashboardView(String dv){
        dashboardView = dv;
    }


    private void getCurrentLocation(){

        //Toast.makeText(getApplicationContext(), "getCurrentLocation ",
        //        Toast.LENGTH_LONG).show();

        LatLng LOCATION = null;
        LatLng MYLOCATION = new LatLng(-33.6878,151.2093); //33.8688° S, 151.2093° E

        LocationManager locationManager = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);

        //Create a criteria object to retrieve provider
        Criteria criteria= new Criteria();

        //Get the name of the best provider
        String provider = locationManager.getBestProvider(criteria,true);

        //Get Current Location
        Location myLocation= null;
        try {
            //myLocation = locationManager.getLastKnownLocation(provider);
        } catch (Exception e) {
            e.printStackTrace();
        }

        //if(myLocation==null){
        //    Toast.makeText(getApplicationContext(), "myLocation is null ",
        //            Toast.LENGTH_LONG).show();
        //}

        if(myLocation!=null)
            LOCATION = new LatLng(myLocation.getLatitude(), myLocation.getLongitude());
        else
            LOCATION = MYLOCATION;


        //MarkerOptions markerOptions = new MarkerOptions().position(LOCATION).title("You are Here");

        lat = LOCATION.latitude;
        lng = LOCATION.longitude;

        //Toast.makeText(getApplicationContext(), "XLat: " + LOCATION.latitude + " XLng: " + LOCATION.longitude,
        //        Toast.LENGTH_LONG).show();

    }


}
