# PiArm Main module

from helpers.helpers import env
import sys

if env('ENVIRONMENT') == 'development':
    # Don't want .pyc files during development
    sys.dont_write_bytecode = True


def main():
    print(env('ENVIRONMENT', 'development'))


if __name__ == '__main__': main()