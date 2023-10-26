from flask import request, jsonify,make_response
from flask_restx import Namespace, Resource,fields
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
from db import db
import os

from flask_jwt_extended import jwt_required,get_jwt_identity,create_access_token,create_refresh_token,get_jwt



auth= Namespace('auth', description='Authentication operations')
auth_model = auth.model('AuthModel', {
    'email': fields.String(required=True, description='Email address'),
    'password': fields.String(required=True, description='Password')
})

update_model = auth.model('UpdateModel', {
    'email': fields.String(required=True, description='Email address'),
    'old_pass': fields.String(required=True, description='Old password'),
    'new_pass': fields.String(required=True, description='New password')
})


@auth.route('/signup', methods=['POST'])
class Signup(Resource):
    @auth.expect(auth_model, validate=True)
    def post(self):
        # Parse the request data
        data = request.get_json()
        email = auth.payload['email']
        password = auth.payload['password']
        userType = data['userType']
        if userType != "volunteer":location = auth.payload['locationInput']
        else: location = "vol_location_unknown"
        date_created = datetime.datetime.utcnow()

        # Check if the user already exists
        if db.users.find_one({'email': email}):
            print(email, "user already exists")
            return {'message': 'User already exists', 'code': 409}

        # Hash the password
        hashed_password = generate_password_hash(password)
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)
        
        # Create a new user document
        user = {'email': email, 'password': hashed_password, 'location': location,  'userType': userType, "date_created": date_created}
        
        if userType == "volunteer":
            user['service_hours'] = 0
            user['rating'] = 5
        db.users.insert_one(user)

        return {'message': 'User signed up successfully', 'code':201,  "access_token": access_token, "refresh_token": refresh_token}

@auth.route('/login', methods=['POST'])
class Login(Resource):
    @auth.expect(auth_model, validate=True)
    def post(self):
        # Parse the request data
        email = auth.payload['email']
        password = auth.payload['password']
        
        # Find the user document
        user = db.users.find_one({'email': email})

        # Check if the user exists and the password is correct
        if not user or not check_password_hash(user['password'], password):
            return {'message': 'Invalid email or password', 'code':  401}

        # Generate access and refresh tokens
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        return {'message': 'Successfully Logged in.', 'userType':user['userType'],  'location': user['location'], "access_token":access_token,"refresh_token":refresh_token, 'code': 200}


@auth.route('/logout', methods=['POST'])
class Logout(Resource):
    @jwt_required()
    def post(self):
        # Add the access token to the blacklist
        jti = get_jwt()['jti']
        db.blacklisted_tokens.insert_one({'jti': jti})

        return {'message': 'Successfuly logged out.', 'code': 200}
    
    
@auth.route('/refresh', methods=['POST'])
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return {'access_token': access_token, 'message': 'Token refreshed successfully', 'code': 200}