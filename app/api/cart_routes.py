from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Cart, db, Product
from app.forms import CartForm
from app.api.auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)


@cart_routes.route("/account")
@login_required
def get_my_cart_items():
  """
  logged in user can view items in their cart (that has not been checked out before (aka current order_id == 0)
  """
  user_id = current_user.id
  Carts = Cart.query.filter(Cart.user_id == user_id).filter(Cart.order_id == 0).all()
  return {
      "Carts":[
        Cart.to_dict_current() for Cart in Carts
      ]
    }, 200


@cart_routes.route("/checkout", methods=["DELETE"])
@login_required
def checkout_cart_items():
    """
    Logged in users can checkout items into cart, if item is duplicate, it will add quantity
    """

    cart_items = Cart.query.filter(Cart.user_id == current_user.id).filter(Cart.order_id == 0).join(Product).all() #<<<<<<<<

    out_of_stock_message = []
    for cart_item in cart_items:
      if cart_item.product.quantity < cart_item.quantity:
        out_of_stock_message.append(f"not enough stock for product: {cart_item.product.name}")
    if len(out_of_stock_message):
      return {"errors": out_of_stock_message}, 400

    purchased = []
    for cart_item in cart_items:
      purchased.append({
        "product_id": cart_item.product.id,
        "quantity": cart_item.quantity,
        "name": cart_item.product.name,
      })
      cart_item.order_id = 1
      cart_item.product.quantity -= cart_item.quantity
      db.session.commit()
    return {"message": f"these items have been purchased: {purchased}",}, 200


@cart_routes.route("/<int:cart_item_id>", methods=["PUT"])
@login_required
def edit_cart_item(cart_item_id):
  item = Cart.query.get(cart_item_id)
  form = CartForm()
  print(item, "ROUTESITEM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  form["csrf_token"].data = request.cookies["csrf_token"]

  if item is None:
    return {"errors" : "Cart item couldn't be found"}, 404

  if form.validate_on_submit():
    item.quantity = form.data["quantity"]
    item.order_id = 0
    db.session.commit()
    return item.to_dict_current(), 200
  else:
      return {"errors" : validation_errors_to_error_messages(form.errors)}, 400


@cart_routes.route("/<int:cart_item_id>", methods=["DELETE"])
@login_required
def delete_cart_item(cart_item_id):
  item = Cart.query.get(cart_item_id)
  if not item:
    return {"errors": "Cart Item couldn't be found"}, 404
  if item.user_id == current_user.id:
    db.session.delete(item)
    db.session.commit()
    return {"message" : "Item in cart successfully deleted!"}, 200
  else:
    return {"errors" : " You are not the owner of this cart-item"}, 400
