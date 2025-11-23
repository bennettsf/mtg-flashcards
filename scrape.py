#!/usr/bin/python3
from bs4 import BeautifulSoup
import requests
import json
import time
import os

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'}

def write_icon(data: str, path: str):
    with open(path, 'w') as file:
        file.write(data)

scryfall_sets = 'https://api.scryfall.com/sets'
resp = requests.get(scryfall_sets, headers=headers)
sets = json.loads(resp.text)
set_codes =[]
draftable_sets = {} 
svg_uris = {}
for mset in sets['data']:
    if mset['card_count'] > 120 and (mset['set_type'] == "expansion" or mset['set_type'] == "core"):
        set_code = mset['code']
        set_codes.append(set_code)
        draftable_sets[set_code] = mset
        svg_uris[set_code] = mset['icon_svg_uri']

for set_code in set_codes:
    url = svg_uris[set_code]
    svg = requests.get(url).text
    output_path = os.path.join("./src/set_symbols", set_code)
    output_path = output_path + ".svg"
    print(output_path)
    write_icon(svg, output_path)
    time.sleep(0.1)

#print(set_codes)
#print(svg_uris)
#print(draftable_sets) 
