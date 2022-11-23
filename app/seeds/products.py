from app.models import db, Product, environment, SCHEMA

def seed_products():
    lemonHoodie = Product(
        seller_id=1,
        name="Squeeze The Day Hoodie, Tired Day Sweatshirt, Cute Lemon Hoodie, Motivational Sweater, Lemon Humor Hoodie",
        details="Hoodie with lemon design. Very comfortable, great for all weather and styles.",
        price=20.29,
        category="Lemon",
        quantity=3
    )
    mandarinShirt = Product(
        seller_id=2,
        name="Mandarin Fruit Tshirt, Mandarin Farmer T-shirt, Womens Mandarin Shirt, Mandarin Orange T Shirt",
        details="Our super comfy unisex shirts are made from high quality soft cotton and polyester and are available in multiple sizes and colors to suit all styles and body shapes. Whether it be for a birthday party, graduation gift, mother's or father's day, we surely will have something you will love for any occasion.",
        price=13.90,
        category='Orange',
        quantity=2
    )
    limeShirt = Product(
        seller_id=5,
        name="Lime Fruit T shirt, Lime Fruit Shirt, Funny Lime Fruit Tshirt, Lime Farm Tee, Citrus Fruit Shirts",
        details="Our super comfy unisex shirts are made from high quality soft cotton and polyester and are available in multiple sizes and colors to suit all styles and body shapes. Unisex size. Made from super soft cotton and polyester.",
        price="14.90",
        category='lime',
        quantity=5
    )

    db.session.add(lemonHoodie)
    db.session.add(mandarinShirt)
    db.session.add(limeShirt)
    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
