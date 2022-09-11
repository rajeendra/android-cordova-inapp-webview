package org.sample.hybridandroidapp;

import android.content.Context;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

/*
*  ~~ For reference: Contact RAW data and curl RAW api calls ~~

    // type: 1/0-default/non, ow-own/work, ml-mobile/land, fx-fax/non-fax
    // cpse: Company, Place, Service, Event

    {
        \"fname\": \"firstA\",
        \"lname\": \"lastA\",
        \"cpse\": \"\",
        \"active\": \"Y\",
        \"numbers\":
            [
              { \"id\" : \"0\", \"number\" : \"1198218212\", \"type\" : \"1omx\" },
              { \"id\" : \"1\", \"number\" : \"1172875475\", \"type\" : \"0omx\" },
              { \"id\" : \"2\", \"number\" : \"1159454985\", \"type\" : \"omx\" }
            ]
      }

    // find contacts

    curl --request POST \
    'https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/find' \
    --header 'Content-Type: application/json' \
    --header 'api-key: <API-KEY>' \
    --data-raw '{
      "dataSource": "Cluster0",
      "database": "home",
      "collection": "contacts",
      "sort": { "fname": 1 },
      "limit": 10
    }'

    response: {"documents":[..]}

    // insertOne contact

    curl --request POST \
    'https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/insertOne' \
    --header 'Content-Type: application/json' \
    --header 'api-key: <API-KEY>' \
    --data-raw '{
      "dataSource": "Cluster0",
      "database": "home",
      "collection": "contacts",
      "document": {
        "fname": "fnameC",
        "lname": "lnameC",
        "cpse": "Company ABC",
        "active": "Y",
        "numbers": [
          {"id" : "0", "number" : "1398218212", "type" : "1omx" },
          {"id" : "1", "number" : "1372875475", "type" : "0omx" },
          {"id" : "2", "number" : "1359454985", "type" : "0omx" }
        ]
      }
    }'

    response: {"insertedId":"6318e79f5408b4e240bf64ff"}

    // updateOne contact by _id
       Note: existing fields will be update, new fields get added, collections fields will be replaced

     curl --request POST \
    'https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/updateOne' \
    --header 'Content-Type: application/json' \
    --header 'api-key: <API-KEY>' \
    --data-raw '{
      "dataSource": "Cluster0",
      "database": "home",
      "collection": "contacts",
      "filter": { "_id": { "$oid": "6319799d8201e9f325c821bd" } },
      "update": {
          "$set": {
              "fname": "fnameD",
              "lname": "lnameD-X",
              "cpse": "Company XYZ-X1",
              "active": "Y",
              "city": "Colombo",
              "numbers": [
                {"id" : "4", "number" : "1778218212", "type" : "1omx" },
                {"id" : "3", "number" : "1779454985", "type" : "0omx" }
              ]
          }
      }
    }'

    response : {"matchedCount":1,"modifiedCount":1}

    // findOne contact by _id

    curl --request POST \
    'https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/findOne' \
    --header 'Content-Type: application/json' \
    --header 'api-key: <API-KEY>' \
    --data-raw '{
      "dataSource": "Cluster0",
      "database": "home",
      "collection": "contacts",
      "filter": { "_id": { "$oid": "63197901b5e39c9ed0da01e1" } }
    }'

    response:
    {"document":{"_id":"63197901b5e39c9ed0da01e1","fname":"fnameB","lname":"lnameB","cpse":"Service",
    "numbers":[{"id":"0","number":"1298218212","type":"1omx"},
    {"id":"1","number":"1272875475","type":"0omx"},
    {"id":"2","number":"1259454985","type":"0omx"}]}}

*
* */

public class MongodbService {
    Context mContext;
    SharedPreferences sharedPref = null ;
    SharedPreferences.Editor editor = null;

    MongodbService(Context c) {
        mContext = c;
        // Load SharedPreferences
        sharedPref = mContext.getSharedPreferences(
                mContext.getString(R.string.preference_file_key), Context.MODE_PRIVATE);
        editor =sharedPref.edit();

    }

