
# Retrieval Augmented Generation Chat AI Demo

![LambdaRAG](./public/rags-to-riches.png)

Please read the full "RAGs to Riches" blog series:<br>
https://dev.to/aws-heroes/rags-to-riches-part-1-generative-ai-retrieval-2i87-temp-slug-3736215


## Development

- Create a .env.development.local file with the following content:

```
OPENAI_API_KEY=sk...
```

## Proprietary Data


```
> npm run db:create
> lambda-rag@1.0.0 db:create
> rm -rf db/lambdarag.db && node db/create.js
Using sqlite-vss version: v0.1.1
Inserting product data...
 ██████████████████████████████████░░░░░░ 84% | ETA: 2s | 4242/5001
```

## Deploy to Lambda

* Setup `/lambda-rag/OPENAI_API_KEY` in SSM.

* Assumes deployment from a arm64 machine (Apple Silicon). If you are on an Intel machine, you need to change the `Architecture` line in the `template.yaml` file to `x86_64`.


