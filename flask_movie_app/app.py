from flask import Flask, render_template, send_from_directory
import requests

app = Flask(__name__)

#Configuração da api

API_KEY = "07f1d90eb87e733772964f4985011ace"
BASE_URL = "https://api.themoviedb.org/3/"

#request api 

def get_json_response(endpoint, params=None):
    if params is None:
        params = {}
    params['api_key'] = API_KEY
    response = requests.get(f"{BASE_URL}{endpoint}", params=params)
    return response.json()

#rota principal

@app.route('/')
def index():
    return render_template('index.html')

#rota trending
@app.route('/api/trending')
def trending_movies():
    data = get_json_response('trending/movie/day')
    return data

#rota popular
@app.route('/api/popular')
def popular_movies():
    data = get_json_response('movie/popular', {'language': 'en-US', 'page': 1})
    return data

#rota top rated
@app.route('/api/top_rated')
def top_rated_movies():
    data = get_json_response('movie/top_rated', {'language': 'en-US', 'page': 1})
    return data

#rota search bar
@app.route('/api/search/<query>')
def search_movies(query):
    data = get_json_response(f'search/movie', {'query': query})
    return data

#rota detalhes
@app.route('/api/movie/<int:id>')
def movie_detail(id):
    data = get_json_response(f'movie/{id}', {'language': 'en-US'})
    return data

#executar app
if __name__ == '__main__':
    app.run(debug=True)
