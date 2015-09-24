import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router'

import Card from './Card';

class Wall extends Component {
  render() {
    const { projects } = this.props.projects;

    return (
      <div>
        <h1>Projects</h1>
        {projects.map((project, key) => {
          return (
            <Card key={key}>
              <Link to={`/${project.slug}`}><h1>{project.name}</h1></Link>
              <p>{project.description}</p>
              <p>{project.date}</p>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default Wall;
