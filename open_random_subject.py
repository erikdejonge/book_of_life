import os
import random
ilist = [x for x in os.listdir("httrack/www.thebookoflife.org") if 'index' in x and not x=='index.html']
ri = random.randint(0, len(ilist)+1)
os.system('open ./httrack/www.thebookoflife.org/'+ilist[ri])
