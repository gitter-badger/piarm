def env(name):
    value = None
    file = open('.env', 'r')

    for line in file:
        if line[:line.find("=")] == name:
            value = line[line.index('=') + 1:]

    file.close()

    return value