from flask import Flask
from flask_restful import Api, Resource, reqparse
# adds_list=[]
# items=[]
app = Flask(__name__)
api = Api(app)


class Employees(Resource):
    def get(self):
        return "Employee"

api.add_resource(Employees, '/employees') # Route_1
# api.add_resource(Tracks, '/tracks') # Route_2
# api.add_resource(Employees_Name, '/employees/<employee_id>') # Route_3


if __name__ == '__main__':
     app.run(port='5002')

     