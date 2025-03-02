import re
import requests
import json
import os

class LinkedinAutomate:
    def __init__(self, access_token, yt_url, title, description):
        self.access_token = access_token
        self.yt_url = yt_url
        self.title = title
        self.description = description
        self.python_group_list = [103434269]
        self.headers = {
            'Authorization': f'Bearer {self.access_token}'
        }

    def common_api_call_part(self, feed_type = "feed", group_id = None):
        payload_dict = {
            "author": f"urn:li:person:aYUwb7Fyp7",
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": self.description
                },
                "shareMediaCategory": "ARTICLE",
                "media": [
                        {
                        "status": "READY",
                        "description": {
                            "text": self.description
                        },
                        "originalUrl": self.yt_url,
                        "title": {
                            "text": self.title
                        },
                        "thumbnails": [
                                {
                                "url": self.extract_thumbnail_url_from_YT_video_url()
                                }
                            ]
                        }
                    ]
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" if feed_type == "feed" else "CONTAINER"
            }
        }
        if feed_type == "group":
            payload_dict["containerEntity"] = f"urn:li:group:{group_id}"

        return json.dumps(payload_dict)

    def extract_thumbnail_url_from_YT_video_url(self):
        exp = "^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*"
        s = re.findall(exp,self.yt_url)[0][-1]
        return  f"https://i.ytimg.com/vi/{s}/maxresdefault.jpg"

    def get_user_id(self):
        url = "https://api.linkedin.com/v2/me"
        response = requests.request("GET", url, headers=self.headers)
        jsonData = json.loads(response.text)
        if 'id' in jsonData:
            return jsonData["id"]
        else:
            print("La clé 'id' n'a pas été trouvée dans le JSON renvoyé :")
            print(jsonData)
            return None
    
    def feed_post(self):
        url = "https://api.linkedin.com/v2/ugcPosts"
        payload = self.common_api_call_part()

        return requests.request("POST", url, headers=self.headers, data=payload)
    
    def group_post(self, group_id):
        url = "https://api.linkedin.com/v2/ugcPosts"
        payload = self.common_api_call_part(feed_type = "group", group_id=group_id)
        
        return requests.request("POST", url, headers=self.headers, data=payload)


    def main_func(self):
        self.user_id = self.get_user_id()
        print(self.user_id)

        feed_post = self.feed_post()
        print(feed_post)
        for group_id in self.python_group_list:
            print(group_id)
            group_post = self.group_post(group_id)
            print(group_post)

access_token = 'AQUdNV7vtzBRlOo4XZuf262HW-0CM27R8emXXrTivdSXsQ1sencPdYBz9mwIEsfVWRw12aTM2Gf4Ejtx-dIpBhoXDIk1eNlCl6x67PBNgmIkcnVy0FU9DX8F6iCK2stzrK0NHldzU3B52SIxHjdoPke8zev_JQvmj2aeJLXHQ8SctUw2e3-dZScJBFkfM4GcKQAOmlDQkJZ2xe3g0U1EtDIAxTTsBnZ8VlIWpJRGcRQeIMPp_PI2Z8CQTOyBMThIWx1sU5zplFi57My7yweKg9jAEb8z4ogPQMhFjo2iuTmUthcOnfB8ptEnGIFplUiy12cf_ElzmqlAjSUG3AdGhv_2pyXPhA'
yt_url = "https://www.youtube.com/watch?v=Mn6gIEM33uU"
title = "Searching, Ordering in Django Rest Framework Part ss2"
description = "Are you tired of sifting through an endless sea of data to find the information you need in your Django project? Look no further! With Django filtering in Django Rest Framework, you can easily sort through your data and extract the information you need with just a few simple commands. Say goodbye to endless scrolling and manual data sorting, and say hello to increased efficiency and productivity in your Django workflow. Join the ranks of top-tier developers who have mastered this powerful tool, and start simplifying your data management today! \n #filtering #techsunami #djangofilter"

# Créer une instance de la classe LinkedinAutomate
linkedin_automate = LinkedinAutomate(access_token, yt_url, title, description)

# Appeler la méthode main_func() à partir de cette instance
linkedin_automate.main_func()
