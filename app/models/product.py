from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    details = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    user = db.relationship("User", back_populates="products")
    images = db.relationship("Image", back_populates="product", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.seller_id,
            'name': self.name,
            'details': self.details,
            'price': self.price,
            'category': self.category,
            'quantity': self.quantity
        }
