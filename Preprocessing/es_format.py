import json
import time
from os import write

input_file = open("Preprocessed_Data/preprocessed_tweets_list.json")

array = json.load(input_file)

output_file = open("tweets.json", "a")

for idx, object in enumerate(array, 1):
    ts = time.strftime("%Y-%m-%d %H:%M:%S", time.strptime(object['created_at'],'%a %b %d %H:%M:%S +0000 %Y'))
    object['created_at'] = ts
    object['user']['created_at'] = ts
    output_file.write('{"index":{"_id":"' + str(idx) +'"}}\n')
    output_file.write(json.dumps(object) + '\n')