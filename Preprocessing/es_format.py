import json
from os import write

input_file = open("Preprocessed_Data/preprocessed_tweets_list.json")

array = json.load(input_file)

output_file = open("tweets.json", "a")

for idx, object in enumerate(array, 1):
    output_file.write('{"index":{"_id":"' + str(idx) +'"}}\n')
    output_file.write(json.dumps(object) + '\n')