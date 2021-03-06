import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  GoGitMerge,
  GoGitCommit,
  GoCommentDiscussion,
  GoOrganization,
  GoDiffAdded,
  GoDiffRemoved
} from 'react-icons/go'
import getExcerpt from '../../utils/getExcerpt'

function MostActivePR ({ pullRequest }) {
  const { t } = useTranslation()

  return (
    <div className="block column valign">
      <h4>{ t('code.mostActivePR') }</h4>

      <div className="card pull-request translate-y">
        <GoGitMerge
          className={`${pullRequest.state} hide-on-mobile`}
          size={24}
          style={{ float: 'left', marginTop: '8px' }}
        />

        <div className="card-body">
          <a href={pullRequest.permalink}>
            <div className="pull-request-title">
              <h5>{ pullRequest.title }</h5>
              <div className="owner-avatar hide-on-mobile">
                <img
                  src={pullRequest.repository.owner.avatarUrl}
                  alt={`Repository Owner : ${pullRequest.repository.nameWithOwner}`}
                />
              </div>
            </div>
            <p>{ getExcerpt(pullRequest.bodyText) }</p>
          </a>

          <p className="pull-request-info">
            <span>
              <a href={`${pullRequest.permalink}/commits`}>
                <GoGitCommit size={18} />
                { pullRequest.commits.totalCount }
                <span className="visually-hidden">commits</span>
              </a>
              <span>
                <GoCommentDiscussion size={18} />
                { pullRequest.timeline.totalCount }
                <span className="visually-hidden">comments</span>
              </span>
              <span>
                <GoOrganization size={18} />
                { pullRequest.participants.totalCount }
                <span className="visually-hidden">participants</span>
              </span>
            </span>

            <a href={`${pullRequest.permalink}/files`} aria-label="Pull Request Diff">
              <span>
                <GoDiffAdded size={18} className="additions" />
                { pullRequest.additions }
                <span className="visually-hidden">additions</span>
              </span>

              <span>
                <GoDiffRemoved size={18} className="deletions" />
                { pullRequest.deletions }
                <span className="visually-hidden">deletions</span>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MostActivePR
