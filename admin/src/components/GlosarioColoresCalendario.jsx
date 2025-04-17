export const GlosarioColoresCalendario = () => {
  return (
    <div className='flex justify-center mb-6'>
      <div className='bg-white rounded-md shadow p-3 flex items-start flex-col md:flex-row gap-2 w-[100%] sm:w-[80%] md:w-[100%] md:items-center md:justify-around'>
        <div className='flex gap-2 items-center'>
          <div className='w-5 h-5 bg-red-600/80 rounded-sm'></div>
          <p className='text-sm'>Pendiente inscripción.</p>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='w-5 h-5 bg-green-700 rounded-sm'></div>
          <p className='text-sm'>Pagos al día.</p>
        </div>
      </div>
    </div>
  )
}
