import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router'
import errorImg from '../assets/images/error page.png'
const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto bg-blue-500'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          
         <h1 className='text-3xl font-bold text-black mb-3 '>Page not Pound </h1>
          <img src={errorImg} className='w-150 h-100' alt="" />
            
            <Button label={'Take Me Home'} onClick={() => navigate('/')} />
          </div>

      </div>
    </section>
  )
}

export default ErrorPage
