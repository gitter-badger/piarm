# Collection of helper functions to be used within PiArm

def env(name, default=None):
    """

    - Get specific settings from .env file

    :rtype : object
    :param name:
    :param default:
    :return: string
    """
    value = None

    # Set value to preferred default
    if default:
        value = default

    file = open('.env', 'r')
    for line in file:
        # Search for a specified setting
        if line[:line.find("=")] == name:
            value = line[line.index('=') + 1:]

    file.close()

    return value