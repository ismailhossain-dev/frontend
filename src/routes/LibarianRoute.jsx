import { Navigate } from 'react-router'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import useRole from '../hooks/useRole'

//libarian hole take login chara hook patay dive
const LibarianRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'librarian') return children
  return <Navigate to='/' state={location.pathname} replace='true' />
}

export default LibarianRoute