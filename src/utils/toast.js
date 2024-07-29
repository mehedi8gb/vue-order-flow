import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default {
  success(message) {
    Toast.fire({
      icon: 'success',
      title: message
    });
  },
  error(message) {
    Toast.fire({
      icon: 'error',
      title: message
    });
  },
  info(message) {
    Toast.fire({
      icon: 'info',
      title: message
    });
  },
  warning(message) {
    Toast.fire({
      icon: 'warning',
      title: message
    });
  }
};
