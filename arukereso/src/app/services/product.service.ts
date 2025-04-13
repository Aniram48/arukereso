
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products = [
    {
      id: 1,
      name: 'Smartphone XYZ',
      description: 'High-end smartphone with advanced features',
      price: 499.99,
      image: 'assets/images/smartphone.webp',
      category: 'electrics',
      details: 'Smartphone XYZ comes with a 6.5-inch OLED display, 128GB storage, and a 12MP rear camera.'
    },
    {
      id: 2,
      name: 'Organic Apples',
      description: 'Fresh organic apples from local farms',
      price: 4.99,
      image: 'assets/images/apples.webp',
      category: 'foods',
      details: 'These apples are grown without pesticides and are rich in vitamins and antioxidants.'
    },
    {
      id: 3,
      name: 'Summer Dress',
      description: 'Light and comfortable summer dress',
      price: 39.99,
      image: 'assets/images/dress.webp',
      category: 'clothes',
      sizes: ['S', 'M', 'L', 'XL'],
      details: 'This dress is made from soft cotton fabric, perfect for the warm weather and casual outings.'
    },
    {
      id: 4,
      name: 'Harry Potter Book Set',
      description: 'Complete set of Harry Potter books',
      price: 79.99,
      image: 'assets/images/hp_bookset.jpg',
      category: 'books',
      details: 'This box set includes all seven books in the Harry Potter series, featuring exclusive cover art.'
    },
    {
      id: 5,
      name: 'Vitamin C Supplements',
      description: 'High quality Vitamin C supplements',
      price: 12.99,
      image: 'assets/images/c_vitamin.jpg',
      category: 'health',
      details: 'Boost your immune system with these potent Vitamin C supplements, each serving providing 1000mg.'
    },
    {
      id: 6,
      name: 'Cookies',
      description: 'Delicious homestyle chocolate chip cookies, freshly baked',
      price: 5.99,
      image: 'assets/images/cookies.webp',
      category: 'foods',
      details: 'Baked with love, these cookies have a perfect balance of crispy edges and chewy centers.'
    },
    {
      id: 7,
      name: 'Kettle',
      description: 'Fast heating 1.7L electric kettle with temperature control',
      price: 34.99,
      image: 'assets/images/kettle.jpg',
      category: 'electrics',
      details: 'This kettle boils water quickly and has a temperature control feature for precise boiling.'
    },
    {
      id: 8,
      name: 'Red shirt',
      description: 'Comfortable 100% cotton red t-shirt, perfect for casual wear',
      price: 19.99,
      image: 'assets/images/red-shirt.webp',
      category: 'clothes',
      sizes: ['S', 'M', 'L', 'XL'],
      details: 'Made from soft, breathable cotton, this shirt is ideal for warm weather and casual outings.'
    },
    {
      id: 9,
      name: 'Wireless Headphones',
      description: 'Noise-cancelling wireless headphones with 30 hour battery life',
      price: 129.99,
      image: 'assets/images/headphones.jpg',
      category: 'electrics',
      details: 'These headphones feature active noise cancellation, Bluetooth connectivity, and long-lasting battery life.'
    },
    {
      id: 10,
      name: 'Yoga Mat',
      description: 'Non-slip eco-friendly yoga mat with carry strap',
      price: 24.99,
      image: 'assets/images/yoga_mat.jpg',
      category: 'health',
      details: 'The mat is made from non-toxic, eco-friendly materials, providing a stable and comfortable surface for yoga.'
    },
    {
      id: 11,
      name: 'Classic Blue Jeans',
      description: 'Comfortable cotton denim jeans with classic fit',
      price: 49.99,
      image: 'assets/images/jeans.webp',
      category: 'clothes',
      sizes: ['S', 'M', 'L', 'XL'],
      details: 'These jeans are made with premium cotton denim, offering both comfort and durability for daily wear.'
    },
    {
      id: 12,
      name: 'Organic Granola',
      description: 'Natural granola with nuts, seeds and dried fruits',
      price: 7.99,
      image: 'assets/images/granola.jpg',
      category: 'foods',
      details: 'Packed with healthy nuts, seeds, and dried fruits, this granola is a perfect breakfast or snack.'
    },
    {
      id: 13,
      name: 'Moisturizing Face Cream',
      description: 'Hydrating face cream with natural ingredients for all skin types',
      price: 22.99,
      image: 'assets/images/face_cream.jpg',
      category: 'beauty',
      details: 'This face cream is enriched with aloe vera and shea butter, providing deep hydration and nourishment.'
    },
    {
      id: 14,
      name: 'Lip Balm Set',
      description: 'Set of 4 nourishing lip balms with natural ingredients',
      price: 9.99,
      image: 'assets/images/lip_balm.avif',
      category: 'beauty',
      details: 'These lip balms are made with beeswax, vitamin E, and essential oils, keeping your lips soft and smooth.'
    },
    {
      id: 15,
      name: 'Science Fiction Novel',
      description: 'Bestselling sci-fi novel about space exploration',
      price: 14.99,
      image: 'assets/images/sci_fi_book.jpg',
      category: 'books',
      details: 'A thrilling adventure set in space, exploring futuristic technology and intergalactic travel.'
    },
    {
      id: 16,
      name: 'Remote Control Car',
      description: 'High-speed RC car with rechargeable battery',
      price: 59.99,
      image: 'assets/images/rc_car.jpg',
      category: 'toys',
      details: 'This remote control car is designed for high-speed racing, featuring a rechargeable battery and durable tires.'
    },
    {
      id: 17,
      name: 'Protein Powder',
      description: 'Whey protein powder for muscle recovery and growth',
      price: 32.99,
      image: 'assets/images/protein.jpg',
      category: 'health',
      details: 'This protein powder is a great source of high-quality protein, ideal for post-workout recovery.'
    },
    {
      id: 18,
      name: 'Building Blocks Set',
      description: 'Creative building blocks set with 500 pieces',
      price: 34.99,
      image: 'assets/images/building_blocks.jpg',
      category: 'toys',
      details: 'This set includes 500 colorful building blocks, offering endless creative possibilities for children.'
    },
    {
      id: 19,
      name: 'Smink Set',
      description: 'A set of makeup tools and products for beauty enthusiasts.',
      price: 14.99,
      image: 'assets/images/smink.avif',
      category: 'beauty',
      details: 'This makeup set includes brushes, eyeshadows, lipsticks, and other essentials for creating stunning looks.'
    },
    {
      id: 20,
      name: 'Puzzle Game',
      description: 'A challenging and fun puzzle game to improve your problem-solving skills.',
      price: 19.99,
      image: 'assets/images/puzzle_game.avif',
      category: 'toys',
      details: 'This puzzle game features intricate designs that will challenge your mind and improve your problem-solving abilities.'
    },
    {
      id: 21,
      name: 'Great Adventure',
      description: 'An exciting adventure novel that takes you on a thrilling journey through mysterious lands.',
      price: 14.99,
      image: 'assets/images/great_adventure_book.jpg',
      category: 'books',
      details: 'This adventure novel offers a gripping story filled with mysterious lands, daring quests, and unexpected twists.'
    },
    {
      id: 22,
      name: 'Yoga Mat',
      description: 'The yoga ball enhances balance, flexibility, and core strength.',
      price: 29.99,
      image: 'assets/images/yoga_ball.jpg',
      category: 'health',
      details: 'This yoga ball is ideal for enhancing core strength and improving flexibility through various exercises.'
    },
  ];
  

  constructor() { }

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string) {
    return this.products.filter(product => product.category === category);
  }

  searchProducts(term: string, category?: string) {
    return this.products.filter(product => {
      const termMatch = !term.trim() || 
                      product.name.toLowerCase().includes(term.toLowerCase()) || 
                      product.description.toLowerCase().includes(term.toLowerCase());
      
      const categoryMatch = !category || product.category === category;
      
      return termMatch && categoryMatch;
    });
  }
  getRandomProducts(count: number): any[] {
    const all = this.getAllProducts(); 
    return all
      .map(value => ({ value, sort: Math.random() })) 
      .sort((a, b) => a.sort - b.sort) 
      .map(({ value }) => value)
      .slice(0, count); 
  }
 
    searchProductsWithFilters(term: string, category?: string, minPrice?: number, maxPrice?: number) {
      return this.products.filter(product => {
        const termMatch = !term.trim() || 
                        product.name.toLowerCase().includes(term.toLowerCase()) || 
                        product.description.toLowerCase().includes(term.toLowerCase());
        
        const categoryMatch = !category || product.category === category;
        
        const priceMatch = (!minPrice || product.price >= minPrice) && 
                           (!maxPrice || product.price <= maxPrice);
        
        return termMatch && categoryMatch && priceMatch;
      });
    }
}