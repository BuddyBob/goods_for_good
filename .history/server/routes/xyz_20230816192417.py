from flask import request, jsonify,make_response
from flask_restx import Namespace, Resource,fields
from werkzeug.security import generate_password_hash, check_password_hash
from db import db

from flask_jwt_extended import jwt_required,get_jwt_identity,create_access_token,create_refresh_token,get_jwt



xyz = Namespace('xyz', description='General operations')
upload_item_model = xyz.model('UploadItem', {
    'title': fields.String(required=True, description='Title of the item'),
    'description': fields.String(required=True, description='Description of the item'),
    'location': fields.String(required=True, description='Location of the item'),
    'image': fields.String(required=True, description='Base64 encoded image data'),
})


xyz.route('/upload', methods=['POST'])
class UploadItem(Resource):
    @jwt_required()
    @xyz.doc(security='Bearer')
    @xyz.expect(upload_item_model)
    def post(self):
        current_user = get_jwt_identity()
        data = xyz.payload()

        # Extract data from payload
        title = data['title']
        description = data['description']
        location = data['location']
        image_data = data['image']
        
        update_data = {
            'title': title,
            'description': description,
            'location': location,
            'image': image_data,
        }


        donor_market = db['donor_market']
        donor_market.update_one(
            {'email': current_user},
            {
                '$addToSet': {'items': update_data},
                '$setOnInsert': {'email': current_user}  # Create user document if it doesn't exist
            },
            upsert=True  # Create the document if it doesn't exist
        )
