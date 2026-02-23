# Import necessary libraries for MongoDB connection, LangChain components, embeddings, and Streamlit
from pymongo import MongoClient
from langchain_classic.chains import retrieval_qa
from langchain_classic.schema import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
import streamlit as st
import certifi

# MongoDB configuration constants
MONGO_URI = st.secrets["MONGO_URI"] 
DB_NAME = "vectors_store"  # Database name for storing vectors
COLLECTION_NAME = "embeddings_stream" 
VECTORS_SEARCH_INDEX = "vector_index"  # Name of the vector search index

def get_vector_store():
    """Initialize and return the MongoDB Atlas Vector Search store with HuggingFace embeddings."""

    # print('MONGO_URI: ', MONGO_URI)

    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    # print(db)
    # print(collection)

    # embedding = GoogleGenerativeAIEmbeddings(client=client, model="model/embeddings-001")
    embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-mpnet-base-v2")
    vectors_store = MongoDBAtlasVectorSearch(
        collection=collection, 
        embedding=embedding,
        index_name=VECTORS_SEARCH_INDEX
    )
    return vectors_store


def ingest_text(text):
    """Add a text document to the vector store for future retrieval."""
    vectors_store = get_vector_store()
    doc = Document(page_content=text)
    vectors_store.add_documents([doc])


def get_rag_response(query):
    """Generate a Retrieval-Augmented Generation (RAG) response for the given query.

    Retrieves relevant documents, constructs context, and uses an LLM to generate an answer.
    """
    vectors_store = get_vector_store()
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")  # Initialize Google Generative AI LLM

    retriever = vectors_store.as_retriever(search_kwargs={"k": 3})  # Retrieve top 3 similar documents
    docs = retriever.invoke(query)  # Get relevant documents for the query

    context_text = "\n\n".join([doc.page_content for doc in docs])  # Combine document contents into context

    # Define chat prompt template with system and human messages
    prompt = ChatPromptTemplate.from_messages([
        ("system", "Use the following context to answer:\n\n{context}"),
        ("human", "{question}")
    ])

    chain = prompt | llm | StrOutputParser()  # Create LangChain pipeline: prompt -> LLM -> string output
    answer = chain.invoke({"context": context_text, "question": query})  # Generate answer
    return {
        "answer": answer,
        "sources": docs  # Return sources for transparency
    }

def get_vectors_for_visualization(query):
    """Retrieve vectors for the query and top documents for visualization purposes."""
    vector_store = get_vector_store()
    embeddings = vector_store.embeddings
    query_vector = embeddings.embed_query(query)  # Embed the query into a vector

    retriever = vector_store.as_retriever(search_kwargs={"k": 5})  # Retrieve top 5 documents
    docs = retriever.invoke(query)

    doc_data = []
    for doc in docs:
        vec = embeddings.embed_query(doc.page_content)  # Embed each document's content
        doc_data.append({
            "content": doc.page_content,
            "vector": vec,
            "type": "Document"
        })
    return {
        "query_vector": query_vector,
        "docs": doc_data
    }