from flask import request, send_file
from flask_restx import Namespace, Resource, fields
from werkzeug.utils import secure_filename
from gridfs import GridFS
from db import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from io import BytesIO

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


@main.route('/get-items', methods=['GET'])
class GetItems(Resource):
    @jwt_required()
    @main.expect(upload_item_model)
    def get(self):
        current_user = get_jwt_identity()
        donor_market = db['donor_market']
        items = donor_market.find_one({'email': current_user})

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
        item_id = request.form.get('item_id')
        donor_market = db['donor_market']
        donor_market.update_one(
            {'email': current_user, 'items.image_id': ObjectId(item_id)},
            {'$set': {'items.$.status': 'needs_delivery'}}
        )
        return 'Item checked out successfully', 200