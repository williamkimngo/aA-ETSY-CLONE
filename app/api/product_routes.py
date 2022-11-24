from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, User, Image
from app.forms import ProductForm, ImageForm
import random
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    products = Product.query.all()
    products_result = []

    if products is not None:
        for product in products:
            product = product.to_dict()

            product_id = product["id"]
            preview_img = db.session.query(Image).filter(Image.product_id == product_id).first()
            if preview_img is not None:
                product["previewImage"] = preview_img.url

            product['price'] = str(product['price'])

            products_result.append(product)
            
            print(products_result, "RESULT????????!@!#!@#!@!@#??")
    return jsonify({"Products": products_result}), 200


@product_routes.route("/<int:product_id>")
def product_details(product_id):
    product = Product.query.get(product_id)
    images = Image.query.filter(Image.product_id == product_id).all()
    seller = ""
    if product:
        user_id = product.seller_id
        seller = User.query.get(user_id)

    if product:
        product_details = []
        product = product.to_dict()
        decimal_price = product["price"]
        str_price = str(round(decimal_price, 2))
        product["price"] = str_price
        product["productImages"] = [image.url for image in images]
        product["seller"] = seller.username
        product_details.append(product)

        return jsonify(product_details)
    else:
        return {"error": "Unable to find Product", "statusCode": 404}

@product_routes.route("", methods=["POST"])
@login_required
def create_product():
    """
    This will allowed logged in user to create a new product
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = Product(
            seller_id=current_user.id,
            name=form.data['name'],
            details=form.data['details'],
            category=form.data['category'],
            price=form.data["price"],
            quantity=form.data["quantity"]
        )

        db.session.add(data)
        db.session.commit()

        return data.to_dict(), 201
    else:
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route("/<int:product_id>/images", methods=["POST"])
@login_required
def add_product_image(product_id):
  """
  Add image to product when creating a product
  """
  product = Product.query.get(product_id)
  form = ImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if product is None:
    return {"errors" : "Product couldn't be found"}, 404
  if product.seller_id != current_user.id:
    return {"errors" : "You are not the seller of this product"}, 403
  if form.validate_on_submit():
    new_image = Image(
      url=form.data["url"],
      product_id = product_id
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict(), 200
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@product_routes.route("/<int:product_id>", methods=["PUT"])
@login_required
def update_product(product_id):
    """
    This will allow logged in users to edit their products
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    product_edit = Product.query.get(product_id)
    if product_edit.seller_id != current_user.id:
      return {"errors" : "You are not the seller of this product"}, 403
    if form.validate_on_submit():
      product_edit = Product.query.get(product_id)

      product_edit.name = form.data['name']
      product_edit.details = form.data['details']
      product_edit.category = form.data['category']
      product_edit.price = form.data['price']
      product_edit.quantity = form.data['quantity']

      db.session.commit()
      return product_edit.to_dict_search(), 200
    else:
      return {"errors" : validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:product_id>", methods=["DELETE"])
@login_required
def delete_product(product_id):
  product = Product.query.get(product_id)

  if product.seller_id == current_user.id:
    db.session.delete(product)
    db.session.commit()

    return {"message": "Successfully deleted"}
