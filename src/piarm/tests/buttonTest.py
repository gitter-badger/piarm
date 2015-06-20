# Really simple test

# To run: 
# sudo python buttonTest.py

import RPi.GPIO as GPIO


GPIO.setmode(GPIO.BOARD) 
GPIO.setup(3, GPIO.IN)

while True:
	if (GPIO.input(3) == 1):
		print "True"
	else:
		print "False"