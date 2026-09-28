const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');
function loadEnv(){try{const f=path.join(__dirname,'.env');if(!fs.existsSync(f))return;for(const line of fs.readFileSync(f,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');}}catch{}}
loadEnv();
const crypto = require('crypto');

const dbPath = process.env.DB_PATH || path.join(__dirname, 'data', 'nexora.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer' CHECK(role IN ('customer','admin')),
  phone TEXT DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price REAL NOT NULL,
  old_price REAL DEFAULT 0,
  storage TEXT DEFAULT '',
  color TEXT DEFAULT '',
  badge TEXT DEFAULT '',
  description TEXT DEFAULT '',
  stock INTEGER NOT NULL DEFAULT 0,
  rating REAL NOT NULL DEFAULT 4.8,
  review_count INTEGER NOT NULL DEFAULT 0,
  image TEXT DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  customer_name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  city TEXT DEFAULT '',
  address TEXT DEFAULT '',
  delivery TEXT DEFAULT 'standard',
  payment TEXT DEFAULT 'cash',
  note TEXT DEFAULT '',
  subtotal REAL NOT NULL,
  discount REAL NOT NULL DEFAULT 0,
  delivery_fee REAL NOT NULL DEFAULT 0,
  total REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'მიღებულია',
  progress INTEGER NOT NULL DEFAULT 25,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY(user_id, product_id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  user_id INTEGER,
  customer_name TEXT NOT NULL,
  customer_email TEXT DEFAULT '',
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Open' CHECK(status IN ('Open','Pending','Closed')),
  priority TEXT NOT NULL DEFAULT 'Normal' CHECK(priority IN ('Low','Normal','High','Urgent')),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS ticket_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id TEXT NOT NULL,
  sender_role TEXT NOT NULL CHECK(sender_role IN ('customer','admin')),
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  user_id INTEGER,
  rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
  text TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product_variants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  sku TEXT DEFAULT '',
  price REAL NOT NULL,
  old_price REAL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS promo_codes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL DEFAULT 'percent' CHECK(type IN ('percent','fixed')),
  value REAL NOT NULL,
  max_uses INTEGER NOT NULL DEFAULT 0,
  uses_count INTEGER NOT NULL DEFAULT 0,
  expires_at TEXT DEFAULT '',
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`);

const PRODUCTS = [
  {id:1,name:'Apple iPhone 17 Pro Max',brand:'Apple',category:'iphone',price:4299,oldPrice:4599,storage:'512GB',color:'Titanium',badge:'NEW',description:'Premium iPhone with powerful performance, advanced camera system and a stunning display.',stock:8},
  {id:2,name:'Samsung Galaxy S26 Ultra',brand:'Samsung',category:'samsung',price:3799,oldPrice:4099,storage:'512GB',color:'Titanium',badge:'HOT',description:'Flagship Samsung smartphone with an advanced camera, premium display and powerful processor.',stock:6},
  {id:3,name:'Xiaomi 15 Ultra',brand:'Xiaomi',category:'xiaomi',price:2699,oldPrice:2999,storage:'512GB',color:'Black',badge:'POPULAR',description:'High-performance Xiaomi flagship with a professional camera experience.',stock:10},
  {id:4,name:'Google Pixel 10 Pro',brand:'Google',category:'google',price:2899,oldPrice:3199,storage:'256GB',color:'Obsidian',badge:'NEW',description:"Clean Android experience with Google's advanced camera and AI features.",stock:5},
  {id:5,name:'iPhone 17 Pro',brand:'Apple',category:'iphone',price:3699,oldPrice:3999,storage:'256GB',color:'Natural Titanium',badge:'NEW',description:'Compact professional iPhone with flagship performance and camera features.',stock:7},
  {id:6,name:'Samsung Galaxy S26+',brand:'Samsung',category:'samsung',price:3199,oldPrice:3499,storage:'256GB',color:'Silver',badge:'HOT',description:'Premium Samsung smartphone with a large display and flagship performance.',stock:9},
  {id:7,name:'Xiaomi 15 Pro',brand:'Xiaomi',category:'xiaomi',price:2399,oldPrice:2699,storage:'256GB',color:'Black',badge:'SALE',description:'Powerful Xiaomi smartphone with premium hardware and modern design.',stock:11},
  {id:8,name:'Google Pixel 10',brand:'Google',category:'google',price:2199,oldPrice:2399,storage:'256GB',color:'Obsidian',badge:'NEW',description:"Smooth Android smartphone with Google's camera technology.",stock:12},
  {id:9,name:'MacBook Pro 14 M5',brand:'Apple',category:'laptop',price:6499,oldPrice:6999,storage:'1TB SSD',color:'Space Black',badge:'PRO',description:'Professional 14-inch MacBook with Apple Silicon performance for work, study and creative tasks.',stock:4},
  {id:10,name:'MacBook Air 15 M4',brand:'Apple',category:'laptop',price:4299,oldPrice:4599,storage:'512GB SSD',color:'Midnight',badge:'NEW',description:'Thin and powerful 15-inch laptop with all-day battery life and a premium portable design.',stock:7},
  {id:11,name:'ASUS ROG Zephyrus G16',brand:'ASUS',category:'laptop',price:5899,oldPrice:6299,storage:'1TB SSD',color:'Eclipse Gray',badge:'GAMING',description:'High-performance gaming laptop with a fast display, powerful GPU and premium metal chassis.',stock:3},
  {id:12,name:'Lenovo Legion Pro 7',brand:'Lenovo',category:'laptop',price:6999,oldPrice:7499,storage:'1TB SSD',color:'Onyx Gray',badge:'POWER',description:'Performance-focused gaming laptop built for demanding games, content creation and multitasking.',stock:2},
  {id:13,name:'AirPods Pro 3',brand:'Apple',category:'accessories',price:899,oldPrice:999,storage:'USB-C Case',color:'White',badge:'HOT',description:'Premium wireless earbuds with adaptive audio, active noise cancellation and a compact charging case.',stock:14},
  {id:14,name:'MagSafe Charger 25W',brand:'Apple',category:'accessories',price:249,oldPrice:279,storage:'25W',color:'White',badge:'ESSENTIAL',description:'Magnetic wireless charger designed for fast and convenient everyday charging.',stock:20},
  {id:15,name:'Anker Prime Power Bank',brand:'Anker',category:'accessories',price:499,oldPrice:579,storage:'27,650mAh',color:'Black',badge:'POPULAR',description:'Large-capacity premium power bank with multiple ports for phones, tablets and laptops.',stock:12},
  {id:16,name:'USB-C 8-in-1 Pro Hub',brand:'NEXORA',category:'accessories',price:299,oldPrice:349,storage:'8 Ports',color:'Space Gray',badge:'NEW',description:'Compact 8-in-1 USB-C hub with display, storage and connectivity options for modern laptops.',stock:18}
];
function iso(){return new Date().toISOString();}
function scryptHash(password){const salt=crypto.randomBytes(16).toString('hex');const key=crypto.scryptSync(String(password), salt, 64).toString('hex');return `scrypt$${salt}$${key}`;}
function verifyPassword(password, stored){const [,salt,key]=String(stored).split('$');if(!salt||!key)return false;const actual=crypto.scryptSync(String(password),salt,64).toString('hex');const a=Buffer.from(actual,'hex'), b=Buffer.from(key,'hex');return a.length===b.length&&crypto.timingSafeEqual(a,b);}

const count = db.prepare('SELECT COUNT(*) AS c FROM products').get().c;
const insertProduct = db.prepare(`INSERT INTO products(id,name,brand,category,price,old_price,storage,color,badge,description,stock,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
db.exec('BEGIN');
try {
  for (const p of PRODUCTS) {
    if (!db.prepare('SELECT id FROM products WHERE id=?').get(p.id)) {
      insertProduct.run(p.id,p.name,p.brand,p.category,p.price,p.oldPrice,p.storage,p.color,p.badge,p.description,p.stock,iso(),iso());
    }
  }
  db.exec('COMMIT');
} catch(e) {
  db.exec('ROLLBACK');
  throw e;
}
const defaults={storeStatus:'online',currency:'GEL',supportSla:'15 min',featured:'true'};
for(const [k,v] of Object.entries(defaults)) db.prepare('INSERT OR IGNORE INTO settings(key,value) VALUES(?,?)').run(k,v);
const adminEmail=process.env.ADMIN_EMAIL||'admin@nexora.ge';const adminPassword=process.env.ADMIN_PASSWORD||'NEXORA-ADMIN-2026';
if(!db.prepare('SELECT id FROM users WHERE email=?').get(adminEmail)) {
  db.prepare("INSERT INTO users(name,email,password_hash,role,phone,created_at,updated_at) VALUES (?,?,?,'admin','',?,?)").run('NEXORA Admin',adminEmail,scryptHash(adminPassword),iso(),iso());
}

const variantCount = db.prepare('SELECT COUNT(*) AS c FROM product_variants').get().c;
if (variantCount === 0) {
  const addVariant = db.prepare('INSERT INTO product_variants(product_id,name,sku,price,old_price,stock,active,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)');
  const now = iso();
  const seeds = [
    [1,'256GB','IP17PM-256',3999,4299,4],[1,'512GB','IP17PM-512',4299,4599,8],
    [2,'256GB','S26U-256',3499,3799,5],[2,'512GB','S26U-512',3799,4099,6],
    [9,'512GB SSD','MBP14M5-512',5799,6299,3],[9,'1TB SSD','MBP14M5-1T',6499,6999,4],
    [11,'16GB / 1TB','ROG-G16-16',5899,6299,3],[12,'32GB / 1TB','LEGION7-32',6999,7499,2]
  ];
  db.exec('BEGIN');
  try { for (const v of seeds) addVariant.run(v[0],v[1],v[2],v[3],v[4],v[5],1,now,now); db.exec('COMMIT'); }
  catch(e){ db.exec('ROLLBACK'); throw e; }
}
const promoCount = db.prepare('SELECT COUNT(*) AS c FROM promo_codes').get().c;
if (promoCount === 0) {
  const now = iso();
  const addPromo = db.prepare('INSERT INTO promo_codes(code,type,value,max_uses,uses_count,expires_at,active,created_at,updated_at) VALUES (?,?,?,?,?,?,1,?,?)');
  addPromo.run('WELCOME10','percent',10,0,0,'',now,now);
  addPromo.run('NEXORA10','percent',10,0,0,'',now,now);
  addPromo.run('MOBILE15','percent',15,0,0,'',now,now);
  addPromo.run('NEXORA50','fixed',50,0,0,'',now,now);
}

module.exports={db,scryptHash,verifyPassword,iso};
