import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

function Achievement ({
  name,
  thumbnail,
  year,
  link,
  content,
  rank,
  won
}) {
  let styles

  if (thumbnail) {
    styles = {
      backgroundImage: `url(/static/thumbnails/${thumbnail})`
    }
  }

  const [isExtended, setIsExtended] = useState(false)
  const props = useSpring({
    maxHeight: isExtended ? '1000px' : '0px',
    padding: isExtended ? '22px' : '0px'
  })

  return (
    <div className={`achievement ${isExtended ? 'extended' : ''}`}>
      <div
        className="achievement-thumbnail"
        style={styles}
        onClick={() => setIsExtended(!isExtended)}
      >
        { won && <div className="badge">🏆</div> }
        <h4>{ name }</h4>
      </div>
        
        
      <animated.div className="card achievement-body" style={props}>
        <div className="achievement-title">
          <h4>{ name }</h4>

          { rank && <div className="badge">{ rank }</div>}
          { won &&  <div className="badge success">🏆 Won</div>}
        </div>

        { content && <p>{ content }</p> }
        
        { link && 
          <div className="flex center">
            <a className="btn" href={link} target="_blank">En savoir plus</a>
          </div>
        }
      </animated.div>
    </div>
  )
}

export default Achievement