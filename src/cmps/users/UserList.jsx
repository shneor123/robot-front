import React from 'react'
import { UserPreview } from './UserPreview'

export const UserList = ({ users, onToggleAdmin, onDeleteUser, openQuestionModal }) => {
  return (
    <ul className="user-list clean-list">
      {users.map((user, idx) =>
        <UserPreview
          key={idx}
          user={user}
          onToggleAdmin={onToggleAdmin}
          onDeleteUser={onDeleteUser}
          openQuestionModal={openQuestionModal}
        />
      )}
    </ul>
  )
}