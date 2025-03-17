import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

function RecentActivityItem({item}) {
  return (
    <div className='activity-item d-flex'>
        <div className='activity-label'>{item.time}</div>
        <FontAwesomeIcon icon={faCircle} className={`activity-badge ${item.color} align-self-start`} />
        {item.highlight == "" ? (
            <div className='activity-content'>{item.content}</div>
        ) : (
                <div className='activity-content'>
                    {item.content.substring(0, item.content.indexOf(item.highlight))}
                    <a href='#' className='fw-bold text-dark'>
                        {item.highlight}
                    </a>
                    {item.content.slice(
                        item.content.indexOf(item.highlight) + item.highlight.length,
                        -1
                    )}
                </div>
            )}
    </div>
  )
}

export default RecentActivityItem
