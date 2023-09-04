
# Retrieval Augmented Generation Chat AI Demo

![LambdaRAG](./public/rags-to-riches.png)

Please read the full "RAGs to Riches" blog series:<br>
https://dev.to/aws-heroes/rags-to-riches-part-1-generative-ai-retrieval-2i87-temp-slug-3736215


## About

This OpenAI based RAG chat application that can help you learn about AI retrieval patterns. The technologies here are beginner friendly and easy to deploy to AWS Lambda. As your needs grow, feel free to productionize this application with more robust components. What is a RAG? From [IBM Research](https://research.ibm.com/blog/retrieval-augmented-generation-RAG ):

> RAG is an AI framework for retrieving facts from an external knowledge base to ground large language models (LLMs) on the most accurate, up-to-date information and to give users insight into LLMs' generative process.

![Screenshot of the LambdaRAG Demo application.](./public/lambda-rag-start-dark.png#gh-dark-mode-only)
![Screenshot of the LambdaRAG Demo application.](./public/lambda-rag-start-dark.png#gh-light-mode-only)

## Local Development

You MUST have an OpenAI API key to run this application. You can get one for free using this [Where do I find my Secret API Key?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key) guide. Once you have your OpenAI key, create a `.env.development.local` file at the root of this project with the following, replacing `sk...` with your key:

```
OPENAI_API_KEY=sk...
```

This project supports [Development Containers](https://containers.dev) which means you can use VS Code to [open this folder in a container](https://code.visualstudio.com/docs/devcontainers/containers) and your development environment will be created for you. Run the following commands in your integrated terminal or on your local machine assuming you have Node installed.

```shell
./bin/setup
./bin/server
```

The server command will start both a front and back end development server. Use this URL to access your application. http://localhost:5173

