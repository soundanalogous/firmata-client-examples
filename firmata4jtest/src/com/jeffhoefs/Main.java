package com.jeffhoefs;

import org.firmata4j.IODevice;
import org.firmata4j.firmata.FirmataDevice;
import org.firmata4j.Pin;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
        final IODevice device = new FirmataDevice("/dev/cu.usbmodem14231");
        try {
            device.start();
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
        try {
            device.ensureInitializationIsDone();
        } catch (InterruptedException e) {
            e.printStackTrace();
            System.exit(1);
        }

        Pin pinA = device.getPin(8);
        Pin pinB = device.getPin(9);

        try {
            pinA.setValue(1);
            pinB.setValue(1);
            try {
                // keep LEDs on for 4 seconds
                Thread.sleep(4000);
            } catch (InterruptedException ex) {
                throw new RuntimeException(ex);
            }
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }

        try {
            device.stop();
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }
}
