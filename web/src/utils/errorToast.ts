import toast from 'react-hot-toast'

interface ApiError {
  response: {
    data: {
      details: string
    }
  }
}

export function errorToast(error: unknown) {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const apiError = error as ApiError
    const errorMessage = apiError.response?.data?.details
    if (errorMessage) {
      toast.error(errorMessage, { duration: 5000 })
    } else {
      console.error(error)
      toast.error('An unexpected error occurred', { duration: 5000 })
    }
  } else {
    console.error(error)
    toast.error('An unexpected error occurred', { duration: 5000 })
  }
}
