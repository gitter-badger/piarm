# GPIO module to imitate a Raspberry Pi's RPi.GPIO module.


# Got these method names from privateeyepi's alarm.py source
# Will figure out what they do one at a time.
def IN():

    return True

def setup(value):

    array = [value]

def input(value):

    array = [value]

    return array[0]

def setmode():

    print()

def BOARD():

    print()

def OUT():

    print()

def main():
    print('Runnable')
    print(input(5))

if __name__ == "__main__":main()