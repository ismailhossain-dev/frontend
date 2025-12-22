import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
// import useAuth from '../../../hooks/useAuth';

const UserDataRow = ({user,  refetch}) => {
  console.log(user);
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const {email, role} = user;

  //role update work 
// const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const {
    data: users = [],
    isLoading
  } = useQuery({
    queryKey: ['/users', user?.role],
    queryFn: async () => {
      const result = await axiosSecure(`/users`)
      return result.data
    },
  })
  console.log(users)

  if (isLoading) return <LoadingSpinner />

  //finished role update work 
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 '>{role}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-blue-500 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserRoleModal
          user={user}
           refetch={ refetch}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
