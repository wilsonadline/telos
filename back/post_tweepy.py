import tweepy
import yaml  

#current version 2 method

#Define Keys
consumer_key = 'KdW2k223cF9soo7SsQDyOzwLe'
consumer_secret = '3aTTlV8BZynfNQQSoOPEhjiNI7KXltvb27HAXTdgeXxAEvj0Gz'

# Access:
access_token  = '1779670777308041217-Gg57PIL7DNrVK08LjwYoX0mvKaTepe'
access_secret = 'QRaLQvAjsWblFzNnOGunYzf5ULXuVykeXNzqgAXmoVCOb'

client = tweepy.Client(
    consumer_key = consumer_key, consumer_secret=consumer_secret,
    access_token=access_token, access_token_secret=access_secret)

response = client.create_tweet(text = "Hello world ! ")