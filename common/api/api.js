import axios from 'axios';

//const BASE_URL = 'http://nightfall.app/api/projects'
const BASE_URL = 'https://gist.githubusercontent.com/jozan/a5821e6be7c2f298f188/raw/8338d4baea5ab4cb629a09a1cbda591228d157f6/resp.json';

const options = {
  timeout: 5000,
  responseType: 'json'
}

export const API = {
  projects() {
    return axios.get(`${BASE_URL}`, options);
  },

  project(slug) {
    return axios.get(`${BASE_URL}/${slug}`, options);
  }
}

export function fetchProjects(slug, callback) {

  if (slug) {
    API.project(slug)
      .then(project => callback(project.data))
      .catch(response => {
        console.log(response);
      });

    return;
  }

  API.projects()
    .then(projects => callback(projects.data))
    .catch(response => {
      console.log(response);
    });

  // In the case of a real world API call, you'll normally run into a Promise like this:
  // API.getUser().then(user => callback(user));
}
