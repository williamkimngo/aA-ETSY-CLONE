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
    orangeAccessory1 = Product(
        seller_id=4,
        name="Mandarin bag charm from polymer clay Orange fruit keychain Cute citrus charms",
        details="🍊 Mandarin with leaves from polymer clay. 🍊 One product consists of 3 or 5 mandarins and 2 green leaves.",
        price="17.00",
        category="Orange",
        quantity=10
    )
    orangeAccessory10 = Product(
        seller_id=5,
        name="By the Shed Orange Fruit Keyring - Vegetable - Fruit - Sunshine, OJ, Orange Juice - Garden Gift - Quirky - Summer Citrus - Key Chain, Charm",
        details="Handcrafted bead made from polymer clay glossed with a clear varnish, inspired by thoughts of the good life and attached to an antique bronze key chain. Add a hint of summer to your keys with this Orange Keyring!",
        price="11.50",
        category="Orange",
        quantity=10
    )
    lemoncup11 = Product(
        seller_id=1,
        name="Lemon Mug I Just Really Love Lemons, Okay? Lemon Lover Mug Funny Lemon Gift Love Lemon Decor Art Funny Food Pun Mug Cute Lemon Gift",
        details="Add a little pop of color to your morning routine with this stylish accent mug. Made with a premium hard coat that provides crisp and vibrant color reproduction, this mug is sure to look sharp in your hands for years.",
        price="15.00",
        category="Lemon",
        quantity=10
    )
    lemonplush12 = Product(
        seller_id=2,
        name="Lemon, Crochet Lemon, Lemon Plush, Play Food, Kawaii, Sour Lemon, Amigurumi, Handmade, Crochet, Lemonade Squad, Lemon Decor, Fruit Plush",
        details="Meet the lemons: one is agreeable, but the other is a total skeptic. Which one will you choose? Or both? These small plushies are 3.5 inches long by 2.5 inches tall and finished off with a leaf ",
        price="10.00",
        category="Lemon",
        quantity=10
    )
    limechain13 = Product(
        seller_id=3,
        name="By the Shed Lime Keyring - Green - Vegetable - Fruit - Allotment - Gardening - Garden Gift - Quirky - Summer Citrus - Key Chain, Charm",
        details="Add a hint of summer to your keys with this Lime Keyring! ",
        price="11.52",
        category="Lime",
        quantity=10
    )
    limeearring14 = Product(
        seller_id=4,
        name="Lime earrings, glass Lime drop earrings, food earrings, fruit earrings",
        details="glass Lime drop earrings with cute white flower and green leaf",
        price="15.80",
        category="Lime",
        quantity=10
    )
    grapefruitsoap15 = Product(
        seller_id=5,
        name="Grapefruit Bar Soap, natural skincare",
        details="Made without harmful ingredients so that your skin gets the tlc that it deserves. Best when paired with our grapefruit glow body butter and Turmeric body polish.",
        price="4.80",
        category="Grapefruit",
        quantity=10
    )
    grapefruitpic16 = Product(
        seller_id=1,
        name="Grapefruit Still Life Print | Colorful Fruit Painting | Vintage Midcentury Modern Decor | Kitchen Wall Art | Citrus Poster",
        details="This high-quality fine art giclee print captures textures and detail. Museum-quality posters made on thick and durable matte paper.",
        price="25",
        category="Grapefruit",
        quantity=10
    )








    db.session.add(lemonHoodie)
    db.session.add(mandarinShirt)
    db.session.add(limeShirt)
    db.session.add(grapefruitShirt)
    db.session.add(grapefruitShirt2)
    db.session.add(limeShirt2)
    db.session.add(lemonShirt2)
    db.session.add(orangeShirt2)

    db.session.add(orangeAccessory1)
    db.session.add(orangeAccessory10)
    db.session.add(lemoncup11)
    db.session.add(lemonplush12)
    db.session.add(limechain13)
    db.session.add(limeearring14)
    db.session.add(grapefruitsoap15)
    db.session.add(grapefruitpic16)
    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
    db.session.commit()
