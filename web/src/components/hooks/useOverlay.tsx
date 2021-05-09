import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import GridLoader from 'react-spinners/GridLoader'

const useOverlay = () => {
  const MySwal = withReactContent(Swal)

  const throwLoading = () => {
    MySwal.fire({
      title: <GridLoader loading={true} color='red' size={100} />,
      html: <p>Hold on! This may take a moment...</p>,
      showConfirmButton: false,
      background: '#2a2a2a'
    })
  }

  const closeOverlay = () => {
    if (MySwal.isVisible()) {
      MySwal.close()
    }
  }

  return { throwLoading, closeOverlay }
}

export default useOverlay
