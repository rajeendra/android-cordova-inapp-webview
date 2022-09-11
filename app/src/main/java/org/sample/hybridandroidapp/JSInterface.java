package org.sample.hybridandroidapp;

import android.webkit.WebView;
import android.widget.Toast;

/**
 * Created by rajeendra on 12/24/17.
 */

public class JSInterface{

    private WebView mAppView;
    public JSInterface  (WebView appView) {
        this.mAppView = appView;
    }

    public void doEchoTest(String echo){
        Toast toast = Toast.makeText(mAppView.getContext(), echo, Toast.LENGTH_SHORT);
        toast.show();
    }
}