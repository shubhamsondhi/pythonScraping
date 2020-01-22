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

#'\n    Showing 21 - 40 of 1,058 results' to int-> 1058
def stringToNumbers(totalAds):
    preTotal=re.sub(r".* of ","",totalAds)
    preTotal=re.sub(r" Ads.*","",preTotal)
    preTotal=re.sub(r"[A-Z]|[a-z]","",preTotal)
    preTotal=re.sub(",","",preTotal)
    preTotal=re.sub(r"\s","",preTotal)
    return preTotal

def GetTotalAdvertisments(mainurl):    
    request = urllib2.urlopen(mainurl)    
    soup2 = BeautifulSoup(request, 'html.parser')
    totalAds=soup2.find('div',class_='showing').text
    preTotal=stringToNumbers(totalAds)
    return preTotal


def main(mainurl):
    preTotal=GetTotalAdvertisments(mainurl)
    numberOfPages = getNumberOfPages(preTotal)
    pageUrl_list = createPageUrls(numberOfPages, mainurl)
    print(pageUrl_list)
    items = GetAdsListBYPages(pageUrl_list)
    return items

def getNumberOfPages(preTotal):
    numberOfPages=round(int(preTotal)/20)
    if numberOfPages<5:
        numberOfPages=numberOfPages+1
    return numberOfPages

def createPageUrls(numberOfPages,mainurl): 
    pageUrl_list=[] 
    for n in range(1,numberOfPages):  
        # url='https://www.kijiji.ca/b-st-catharines/niagara-fall-room/page-'+str(n)+'/k0l80016?dc=true'
        page_url = re.sub(regex, "page-"+str(n), mainurl)
        pageUrl_list.append(page_url)
    return pageUrl_list

def GetAdsListBYPages(pageUrl_list):       
    adds_list=[]
    items=[]
    response = urllib2.urlopen(pageUrl_list)
    soup = BeautifulSoup(response, 'html.parser')
    #getting all the links----------
    for ad in soup.find_all('a',class_='title', href=True):
        if(ad is not None):
            adds_list.append((ad.text.strip(),ad['href']))
    for  val in adds_list:
        items.append({'url':"https://www.kijiji.ca"+val[1]})
    return items
    
# bnsa= main(1,2,url)
# bnsa[0]

# m = numpy.array(items)
# print (m.shape)

def getInformation(items):
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
    return items

def saveCSV(fileName,items):
    with open(savePath+fileName+'.csv', "w", newline='',encoding="utf-8") as csv_file: 
        writer = csv.DictWriter(csv_file, fieldnames = [n for n in items[1].keys()])                    
        writer.writeheader()
        for val in items:
            writer.writerows([val])
        
# items = main(url1)
# na = addInformation(items)

