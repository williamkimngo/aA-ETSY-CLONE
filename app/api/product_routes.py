from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, User, Image, Review, Cart
from app.forms import ProductForm, ImageForm, ReviewForm, CartForm
from datetime import datetime
import random
from .auth_routes import validation_errors_to_error_messages
from app.s3_helpers import (
    upload_file_to_s3, allowed_file, get_unique_filename)

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


@product_routes.route("/account")
@login_required
def user_products():
  user_id = current_user.id
  products = Product.query.filter(Product.seller_id == user_id).all()

  products_result = []

  if products is not None:
    for product in products:
      product = product.to_dict()

      product_id = product["id"]
      preview_img = db.session.query(Image).filter(Image.product_id == product_id).first()
      if preview_img is not None:
        product["previewImage"] = preview_img.url

      product['price'] = str(product['price'])

      productreviews = Review.query.filter(Review.product_id == product_id).all()
      if productreviews:
        numReviews = len(productreviews)
        total_rating = 0
        for review in productreviews:
          total_rating += review.to_dict()["ratings"]
        avgRating = total_rating / numReviews
        product['avgRating'] = avgRating

      products_result.append(product)

    return jsonify({"Products": products_result}), 200

@product_routes.route("/<int:product_id>")
def product_details(product_id):
    product = Product.query.get(product_id)
    images = Image.query.filter(Image.product_id == product_id).all()
    reviews = Review.query.filter(Review.product_id == product_id).all()
    seller = ""
    if product:
        user_id = product.seller_id
        seller = User.query.get(user_id)

    if reviews:
      numReviews = len(reviews)
      total_ratings = 0
      list_of_reviewers = []
      for review in reviews:
        total_ratings += review.to_dict()["ratings"]
        list_of_reviewers.append(review.user_id)
      avgRating = total_ratings / numReviews

    else:
      numReviews = 0
      avgRating = 0
      list_of_reviewers = []

    if product:
        product_details = []
        product = product.to_dict()
        decimal_price = product["price"]
        str_price = str(round(decimal_price, 2))
        product["price"] = str_price
        product["numReviews"] = numReviews
        product["avgRating"] = avgRating
        product["salesNumber"] = random.randint(1, 1000)
        product["productImages"] = [image.url for image in images]
        product["seller"] = seller.username
        product["reviewers"] = list_of_reviewers
        product_details.append(product)

        return jsonify(product_details)
    else:
        return {"error": "Unable to find Product", "statusCode": 404}

@product_routes.route("", methods=["POST"])
# @login_required
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
  # form = ImageForm()
  # form['csrf_token'].data = request.cookies['csrf_token']
  if product is None:
    return {"errors" : "Product couldn't be found"}, 404
  if product.seller_id != current_user.id:
    return {"errors" : "You are not the seller of this product"}, 403

  image = request.files["image"]

  image.filename = get_unique_filename(image.filename)
  upload = upload_file_to_s3(image)

  if "url" not in upload:
        print("URLHITTING???")

        return upload, 400


  data = request.form
  url = upload["url"]
  new_image = Image(url=url, product_id=product.id)

  db.session.add(new_image)
  db.session.commit()
  return new_image.to_dict(), 200


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



@product_routes.route("/<int:product_id>/reviews")
def get_product_reviews(product_id):
  """
  load all the reviews of a product by product_id
  """
  product = Product.query.get(product_id)

  if product is None:
    return {"errors": "Product couldn't be found"}, 404

  filtered_reviews = Review.query.filter(Review.product_id == product_id).all()

  if filtered_reviews is not None:
    return {"Reviews": [review.to_dict()
                        for review in filtered_reviews]}, 200



@product_routes.route("/<int:product_id>/reviews", methods=["POST"])
@login_required
def create_review(product_id):
  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  product = Product.query.get(product_id)
  if product is None:
    return {"errors": "Product couldn't be found"}, 404
  if product.seller_id == current_user.id:
    return {"errors": "You can't review your own product"}, 400
  existed_reviews = Review.query.filter(Review.product_id == product_id).all()
  if existed_reviews:
    for review in existed_reviews:
      if review.user_id == current_user.id:
        return {"errors": "You have already left a review for this product"}, 400
  user_id = current_user.id
  print(user_id, "USERID")
  product_id = product_id
  print(product_id, "PRODUCTID")
  if form.validate_on_submit():
    new_review = Review(
      user_id=current_user.id,
      product_id=product_id,
      review = form.data["review"],
      ratings = form.data["rating"],
      created_at = datetime.now()
    )
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201
  else:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/<int:product_id>/cart", methods=["POST"])
@login_required
def create_cart_item(product_id):
  item = Product.query.get(product_id)
  cart = db.session.query(Cart) \
                            .filter(Cart.user_id == current_user.id) \
                            .filter(Cart.product_id == product_id) \
                            .filter(Cart.order_id == 0)\
                            .first()

  form = CartForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if not item:
    return {"errors" : "Product couldn't be found"}, 404
  if item.seller_id == current_user.id:
    return {"errors" : "You can not add your own product to cart"}, 400

  print(f"-------444BACKEND -------before form.validate_on_submit")

  if form.validate_on_submit():
    if not cart:
      data = Cart(
        user_id = current_user.id,
        product_id = product_id,
        quantity = form.data["quantity"],
        order_id = 0
      )
      db.session.add(data)
      db.session.commit()
      return data.to_dict_current(), 200
    else:
      if cart.quantity + form.data["quantity"] > cart.product.quantity:
        cart.quantity = cart.product.quantity
        print(cart.quantity, "CARTQUANT!!!!!!!!")
        cart.message = "You have reached the maximum quantity for this product."
        db.session.commit()
        return cart.to_dict_current(), 200
      else:
        cart.quantity += form.data["quantity"]
        db.session.commit()
        return cart.to_dict_current(), 200
  else:

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route("/search/<keyword>")
def search_product(keyword):
  products = Product.query.filter(Product.name.like(f"%{keyword}%")).all()
  return {
    "Products": [
      product.to_dict_search() for product in products
    ]
  }, 200
