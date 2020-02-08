import rented_Rooms as rRooms
import re
from flask import Flask,jsonify , json, request, redirect
# from jwt import decode, exceptions
from flask_cors import CORS

# post_parser = reqparse.RequestParser()
# post_parser.add_argument('url')
kijijiUrl = re.compile(r"https://www.kijiji.ca/.*")

app = Flask(__name__ )
CORS(app)
# api = Api(app)

savePath ="./"
# url1="https://www.kijiji.ca/b-short-term-rental/st-catharines/page-1/c42l80016"
regex = r"(page-.)"

# items = rRooms.main(url1)
# rRooms.addInformation("Short term Room",items)

# @app.route('/')
# def root():
#     return redirect("index.html")

@app.route('/rentedHouses', methods=['POST'])
def rentedHouses():
    urlObject = json.loads(request.data.decode())
    print(urlObject)
    url= urlObject['url']
    print(kijijiUrl.match(url))
    if kijijiUrl.match(url):
        items = rRooms.main(url)
        result = rRooms.getInformation(items)
        print("done")
        return jsonify(result),201
    else:
        return "Please enter the correct result",500

@app.route('/getTotalPages', methods=['POST'])
def getNumberPages():
    urlObject = json.loads(request.data.decode())
    # print(urlObject)
    url= urlObject['url']
    if kijijiUrl.match(url):
        pages={}  
        url = rRooms.getCorrectUrl(url)
        pages["totalAds"] = rRooms.GetTotalNumbersOfPages(url)
        pages["totalPages"] = rRooms.convertStringToInt(pages["totalAds"])
        pages["listOfpageUrls"] =rRooms.createPageUrls(pages["totalPages"],url)

        # result = rRooms.getInformation(totalPages)
        print("done")
        return jsonify(pages),201
    else:
        return "Please enter the correct result",500

@app.route('/getItemsInfoByPage', methods=['POST'])
def getItemsInfoByPage():
    urlObject = json.loads(request.data.decode())
    print(urlObject)
    url= urlObject['url']
    print(kijijiUrl.match(url))
    if kijijiUrl.match(url):
        items = rRooms.GetAdsListBYPages(url)
        result = rRooms.getInformation(items)
        print("done")
        return jsonify(result),201
    else:
        return "Please enter the correct result",500

@app.route('/getCategories', methods=['GET'])
def getCategories():
    result=rRooms.getCategories()
    print(result)
    return result,201

@app.route('/getCategories', methods=['POST'])
def getCategoryByID():
    value = json.loads(request.data.decode())
    result = rRooms.getCategoriesById(value['categoryId'])
    print(result)
    return result,201

# api.add_resource(RentedHouses, '/rentedHouses') # Route_1
# api.add_resource(Tracks, '/tracks') # Route_2
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
     app.run(port='5000')
