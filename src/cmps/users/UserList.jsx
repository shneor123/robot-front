import { UserPreview } from './UserPreview'

export const UserList = ({ users, onToggleAdmin, onDeleteUser, openQuestionModal }) => {
  return (
    <ul className="user-list clean-list">
      {users.map(user =>
        <UserPreview
          key={user._id}
          user={user}
          onToggleAdmin={onToggleAdmin}
          onDeleteUser={onDeleteUser}
          openQuestionModal={openQuestionModal}
        />
      )}
    </ul>
  )
}