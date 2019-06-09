from bs4 import BeautifulSoup
import  urllib.request as urllib2
import re
import csv
import os
import pprint
import json

savePath ="./"
url1="https://www.kijiji.ca/b-short-term-rental/st-catharines/page-1/c42l80016"
regex = r"(page-.)"
# line = re.sub(regex, "page-"+str(1), url)

def findDate(information):
    if information.find('div',{'class',re.compile("datePosted")}) is not None:
        b=information.find('div',{'class',re.compile("datePosted")}).time is not None
    else:
        return "Not Present"       
       # print(information)
    return  information.find('div',{'class',re.compile("datePosted")}).time["title"] if b else information.find('div',{'class',re.compile("datePosted")}).span["title"]


def findPrice(information):
    # print("Showing Price")
    price=information.find('span',{'class',re.compile("currentPrice")})
    if(price is not None):
        # print(price)
        return price.text
    
    # yield [x for x in information.find('span',{'class',re.compile("currentPrice")})]
def findAddress(information):
    yield information.find('span',{'class',re.compile("address")})
def findDiscription(information):
    yield [x for x in information.find('div',{'class',re.compile("descriptionContainer")}).children]
def findImages(information):
   yield [re.findall('url\(\"(.{2,})\"\)',x['style']) for x in information.findAll('div',{'class',re.compile("backgroundImage")})]



def main(mainurl):
    items=[]   
    adds_list=[]
    reg=r"/page.*" 
    request = urllib2.urlopen(mainurl)    
    soup2 = BeautifulSoup(request, 'html.parser')
    totalAds=soup2.find('div',class_='showing').text
    preTotal=re.sub(r".* of "," ",totalAds)
    preTotal=re.sub(r" Ads.*"," ",preTotal)
    numberOfPages=round(int(preTotal)/20)
    if numberOfPages<5:
        numberOfPages=numberOfPages+1
    for n in range(1,numberOfPages+1):  
        # url='https://www.kijiji.ca/b-st-catharines/niagara-fall-room/page-'+str(n)+'/k0l80016?dc=true'
        url = re.sub(regex, "page-"+str(n), mainurl)
        print(url)
        print(n)
        response = urllib2.urlopen(url)
        soup = BeautifulSoup(response, 'html.parser')

        #getting all the links----------
        for n in soup.find_all('a',class_='enable-search-navigation-flag', href=True):
            if(n is not None):  
                adds_list.append((n.text.strip(),n['href']))
    for key, val in adds_list:
        items.append({'url':"https://www.kijiji.ca"+val})
    return items

# bnsa= main(1,2,url)
# bnsa[0]

# m = numpy.array(items)
# print (m.shape)

def addInformation(fileName,items):
    for val in items:  
        # print(val)  
        request = urllib2.urlopen(val['url'])    
        soup2 = BeautifulSoup(request, 'html.parser') 
        # print([(x[0].find('span')) for x in findPrice(soup2)])
        val['price']= findPrice(soup2)
        val['address']= [x.text for x in findAddress(soup2)][0]
        val['discription']= [x[1].text for x in findDiscription(soup2)][0]
        val['images']= [x for x in findImages(soup2)][0] 
        val['date']=findDate(soup2) 
    with open(savePath+fileName+'.csv', "w", newline='',encoding="utf-8") as csv_file: 
        writer = csv.DictWriter(csv_file, fieldnames = [n for n in val.keys()])                    
        writer.writeheader()
        for val in items:
            writer.writerows([val])

        

# len(items)
# listOfUrl=[]
# for k in items:
#     print(k["url"])
#     listOfUrl.append(k["url"])

# len(listOfUrl)
# with open('data.json', 'w') as outfile:
#     json.dump(items, outfile)


items=main(url1)

addInformation("Short term Room",items)


# print(items)
# request = urllib2.urlopen(items[0]['url'])    
# soup2 = BeautifulSoup(request, 'html.parser')
# items[0]['price']=[x[0].text for x in findPrice(soup2)][0]
# items[0]['address']= [x.text for x in findAddress(soup2)][0]
# # items[0]['discription']= [x[1].text for x in findDiscription(soup2)][0]
# items[0]['images']= [x for x in findImages(soup2)][0]
# print(items[0].keys())


#main---------------------------------------------



#--------------------------------------------------------------
# c:/Users/Administrator/Downloads/s.py
    #findValues(soup2)
    
#request = urllib2.urlopen(newUrl)
#soup2 = BeautifulSoup(request, 'html.parser')
#print(soup2.find_all('span'))



    