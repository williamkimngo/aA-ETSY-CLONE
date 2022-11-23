from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Product, User
from app.forms import ProductForm
import random
from .auth_routes import validation_errors_to_error_messages

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
    products = Product.query.all()
    return {product.id: product.to_dict() for product in products}

@product_routes.route("/<int:product_id>")
def product_details(product_id):
    product = Product.query.get(product_id)
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