    public void saveApiKey(String api_key){
        // store token at SharedPreferences
        if ((api_key != null && !api_key.isEmpty()) ){
            editor.putString(ApplicationConstants.MONGODB_API_KEY , api_key);
            editor.commit();
            //binding.txtToken.setHint("<API-KEY> already saved. or Save a new");
        }
    }

    public String getApiKey(){
        String token = sharedPref.getString(ApplicationConstants.MONGODB_API_KEY, null);
        return  token;
    }

    public boolean isApiKeySaved(){
        boolean tokenSaved = false;
        String token = sharedPref.getString(ApplicationConstants.MONGODB_API_KEY, null);
        if ((token != null && !token.isEmpty()) ){
            tokenSaved = true;
        }
        return tokenSaved;
    }

    public String insertOneContact(String contact) {

        String sResponse=null;

        //Find url
        String mongodb_URL = "https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/insertOne";

        String mongodb_API_KEY = "<API-KEY>";

        String token = getApiKey();
        if ((token != null && !token.isEmpty())) {
            mongodb_API_KEY = token;
        }

        try {
            URL url = new URL(mongodb_URL);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("api-key", mongodb_API_KEY);
            String data = "{ \"dataSource\": \"" + ApplicationConstants.MONGODB_DATASOURCE
                    + "\", \"database\": \"" + ApplicationConstants.MONGODB_DATABASE
                    + "\", \"collection\": \"" + ApplicationConstants.MONGODB_COLLECTION_CONTACTS
                    + "\", \"document\": "  +  contact + " }";

            byte[] out = data.getBytes(StandardCharsets.UTF_8);

            OutputStream outStream = http.getOutputStream();
            outStream.write(out); // Server call
            outStream.close();

            // Read response
            int status = http.getResponseCode();
            InputStreamReader inputStreamReader = new InputStreamReader(http.getInputStream());

            // Read response
            BufferedReader br = new BufferedReader(inputStreamReader);
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            /*
            response:
            {
            "document":
                    {
                    "_id":"63197901b5e39c9ed0da01e1",
                    "fname":"fnameB",
                    "lname":"lnameB",
                    "cpse":"Service",
                    "numbers":[{"id":"0","number":"1298218212","type":"1omx"},
                              {"id":"1","number":"1272875475","type":"0omx"},
                              {"id":"2","number":"1259454985","type":"0omx"}]
                    }
            }
            * */
            sResponse = response.toString();
            http.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return sResponse;
    }

    public String updateOneContact(String _id, String contact) {
        String sResponse=null;

        //Find url
        String mongodb_URL = "https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/updateOne";

        String mongodb_API_KEY = "<API-KEY>";

        String token = getApiKey();
        if ((token != null && !token.isEmpty())) {
            mongodb_API_KEY = token;
        }

        try {
            URL url = new URL(mongodb_URL);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("api-key", mongodb_API_KEY);
            String data = "{ \"dataSource\": \"" + ApplicationConstants.MONGODB_DATASOURCE
                    + "\", \"database\": \"" + ApplicationConstants.MONGODB_DATABASE
                    + "\", \"collection\": \"" + ApplicationConstants.MONGODB_COLLECTION_CONTACTS
                    + "\", \"filter\": { \"_id\": { \"$oid\": \""+ _id + "\" } }, "
                    + "\"update\": { \"$set\": "  +  contact + " } }";

            byte[] out = data.getBytes(StandardCharsets.UTF_8);

            OutputStream outStream = http.getOutputStream();
            outStream.write(out); // Server call
            outStream.close();

            // Read response
            int status = http.getResponseCode();
            InputStreamReader inputStreamReader = new InputStreamReader(http.getInputStream());

            // Read response
            BufferedReader br = new BufferedReader(inputStreamReader);
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            /*
            response:
            {
            "document":
                    {
                    "_id":"63197901b5e39c9ed0da01e1",
                    "fname":"fnameB",
                    "lname":"lnameB",
                    "cpse":"Service",
                    "numbers":[{"id":"0","number":"1298218212","type":"1omx"},
                              {"id":"1","number":"1272875475","type":"0omx"},
                              {"id":"2","number":"1259454985","type":"0omx"}]
                    }
            }
            * */
            sResponse = response.toString();
            http.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return sResponse;
    }

    public String getOneContact(String _id) {
        String sResponse=null;

        //Find url
        String mongodb_URL = "https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/findOne";

        String mongodb_API_KEY = "<API-KEY>";

        String token = getApiKey();
        if ((token != null && !token.isEmpty())) {
            mongodb_API_KEY = token;
        }

        try {
            URL url = new URL(mongodb_URL);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("api-key", mongodb_API_KEY);
            String data = "{ \"dataSource\": \"" + ApplicationConstants.MONGODB_DATASOURCE
                    + "\", \"database\": \"" + ApplicationConstants.MONGODB_DATABASE
                    + "\", \"collection\": \"" + ApplicationConstants.MONGODB_COLLECTION_CONTACTS
                    + "\", \"filter\": { \"_id\": { \"$oid\": \""+ _id + "\" } } }";

            byte[] out = data.getBytes(StandardCharsets.UTF_8);

            OutputStream outStream = http.getOutputStream();
            outStream.write(out); // Server call
            outStream.close();

            // Read response
            int status = http.getResponseCode();
            InputStreamReader inputStreamReader = new InputStreamReader(http.getInputStream());

            // Read response
            BufferedReader br = new BufferedReader(inputStreamReader);
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();
            /*
            response:
            {
            "document":
                    {
                    "_id":"63197901b5e39c9ed0da01e1",
                    "fname":"fnameB",
                    "lname":"lnameB",
                    "cpse":"Service",
                    "numbers":[{"id":"0","number":"1298218212","type":"1omx"},
                              {"id":"1","number":"1272875475","type":"0omx"},
                              {"id":"2","number":"1259454985","type":"0omx"}]
                    }
            }
            * */
            sResponse = response.toString();
            http.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            JSONObject jsonObject = new JSONObject(sResponse);
            //JSONArray jsonArray = (JSONArray)jsonObject.get("documents");
            JSONObject document = (JSONObject)jsonObject.get("document");

            sResponse = document.toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return sResponse;
    }

    public String getContacts(String payLoad) {
        //Find url
        String mongodb_URL = "https://data.mongodb-api.com/app/data-deltp/endpoint/data/v1/action/find";

        String mongodb_API_KEY = "<API-KEY>";

        String token = getApiKey();
        if ((token != null && !token.isEmpty())) {
            mongodb_API_KEY = token;
        }

        String sResponse=null;

        try {
            URL url = new URL(mongodb_URL);
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("api-key", mongodb_API_KEY);

            String data = "{ \"dataSource\": \"" + ApplicationConstants.MONGODB_DATASOURCE
                    + "\", \"database\": \"" + ApplicationConstants.MONGODB_DATABASE
                    + "\", \"collection\": \"" + ApplicationConstants.MONGODB_COLLECTION_CONTACTS + "\" }";
            byte[] out = data.getBytes(StandardCharsets.UTF_8);

            OutputStream outStream = http.getOutputStream();
            outStream.write(out); // Server call
            outStream.close();

            // Read response
            int status = http.getResponseCode();
            InputStreamReader inputStreamReader = new InputStreamReader(http.getInputStream());

            // Read response
            BufferedReader br = new BufferedReader(inputStreamReader);
            StringBuilder response = new StringBuilder();
            String inputLine;
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            sResponse = response.toString();
            http.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            JSONObject jsonObject = new JSONObject(sResponse);
            JSONArray jsonArray = (JSONArray)jsonObject.get("documents");
            sResponse = jsonArray.toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return sResponse;
    }
}