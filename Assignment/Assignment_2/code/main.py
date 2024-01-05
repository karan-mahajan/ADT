from fastapi import FastAPI
from flask import Flask, request, jsonify
import pandas as pd
import nltk
from nltk import word_tokenize, pos_tag, ne_chunk
from nltk.chunk import tree2conlltags
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
from nltk.stem.snowball import SnowballStemmer
stemmer = SnowballStemmer("english")
nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()
 
origins = ["*"]
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
class Articles(BaseModel):
     articleIds: list = []
 
PATH_NEWS_ARTICLES = "news_articles.csv"
ALPHA = 0.5
 
# Load news articles
news_articles = pd.read_csv(PATH_NEWS_ARTICLES)
# Select relevant columns and remove rows with missing values
news_articles = news_articles[['Article_Id', 'Title', 'Content','Author']].dropna()
 
# Clean and tokenize articles
stemmer = SnowballStemmer("english")
def clean_tokenize(document):
    document = re.sub('[^\w_\s-]', ' ', document)
    tokens = nltk.word_tokenize(document)
    cleaned_article = ' '.join([stemmer.stem(item) for item in tokens])
    return cleaned_article
 
 
cleaned_articles = list(map(clean_tokenize, news_articles['Content'].tolist()))
 
tfidf_matrix = TfidfVectorizer(stop_words='english', min_df=2)
articles_tfidf_matrix = tfidf_matrix.fit_transform(cleaned_articles)
 
ARTICLES_READ=[50,60,70]
 
nltk.download('maxent_ne_chunker')
nltk.download('words')
 
def get_ner(article):
    ne_tree = ne_chunk(pos_tag(word_tokenize(article)))
    iob_tagged = tree2conlltags(ne_tree)
    ner_token = ' '.join([token for token,pos,ner_tag in iob_tagged if not ner_tag==u'O']) #Discarding tokens with 'Other' tag
    return ner_token
 
 
 
user_articles = ' '.join(cleaned_articles[i] for i in ARTICLES_READ)
user_articles_ner = ' '.join([get_ner(news_articles['Content'][i]) for i in ARTICLES_READ])
 
# Get vector representation for both user representations
user_articles_tfidf_vector = tfidf_matrix.transform([user_articles])
user_articles_ner_tfidf_vector = tfidf_matrix.transform([user_articles_ner])
 
# Combine the two vectors based on ALPHA value
alpha_tfidf_vector = ALPHA * user_articles_tfidf_vector
alpha_ner_vector = (1 - ALPHA) * user_articles_ner_tfidf_vector
user_vector = alpha_tfidf_vector + alpha_ner_vector
 
 
def calculate_cosine_similarity(articles_tfidf_matrix, user_vector,NUM_RECOMMENDED_ARTICLES):
    articles_similarity_score = cosine_similarity(articles_tfidf_matrix, user_vector.toarray())
    recommended_articles_id = articles_similarity_score.flatten().argsort()[::-1]
    final_recommended_articles_id = [article_id for article_id in recommended_articles_id
                                     if article_id not in ARTICLES_READ][:NUM_RECOMMENDED_ARTICLES]
    return final_recommended_articles_id
 
@app.get('/allarticles')
def show_all():
    # # Get recommended articles and their titles
        read_articles = news_articles.loc[news_articles['Article_Id']][['Article_Id','Title','Author']]
 
        return {"articles" : read_articles.to_dict(orient='records'),}
 
 
@app.get('/author/{article_id}')
def get_author(article_id: int = None):
    """
    Get author name based on Article_Id.
    """
    article = news_articles.loc[news_articles['Article_Id'] == article_id]
   
    if article.empty:
        return {"error": "Article not found"}
 
    author_name = article.iloc[0]['Author']
   
    return {"article_id": article_id, "author_name": author_name}
 
 
 
@app.get('/')
def home():
    return {"message":"Hello World"}
 
 
# API endpoint for recommending articles
@app.post('/recommend/{no_of_articles}')
async def recommend_articles(data: Articles,no_of_articles: int = None):
    # Assuming 'articleIds' is an array of article IDs read by the user
 
        ARTICLES_READ=data.articleIds
        NUM_RECOMMENDED_ARTICLES = 3
 
        if no_of_articles is not None:
            NUM_RECOMMENDED_ARTICLES = no_of_articles
 
        # Represent user in terms of cleaned content of read articles
        user_articles = ' '.join(cleaned_articles[i] for i in ARTICLES_READ)
 
        # Represent user in terms of NERs associated with read articles
        def get_ner(article):
            ne_tree = ne_chunk(pos_tag(word_tokenize(article)))
            iob_tagged = tree2conlltags(ne_tree)
            ner_token = ' '.join([token for token, pos, ner_tag in iob_tagged if not ner_tag == u'O'])
            return ner_token
 
        user_articles_ner = ' '.join([get_ner(news_articles['Content'][i]) for i in ARTICLES_READ])
 
        # Get vector representation for both user representations
        user_articles_tfidf_vector = tfidf_matrix.transform([user_articles])
        user_articles_ner_tfidf_vector = tfidf_matrix.transform([user_articles_ner])
 
        # Combine the two vectors based on ALPHA value
        alpha_tfidf_vector = ALPHA * user_articles_tfidf_vector
        alpha_ner_vector = (1 - ALPHA) * user_articles_ner_tfidf_vector
        user_vector = alpha_tfidf_vector + alpha_ner_vector
 
        # Calculate cosine similarity
        recommended_articles_id = calculate_cosine_similarity(articles_tfidf_matrix, user_vector,NUM_RECOMMENDED_ARTICLES)
 
        # # Get recommended articles and their titles
        recommended_articles = news_articles.loc[news_articles['Article_Id'].isin(recommended_articles_id)][['Article_Id', 'Title','Author']]
        read_articles = news_articles.loc[news_articles['Article_Id'].isin(ARTICLES_READ)][['Article_Id','Title','Author']]
 
        user_response = {
            "read_articles" : read_articles.to_dict(orient='records'),
            "recommended_articles":recommended_articles.to_dict(orient='records')
        }
 
        return user_response

