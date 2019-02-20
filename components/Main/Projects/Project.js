import React, { useState, useEffect } from 'react'

function Project ({ title, subtitle, type, date, github, stack }) {
  /* Get the file name in /static/thumbnails */
  const formattedTitle = title.toLowerCase().replace(/\s/g, '_')

  const [stars, setStars] = useState(null)

  useEffect(() => {
    const localStars = localStorage.getItem(formattedTitle)
    /* GitHub project */
    if (!localStars) {
      fetch(`https://api.github.com/repos/${github}`)
        .then(response => response.json())
        .then(data => {
          console.log(`Old: ${stars} | New: ${data.stargazers_count}`)
          setStars(data.stargazers_count)
          localStorage.setItem(formattedTitle, data.stargazers_count)
        })
    }
  })

  /* Tech stack */
  const techStack = stack.map(tech => (
    <img src={`/static/logos/${tech}.svg`} alt={`${tech} logo`} title={tech} />
  ))
  

  return (
    <div className="project">
      <div className="project-header">
        <div>
          <h3>{ title }</h3>
          <h4 className="grey">{ subtitle }</h4>
          <h5>
            { type }
            <span className="separator"></span>
            { date }
            { stars &&
              <Fragment>
                <span className="separator"></span>
                { `${stars} ⭐` }
              </Fragment>
            }
          </h5>
        </div>
        { github &&
          <a href={`https://github.com/${github}`}><span>En savoir plus</span></a>
        }
      </div>
      <img
        onClick={() => window.open(`https://github.com/${github}`)}
        src={`/static/thumbnails/${formattedTitle}.jpg`}
        alt={`${title} thumbnail`}
      />
      <p className="project-footer">{ techStack }</p>
    </div>
  )
}

export default Project