package edu.gcu.shadluiter.Second2;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.widget.ProgressBar;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    TextView txt_CurrentAccel, txt_prevAccell, txt_acceleration;
    ProgressBar prog_shakemeter;

    private SensorManager mSensorManager;
    private Sensor mAccelerometer;

    private double accelerationCurrentValue;
    private double previousValue;

    private SensorEventListener sensorEventListener = new SensorEventListener() {
        @Override
        public void onSensorChanged(SensorEvent sensorEvent) {
            float x = sensorEvent.values[0];
            float y = sensorEvent.values[1];
            float z = sensorEvent.values[2];

            accelerationCurrentValue = Math.sqrt((x*x+y*y+z*z));
            double changeInAccellaration = Math.abs(accelerationCurrentValue - previousValue);
            previousValue = accelerationCurrentValue;

            txt_acceleration.setText("Acceleration Change = " + (int)changeInAccellaration);
            txt_CurrentAccel.setText("Current = " + (int)accelerationCurrentValue);
            txt_prevAccell.setText("Previous = " + (int)previousValue);

            prog_shakemeter.setProgress((int)changeInAccellaration);

            if (changeInAccellaration > 14){
                txt_acceleration.setBackgroundColor(Color.RED);
            }else if (changeInAccellaration > 5) {
                txt_acceleration.setBackgroundColor(Color.parseColor("#fcad03"));
            }else if (changeInAccellaration > 5) {
                txt_acceleration.setBackgroundColor(Color.YELLOW);
            }else {
                txt_acceleration.setBackgroundColor(getResources().getColor(com.google.android.material.R.color.design_default_color_background));
            }
        }

        @Override
        public void onAccuracyChanged(Sensor sensor, int i) {

        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        txt_acceleration = findViewById(R.id.txt_accel);
        txt_CurrentAccel = findViewById(R.id.txt_currentAccel);
        txt_prevAccell = findViewById(R.id.txt_prevAccel);

        prog_shakemeter = findViewById(R.id.prog_shakeMeter);

        mSensorManager = (SensorManager)getSystemService(SENSOR_SERVICE);
        mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
    }

    protected void onResume() {
        super.onResume();
        mSensorManager.registerListener(sensorEventListener, mAccelerometer, SensorManager.SENSOR_DELAY_NORMAL);
    }

    protected void onPause() {
        super.onPause();
        mSensorManager.unregisterListener(sensorEventListener);
    }
}