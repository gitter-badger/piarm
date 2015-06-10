# PiArm Main module

from helpers.helpers import env

def main():

    print(env('ENVIRONMENT'))

if __name__ == '__main__':main()