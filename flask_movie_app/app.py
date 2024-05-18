from flask import Flask, render_template, send_from_directory
import requests

app = Flask(__name__)

API_KEY = "07f1d90eb87e733772964f4985011ace"
BASE_URL = "https://api.themoviedb.org/3/"

def get_json_response(endpoint, params=None):
    if params is None:
        params = {}
    params['api_key'] = API_KEY
    response = requests.get(f"{BASE_URL}{endpoint}", params=params)
    return response.json()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/trending')
def trending_movies():
    data = get_json_response('trending/movie/day')
    return data

@app.route('/api/popular')
def popular_movies():
    data = get_json_response('movie/popular', {'language': 'en-US', 'page': 1})
    return data

@app.route('/api/top_rated')
def top_rated_movies():
    data = get_json_response('movie/top_rated', {'language': 'en-US', 'page': 1})
    return data

@app.route('/api/search/<query>')
def search_movies(query):
    data = get_json_response(f'search/movie', {'query': query})
    return data

@app.route('/api/movie/<int:id>')
def movie_detail(id):
    data = get_json_response(f'movie/{id}', {'language': 'en-US'})
    return data

if __name__ == '__main__':
    app.run(debug=True)
