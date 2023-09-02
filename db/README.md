# LambdaGPT Data

Use this directory to run scripts to pull data into a local SQLite DB file. This DB file is used for both the development & production environments. In a more formal setup, this file could be generated via a CI/CD pipeline and stored container package for easy installation.

## Luxury Apparel Data

The db/Luxury_Products_Apparel_Data.csv comes from Kaggle.

https://www.kaggle.com/datasets/chitwanmanchanda/luxury-apparel-data

## The Data File

The `db/lambdagpt.db` SQLite3 DB file is committed to this repo. It is ~30MB in size. If you want to create this file yourself from scratch, you can run the following command after creating a `.env.development.local` file with the your `OPENAI_API_KEY=` set. OpenAI's API will be used to create embeddings.

```bash
./bin/setup-db
```

This setup script will perform the following tasks:

- `npm run db:create` - Create the `products` and `vss_products` tables using the Luxury data.
- `npm run db:embeddings` - Create embeddings for each product using OpenAI's API. Caches results.
- `npm run db:clean` - Removes the `embedding` shadow table and vacuums the DB to reduce size.
- `npm run db:schema` - Generates a schema file for the DB.

