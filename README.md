
# LambdaRAG - Demo


## Development

- Create a .env.development.local file with the following content:

```
OPENAI_API_KEY=sk...
```


## Deployment

* Setup `/lambda-rag/OPENAI_API_KEY` in SSM.

* Assumes deployment from a arm64 machine (Apple Silicon). If you are on an Intel machine, you need to change the `Architecture` line in the `template.yaml` file to `x86_64`.


