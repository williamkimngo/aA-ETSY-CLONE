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
        seller_id=3,
        name="Lime Fruit T shirt, Lime Fruit Shirt, Funny Lime Fruit Tshirt, Lime Farm Tee, Citrus Fruit Shirts",
        details="Our super comfy unisex shirts are made from high quality soft cotton and polyester and are available in multiple sizes and colors to suit all styles and body shapes. Unisex size. Made from super soft cotton and polyester.",
        price="14.90",
        category='Lime',
        quantity=5
    )
    grapefruitShirt = Product(
        seller_id=4,
        name="Grapefruit Shirt, Funny Grapefruit T Shirt,Grapefruit Farmer T-shirt, Citrus Fruit Tee",
        details="Our super comfy unisex shirts are made from high quality soft cotton and polyester and are available in multiple sizes and colors to suit all styles and body shapes.",
        price="12.90",
        category="Grapefruit",
        quantity=5
    )
    grapefruitShirt2 = Product(
        seller_id=5,
        name="Pink Grapefruit Tee, Summer Tee, Cottagecore Citrus Shirt",
        details="Our super comfy unisex shirts are made from high quality soft cotton and polyester and are available in multiple sizes and colors to suit all styles and body shapes.",
        price="10.90",
        category="Grapefruit",
        quantity=9
    )
    limeShirt2 = Product(
        seller_id=1,
        name="Funny Lime Shirt | Pretend I'm A Lime | Lazy Halloween Costume Gift",
        details="This funny lazy halloween costume is perfect for men and women who are looking easy lazy last minute halloween ironic halloween costumes and are lime lovers.",
        price="27.99",
        category="Lime",
        quantity=7
    )
    orangeShirt2 = Product(
        seller_id=2,
        name="Orange Fruit Winter Knit Sweater, Female Crew Neck Pullover, Long Sleeve Jumper,",
        details="Cute retro knitted fruit sweater, very suitable for autumn and winter, soft and comfortable with moderate thickness, suitable for matching with various types of pants",
        price="28.99",
        category="Orange",
        quantity=6
    )
    lemonShirt2 = Product(
        seller_id=3,
        name="Lemons Shirt, Summer Shirt, Yellow Fruit Shirt, Funny Summer Tee, Lemon Graphic Tees",
        details="Comfortable, lemon shirt, great for the beach!",
        price="10.99",
        category="Lemon",
        quantity=9
    )
    



    db.session.add(lemonHoodie)
    db.session.add(mandarinShirt)
    db.session.add(limeShirt)
    db.session.add(grapefruitShirt)
    db.session.add(grapefruitShirt2)
    db.session.add(limeShirt2)
    db.session.add(lemonShirt2)
    db.session.add(orangeShirt2)
    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
