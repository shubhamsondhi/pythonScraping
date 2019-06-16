import rented_Rooms as rRooms
import re
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

post_parser = reqparse.RequestParser()
post_parser.add_argument('url')
kijijiUrl = re.compile(r"https://www.kijiji.ca/.*")

app = Flask(__name__)
CORS(app)
api = Api(app)

savePath ="./"
# url1="https://www.kijiji.ca/b-short-term-rental/st-catharines/page-1/c42l80016"
regex = r"(page-.)"

# items = rRooms.main(url1)
# rRooms.addInformation("Short term Room",items)


class RentedHouses(Resource):
    def post(self):
        urlObject = post_parser.parse_args()
        print(urlObject)
        url= urlObject['url']
        print(kijijiUrl.match(url))
        if kijijiUrl.match(url):
            items = rRooms.main(url)
            result = rRooms.addInformation(items)
            print("done")
            return result, 201
        else:
            return "Please enter the correct result",500


api.add_resource(RentedHouses, '/rentedHouses') # Route_1
# api.add_resource(Tracks, '/tracks') # Route_2
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
     app.run(port='5002')

     

