from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserStore(db.Model):
    __tablename__ = "user_store"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    store_name = db.Column(db.String(255), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    store_location = db.Column(db.String(255), nullable=False)

    user = db.relationship("User", back_populates="userStore")
    product = db.relationship("Product", back_populates="userStore")

    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.seller_id,
            'storeName': self.store_name,
            'productId': self.product_id,
            'storeLocation': self.store_location
        }
