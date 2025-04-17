import { useModal } from '../../hooks/useModal'

export const CancelButtonModal = () => {
  const { closeModal } = useModal()

  return (
    <div className='mt-5 sm:mt-6'>
      <button
        type='button'
        onClick={closeModal}
        className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm cursor-pointer transition-all'
      >
        Cancelar
      </button>
    </div>
  )
}
