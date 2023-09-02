CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    category TEXT,
    subCategory TEXT,
    description TEXT,
    embedding BLOB
  );
CREATE TABLE IF NOT EXISTS "vss_products_index"(rowid integer primary key autoincrement, idx);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "vss_products_data"(rowid integer primary key autoincrement, _);
CREATE VIRTUAL TABLE vss_products using vss0 (
    embedding(1536)
  );
