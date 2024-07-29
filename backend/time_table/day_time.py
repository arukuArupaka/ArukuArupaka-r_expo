import re

def day_time (daytime):
    ka_daytime = []
    ka_daytime.append(re.sub(r"\D", "", daytime))
    ka_daytime.append(re.sub(r"\d", "", daytime))
    
    return ka_daytime