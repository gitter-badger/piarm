#!/usr/bin/env python
"""
DHT22.py 14.00 temperature and humidity to PrivateEyePi
---------------------------------------------------------------------------------
 Works conjunction with host at www.privateeyepi.com                              
 Visit projects.privateeyepi.com for full details                                 
                                                                                  
 J. Evans February 2014       
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.                                                       
                                                                                  
 Revision History                                                                  
 V1.00 - Created
 V1.01 - Fixed bug with Fahrenheit displaying as "C" not "F"    
 V9    - Rules Release
 v9.01 - Fixed bug with negative temperature readings     
 v13   - Added LCD Functionality   
 V14   - Added support for Raspberry Pi2 
-----------------------------------------------------------------------------------
"""

import time
import RPi.GPIO as GPIO
import urllib2
import subprocess
import globals
from alarmfunctionsr import UpdateHost
from alarmfunctionsr import GetDataFromHost
from alarmfunctionsr import SendToLCD
import Adafruit_DHT

global LocationDesc

#...

def GetData():
		global temp
		global humidity

		# This is the routine that interfaces with the sensor and
		# return a value that will get sent to the host and displayed  
		# on the dashboard. 

		if globals.PrintToScreen: print "Reading DHT22 sensor on pin "+str(globals.dht22_pin_no)

		#Thanks to Adafruit for the DHT22 sensor interface written in c   

		humidity, temp = Adafruit_DHT.read_retry(Adafruit_DHT.AM2302, globals.dht22_gpio)
		
		if humidity is None or temp is None:
				return(False)
		
		humidity = round(humidity,2)
		temp = round(temp,2)
				  
		if globals.PrintToScreen: print "Temperature = " + str(temp)
		if globals.PrintToScreen: print "Humidity = " + str(humidity)
		
		# Do the Farenheit conversion if required
		if globals.Farenheit:
				temp=temp*1.8+32

		return(True)

def GetLocation(number):
    
        global LocationDesc
        
        LocationDesc= ""
        
        RecordSet = GetDataFromHost(21,[0])
        if RecordSet==False:
                return 1
            
        if globals.PrintToScreen: print RecordSet
        
        numrf = len(RecordSet)
        
        for i in range(numrf):
                if RecordSet[i][0]==number:
                        LocationDesc=RecordSet[i][1]
                        if globals.PrintToScreen: print "Location Description = "+ str(LocationDesc)
            
        return 0

def fileexists(filename):
        try:
                with open(filename): pass
        except IOError:
                return False 
        return True
                                  
def NotifyHost():
        global temp
        global humidity
        global LocationDesc
        
        TempBuffer = []
        rt=GetData()
        if rt==False: #fail
                return (0)
        TempBuffer.append(temp)
        if globals.Farenheit:
                TempBuffer.append(1)
        else:
                TempBuffer.append(0)
        TempBuffer.append(globals.dht22_pin_no)
        TempBuffer.append(humidity)
        UpdateHost(14, TempBuffer)
        
        if globals.LCDTemperature==True:
                #SendToLcd receives an array of 7 values
                #RecordSet[0] : GPIO_Pin_Number
                #RecordSet[1] : Location       
                #RecordSet[2] : Display Message
                #RecordSet[3] : type 1=Switch Open, 2=Switch Closed, 3=Temperature, 4=Temperature & Humidity, 5=Free format String
                #RecordSet[4] : Tempeature Value
                #RecordSet[5] : Humidity Value
                #RecordSet[6] : Unit of measure, 0=Centigrade, 1=Fahrenheit
                #RecordSet[7] : Armed/Disarmed 1=Armed, 2=Disarmed
                #RecordSet[8] : Date/Time
                SendToLCD([globals.dht22_pin_no,LocationDesc,0,4,temp,humidity, globals.Farenheit,0,0])
        
        return (0)
                   
def main():
        global start_time
        global elapsed_time
        
        globals.init()

        # Interval in seconds that temperature is sent to the server
        start_time = time.time()
        
        GetLocation(globals.dht22_pin_no)
        
        NotifyHost()
        
        #Main Loop
        while True:
             
                elapsed_time = time.time() - start_time
                
                if (elapsed_time > 300):
                        start_time = time.time()
                        # Get the latest temperature
                        NotifyHost()
                    
                time.sleep(.2)

if __name__ == "__main__":
        main()