package org.sample.hybridandroidapp;

import android.app.Activity;
import android.os.Bundle;

/**
 * Created by rajeendra on 12/16/17.
 */

public class TestActivity extends Activity {

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
//        Bundle extras = getIntent().getExtras();
//        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
//            moveTaskToBack(true);
//        }

        setContentView(R.layout.activity_test);
    }
}
