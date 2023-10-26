from flask import request, send_file
from flask_restx import Namespace, Resource, fields
from werkzeug.utils import secure_filename
from gridfs import GridFS
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from io import BytesIO
from flask import jsonify
import json
import re 

main = Namespace('main', description='General operations')
upload_item_model = main.model('UploadItem', {
    'title': fields.String(required=True, description='Title of the item'),
    'description': fields.String(required=True, description='Description of the item'),
    'location': fields.String(required=True, description='Location of the item'),
    'image': fields.String(required=True, description='Base64 encoded image data'),
})


@main.route('/upload-item', methods=['POST'])
class UploadItem(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()

        title = request.form.get('title')
        description = request.form.get('description')
        location = request.form.get('location')
        image_file = request.files['image']

        fs = GridFS(db)
        if image_file:
            filename = secure_filename(image_file.filename)
            image_id = fs.put(image_file, filename=filename)

        update_data = {
            'title': title,
            'description': description,
            'location': location,
            'image_id': image_id,  # Store the GridFS file ID
            'owner': current_user,
            'status':'available'
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

        return 'Item uploaded successfully', 201
    
    
def dumper(obj):
    try:
        return obj.toJSON()
    except:
        return obj.__dict__
    
@main.route('/get-user', methods=['POST'])
class GetUser(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        user_collection = db['users']
        user = user_collection.find_one({'email': current_user})

        # Convert ObjectId to a string for serialization
        user['_id'] = str(user['_id'])
        user['date_created'] = str(user['date_created'])
        print(user)
        return user, 200
        

@main.route('/get-items', methods=['POST'])
class GetItems(Resource):
    @jwt_required()
    @main.expect(upload_item_model)
    def post(self):
        current_user = get_jwt_identity()
        userType  = request.json.get('request')
        print(userType)
        
        if userType == 'donor':
            donor_market = db['donor_market']
            items = donor_market.find_one({'email': current_user})
        
        if userType == 'donee':
            donee_collection = db['donee_collection']
            items = donee_collection.find_one({'email': current_user})

        if userType == 'volunteer':
            volunteer_collection = db['volunteer_collection']
            items = volunteer_collection.find_one({'email': current_user})
            
        # Extract item IDs and remove image_id from each item

        if items:
            item_ids = [str(item.pop('image_id', None)) for item in items['items']]
            return {'items': items['items'], 'item_ids': item_ids}, 200
        return 'No items found', 404
    
@main.route('/get-all-items', methods=['GET'])
class GetAllItems(Resource):
    def get(self):
        donor_market = db['donor_market'].find({})
        
        all_items_arrays = [doc.get('items', []) for doc in donor_market] 
        
        
        if all_items_arrays:
            item_ids = []
            for user in all_items_arrays:
                for item in user:
                    item_ids.append(str(item.pop('image_id', None)))

            return {'items': all_items_arrays, 'item_ids': item_ids}, 200
        return 'No items found', 404


@main.route('/get-image/<image_id>', methods=['GET'])
class GetImage(Resource):
    def get(self, image_id):
        try:
            fs = GridFS(db)
            image_data = fs.get(ObjectId(image_id)).read()
            return send_file(BytesIO(image_data), mimetype='image/jpeg')
        except Exception as e:
            return 'Image not found', 404

@main.route('/checkout', methods=['POST'])
class Checkout(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        item_id = ObjectId(request.json.get('item_id'))
        item = request.json.get('item')
        item['image_id'] = item_id
        item['status'] = 'needs_delivery'
        item['donee_location'] = item['donee_location']
        
        donor_market = db['donor_market']
        query = {
            'email': item['owner'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'needs_delivery',
                'items.$.checked_out_by': current_user,
                'items.$.donee_location': item['donee_location']
            }
        }
        
        donee_collection = db['donee_collection']
        donee_collection.update_one(
            {'email': get_jwt_identity()},
            {
                '$addToSet': {'items': item},
                '$setOnInsert': {'email': current_user}  # Create user document if it doesn't exist
            },
            upsert=True  # Create the document if it doesn't exist
        )
        
        donor_market.update_one(query, update)
        
        updated_item = donor_market.find_one(query)
        
        if updated_item:
            return 'Item checked out successfully', 200
        
        return 'Item could not be checked out', 404


@main.route('/accept-delivery', methods=['POST'])
class AcceptDelivery(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        item_id = ObjectId(request.json.get('item_id'))
        item = request.json.get('item')
        item['image_id'] = item_id
        item['status'] = 'pre_delivery'
        
        donor_market = db['donor_market']
        donor_query = {
            'email': item['owner'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'pre_delivery',
                'items.$.volunteer_delivering': current_user
            }
        }
        donor_market.update_one(donor_query, update)
        
        
        donee_collection = db['donee_collection']
        donee_query = {
            'email': item['checked_out_by'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'pre_delivery',
                'items.$.volunteer_delivering': current_user
            }
        }
        donee_collection.update_one(donee_query, update)


        volunteer_collection = db['volunteer_collection']
        volunteer_collection.update_one(
            {'email': get_jwt_identity()},
            {
                '$addToSet': {'items': item},
                '$setOnInsert': {'email': current_user}  # Create user document if it doesn't exist
            },
            upsert=True  # Create the document if it doesn't exist
        )
        
        
        updated_item = donor_market.find_one(donor_query)
        if updated_item:
            return 'Volunteered for delivery successfully', 200
        
        return 'Volunteering could not be done', 404
    
    
#volunteer is currently driving at this point
@main.route('/begin-delivery', methods=['POST'])
class AcceptDelivery(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        item_id = ObjectId(request.json.get('item_id'))
        item = request.json.get('item')
        print(item)
        item['image_id'] = item_id
        item['status'] = 'en_route'
        
        donor_market = db['donor_market']
        donor_query = {
            'email': item['owner'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'en_route',
            }
        }
        donor_market.update_one(donor_query, update)
        
        donee_market = db['donee_collection']
        donee_query = {
            'email': item['checked_out_by'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'en_route',
            }
        }
        
        donee_market.update_one(donee_query, update)
        
        volunteer_collection = db['volunteer_collection']
        volunteer_query = {
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'en_route',
            }
        }
        
        volunteer_collection.update_one(volunteer_query, update)
        
        if volunteer_collection.find_one(volunteer_query):
            return 'Delivery started successfully', 200
    
        return 'Delivery could not be started', 404
        
        
        
@main.route('/confirm-delivery', methods=['POST'])
class ConfirmDelivery(Resource):
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        
        donor_rating = request.json.get('donor_rating')["donor"]
        donee_rating = request.json.get('donee_rating')["donee"]
        
        service_hours = request.json.get('dur')
        service_hours = int(''.join(re.findall(r'\d', service_hours)))

        #convert to minutes
        service_hours = round(service_hours/60, 2)
        
        item_id = ObjectId(request.json.get('item_id'))
        item = request.json.get('item')
        
        #new confirmation image add
        confirm_image_id = request.json.get('image')

        fs = GridFS(db)
        if confirm_image:
            filename = secure_filename(confirm_image.filename)
            confirm_image_id = fs.put(confirm_image, filename=filename)

        
        #update donor rating + donor item status
        
        item['confirmation_image_id'] = confirm_image_id
        item['status'] = 'Delivered'
        
        donor_market = db['donor_market']
        donor_query = {
            'email': item['owner'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'Delivered',
            },
            '$addToSet':{
                'items.$.confirmation_image_id': confirm_image_id
            }
            
        }
        
        donor_market.update_one(donor_query, update)
        
        #update donee rating + donee item status
        
        donee_market = db['donee_collection']
        donee_query = {
            'email': item['checked_out_by'],
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'Delivered',
            },
            '$addToSet':{
                'items.$.confirmation_image_id': confirm_image_id
            }
        }
        donee_market.update_one(donee_query, update)
        
        #update volunteer item status
        
        volunteer_collection = db['volunteer_collection']
        volunteer_query = {
            'email': current_user,
            'items.image_id': item_id
        }
        
        update = {
            '$set': {
                'items.$.status': 'Delivered',
            },
            '$addToSet':{
                'items.$.confirmation_image_id': confirm_image_id
            }
        }
        volunteer_collection.update_one(volunteer_query, update)
        
        #update ratings in user
        
        user_collection = db['users']
        
        user_query = {
            'email': item['owner']
        }
        update = {
            '$addToSet':{
                'rating': donor_rating
            },
            '$inc':{
                'items_donated': 1
            }
        }
        user_collection.update_one(user_query, update)
        
        
        user_query = {
            'email': item['checked_out_by']
        }
        update = {
            '$addToSet':{
                'rating': donee_rating
            },
            '$inc':{
                'items_received': 1
            }
        }
        user_collection.update_one(user_query, update)
        
        user_query = {
            'email': current_user
        }
        
        update = {
            '$inc':{
                'service_hours': service_hours,
                'items_delivered': 1
            }
        }
        
        user_collection.update_one(user_query, update)
        
        
        
        

        
        
        