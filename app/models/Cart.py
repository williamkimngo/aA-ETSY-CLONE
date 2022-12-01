from .db import db, environment, SCHEMA, add_prefix_for_prod

class Cart(db.Model):
    __tablename__ = "cart"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    order_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


    user = db.relationship("User", back_populates="cart")
    product = db.relationship("Product", back_populates="cart")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'orderId': self.order_id,
            'quantity': self.quantity,
        }
    def to_dict_current(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'orderId': self.order_id,
            'quantity': self.quantity,
            'message': "",
            'Product': {
                "id": self.product.id,
                'name': self.product.name,
                'details': self.product.details,
                'price': self.product.price,
                'quantity': self.product.quantity,
                'category': self.product.category,
                'sellerId': self.product.seller_id,
                'previewImage': self.product.images[0].url
            }
        }
