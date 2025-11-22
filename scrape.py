#!/usr/bin/python3
from bs4 import BeautifulSoup
import os
import requests
import datetime
from datetime import datetime, timedelta, date
import tabulate

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}

scryfall_sets = 'https://api.scryfall.com/sets'
resp = requests.get(scryfall_sets, headers=headers)
sets = BeautifulSoup(resp.text, 'html.parser')
print(sets.prettify())

