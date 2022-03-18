package edu.gcu.shadluiter.Second2;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;

import java.security.Permission;

public class Navigation extends AppCompatActivity {

    public static final int Default_Update_Interval = 30;
    public static final int Fast_Update_Interval = 5;

    // Any Number Works. It Accesses Permissions
    public static final int Permission_Fine_Location = 99;

    // Declares UI Variables
    TextView address, sensor, lon, lat, speed, tv_Updates;
    Switch LocUpdates, GPS;

    // Googles API for Location Services. Hub for Most Location Functionality
    FusedLocationProviderClient fusedLocationProviderClient;

    // Tells us if we are Tracking Location
    boolean updateOn = false;

    // Config File for Fused Location Provider Client (Holds Parameters and Initial Settings)
    LocationRequest locationRequest;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_navigation);

        // Connects UI Variables To Front End
        address = (TextView) findViewById(R.id.address);
        speed = (TextView) findViewById(R.id.speed);
        lon = (TextView) findViewById(R.id.lon);
        lat = (TextView) findViewById(R.id.lat);
        sensor = (TextView) findViewById(R.id.sensor);
        tv_Updates = (TextView) findViewById(R.id.tv_Updates);
        LocUpdates = (Switch) findViewById(R.id.LocUpdates);
        GPS = (Switch) findViewById(R.id.GPS);

        address.setText("Address: ");
        speed.setText("speed: ");
        lon.setText("Longitude: ");
        lat.setText("Latitude: ");
        sensor.setText("Using: Towers + Wifi");
        tv_Updates.setText("Tracking Off");
        LocUpdates.setText("Location Updates");
        GPS.setText("GPS");

        // Set All properties of Location Request

        locationRequest = LocationRequest.create()
                .setInterval(Default_Update_Interval * 1000)
                .setFastestInterval(Fast_Update_Interval * 1000)
                .setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);

        updateGPS();

    } // End On Create

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        switch (requestCode){
            case Permission_Fine_Location:
            if(grantResults[0] == PackageManager.PERMISSION_GRANTED){
                updateGPS();
            }else{
                Toast.makeText(this, "This app requires permission to be granted in order to work correctly", Toast.LENGTH_SHORT).show();
                finish();
            }
            break;
        }
    }

    public void isOn(View view) {
        if(GPS.isChecked()){
            // Most Accurate Use GPS
            locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
            sensor.setText("Using: GPS Sensor");
        }else{
            locationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);
            sensor.setText("Using: Tower + WIFI");
        }
    }

    public void updateGPS(){
        // Get Permission From User
        // Get the Current Location From Fused Client
        // Update the UI

        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(Navigation.this);

        if(ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED){
            // User Provided Permission
            fusedLocationProviderClient.getLastLocation().addOnSuccessListener(this, new OnSuccessListener<Location>() {
                @Override
                public void onSuccess(Location location) {
                    if (location != null) {
                    // We Got Permissions. Put the Values of Location On To UI.
                        UpdateUIValues(location);
                        // USING THIS LINE TO TEST
                        //lat.setText(String.valueOf(location.getLatitude()));
                    }else{
                        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                            requestPermissions(new String[]  {Manifest.permission.ACCESS_FINE_LOCATION}, Permission_Fine_Location);
                        }
                    }
                }
            });
        }else{
            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                requestPermissions(new String[]  {Manifest.permission.ACCESS_FINE_LOCATION}, Permission_Fine_Location);
            }
            // Permission Not Granted
        }
    }

    private void UpdateUIValues(Location location){
        // Update TextView Objects with a new Location

        lat.setText("Latitude: " + location.getLatitude());
        lon.setText("Longitude: " + location.getLongitude());

        if(location.hasSpeed()){
            speed.setText("Speed: " + location.getSpeed());
        }else{
            speed.setText("Not Available");
        }

    }

    public void updateLoc(View view) {
        if(LocUpdates.isChecked()){
            // Turn on Location Tracking
            startLocationUpdates();
            tv_Updates.setText("Tracking On");
        }else{
            // Turn off Location Tracking
            stopLocationUpdates();
            tv_Updates.setText("Tracking Off");
        }
    }

    private void stopLocationUpdates() {
        // TO DO
    }

    private void startLocationUpdates() {
        // TO DO
    }
}