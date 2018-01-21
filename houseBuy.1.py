from bs4 import BeautifulSoup
import  urllib.request as urllib2
import re
import csv
import os
adds_list=[]
items=[]

def findDate(information):
    b=(information.find('div',{'class',re.compile("datePosted")}).time is not None)
    return  information.find('div',{'class',re.compile("datePosted")}).time["title"] if b else information.find('div',{'class',re.compile("datePosted")}).span["title"]
def findPrice(information):
    yield [x for x in information.find('span',{'class',re.compile("currentPrice")})]
def findAddress(information):
    yield information.find('span',{'class',re.compile("address")})
def findDiscription(information):
    yield [x for x in information.find('div',{'class',re.compile("descriptionContainer")}).children]
def findImages(information):
    yield [re.findall('url\(\"(.{2,})\"\)',x['style']) for x in information.findAll('div',{'class',re.compile("backgroundImage")})]
def main():
    for n in range(1,6):  
        # https://www.kijiji.ca/b-real-estate/st-catharines/houses-for-sale-niagara-falls-on/k0c34l80016?origin=rs

        # https://www.kijiji.ca/b-house-for-sale/ontario/brampton/page-18/k0c35l9004
        url='https://www.kijiji.ca/b-house-for-sale/ontario/brampton/page-'+str(n)+'/k0c35l9004'
        response = urllib2.urlopen(url)
        soup = BeautifulSoup(response, 'html.parser')
        #getting all the links----------
        for n in soup.find_all('a',attrs={'class':'enable-search-navigation-flag'}, href=True):  
            adds_list.append((n.text.strip(),n['href']))            
        for key, val in adds_list:    
            items.append({'url':'https://www.kijiji.ca'+val})
    print('Links fatched')

def info(val1):
    request = urllib2.urlopen(val1['url'])    
    soup2 = BeautifulSoup(request, 'html.parser')
    # print([(x[0].find('span')) for x in findPrice(soup2)])
    val1['price']=[x[0].text if x[0].find('span')!=-1 else 'Price not present' for x in findPrice(soup2)][0]
    val1['address']= [x.text for x in findAddress(soup2)][0]
    # # val1['discription']= [x[1].text for x in findDiscription(soup2)][0]
    val1['images']= [x for x in findImages(soup2)][0] 
    val1['date']=findDate(soup2) 
    return val1
    
def addInformation():
     # print(items) 
    with open('C:/Users/shubh/Downloads/Python Kijiji/pythonScraping/house/brampton.csv', "w", newline='') as csv_file:         
        for key,val in enumerate(items):
            val=info(val)
            if(key==0):                
                writer = csv.DictWriter(csv_file, fieldnames = [n for n in val.keys()])         
                writer.writeheader()  
            writer.writerows([val])   
                          
                        
            # writer = csv.DictWriter(csv_file, fieldnames = [n for n in info(val).keys()])         
            # writer.writeheader()          
            # writer.writerows([info(val)])  
main()
addInformation()
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



    