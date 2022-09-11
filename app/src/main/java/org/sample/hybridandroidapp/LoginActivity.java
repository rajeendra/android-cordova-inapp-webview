package org.sample.hybridandroidapp;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.webkit.WebView;

/**
 * Created by rajeendra on 12/15/17.
 */

public class LoginActivity extends Activity {

    private WebView webView = null;
    private String url=null;
    private String dashboardView="login";

    private static final String TAG = "LoginActivity";

    @Override
    public void onCreate(Bundle savedInstanceState)
    {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);

        url = "file:///android_asset/www/dashboard.html";
        dashboardView="login";
        //tvLinkHome.setText(WEBVIEW_DASHBOARD_LINK);
        loadView();

    }

    private void loadView(){
        Intent intent = this.getIntent();

        this.webView = (WebView) findViewById(R.id.webview);

        WebViewClientImpl webViewClient = new WebViewClientImpl(this);
        webView.setWebViewClient(webViewClient);

        //String url = "http://d3273674.ngrok.io/Buurtmus/customerApp/returnParcel?lang=en&accessToken=9w3cN7ogRGDBr1owe9liGUZ9XVG88LYeaZRNVZ8hkjyEK9RyHbZnszbcFI3VNWiraK3Z3j6VnSXdroIZSGfluoCQ031K4pqal0HG0BgxF6s69xf2rGb8KTGGCg65rJbzxowlrYkrUYHJvo6AYue436X4n8IMMHnTWFW2BODNNeOHTlb#";
        //String url=null;
        if (url==null && intent.hasExtra("url")) {
            url = intent.getExtras().getString("url");
        }

        // Add js interfaces
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
        //webView.addJavascriptInterface(new AndroidWebviewActivity.StringGetter(), "StringGetter");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);

        webView.loadUrl(url);
        url=null;

        setResult(RESULT_OK, intent);
    }



}
