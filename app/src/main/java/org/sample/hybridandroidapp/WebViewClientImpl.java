package org.sample.hybridandroidapp;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by rajeendra on 12/19/17.
 */

public class WebViewClientImpl extends WebViewClient {


    private Activity activity = null;

    public WebViewClientImpl(Activity activity) {
        this.activity = activity;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView webView, String url) {
        if(url.indexOf("journaldev.com") > -1 ) return false;
        if(url.indexOf("cssconf.eu") > -1 ) return false;
        if(url.indexOf("twitter.com") > -1 ) return false;

        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        activity.startActivity(intent);
        //webView.loadUrl(url); //rajeendra
        return true;
    }

    @Override
    public void onPageFinished(WebView view, String url)
    {
        //Calling an init method that tells the website, we're ready
        //loadUrl("javascript:m2Init()");
        //page1(mWebView);
    }

}
